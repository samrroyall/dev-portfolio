import { type PropsWithChildren } from "beth-stack/jsx";

const leftClasses = "right-0";

const centerClasses = "left-1/2 -translate-x-1/2";

const rightClasses = "left-0";

const aboveClasses = "bottom-[1.5rem]";

const belowClasses = "top-[1.5rem]";

const positionClasses = "absolute hidden group-hover:inline-block";

type HorizontalAlign = "left" | "center" | "right";

type VerticalAlign = "above" | "below";

interface TooltipProps {
  text: string;
  rounded?: boolean;
  horizontal?: HorizontalAlign;
  vertical?: VerticalAlign;
}

const styleClasses =
  "text-xs text-secondary-text rounded border bg-primary-bg p-1 select-none";

const Tooltip = ({
  text,
  children,
  horizontal,
  vertical,
}: TooltipProps & PropsWithChildren) => {
  const horizontalClasses =
    horizontal === "left"
      ? leftClasses
      : horizontal === "right"
        ? rightClasses
        : centerClasses;

  const verticalClasses = vertical === "below" ? belowClasses : aboveClasses;

  const alignmentClasses = `${horizontalClasses} ${verticalClasses}`;

  return (
    <div class="group relative">
      <div class={`${positionClasses} ${styleClasses} ${alignmentClasses}`}>
        {text}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
