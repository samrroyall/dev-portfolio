import StravaDayDetail from "./StravaDayDetail";

const baseSize = 1.3;
const maxMilesPerDay = 30;
const multiplier = 1.5;
const cellSize = (maxMilesPerDay + baseSize) * multiplier;

export interface StravaDayData {
  id: number;
  miles: number;
  pace: number;
  avgBpm: number | null;
}

interface StravaDayProps {
  data: StravaDayData | null;
  isToday: boolean;
}

const StravaDay = ({ data, isToday }: StravaDayProps) => {
  const bgClass = isToday ? "bg-strava-orange" : "bg-secondary-text";

  const hoverClasses =
    data && isToday
      ? "hover:bg-strava-orange-light cursor-pointer"
      : data
        ? "hover:bg-tertiary-text cursor-pointer"
        : "";

  const size = baseSize + (data?.miles || 0);

  return (
    <div
      class={`flex items-center justify-center h-[${cellSize}] w-[${cellSize}]`}
    >
      {data ? <StravaDayDetail {...data} /> : null}
      <div
        class={`h-[${size * multiplier}] w-[${size * multiplier}] rounded-full ${bgClass} ${hoverClasses}`}
        hx-on:click={
          data ? `htmx.toggleClass("#run-${data.id}-detail", "hidden")` : ""
        }
      />
    </div>
  );
};

export default StravaDay;
