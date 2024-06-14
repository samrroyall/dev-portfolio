import { type RunDay, type RunMonth } from "../../../models/interests";
import StravaDay, { type StravaDayData } from "./StravaDay";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
  offset: number | undefined;
  runs: RunMonth;
}

const StravaCalendar = ({ offset, runs }: StravaCalendarProps): JSX.Element => {
  const isToday = (i: number, j: number): boolean => {
    let now = new Date();

    if (offset) {
      now = new Date(now.getTime() + offset * 60 * 60 * 1000);
    }

    const firstDayOfMonthIdx = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      1,
    ).getUTCDay();

    const todayCellIdx = firstDayOfMonthIdx + now.getUTCDate() - 1;

    return todayCellIdx === i * 7 + j;
  };

  return (
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
};

export default StravaCalendar;
