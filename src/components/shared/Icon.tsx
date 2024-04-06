import Link, { type LinkTarget } from "./Link";

interface IconProps {
  icon: string;
  link?: string;
  linkTarget?: LinkTarget;
  className?: string;
}

const Icon = ({ icon, link, linkTarget, className }: IconProps) => (
  <span class={`font-symbols text-secondary-text select-none ${className}`}>
    {link ? (
      <Link href={link} noUnderline={true} target={linkTarget || "_blank"}>
        <span>{icon}</span>
      </Link>
    ) : (
      icon
    )}
  </span>
);

export default Icon;
