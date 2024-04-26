import { type RunDay } from "../../../api/strava";

const baseSize = 2;
const maxMilesPerDay = 30;
const multiplier = 1.5;
const cellSize = (maxMilesPerDay + baseSize) * multiplier;

interface StravaDayProps {
  data: RunDay[] | null;
  isToday: boolean;
}

const StravaDay = ({ data, isToday }: StravaDayProps) => {
  const miles =
    data === null
      ? 0
      : data.length === 0
        ? baseSize
        : data.reduce((acc, next) => acc + next.miles, baseSize);

  const bgClass = isToday ? "bg-strava-orange" : "bg-secondary-text";

  return (
    <div
      class={`flex items-center justify-center h-[${cellSize}] w-[${cellSize}]`}
    >
      <div
        class={`h-[${miles * multiplier}] w-[${miles * multiplier}] rounded-full ${bgClass}`}
      />
    </div>
  );
};

export default StravaDay;
