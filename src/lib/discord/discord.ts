// lib/discord.ts
import qs from "querystring";

const DISCORD_API = "https://discord.com/api";

export async function getAccessToken(code: string) {
  const body = {
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    scope: "identify guilds",
  };

  const response = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Discord access token");
  }

  return response.json();
}

export async function getUser(accessToken: string) {
  const response = await fetch(`${DISCORD_API}/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Discord user");
  }

  return response.json();
}

export async function getUserGuilds(accessToken: string) {
  const response = await fetch(`${DISCORD_API}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user guilds");
  }

  return response.json();
}
