import { type PropsWithChildren } from "beth-stack/jsx";

interface TooltipProps {
  text: string;
  rounded?: boolean;
}

const positionClasses =
  "absolute bottom-[1.5rem] left-1/2 hidden -translate-x-1/2 group-hover:inline-block";

const styleClasses =
  "text-xs text-secondary-text rounded border bg-primary-bg p-1";

const Tooltip = ({ text, children }: TooltipProps & PropsWithChildren) => (
  <div class="group relative">
    <div class={`${positionClasses} ${styleClasses}`}>{text}</div>
    {children}
  </div>
);

export default Tooltip;
