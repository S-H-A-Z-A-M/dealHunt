// app/api/discord/send-dm/route.ts
import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../scripts/bot";

export async function POST(req: NextRequest) {
  const { discordId } = await req.json();

  try {
    const user = await client.users.fetch('745558372073603104');
    const dm = await user.send("✅ You're all set to receive DealHunt alerts!");

    return NextResponse.json({ success: true, messageId: dm.id });
  } catch (error) {
    console.error("DM failed:", error);
    return NextResponse.json({
      success: false,
      error: "DMs disabled or not allowed.",
    });
  }
}
