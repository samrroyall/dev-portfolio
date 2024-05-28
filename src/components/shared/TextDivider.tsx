const borderClasses = "border-secondary-bg dark:border-secondary-bg-dark";

interface TextDividerProps {
  className?: string;
}

const TextDivider = ({ className }: TextDividerProps): JSX.Element => (
  <hr
    class={`my-6 group-last/blogsection:hidden ${borderClasses} ${className ?? ""}`}
  />
);

export default TextDivider;
