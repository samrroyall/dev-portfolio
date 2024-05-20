const secondaryText = "text-secondary-text dark:text-secondary-text-dark";

const hClasses = [
  `text-4xl font-black ${secondaryText}`,
  `text-3xl font-black ${secondaryText}`,
  `text-2xl font-bold ${secondaryText}`,
  `text-xl font-bold ${secondaryText}`,
  `text-lg font-bold`,
  `text-lg font-semibold`,
];

interface HeadingProps {
  text: string;
  variant: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  inline?: boolean;
}

const Heading = ({ text, variant, className, inline }: HeadingProps) => {
  const display = inline === true ? "inline-block" : "block";
  const classes = `${display} ${hClasses[variant - 1]} ${className ?? ""}`;

  switch (variant) {
    case 1:
      return <h1 class={classes}>{text}</h1>;
    case 2:
      return <h2 class={classes}>{text}</h2>;
    case 3:
      return <h3 class={classes}>{text}</h3>;
    case 4:
      return <h4 class={classes}>{text}</h4>;
    case 5:
      return <h5 class={classes}>{text}</h5>;
    case 6:
      return <h6 class={classes}>{text}</h6>;
  }
};

export default Heading;
