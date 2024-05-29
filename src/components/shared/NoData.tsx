import Icon from "./Icon";

const centeredClasses = "flex items-center justify-center";

interface NoDataProps {
  centered?: boolean;
  className?: string;
}

const NoData = ({ centered, className }: NoDataProps) => (
  <div
    class={`text-secondary-text dark:text-secondary-text-dark ${centered === false ? "" : centeredClasses} ${className ?? ""}`}
  >
    <Icon icon={"\udb85\ude3a"} />
    <span class="ml-2">{"Nothing to see here"}</span>
  </div>
);

export default NoData;
