import Icon from "./Icon";

interface NoMobileProps {
  className?: string;
}

const NoMobile = ({ className }: NoMobileProps): JSX.Element => (
  <div
    class={`text-secondary-text dark:text-secondary-text-dark flex ${className ?? ""}`}
  >
    <Icon icon={"\udb82\udd50"} />
    <span class="ml-2">{"This page is not supported on mobile"}</span>
  </div>
);

export default NoMobile;
