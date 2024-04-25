import { link } from "./link";

const codespan = (code: string): string => {
  const textClasses = "text-[90%] font-sauce-code-pro text-secondary-text";

  const bgClasses = "py-[2px] px-[4px] rounded bg-secondary-bg";

  return `<code class="${bgClasses} ${textClasses}">${code}</code>`;
};

const em = (text: string): string => `<span class="italic">${text}</span>`;

const strong = (text: string): string =>
  `<span class="font-semibold text-secondary-text">${text}</span>`;

export default {
  codespan,
  em,
  link,
  strong,
};
