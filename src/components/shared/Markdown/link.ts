const cleanUrl = (href: string): string | null => {
  let cleanHref: string;

  try {
    cleanHref = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }

  return cleanHref;
};

const image = (
  href: string,
  title: string | null,
  text: string,
): string | false => {
  const cleanHref = cleanUrl(href);

  if (cleanHref === null) {
    return text;
  }

  const titleAttr = title ? `title="${title}"` : "";

  const classes = "my-4 mx-auto";

  return `<img class="${classes}" src="${cleanHref}" alt="${text}" ${titleAttr} />`;
};

const link = (
  href: string,
  title: string | null | undefined,
  text: string,
): string => {
  const cleanHref = cleanUrl(href);

  if (cleanHref === null) {
    return text;
  }

  const titleAttr = title ? `title="${title}"` : "";
  const textClasses = "underline text-secondary-text";
  const displayText = `<span class="${textClasses}">${text}</span>`;

  return `<a href=${cleanHref} target="_blank" ${titleAttr}>${displayText}</a>`;
};

export { image, link };
