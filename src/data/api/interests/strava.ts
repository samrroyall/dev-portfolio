import { type RunMonth } from "../../../models/interests";
import { getMockStravaData } from "../../mocks/interests";

export const getStravaData = async (): Promise<RunMonth | null> => {
  if (process.env.USE_MOCKS === "true") {
    return await getMockStravaData();
  }

  const apiUrl = process.env.VF_API_URL;

  if (!apiUrl) {
    throw new Error("No value provided for VF_API_URL");
  }

  const apiResponse = await fetch(`${apiUrl}/api/strava`);

  return (await apiResponse.json()) as RunMonth;
};
