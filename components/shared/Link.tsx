import type { PropsWithChildren } from "beth-stack/jsx";

interface LinkProps {
  href: string;
  arrow?: boolean;
};

const arrowSymbol = (
  <span class="symbols-font ml-1">\udb80\udc5c</span>
);

const Link = ({href, arrow, children}: LinkProps & PropsWithChildren) => (
  <div>
    <a class="underline" href={href}>
      {children}
    </a>
    {arrow === true ? arrowSymbol : null}
  </div>
);

export default Link;
