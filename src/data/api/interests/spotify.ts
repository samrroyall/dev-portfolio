import { type Track } from "../../../models/interests";
import { getMockSpotifyData } from "../../mocks/interests";

export const getSpotifyData = async (): Promise<Track[] | null> => {
  if (process.env.USE_MOCKS === "true") {
    return await getMockSpotifyData();
  }

  const apiUrl = process.env.VF_API_URL;

  if (!apiUrl) {
    throw new Error("No value provided for VF_API_URL");
  }

  const apiResponse = await fetch(`${apiUrl}/api/spotify`);

  return (await apiResponse.json()) as Track[];
};
