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
    lang && !!languages[lang]
      ? Prism.highlight(code, Prism.languages[lang]!, lang)
      : code;

  const prettyLang = !!lang
    ? !!languages[lang]
      ? languages[lang]
      : `<span class="capitalize">${lang}</span>`
    : "";

  const langLine = !!lang
    ? `<div class="absolute top-3 right-3 text-xs">${prettyLang}</div>`
    : "";

  const defaultLangStyles = "text-secondary-text";

  const langClass =
    lang && !!languages[lang] ? `language-${lang}` : defaultLangStyles;

  const preClasses = `relative my-6 p-3 ${lang ? "pt-7" : ""} bg-tertiary-bg rounded ${langClass}`;

  const codeClasses = `block whitespace-pre-wrap font-sauce-code-pro text-xs`;

  return `<pre class="${preClasses}">${langLine}<code class="${codeClasses}">${code}</code></pre>`;
};

export default code;
