import {
  highlight as prismHighlight,
  languages as prismLanguages,
  type Grammar as PrismGrammar,
} from "prismjs";
import loadLanguages from "prismjs/components/";

// import "prismjs/themes/prism.css";
// import "prismjs/themes/prism-twilight.css";
// import "prismjs/components/prism-cpp";

loadLanguages(["cpp", "js"]);

interface LanguageInfo {
  display: string;
  prism: PrismGrammar;
}

const languages: Record<string, LanguageInfo> = {
  cpp: {
    display: "C++",
    prism: prismLanguages.cpp!,
  },
  js: {
    display: "JS",
    prism: prismLanguages.js!,
  },
};

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

const getEscapeReplacement = (ch: string): string | undefined =>
  escapeReplacements[ch];

const escape = (html: string, encode?: boolean): string => {
  if (encode && escapeTest.test(html)) {
    return html.replace(escapeReplace, getEscapeReplacement);
  } else if (!encode && escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
};

export const code = (
  code: string,
  infostring: string | undefined,
  escaped: boolean,
): string | false => {
  const lang = (infostring || "").match(/^\S*/)?.[0];
  const langInfo = lang ? languages[lang] : null;

  const cleanedCode = code.replace(/\n$/, "");
  const inner = escaped ? cleanedCode : escape(cleanedCode, true);
  const highlightedCode =
    lang && langInfo ? prismHighlight(inner, langInfo.prism, lang) : inner;

  const langClass = lang ? `language-${escape(lang)}` : "";
  const codeClasses = `p-3 font-sauce-code-pro text-secondary-text font-light ${langClass}`;
  const codeString = `<code class="${codeClasses}">${highlightedCode}</code>`;

  const prettyLang = lang && langInfo ? langInfo.display : lang;
  const langString = lang
    ? `<span class="self-end text-xs font-light">${prettyLang}</span>`
    : "";

  const preClasses = "my-4 p-1 w-full flex flex-col bg-tertiary-bg";

  return `<pre class="${preClasses}">${langString}${codeString}</pre>`;
};
