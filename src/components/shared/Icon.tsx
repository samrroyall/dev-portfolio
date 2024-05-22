import Link, { type LinkTarget } from "./Link";

const colorClasses = "text-secondary-text dark:text-secondary-text-dark";

interface IconProps {
  icon: string;
  link?: string;
  linkTarget?: LinkTarget;
  className?: string;
}

const Icon = ({
  icon,
  link,
  linkTarget,
  className,
}: IconProps): JSX.Element => {
  const iconSpan = (
    <span class={`font-symbols select-none ${colorClasses} ${className ?? ""}`}>
      {icon}
    </span>
  );

  return link ? (
    <Link href={link} noUnderline={true} target={linkTarget ?? "_blank"}>
      {iconSpan}
    </Link>
  ) : (
    iconSpan
  );
};

export default Icon;
