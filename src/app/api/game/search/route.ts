import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";
import redis from "@/lib/redis";
import { errorResponse, successResponse } from "@/types/ApiResponse";
import { Search } from "lucide-react";

interface RawgGame {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  released: string;
  platforms: { platform: { name: string } }[];
  genres: { name: string }[];
  [key: string]: any;
}

interface ItadGame {
  id: string;
  slug: string;
  title: string;
}

export async function GET(request: NextRequest) {
  // TODO: 1. Read params
  //  Check if they already exit in redis
  // 2. Call RAWG API , apply filter to it
  // 3. Call ITAD API, find intersection
  // 4. Return the result.

  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title") || "";

  if (title == "") {
    return NextResponse.json(errorResponse("The search field can't be empty"));
  }

  const rawgRes = axios.get("https://api.rawg.io/api/games", {
    params: {
      key: process.env.RAWG_API_KEY,
      search: title,
      page_size: 20,
    },
  });

  const itadRes = axios.get("https://api.isthereanydeal.com/games/search/v1", {
    params: {
      key: process.env.ITAD_API_KEY,
      title: title,
    },
  });

  return NextResponse.json({ message: "The request is reaching", title });
}
