import { type Track } from "../../../models/interests";
import { getMockSpotifyData } from "../../mocks/interests";

export const getSpotifyData = async (): Promise<Track[] | null> => {
  if (process.env.USE_MOCKS === "true") {
    return await getMockSpotifyData();
  }

  const apiUrl = process.env.VERCEL_API_URL;

  if (!apiUrl) {
    throw new Error("No value provided for VERCEL_API_URL");
  }

  try {
    const apiResponse = await fetch(`${apiUrl}/api/spotify`);

    return (await apiResponse.json()) as Track[];
  } catch (err) {
    console.error(
      `Unexpected error encountered while retrieving Spotify data: ${JSON.stringify(err)}`,
    );

    return null;
  }
};
