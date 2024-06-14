import { randomBytes } from "crypto";

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

  const id = randomBytes(8).toString("hex");

  const toggleModalFunc = `document.getElementById('${id}-modal').classList.toggle('hidden');`;

  const closeModalIconClasses =
    "text-secondary-text dark:text-secondary-text-dark text-2xl sm:text-3xl absolute right-6 top-4 font-symbols";

  const closeModalIcon = `<button type="button" class="${closeModalIconClasses}" onclick="${toggleModalFunc}">\udb80\udd56</button>`;

  const modalImg = `<img class="relative cursor-pointer" src="${cleanHref}" alt="${text}" onclick="${toggleModalFunc}" />`;

  const modalClasses =
    "fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur hidden p-4";

  const modal = `<div id="${id}-modal" class="${modalClasses}">${closeModalIcon}${modalImg}</div>`;

  const imgClasses = "max-h-[300px] w-auto rounded cursor-pointer";

  const image = `<img id="${id}" class="${imgClasses}" src="${cleanHref}" alt="${text}" onclick="${toggleModalFunc}" />`;

  const descriptionClasses =
    "my-1 text-secondary-text dark:text-secondary-text-dark text-xs";

  const imageTitle = !!title ? `<span class="font-bold">${title}: </span>` : "";

  const description = text
    ? `<div class="${descriptionClasses}">${imageTitle}${text}</div>`
    : "";

  return `<div class="my-4 mx-auto flex flex-col items-center">${modal}${image}${description}</div>`;
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

  const anchor = `<a href="${cleanHref}" target="_blank" class="cursor-pointer" ${titleAttr}>${text}</a>`;

  return `<span class="${textClasses}">${anchor}</span>`;
};

export { image, link };
