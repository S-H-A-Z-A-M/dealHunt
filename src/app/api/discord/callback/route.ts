// app/api/discord/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getAccessToken,
  getUser as getDiscordUser,
  getUserGuilds,
} from "@/lib/discord/discord";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@/model/user.model";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) return NextResponse.redirect("/error");

  try {
    const { access_token } = await getAccessToken(code);
    const user = await getDiscordUser(access_token);
    const guilds = await getUserGuilds(access_token);

    const { id, username } = user;
    console.log("Discord User:", user);

    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        kindeId: kindeUser.id,
      },
      {
        $set: {
          discordId: id,
          discordUsername: username,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isInDealHunt = guilds.some(
      (g: any) => g.id === process.env.DEALHUNT_GUILD_ID
    );
    if (!isInDealHunt) {
      return NextResponse.redirect("/invite-bot");
    }

    return NextResponse.redirect(`/discord/verify-dm?id=${user.id}`);
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect("/error");
  }
}
