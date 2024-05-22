import { type DefaultPageProps } from "../../models/routes";

const bgClasses = `bg-primary-bg dark:bg-none dark:bg-primary-bg-dark`;

const textClasses =
  "text-primary-text dark:text-primary-text-dark text-sm 2xl:text-xs";

const twTheme = {
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
        "tertiary-bg": "var(--tertiary-bg)",
        "code-bg": "var(--code-bg)",
        "primary-bg-dark": "var(--primary-bg-dark)",
        "secondary-bg-dark": "var(--secondary-bg-dark)",
        "tertiary-bg-dark": "var(--tertiary-bg-dark)",
        "code-bg-dark": "var(--code-bg-dark)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "tertiary-text": "var(--tertiary-text)",
        "primary-text-dark": "var(--primary-text-dark)",
        "secondary-text-dark": "var(--secondary-text-dark)",
        "tertiary-text-dark": "var(--tertiary-text-dark)",
        "code-text": "var(--code-text)",
        "strava-orange": "var(--strava-orange)",
        "strava-orange-light": "var(--strava-orange-light)",
      },
    },
  },
};

interface BaseHtmlProps extends DefaultPageProps {
  children: Html.Children;
  title?: String;
}

const BaseHtml = ({ children, theme, title }: BaseHtmlProps): JSX.Element => {
  const mode = theme.value === "dark" ? "dark" : "";

  return (
    <html
      class={`h-screen w-screen overflow-hidden ${bgClasses} ${textClasses} ${mode}`}
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ?? "Sam Royall"}</title>
        <script type="text/javascript" src="https://cdn.tailwindcss.com" />
        <script
          async
          type="text/javascript"
        >{`tailwind.config = ${JSON.stringify(twTheme)}`}</script>
        <script
          type="text/javascript"
          src="https://unpkg.com/htmx.org@1.9.12"
          integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
          crossorigin="anonymous"
        />
        <script
          type="text/javascript"
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"
          integrity="sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd"
          crossorigin="anonymous"
          async
          defer
        />

        <link rel="stylesheet" type="text/css" href="/public/global.css" />
        <link rel="stylesheet" type="text/css" href="/public/prism.css" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
          integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
          crossorigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default BaseHtml;
