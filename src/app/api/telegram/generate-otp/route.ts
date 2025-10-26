import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user.model"; // adjust path

export async function GET() {
  await dbConnect();

  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find user in MongoDB using kindeId
  const dbUser = await User.findOne({ kindeId: kindeUser.id });
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Generate a unique 6-digit OTP (retry if exists)
  let otp = "";
  let isUnique = false;
  let retryCount = 0;

  while (!isUnique && retryCount < 5) {
    otp = Math.floor(100000 + Math.random() * 900000).toString();
    const existingUserWithOtp = await User.findOne({ telegramOtp: otp });

    if (!existingUserWithOtp) {
      isUnique = true;
    } else {
      retryCount++;
    }
  }

  if (!isUnique) {
    return NextResponse.json(
      { error: "Failed to generate OTP" },
      { status: 500 }
    );
  }

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 5 minutes

  // Update the user record
  dbUser.telegramOtp = otp;
  dbUser.telegramOtpExpiresAt = expiresAt;
  await dbUser.save();

  return NextResponse.json({ otp });
}
