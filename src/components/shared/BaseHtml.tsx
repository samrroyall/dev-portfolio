import { type PropsWithChildren } from "beth-stack/jsx";
import "dotenv/config";

/** @type {import('tailwindcss').Config} */
const theme = {
  theme: {
    extend: {
      colors: {
        "primary-bg": "var(--primary-bg)",
        "secondary-bg": "var(--secondary-bg)",
        "tertiary-bg": "var(--tertiary-bg)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "tertiary-text": "var(--tertiary-text)",
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
      <script type="text/javascript" src="https://cdn.tailwindcss.com" />
      <script
        async
        type="text/javascript"
      >{`tailwind.config = ${JSON.stringify(theme)}`}</script>
      <script
        type="text/javascript"
        src="https://unpkg.com/htmx.org@1.9.12"
        integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
        crossorigin="anonymous"
      />
      <script
        type="text/javascript"
        src="https://www.google.com/recaptcha/api.js"
      />
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      />
      <script async type="text/javascript">
        {`emailjs.init("${process.env.EMAILJS_PUBLIC_KEY}")`}
      </script>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js"
        integrity="sha384-hIoBPJpTUs74ddyc4bFZSM1TVlQDA60VBbJS0oA934VSz82sBx1X7kSx2ATBDIyd"
        crossorigin="anonymous"
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
    <body class="bg-primary-bg text-primary-text source-sans-3 text-base font-normal">
      {children}
    </body>
  </html>
);

export default BaseHtml;
