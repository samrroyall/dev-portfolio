import Link, { type LinkTarget } from "./Link";

interface IconProps {
  icon: string;
  link?: string;
  linkTarget?: LinkTarget;
  className?: string;
}

const Icon = ({ icon, link, linkTarget, className }: IconProps) => {
  const iconSpan = (
    <span class={`font-symbols select-none ${className}`}>{icon}</span>
  );

  return link ? (
    <Link href={link} noUnderline={true} target={linkTarget || "_blank"}>
      {iconSpan}
    </Link>
  ) : (
    iconSpan
  );
};

export default Icon;
