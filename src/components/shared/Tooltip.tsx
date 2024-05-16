const leftClasses = "right-0";

const centerClasses = "left-1/2 -translate-x-1/2";

const rightClasses = "left-0";

const aboveClasses = "bottom-[1.5rem]";

const belowClasses = "top-[1.5rem]";

const positionClasses = "absolute hidden group-hover:inline-block";

const textClasses = "text-xs text-secondary-text dark:text-secondary-text-dark";

const bgClasses = "bg-primary-bg dark:bg-primary-bg-dark";

const styleClasses = `rounded border p-1 select-none ${bgClasses} ${textClasses}`;

type HorizontalAlign = "left" | "center" | "right";

type VerticalAlign = "above" | "below";

interface TooltipProps {
  children: Html.Children;
  text: string;
  rounded?: boolean;
  horizontal?: HorizontalAlign;
  vertical?: VerticalAlign;
}

const Tooltip = ({
  children,
  text,
  horizontal,
  vertical,
}: TooltipProps): JSX.Element => {
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
