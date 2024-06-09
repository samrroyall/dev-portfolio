import { type DefaultPageProps } from "../../models/components";

const htmlClasses = `
  text-primary-text dark:text-primary-text-dark text-sm bg-primary-bg 
  dark:bg-primary-bg-dark 
`;

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
        "error-text": "var(--error-text)",
        "strava-orange": "var(--strava-orange)",
        "strava-orange-light": "var(--strava-orange-light)",
      },
    },
  },
};

const resizeContentFunc = `
  function resizeOps() {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

  resizeOps();
  window.addEventListener("resize", resizeOps);
`;

interface BaseHtmlProps extends DefaultPageProps {
  children: Html.Children;
  title?: string;
}

const BaseHtml = ({ children, theme, title }: BaseHtmlProps): JSX.Element => {
  const mode = theme.value === "dark" ? "dark" : "";

  return (
    <html class={`${htmlClasses} ${mode}`}>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Sam Royall's personal software engineering portfolio"
        />
        <meta
          name="keywords"
          content="Sam Royall, Software Engineer, Portfolio, Minimalist"
        />
        <meta name="author" content="Sam Royall" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1"
        />
        <title>{`Sam Royall${title ? ` — ${title}` : ""}`}</title>
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
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/public/icons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/public/icons/android-chrome-512x512.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/icons/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/public/icons/favicon.ico" />
        <link rel="manifest" href="/public/icons/site.webmanifest" />
      </head>
      <script>{resizeContentFunc}</script>
      <body>{children}</body>
    </html>
  );
};

export default BaseHtml;
