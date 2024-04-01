interface IconProps {
  icon: string;
  link?: string;
  className?: string;
}

const Icon = ({icon, link, className}: IconProps) => (
  <span class={`symbols text-white ${className}`}>
    {link ? <a href={link}>{icon}</a> : icon}
  </span>
);

export default Icon;
