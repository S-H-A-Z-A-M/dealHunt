// /app/api/telegram/verify/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/model/user.model';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const otp: string = body.otp;
    const chat_id: number = body.chat_id;

    if (!otp || !chat_id) {
      return NextResponse.json({ success: false, message: "OTP and chat_id are required." }, { status: 400 });
    }

    // Find user with matching OTP and unexpired
    const user = await User.findOne({
      telegramOtp: otp,
      telegramOtpExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid or expired OTP." }, { status: 401 });
    }

    // Link telegramId to user and clear the OTP fields
    user.telegramId = chat_id;
    user.telegramOtp = null;
    user.telegramOtpExpiresAt = null;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP verification failed:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
