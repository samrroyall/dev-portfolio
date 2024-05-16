const borderClasses =
  "border-secondary-text dark:border-secondary-text-dark rounded border";

const textClasses = "text-secondary-text dark:text-secondary-text-dark text-sm";

const hoverBgClasses =
  "hover:bg-tertiary-text hover:dark:bg-tertiary-text-dark";

const hoverBorderClasses =
  "hover:border-tertiary-text hover:dark:border-tertiary-text-dark";

const hoverTextClasses =
  "hover:text-primary-bg hover:dark:text-primary-bg-dark";

const hoverClasses = `${hoverBgClasses} ${hoverBorderClasses} ${hoverTextClasses}`;

const disabledTextClasses =
  "disabled:text-primary-text disabled:dark:text-primary-text-dark";

const disabledBorderClasses =
  "disabled:border-primary-text disabled:dark:border-primary-text-dark";

const disabledBgClasses =
  "disabled:bg-primary-bg disabled:dark:bg-primary-bg-dark";

const disabledClasses = `${disabledTextClasses} ${disabledBgClasses} ${disabledBorderClasses}`;

const classes = `px-3 py-2 ${borderClasses} ${textClasses} ${hoverClasses} ${disabledClasses}`;

type ButtonType = "button" | "submit";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  id?: string;
  type?: ButtonType;
}

const Button = ({ disabled, id, label, type }: ButtonProps): JSX.Element => {
  const attrs = {
    ...(!!disabled ? { disabled } : {}),
    ...(!!id ? { id } : {}),
  };

  return (
    <button class={classes} type={type ?? "button"} {...attrs}>
      {label}
    </button>
  );
};

export default Button;
