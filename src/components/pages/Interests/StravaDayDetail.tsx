import { Icon } from "../../shared";

const borderClasses = "bg-primary-bg border border-secondary-text rounded";

const labelClasses = "text-sm";

const valueClasses = "self-end text-secondary-text text-4xl font-bold";

const unitClasses = "text-base mx-1";

const mainUnitClasses = `text-base text-primary-text ml-3`;

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
      class={`absolute left-0 top-0 hidden h-full w-full`}
    >
      <div
        class={`flex h-full w-full flex-col ${borderClasses} font-sauce-code-pro p-3`}
      >
        <div
          class="flex-none"
          hx-on:click={`htmx.toggleClass("#run-${id}-detail", "hidden")`}
        >
          <Icon
            icon={"\uea9b"}
            className="text-secondary-text hover:text-tertiary-text cursor-pointer"
          />
        </div>
        <div class="flex flex-auto flex-col justify-center px-8">
          {milesValue}
          {paceValue}
          {avgBpm ? bpmValue : null}
        </div>
      </div>
    </div>
  );
};

export default StravaDayDetail;
