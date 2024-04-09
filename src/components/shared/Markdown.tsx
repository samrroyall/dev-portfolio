import { marked } from "marked";

// Block Renderers:
// - code(string code, string infostring, boolean escaped)
// - blockquote(string quote)
// - html(string html, boolean block)
// - heading(string text, number level, string raw)
// - list(string body, boolean ordered, number start)
// - listitem(string text, boolean task, boolean checked)
// - checkbox(boolean checked)
// - table(string header, string body)
// - tablerow(string content)
// - tablecell(string content, object flags)

const hr = (): string => `<hr class="my-6 mx-3 border-secondary-bg"  />`;

const paragraph = (text: string): string => `<p class="my-3">${text}</p>`;

// Remaining Inline Renderers:
// - br()
// - del(string text)
// - image(string href, string title, string text)
// - text(string text)

const strong = (text: string): string =>
  `<span class="font-semibold text-secondary-text">${text}</span>`;

const em = (text: string): string => `<span class="italic">${text}</span>`;

const codespan = (code: string): string => {
  const codeClasses = "font-sauce-code-pro text-secondary-text";

  return `<code class="${codeClasses}">${code}</code>`;
};

const link = (href: string, title?: string | null, text: string): string => {
  const textClasses = "underline text-secondary-text";
  const displayText = `<span class="${textClasses}">${text}</span>`;

  return `<a href=${href} target="_blank">${displayText}</a>`;
};

const renderer = {
  // block renderers
  hr,
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
