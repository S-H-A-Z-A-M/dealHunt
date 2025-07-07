import dbConnect from "@/lib/dbConnect";
import axios from "axios";
// import GameModel from "@/models/Game"; // your Mongoose model

interface RawgGame {
  id: number;
  name: string;
  background_image: string;
  released: string;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  [key: string]: any;
}

export async function GET(request: Request) {
  try {
    // 1. Fetch games from RAWG
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: process.env.RAWG_API_KEY,
        page_size: 1,
      },
    });

    const games: RawgGame[] = response.data.results;

    // 2. Send response to user immediately
    const simplifiedGames = games.map((game) => ({
      name: game.name,
      image: game.background_image,
      released: game.released,
      platforms: game.platforms.map((p) => p.platform.name),
      genres: game.genres.map((g) => g.name),
    }));

    // respond early
    const responseToUser = Response.json({ games: simplifiedGames });

    // 3. Store in DB without blocking response
    // (async () => {
    //   try {
    //     await dbConnect();

    //     await GameModel.insertMany(
    //       simplifiedGames.map((game) => ({
    //         ...game,
    //         fetchedAt: new Date(),
    //       }))
    //     );
    //   } catch (err) {
    //     console.error("Error storing to DB:", err);
    //   }
    // })();

    return responseToUser;
  } catch (error: any) {
    console.error("RAWG API error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch games" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
