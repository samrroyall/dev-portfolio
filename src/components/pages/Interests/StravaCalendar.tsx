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
    id: runs[0].id,
    miles: runs.reduce((acc, run) => acc + run.miles, 0),
    pace: runs.reduce((acc, run) => acc + run.minutesPerMile, 0) / runs.length,
    avgBpm: runs.every((run) => !!run.avgBpm)
      ? runs.reduce((acc, run) => acc + run.avgBpm!, 0) / runs.length
      : null,
  };
};

interface StravaCalendarProps {
  runs: RunMonth;
}

const StravaCalendar = ({ runs }: StravaCalendarProps): JSX.Element => (
  <table class="relative max-w-[350px]">
    <tbody>
      {runs.map((week, i) => (
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
    <tfoot class="text-secondary-text dark:text-secondary-text-dark">
      <tr>
        {daysOfWeek.map((d) => (
          <th safe>{d}</th>
        ))}
      </tr>
    </tfoot>
  </table>
);

export default StravaCalendar;
