"use client";

import { useEffect, useState } from "react";
import { getDiscordOAuthURL } from "@/lib/discord/getDiscordOAuthURL";

export default function ConnectDiscordPage() {
  const [discordOAuthURL, setDiscordOAuthURL] = useState("");

  useEffect(() => {
    async function fetchOAuthURL() {
      const url = getDiscordOAuthURL();
      setDiscordOAuthURL(url);
    }

    fetchOAuthURL();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <a
        href={discordOAuthURL}
        className="px-6 py-3 text-white font-bold rounded-lg text-lg"
        style={{ backgroundColor: "#5865F2" }} // Discord brand color
      >
        Connect to Discord
      </a>
    </div>
  );
}
