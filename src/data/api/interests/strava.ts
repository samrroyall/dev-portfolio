import "dotenv/config";
import { type RunMonth } from "../../../models/interests";
import { getMockStravaData } from "../../mocks/interests";

export const getStravaData = async (
  offset?: number,
): Promise<RunMonth | null> => {
  if (process.env.USE_MOCKS === "true") {
    return await getMockStravaData();
  }

  const apiUrl = process.env.VF_API_URL;

  if (!apiUrl) {
    throw new Error("No value provided for VF_API_URL");
  }

  // build the calendar for the viewer's current month, the same month
  // StravaCalendar uses for the "today" highlight
  const query = offset !== undefined ? `?offset=${offset}` : "";

  const apiResponse = await fetch(`${apiUrl}/api/strava${query}`);

  return (await apiResponse.json()) as RunMonth;
};
