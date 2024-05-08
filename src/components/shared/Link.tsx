import { type PropsWithChildren } from "beth-stack/jsx";

export type LinkTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | "_unfencedTop";

interface LinkProps {
  href: string;
  arrow?: boolean;
  noUnderline?: boolean;
  target?: LinkTarget;
}

const Link = ({
  href,
  arrow,
  noUnderline,
  target,
  children,
}: LinkProps & PropsWithChildren) => (
  <span class="hover:text-secondary-text">
    <a
      class={noUnderline === true ? "" : "underline"}
      href={href}
      target={target ?? "_blank"}
    >
      {children}
    </a>
    {arrow === true ? (
      <span class="font-symbols select-none font-normal">
        {" \udb80\udc5c"}
      </span>
    ) : null}
  </span>
);

export default Link;
