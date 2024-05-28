import {
  type RunDay,
  type RunMonth,
  type RunWeek,
} from "../../../models/interests";
import { mockFunc } from "../../../utils";
import { getMockStravaData } from "../../mocks/interests";

const emptyRunMonth: RunMonth = new Array<RunWeek>(5)
  .fill(null)
  .map(
    (_) => new Array<RunDay | null>(7).fill(null as RunDay | null) as RunWeek,
  ) as RunMonth;

export const getStravaData = (): Promise<RunMonth> =>
  process.env.USE_MOCKS === "true"
    ? getMockStravaData()
    : mockFunc(emptyRunMonth);
