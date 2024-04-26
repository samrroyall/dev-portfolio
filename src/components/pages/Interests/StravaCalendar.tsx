import { type RunDay, type StravaData } from "../../../api/strava";
import StravaDay from "./StravaDay";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const today = new Date().getDate();

interface StravaCalendarProps {
  data: StravaData;
}

const StravaCalendar = ({ data }: StravaCalendarProps) => {
  const numWeeks = Math.ceil((data.firstDayOfMonth + data.daysInMonth) / 7);

  const weeks = new Array<(RunDay[] | null)[]>(numWeeks)
    .fill(null)
    .map((_) => new Array<RunDay[] | null>(7).fill(null));

  data.runs.forEach((runs, i) => {
    const offsetIndex = i + data.firstDayOfMonth;

    weeks[Math.floor(offsetIndex / 7)][offsetIndex % 7] = runs;
  });

  return (
    <table>
      <thead class="text-secondary-text">
        <tr>
          {daysOfWeek.map((d) => (
            <th>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((w, i) => (
          <tr>
            {w.map((d, j) => (
              <td>
                <StravaDay
                  data={d}
                  isToday={i * 7 + j + 1 - data.firstDayOfMonth === today}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StravaCalendar;
