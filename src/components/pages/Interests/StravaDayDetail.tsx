import { Icon } from "../../shared";

const styleClasses =
  "bg-primary-bg border-secondary-text rounded border-2 border-dashed";

const valueClasses = "leading-none text-secondary-text text-6xl font-bold";

const unitClasses = "text-base font-normal";

const mainUnitClasses = `${unitClasses} text-primary-text ml-3`;

interface StravaDayDetailProps {
  id: number;
  miles: number;
  pace: number;
  avgBpm: number | null;
}

const StravaDayDetail = ({ id, miles, pace, avgBpm }: StravaDayDetailProps) => {
  const hours = pace > 60 ? Math.floor(pace / 60) : null;
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace % 1) * 60);

  const paceValue = (
    <div class={`flex gap-x-1 ${valueClasses}`}>
      {hours ? (
        <div>
          {hours}
          <span class={unitClasses}>H</span>
        </div>
      ) : null}
      <div>
        {minutes}
        <span class={unitClasses}>M</span>
      </div>
      <div>
        {seconds}
        <span class={unitClasses}>S</span>
        <span class={mainUnitClasses}>{"/mi"}</span>
      </div>
    </div>
  );

  const milesValue = (
    <div class={valueClasses}>
      {miles.toFixed(2)}
      <span class={mainUnitClasses}>{"mi"}</span>
    </div>
  );

  const bpmValue = avgBpm ? (
    <div class={valueClasses}>
      {avgBpm.toFixed(0)}
      <span class={mainUnitClasses}>{"bpm"}</span>
    </div>
  ) : null;

  return (
    <div
      id={`run-${id}-detail`}
      class={`absolute left-0 top-0 hidden h-full w-full p-3`}
    >
      <div class={`${styleClasses} px-6 py-3`}>
        <div hx-on:click={`htmx.toggleClass("#run-${id}-detail", "hidden")`}>
          <Icon
            icon={"\uea9b"}
            className="text-secondary-text hover:text-tertiary-text cursor-pointer"
          />
        </div>
        <div class="flex flex-col items-end">
          {paceValue}
          {milesValue}
          {avgBpm ? bpmValue : null}
        </div>
      </div>
    </div>
  );
};

export default StravaDayDetail;
