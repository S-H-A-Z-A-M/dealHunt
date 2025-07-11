import axios from "axios";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";
import { successResponse } from "@/types/ApiResponse";

interface RawgGame {
  id: number;
  name: string;
  background_image: string;
  released: string;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  [key: string]: any;
}

const RAWG_CACHE_KEY = "rawg:popular-games:v1";
const TTL_SECONDS = 60 * 60 * 6;

export async function GET(request: Request) {
  try {
    const cached = await redis.get(RAWG_CACHE_KEY);
    if (cached) {
      console.log("🧠 Serving from Redis cache");
      return NextResponse.json(
        successResponse(
          JSON.parse(cached),
          "Popular games fetched successfully (cached)"
        )
      );
    }

    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.RAWG_API_KEY,
        page_size: 20,
      },
    });

    const games: RawgGame[] = response.data.results;

    const simplifiedGames = games.map((game) => ({
      name: game.name,
      image: game.background_image,
      released: game.released,
      platforms: game.platforms.map((p) => p.platform.name),
      genres: game.genres.map((g) => g.name),
    }));

    await redis.set(
      RAWG_CACHE_KEY,
      JSON.stringify(simplifiedGames),
      "EX",
      TTL_SECONDS
    );

    return NextResponse.json(
      successResponse(simplifiedGames, "Popular games fetched successfully")
    );
  } catch (error: any) {
    console.error("RAWG API error:", error.message);
    return new Response(JSON.stringify({ error: "Failed to fetch games" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
