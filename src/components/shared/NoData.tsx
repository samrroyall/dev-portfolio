import Icon from "./Icon";

interface NoDataProps {
  className?: string;
}

const NoData = ({ className }: NoDataProps) => (
  <div
    class={`text-secondary-text dark:text-secondary-text-dark flex ${className ?? ""}`}
  >
    <Icon icon={"\udb85\ude3a"} />
    <span class="ml-2">{"Nothing to see here"}</span>
  </div>
);

export default NoData;
