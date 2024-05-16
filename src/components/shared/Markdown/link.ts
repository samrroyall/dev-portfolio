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

  const titleAttr = !!title ? `title="${title}"` : "";

  const imgClasses = "max-h-[300px] w-auto rounded";

  const image = `<img class="${imgClasses}" src="${cleanHref}" alt="${text}" ${titleAttr} />`;

  const descriptionClasses =
    "my-1 text-secondary-text dark:text-secondary-text-dark text-xs";

  const description = !!text
    ? `<div class="${descriptionClasses}">${text}</div>`
    : "";

  return `<div class="my-4 mx-auto flex flex-col items-center">${image}${description}</div>`;
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

  const textClasses = "text-secondary-text dark:text-secondary-text-dark";
  const hoverTextClasses =
    "hover:text-secondary-text hover:dark:text-secondary-text-dark";

  const displayText = `<span class="${textClasses}">${text}</span>`;

  const anchor = `<a class="underline" href="${cleanHref}" target="_blank" ${titleAttr}>${displayText}</a>`;

  return `<span class="${hoverTextClasses}">${anchor}</span>`;
};

export { image, link };
