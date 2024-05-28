import { type Track } from "../../../models/interests";
import { mockFunc } from "../../../utils";
import { getMockSpotifyData } from "../../mocks/interests";

export const getSpotifyData = (): Promise<Track[]> =>
  process.env.USE_MOCKS === "true"
    ? getMockSpotifyData()
    : mockFunc([] as Track[]);
