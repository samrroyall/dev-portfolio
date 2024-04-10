import { marked } from "marked";

// Block Renderers:
// - html(string html, boolean block)
// - heading(string text, number level, string raw)
// - checkbox(boolean checked)
// - table(string header, string body)
// - tablerow(string content)
// - tablecell(string content, object flags)

const escapeTest = /[&<>"']/;

const escapeReplace = new RegExp(escapeTest.source, "g");

const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;

const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");

const escapeReplacements: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const getEscapeReplacement = (ch: string) => escapeReplacements[ch];

const escape = (html: string, encode?: boolean) => {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
};

const code = (code: string, infostring: string, escaped: boolean): string => {
  const lang = (infostring || "").match(/^\S*/)?.[0];

  const cleanedCode = `${code.replace(/\n$/, "")}\n`;

  const langClass = lang ? `language-${escape(lang)}` : "";
  const fontClasses = "font-sauce-code-pro bg-code-bg text-secondary-text";
  const classes = `p-6 rounded ${fontClasses} ${langClass}`;

  const inner = escaped ? cleanedCode : escape(cleanedCode, true);

  return `<pre class="flex justify-center"><code class="${classes}">${inner}</code></pre>`;
};

const blockquote = (quote: string): string => {
  const classes = "italic pl-2 border-l-2 border-secondary-text";

  return `<blockquote class="${classes}">${quote}</blockquote>`;
};

const hr = (): string => `<hr class="my-6 mx-3 border-secondary-bg" />`;

const list = (body: string, ordered: boolean, start: number): string => {
  const tag = ordered ? "ol" : "ul";
  const classes = `${ordered ? "list-decimal" : "list-disc"} ml-6`;
  const startAttr = ordered && start !== 1 ? `start="${start}"` : "";

  return `<${tag} class="${classes}" ${startAttr}>${body}</${tag}>`;
};

const listitem = (text: string, task: boolean, checked: boolean): string =>
  `<li class="[&>p:first-child]:my-0">${text}</li>`;

const paragraph = (text: string): string =>
  `<p class="${text ? "my-3" : ""}">${text}</p>`;

// Remaining Inline Renderers:
// - br()
// - del(string text)
// - image(string href, string title, string text)
// - text(string text)

const strong = (text: string): string =>
  `<span class="font-semibold text-secondary-text">${text}</span>`;

const em = (text: string): string => `<span class="italic">${text}</span>`;

const codespan = (code: string): string => {
  const classes = "font-sauce-code-pro text-secondary-text";

  return `<code class="${classes}">${code}</code>`;
};

const link = (href: string, title?: string | null, text: string): string => {
  const textClasses = "underline text-secondary-text";
  const displayText = `<span class="${textClasses}">${text}</span>`;

  return `<a href=${href} target="_blank">${displayText}</a>`;
};

const renderer = {
  // block renderers
  blockquote,
  code,
  hr,
  list,
  listitem,
  paragraph,
  // inline renderers
  strong,
  em,
  codespan,
  link,
};

const md = marked.use({ renderer });

interface MarkdownProps {
  text: string;
}

const Markdown = ({ text }: MarkdownProps) => <div>{md.parse(text)}</div>;

export default Markdown;
