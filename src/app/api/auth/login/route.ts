import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      return NextResponse.json({ error: 'SETUP_REQUIRED', message: 'No admin found. Please run setup.' }, { status: 404 });
    }

    const { email, password } = await req.json();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ adminId: admin._id, email: admin.email });
    
    // Set HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
