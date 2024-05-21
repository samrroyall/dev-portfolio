import { link } from "./link";

const codespan = (code: string): string => {
  const textClasses =
    "text-[90%] font-geist-mono text-secondary-text dark:text-secondary-text-dark";

  const bgClasses = "rounded bg-secondary-bg dark:bg-secondary-bg-dark";

  return `<code class="py-[2px] px-[4px] ${bgClasses} ${textClasses}">${code}</code>`;
};

const em = (text: string): string => `<span class="italic">${text}</span>`;

const strong = (text: string): string =>
  `<span class="font-semibold text-secondary-text dark:text-secondary-text-dark">${text}</span>`;

export default {
  codespan,
  em,
  link,
  strong,
};
