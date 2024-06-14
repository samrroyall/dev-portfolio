import Prism from "prismjs";
import loadLanguages from "prismjs/components/";

const builtInLanguages = ["clike", "css", "html", "js", "markup"];

const languages: Record<string, string> = {
  bash: "Bash",
  clike: "C",
  clojure: "Clojure",
  cpp: "C++",
  css: "CSS",
  cypher: "Cypher",
  docker: "Docker",
  elm: "Elm",
  elixir: "Elixir",
  erlang: "Erlang",
  go: "Go",
  graphql: "GraphQL",
  haskell: "Haskell",
  html: "HTML",
  java: "Java",
  js: "JavaScript",
  json: "Json",
  jsx: "JSX",
  latex: "LaTeX",
  log: "Log File",
  markup: "Markup",
  markdown: "Markdown",
  mongodb: "MongoDB",
  nix: "Nix",
  ocaml: "OCaml",
  python: "Python",
  regex: "Regex",
  rust: "Rust",
  scala: "Scala",
  swift: "Swift",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  yaml: "YAML",
  zig: "Zig",
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
  code = code.replace(/    /g, "\t");
  code = code.replace(/  /g, "\t");

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
    "bg-code-bg dark:bg-code-bg-dark font-geist-mono max-sm:text-xs text-sm";

  const prePositioningClasses = `relative my-6 p-3 ${lang ? "pt-7" : ""} rounded`;

  const preClasses = `${prePositioningClasses} ${preStyleClasses} ${langClass}`;

  const codeClasses = `block whitespace-pre-wrap`;

  return `<pre class="${preClasses}">${langLine}<code class="${codeClasses}">${code}</code></pre>`;
};

export default code;
