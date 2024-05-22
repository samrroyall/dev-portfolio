const borderClasses = `
  border-secondary-text dark:border-secondary-text-dark rounded border
  disabled:border-primary-text disabled:dark:border-primary-text-dark
`;

const textClasses = `
  text-secondary-text dark:text-secondary-text-dark text-sm
  disabled:text-primary-text disabled:dark:text-sdiabled:econdary-text-dark
  enabled:hover:text-primary-bg enabled:hover:dark:text-primary-bg-dark
  enabled:hover:bg-primary-bg-dark enabled:hover:dark:bg-primary-bg
`;

const classes = `px-3 py-2 ${borderClasses} ${textClasses}`;

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
