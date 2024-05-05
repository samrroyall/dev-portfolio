import {
  type RunDay,
  type RunMonth,
  type RunWeek,
} from "../../../models/interests";
import { mockFunc } from "../../../utils";

// TODO: Temporary placeholder
const emptyRunMonth = new Array<RunWeek>(5)
  .fill(null)
  .map((_) => new Array<RunDay | null>(7).fill(null));

export const getStravaData = (): Promise<RunMonth> => mockFunc(emptyRunMonth);
