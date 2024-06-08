import { getHxAttrsFromProps } from "../../models/components";
import { type HtmxAttributes } from "../../types";

const borderClasses = `
  border-secondary-text dark:border-secondary-text-dark rounded border
  disabled:border-primary-text disabled:dark:border-primary-text-dark
`;

const textClasses = `
  text-secondary-text dark:text-secondary-text-dark text-sm
  disabled:text-primary-text disabled:dark:text-secondary-text-dark
  enabled:hover:text-primary-bg enabled:hover:dark:text-primary-bg-dark
  enabled:hover:bg-primary-bg-dark enabled:hover:dark:bg-primary-bg
`;

const classes = `px-3 py-2 ${borderClasses} ${textClasses}`;

type ButtonType = "button" | "submit";

interface ButtonProps extends Partial<HtmxAttributes> {
  label: string;
  disabled?: boolean;
  id?: string;
  type?: ButtonType;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { disabled, id, label, type } = props;

  const attrs = {
    ...(!!id ? { id } : {}),
    ...(!!disabled ? { disabled } : {}),
  };

  const hxAttrs = getHxAttrsFromProps(props);

  return (
    <button class={classes} type={type ?? "button"} {...attrs} {...hxAttrs}>
      {label}
    </button>
  );
};

export default Button;
