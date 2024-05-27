import "dotenv/config";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import db from "./db";
import { cookieSchema } from "./models/routes";
import { adminRoutes, publicRoutes } from "./routes";
import { getStoreData } from "./store";
import { validateSession } from "./utils";

if (!process.env.COOKIE_SECRET) {
  throw new Error("No value provided for COOKIE_SECRET");
}

const app = new Elysia({
  cookie: {
    secrets: process.env.COOKIE_SECRET,
    sign: ["session"],
  },
  normalize: true,
})
  .use(staticPlugin())
  .use(html())
  .use(db)
  .derive(({ db }) => getStoreData(db))
  .onError(({ code, error, redirect }) => {
    if (code === "NOT_FOUND") {
      return redirect("/404");
    } else {
      return new Response(`${code}: ${JSON.stringify(error)}`);
    }
  })
  .guard(
    {
      ...cookieSchema,
      beforeHandle: async ({ cookie: { session }, db, redirect }) => {
        if (!(await validateSession(db, session.value))) {
          return redirect("/");
        }
      },
    },
    (app) => app.use(adminRoutes),
  )
  .use(publicRoutes)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
