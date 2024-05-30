import { Icon } from "../../shared";

const arrowClasses = `
  text-secondary-text dark:text-secondary-text-dark cursor-pointer text-xl
  hover:text-tertiary-text hover:dark:text-tertiary-text-dark 
`;

const bgClasses = "bg-primary-bg dark:bg-primary-bg-dark";

const borderClasses =
  "border border-secondary-text dark:border-secondary-text-dark rounded";

const valueClasses =
  "text-secondary-text dark:text-secondary-text-dark text-4xl font-bold";

const unitClasses = "mx-1 text-secondary-text dark:text-secondary-text-dark";

interface StravaDayDetailProps {
  id: number;
  miles: number;
  pace: number;
  avgBpm: number | null;
}

const StravaDayDetail = ({
  id,
  miles,
  pace,
  avgBpm,
}: StravaDayDetailProps): JSX.Element => {
  const hours = pace > 60 ? Math.floor(pace / 60) : null;
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace % 1) * 60);

  return (
    <div
      id={`run-${id}-detail`}
      class={`absolute left-0 top-0 hidden h-full w-full`}
    >
      <div
        class={`flex h-full w-full flex-col p-3 ${borderClasses} ${bgClasses}`}
      >
        <div
          class="flex-none"
          hx-on-click={`htmx.toggleClass("#run-${id}-detail", "hidden")`}
        >
          <Icon icon={"\udb80\udc4d"} className={arrowClasses} />
        </div>
        <div class="font-geist-mono flex flex-auto flex-col justify-center px-8 ">
          {
            <div class="flex flex-col">
              <span>{"DISTANCE"}</span>
              <div class="self-end">
                <span class={valueClasses}>{miles.toFixed(2)}</span>
                <span class="ml-3">{"mi"}</span>
              </div>
            </div>
          }
          {
            <div class="flex flex-col">
              <span>{"PACE"}</span>
              <div class="flex gap-x-1 self-end">
                {hours ? (
                  <div>
                    <span class={valueClasses}>{hours}</span>
                    <span class={unitClasses}>H</span>
                  </div>
                ) : null}
                <div>
                  <span class={valueClasses}>{minutes}</span>
                  <span class={unitClasses}>M</span>
                </div>
                <div>
                  <span class={valueClasses}>{seconds}</span>
                  <span class={unitClasses}>S</span>
                  <span class="ml-3">{"/mi"}</span>
                </div>
              </div>
            </div>
          }
          {avgBpm ? (
            <div class="flex flex-col">
              <span>{"AVG HR"}</span>
              <div class="self-end">
                <span class={valueClasses}>{avgBpm.toFixed(0)}</span>
                <span class="ml-3">{"bpm"}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StravaDayDetail;
