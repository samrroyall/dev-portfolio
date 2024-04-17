import { type PropsWithChildren } from "beth-stack/jsx";

const hoverClasses = "hover:border-tertiary-text hover:text-tertiary-text ";

const buttonClasses =
  "text-secondary-text border-secondary-text rounded border px-3 py-2 text-sm";

type ButtonType = "button" | "submit";

interface ButtonProps {
  type: ButtonType;
}

const Button = ({ type, children }: ButtonProps & PropsWithChildren) => (
  <button class={`${buttonClasses} ${hoverClasses}`} type={type}>
    {children}
  </button>
);

export default Button;
