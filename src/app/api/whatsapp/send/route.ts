// app/api/whatsapp/send/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  try {
    const { to, message }: { to: string; message: string } = await req.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID!;
    const authToken = process.env.TWILIO_AUTH_TOKEN!;
    const from = "whatsapp:+14155238886"; // Twilio Sandbox number

    const client = twilio(accountSid, authToken);

    const msg = await client.messages.create({
      body: message,
      from,
      to: `whatsapp:${to}`, // Example: whatsapp:+91xxxxxxxxxx
    });

    return NextResponse.json({ success: true, sid: msg.sid });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
