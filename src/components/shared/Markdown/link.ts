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

  const imgClasses = "max-h-[300px] w-auto rounded";

  const image = `<img class="${imgClasses}" src="${cleanHref}" alt="${text}" />`;

  const descriptionClasses =
    "my-1 text-secondary-text dark:text-secondary-text-dark text-xs";

  const imageTitle = !!title ? `<span class="font-bold">${title}: </span>` : "";

  const description = text
    ? `<div class="${descriptionClasses}">${imageTitle}${text}</div>`
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

  const textClasses =
    "text-secondary-text dark:text-secondary-text-dark underline";

  const anchor = `<a href="${cleanHref}" target="_blank" ${titleAttr}>${text}</a>`;

  return `<span class="${textClasses}">${anchor}</span>`;
};

export { image, link };
