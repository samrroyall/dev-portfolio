import StravaDayDetail from "./StravaDayDetail";

const baseSize = 2;
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

const StravaDay = ({ data, isToday }: StravaDayProps): JSX.Element => {
  const bgClass = isToday
    ? "bg-strava-orange"
    : "bg-secondary-text dark:bg-secondary-text-dark";

  const hoverClasses =
    data && isToday
      ? "hover:bg-strava-orange-light cursor-pointer"
      : data
        ? "hover:bg-tertiary-text hover:dark:bg-tertiary-text-dark cursor-pointer"
        : "";

  const size = baseSize + (data?.miles ?? 0);

  const circleClasses = `
    h-[${size * multiplier}px] w-[${size * multiplier}px] rounded-full 
    ${bgClass} ${hoverClasses}
  `;

  return (
    <div
      class={`flex items-center justify-center h-[${cellSize}px] w-[${cellSize}px]`}
    >
      {data ? <StravaDayDetail {...data} /> : null}
      <div
        class={circleClasses}
        hx-on-click={
          data ? `htmx.toggleClass("#run-${data.id}-detail", "hidden")` : ""
        }
      />
    </div>
  );
};

export default StravaDay;
