import { type RunDay, type RunMonth } from "../../../models/interests";
import StravaDay, { type StravaDayData } from "./StravaDay";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

const isToday = (i: number, j: number): boolean =>
  now.getDate() === i * 7 + j + 1 - firstDayOfMonth;

const mapRunDaysToStravaDayData = (runs: RunDay[]): StravaDayData | null => {
  if (runs.length === 0) {
    return null;
  }

  return {
    id: runs[0]!.id,
    miles: runs.reduce((acc, run) => acc + run.miles, 0),
    pace: runs.reduce((acc, run) => acc + run.minutesPerMile, 0) / runs.length,
    avgBpm: runs.every((run) => run.avgBpm !== undefined)
      ? runs.reduce((acc, run) => acc + run.avgBpm!, 0) / runs.length
      : null,
  };
};

const tableFooter = (
  <tfoot class="text-secondary-text">
    <tr>
      {daysOfWeek.map((d) => (
        <th>{d}</th>
      ))}
    </tr>
  </tfoot>
);

interface StravaCalendarProps {
  month: Promise<RunMonth>;
}

const StravaCalendar = async ({ month }: StravaCalendarProps) => (
  <table class="relative">
    <tbody>
      {(await month).map((week, i) => (
        <tr>
          {week.map((day, j) => (
            <td>
              {day ? (
                <StravaDay
                  data={mapRunDaysToStravaDayData(day)}
                  isToday={isToday(i, j)}
                />
              ) : null}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    {tableFooter}
  </table>
);

export default StravaCalendar;
