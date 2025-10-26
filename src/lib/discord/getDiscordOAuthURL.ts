export const getDiscordOAuthURL = () => {
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

  console.log("Discord Client ID:", clientId);
  console.log("Discord Redirect URI:", redirectUri);

  if (!clientId || !redirectUri) {
    throw new Error('Missing required Discord OAuth environment variables');
  }
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify guilds",
  });
  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
};