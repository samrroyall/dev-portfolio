import code from "./code";
import heading from "./heading";
import { image } from "./link";

const blockquote = (quote: string): string => {
  const borderClasses = "border-secondary-bg dark:border-secondary-bg-dark";

  const bgClasses = "my-6 px-2 border-l-4 rounded-tr rounded-br";

  const textClasses =
    "italic text-secondary-text dark:text-secondary-text-dark";

  return `<blockquote class="${bgClasses} ${borderClasses} ${textClasses}">${quote}</blockquote>`;
};

const checkbox = (checked: boolean): string => {
  const checkedAttr = checked ? "checked" : "";

  const classes = "-ml-4 mr-2 h-[0.65rem]";

  return `<input class="${classes}" type="checkbox" disabled ${checkedAttr} />`;
};

const hr = (): string =>
  `<hr class="my-6 mx-3 border-secondary-bg dark:border-secondary-bg-dark" />`;

const list = (
  body: string,
  ordered: boolean,
  start: number | "",
): string | false => {
  const tag = ordered ? "ol" : "ul";
  const classes = `${ordered ? "list-decimal" : "list-disc"} ml-6`;
  const startAttr = ordered && start !== 1 ? `start="${start}"` : "";

  return `<${tag} class="${classes}" ${startAttr}>${body}</${tag}>`;
};

const listitem = (text: string, task: boolean, _checked: boolean): string => {
  const checkboxClasses = task ? "list-none" : "";

  return `<li class="[&>p:first-child]:my-0 ${checkboxClasses}">${text}</li>`;
};

const paragraph = (text: string): string =>
  `<p class="${!!text ? "my-3 leading-6 text-pretty" : ""}">${text}</p>`;

const table = (header: string, body: string): string => {
  const headerTextClasses =
    "text-secondary-text dark:text-secondary-text-dark font-semibold";

  const headerBgClasses = "bg-tertiary-bg dark:bg-tertiary-bg-dark";

  const headerClasses = `${headerBgClasses} ${headerTextClasses}`;

  const headerString = `<thead class="${headerClasses}">${header}</thead>`;

  const bodyString = `<tbody>${body}</tbody>`;

  const tableClasses = "my-6 mx-auto table-auto";

  return `<table class="${tableClasses}">${headerString}${bodyString}</table>`;
};

const tablerow = (content: string): string => `<tr>${content}</tr>`;

interface TablecellOptions {
  header: boolean;
  align: "center" | "left" | "right" | null;
}

const tablecell = (content: string, flags: TablecellOptions) => {
  const tag = flags.header ? "th" : "td";
  const align = flags.align ? "" : `align=${flags.align}`;

  const classes =
    "p-3 border border-secondary-bg dark:border-secondary-bg-dark";

  return `<${tag} ${align} class="${classes}">${content}</${tag}>`;
};

export default {
  blockquote,
  checkbox,
  code,
  heading,
  hr,
  image,
  list,
  listitem,
  paragraph,
  table,
  tablerow,
  tablecell,
};
