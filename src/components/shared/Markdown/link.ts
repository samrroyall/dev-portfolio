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
  const description = !!text
    ? `<div class="my-1 text-secondary-text text-xs">${text}</div>`
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
  const displayText = `<span class="text-secondary-text">${text}</span>`;
  const anchor = `<a class="underline" href=${cleanHref} target="_blank" ${titleAttr}>${displayText}</a>`;

  return `<span class="hover:text-secondary-text">${anchor}</span>`;
};

export { image, link };
