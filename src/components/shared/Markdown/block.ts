import code from "./code";
import heading from "./heading";
import { image } from "./link";

const blockquote = (quote: string): string => {
  const bgClasses =
    "my-4 pl-2 border-l-2 bg-tertiary-bg border-primary-text rounded-tr rounded-br";
  const textClasses = "italic text-secondary-text";

  return `<blockquote class="${bgClasses} ${textClasses}">${quote}</blockquote>`;
};

const checkbox = (checked: boolean): string => {
  const checkedAttr = checked ? "checked" : "";
  const classes = "-ml-4 mr-2 h-[0.65rem]";

  return `<input class="${classes}" type="checkbox" disabled ${checkedAttr} />`;
};

const hr = (): string => `<hr class="my-6 mx-3 border-secondary-bg" />`;

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

const listitem = (text: string, task: boolean, checked: boolean): string => {
  const checkboxClasses = task ? "list-none" : "";

  return `<li class="[&>p:first-child]:my-0 ${checkboxClasses}">${text}</li>`;
};

const paragraph = (text: string): string =>
  `<p class="${text ? "my-3" : ""}">${text}</p>`;

const table = (header: string, body: string): string => {
  const headerClasses = "bg-tertiary-bg text-secondary-text font-semibold";
  const headerString = `<thead class="${headerClasses}">${header}</thead>`;

  const bodyString = `<tbody>${body}</tbody>`;

  return `<table class="my-4 mx-auto">${headerString}${bodyString}</table>`;
};

const tablerow = (content: string): string => `<tr>${content}</tr>`;

interface TablecellOptions {
  header: boolean;
  align: "center" | "left" | "right" | null;
}

const tablecell = (content: string, flags: TablecellOptions) => {
  const tag = flags.header ? "th" : "td";
  const align = flags.align ? "" : `align=${flags.align}`;

  return `<${tag} ${align} class="p-3 border border-secondary-bg">${content}</${tag}>`;
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
