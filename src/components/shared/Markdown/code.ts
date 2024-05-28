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
  _escaped: boolean,
): string | false => {
  const lang = (infostring || "").match(/^\S*/)?.[0];

  code = code.replace(/\n$/, "");

  code =
    lang && !!languages[lang]
      ? Prism.highlight(code, Prism.languages[lang], lang)
      : code;

  const prettyLang = !!lang
    ? !!languages[lang]
      ? languages[lang]
      : `<span class="capitalize">${lang}</span>`
    : "";

  const langLine = !!lang
    ? `<div class="absolute top-3 right-3 text-xs">${prettyLang}</div>`
    : "";

  const defaultLangStyles = "text-code-text";

  const langClass =
    lang && !!languages[lang] ? `language-${lang}` : defaultLangStyles;

  const preStyleClasses =
    "bg-code-bg dark:bg-code-bg-dark font-geist-mono text-sm";

  const prePositioningClasses = `relative my-6 p-3 ${lang ? "pt-7" : ""} rounded`;

  const preClasses = `${prePositioningClasses} ${preStyleClasses} ${langClass}`;

  const codeClasses = `block whitespace-pre-wrap`;

  return `<pre class="${preClasses}">${langLine}<code class="${codeClasses}">${code}</code></pre>`;
};

export default code;
