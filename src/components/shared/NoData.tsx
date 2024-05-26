import Icon from "./Icon";

const NoData = () => (
  <div class="text-secondary-text dark:text-secondary-text-dark flex items-center justify-center">
    <Icon icon={"\udb85\ude3a"} />
    <span class="ml-2">{"Nothing to see here"}</span>
  </div>
);

export default NoData;
