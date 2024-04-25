import Prism from "prismjs";
import loadLanguages from "prismjs/components/";

const builtInLanguages = ["clike", "css", "html", "js", "markup"];

const languages: Record<string, string> = {
  clike: "C",
  cpp: "C++",
  css: "CSS",
  html: "HTML",
  js: "JavaScript",
  markup: "Markup",
  python: "Python",
  rust: "Rust",
  ts: "TypeScript",
};

loadLanguages(
  Object.keys(languages).filter((lang) => !builtInLanguages.includes(lang)),
);

const code = (
  code: string,
  infostring: string | undefined,
  escaped: boolean,
): string | false => {
  const lang = (infostring || "").match(/^\S*/)?.[0];

  code = code.replace(/\n$/, "");
  code =
    lang && languages[lang]
      ? Prism.highlight(code, Prism.languages[lang]!, lang)
      : code;

  const prettyLang =
    lang && languages[lang]
      ? languages[lang]
      : `<span class="capitalize">${lang}</span>` || "";

  const langLine = lang
    ? `<div class="text-right text-xs">${prettyLang}</div>`
    : "";

  const langClass = lang ? `language-${lang}` : "";
  const preClasses = `my-4 flex flex-col bg-tertiary-bg ${langClass}`;
  const codeClasses = `pt-3 font-sauce-code-pro text-sm ${langClass}`;

  return `<pre class="${preClasses}">${langLine}<code class="${codeClasses}">${code}</code></pre>`;
};

export default code;
