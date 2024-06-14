export type LinkTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | "_unfencedTop";

interface LinkProps {
  children: Html.Children;
  href: string;
  arrow?: boolean;
  id?: string;
  noUnderline?: boolean;
  target?: LinkTarget;
}

const Link = ({
  arrow,
  href,
  id,
  noUnderline,
  target,
  children,
}: LinkProps): JSX.Element => (
  <span class="text-secondary-text dark:text-secondary-text-dark">
    <a
      id={id}
      class={noUnderline === true ? "" : "underline"}
      href={href}
      target={target ?? "_blank"}
    >
      {children}
    </a>
    {arrow === true ? <span class="select-none">{" \u2197"}</span> : null}
  </span>
);

export default Link;
