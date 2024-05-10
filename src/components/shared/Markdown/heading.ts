const round = (num: number): string =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");

const em = (px: number, base: number): string => `${round(px / base)}em`;

interface HeadingStyle {
  fontSize?: string;
  fontWeight: string;
  marginTop: string;
  marginBottom: string;
  lineHeight: string;
}

const headings: HeadingStyle[] = [
  {
    fontSize: em(22, 14),
    fontWeight: "700",
    marginTop: "0",
    marginBottom: em(20, 30),
    lineHeight: round(36 / 30),
  },
  {
    fontSize: em(20, 14),
    fontWeight: "600",
    marginTop: em(32, 20),
    marginBottom: em(12, 20),
    lineHeight: round(28 / 20),
  },
  {
    fontSize: em(18, 14),
    fontWeight: "500",
    marginTop: em(28, 18),
    marginBottom: em(8, 18),
    lineHeight: round(28 / 18),
  },
  {
    fontWeight: "500",
    marginTop: em(20, 14),
    marginBottom: em(8, 14),
    lineHeight: round(20 / 14),
  },
];

const heading = (text: string, level: number, raw: string): string => {
  const style = headings[level - 1];

  const marginClasses = style
    ? `mt-[${style.marginTop}] mb-[${style.marginBottom}]`
    : "";

  const fontSizeClass = style?.fontSize ? `text-[${style.fontSize}]` : "";

  const fontClasses = style
    ? `${fontSizeClass} font-[${style.fontWeight}]`
    : "";

  const classes = style
    ? `${marginClasses} ${fontClasses} leading-[${style.lineHeight}]`
    : "";

  const tag = `h${level}`;

  return `<${tag} class="text-secondary-text ${classes}">${text}</${tag}>`;
};

export default heading;
