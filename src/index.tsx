import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import Home from "../components/pages/Home";

const app = new Elysia()
  .use(staticPlugin())
	.use(html())
	.get("/", () => <Home />)
	.listen(3030);

console.log(
	`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
