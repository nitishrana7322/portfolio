import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/models/Admin';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: 'No admin found with that email' }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    admin.resetToken = resetTokenHash;
    admin.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    await admin.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`;

    // Normally you'd send an email here using nodemailer
    // To configure real email, add SMTP_USER and SMTP_PASS to .env
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: '"Portfolio Admin" <noreply@portfolio.com>',
        to: admin.email,
        subject: 'Password Reset Request',
        html: `
          <h1>Password Reset Request</h1>
          <p>Please go to this link to reset your password:</p>
          <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
        `,
      });
    } else {
      // For development/demo purposes without SMTP:
      console.log('--- PASSWORD RESET LINK ---');
      console.log(resetUrl);
      console.log('---------------------------');
      return NextResponse.json({ 
        success: true, 
        message: 'No SMTP configured. Printed reset link to server console for testing.' 
      });
    }

    return NextResponse.json({ success: true, message: 'Password reset link sent to email' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
