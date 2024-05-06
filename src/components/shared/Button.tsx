import { type PropsWithChildren } from "beth-stack/jsx";

const hoverClasses =
  "hover:border-tertiary-text hover:bg-tertiary-text hover:text-tertiary-bg";

const buttonClasses =
  "text-secondary-text border-secondary-text rounded border px-3 py-2 text-sm";

const disabledClasses =
  "disabled:text-primary-text disabled:border-primary-text disabled:bg-primary-bg";

type ButtonType = "button" | "submit";

interface ButtonProps {
  disabled?: boolean;
  id?: string;
  type?: ButtonType;
}

const Button = ({
  children,
  disabled,
  id,
  type,
}: ButtonProps & PropsWithChildren) => {
  const attrs = {
    ...(!!disabled ? { disabled } : {}),
    ...(!!id ? { id } : {}),
  };

  return (
    <button
      class={`${buttonClasses} ${hoverClasses} ${disabledClasses}`}
      type={type || "button"}
      {...attrs}
    >
      {children}
    </button>
  );
};

export default Button;
