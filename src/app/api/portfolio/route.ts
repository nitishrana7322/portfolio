import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Portfolio } from '@/models/Portfolio';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const data = await Portfolio.findOne().lean();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;

    if (!token || !(await verifyToken(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const updateData = await req.json();
    
    // We only update the first document (singleton pattern for portfolio)
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
       portfolio = await Portfolio.create(updateData);
    } else {
       await Portfolio.updateOne({ _id: portfolio._id }, { $set: updateData });
    }
    
    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
