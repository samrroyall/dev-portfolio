import { getHxAttrsFromProps } from "../../models/components";
import { type HtmxAttributes } from "../../types";
import { Icon, Link } from "../shared";
import { type LinkTarget } from "./Link";

const borderClasses = `
  border-secondary-text dark:border-secondary-text-dark border rounded-full 
`;

const textClasses = `
  text-secondary-text dark:text-secondary-text-dark
  hover:text-primary-bg hover:dark:text-primary-bg-dark
  hover:bg-primary-bg-dark hover:dark:bg-primary-bg
`;

type ButtonType = "button" | "submit";

interface IconButtonProps extends Partial<HtmxAttributes> {
  label: string;
  icon: string;
  href?: string;
  id?: string;
  target?: LinkTarget;
  type?: ButtonType;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, label, href, id, target, type } = props;

  const attrs = {
    ...(id ? { id } : {}),
  };

  const hxAttrs = getHxAttrsFromProps(props);

  const iconButton = (
    <button
      class={`px-3 py-2 ${borderClasses} ${textClasses}`}
      type={type ?? "button"}
      {...attrs}
      {...hxAttrs}
    >
      <div class="flex items-center">
        <Icon icon={icon} />
        <span class="ml-2">{label}</span>
      </div>
    </button>
  );

  return href ? (
    <Link
      href={href}
      noUnderline={true}
      target={target ?? "_self"}
      {...hxAttrs}
    >
      {iconButton}
    </Link>
  ) : (
    iconButton
  );
};

export default IconButton;
