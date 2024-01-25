import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import BaseHtml from "../components/BaseHtml";

const app = new Elysia()
    .use(html())
    .get("/", () => {
        return (
            <BaseHtml>
                <body class="flex w-full h-screen justify-center items-center">
                    <h1>Hello World</h1>
                </body>
            </BaseHtml>
        );
    })
    .listen(3000);

console.log(
    `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
