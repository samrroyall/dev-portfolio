import Icon from "./Icon";

interface NoDataProps {
  className?: string;
}

const NoData = ({ className }: NoDataProps): JSX.Element => (
  <div
    class={`text-secondary-text dark:text-secondary-text-dark flex items-center ${className ?? ""}`}
  >
    <Icon icon={"\udb85\ude3a"} className="text-xl" />
    <span class="ml-2 text-lg">{"Nothing to see here"}</span>
  </div>
);

export default NoData;
