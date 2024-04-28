import { Icon } from "../../shared";

const styleClasses =
  "bg-primary-bg border-secondary-text rounded border-2 border-dashed";

const labelClasses = "text-sm font-light";

const valueClasses = "self-end text-secondary-text text-4xl font-bold";

const unitClasses = "text-base font-normal mx-1";

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
    <div class="flex flex-col">
      <span class={labelClasses}>PACE</span>
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
    </div>
  );

  const milesValue = (
    <div class="flex flex-col">
      <span class={labelClasses}>DISTANCE</span>
      <div class={valueClasses}>
        {miles.toFixed(2)}
        <span class={mainUnitClasses}>{"mi"}</span>
      </div>
    </div>
  );

  const bpmValue = avgBpm ? (
    <div class="flex flex-col">
      <span class={labelClasses}>AVG HR</span>
      <div class={valueClasses}>
        {avgBpm.toFixed(0)}
        <span class={mainUnitClasses}>{"bpm"}</span>
      </div>
    </div>
  ) : null;

  return (
    <div
      id={`run-${id}-detail`}
      class={`absolute left-0 top-0 hidden h-full w-full p-3`}
    >
      <div class={`${styleClasses} font-sauce-code-pro p-3`}>
        <div hx-on:click={`htmx.toggleClass("#run-${id}-detail", "hidden")`}>
          <Icon
            icon={"\uea9b"}
            className="text-secondary-text hover:text-tertiary-text cursor-pointer"
          />
        </div>
        <div class="px-8">
          {milesValue}
          {paceValue}
          {avgBpm ? bpmValue : null}
        </div>
      </div>
    </div>
  );
};

export default StravaDayDetail;
