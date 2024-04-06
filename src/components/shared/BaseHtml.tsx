import { type PropsWithChildren } from "beth-stack/jsx";

/** @type {import('tailwindcss').Config} */
const theme = {
  theme: {
    extend: {
      colors: {
        "primary-bg": "rgb(9 9 11)",
        "secondary-bg": "rgb(39 39 42)",
        "primary-text": "rgb(168 162 158)",
        "secondary-text": "white",
      },
      fontFamily: {
        symbols: "SymbolsNerdFont",
        "sauce-code-pro": "SauceCodePro",
      },
    },
  },
};

const BaseHtml = ({ children }: PropsWithChildren) => (
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sam Royall</title>
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script>{` 
        tailwind.config = ${JSON.stringify(theme)}
      `}</script>
      <script src="https://unpkg.com/htmx.org@1.9.11"></script>
      <link rel="stylesheet" type="text/css" href="/public/global.css" />
    </head>
    <body class="bg-primary-bg text-primary-text text-sm">{children}</body>
  </html>
);

export default BaseHtml;
