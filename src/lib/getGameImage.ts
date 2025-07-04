import axios from 'axios';

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

if (!RAWG_API_KEY) {
  console.warn("❌ RAWG_API_KEY is not defined. Please check your .env setup.");
}

interface RawgGame {
  name: string;
  background_image: string;
  [key: string]: any;
}

interface RawgResponse {
  results: RawgGame[];
}

export const getGameImageByTitle = async (title: string): Promise<string | null> => {
  try {
    const res = await axios.get<RawgResponse>('https://api.rawg.io/api/games', {
      params: {
        key: RAWG_API_KEY,
        search: title,
        page_size: 1,
      },
    });

    const game = res.data.results?.[0];

    console.log(`Game found for "${title}":`, game);
    return game?.background_image || null;
  } catch (error: any) {
    console.error(`❌ Error fetching image for "${title}":`, error.message);
    return null;
  }
};
