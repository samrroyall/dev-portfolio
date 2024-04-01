import type { PropsWithChildren } from "beth-stack/jsx";

import Icon from "./Icon";

interface LinkProps {
  href: string;
  arrow?: boolean;
};

const arrowIcon = (
  <span class="text-xs">
    <Icon className="ml-1" icon={"\udb80\udc5c"} />
  </span>
);

const Link = ({href, arrow, children}: LinkProps & PropsWithChildren) => (
  <span>
    <a class="underline" href={href}>
      {children}
    </a>
    {arrow === true ? arrowIcon : null}
  </span>
);

export default Link;
