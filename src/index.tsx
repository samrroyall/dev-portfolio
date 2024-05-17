import "dotenv/config";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import db from "./db";
import { adminRoutes, publicRoutes } from "./routes";
import store from "./store";
import { validateSession } from "./utils";

if (!process.env.COOKIE_SECRET) {
  throw new Error("No value provided for COOKIE_SECRET");
}

const app = new Elysia({
  cookie: {
    secrets: process.env.COOKIE_SECRET,
    sign: ["session"],
  },
})
  .use(staticPlugin())
  .use(html())
  .use(db)
  .use(store)
  .onError(({ code, error, redirect }) => {
    if (code === "NOT_FOUND") {
      return redirect("/404");
    } else {
      return new Response(`${code}: ${error}`);
    }
  })
  .guard((app) =>
    app
      .onBeforeHandle(async ({ db, redirect, cookie: { session } }) => {
        console.log(JSON.stringify(session));

        console.log("Current session value: ", {
          value: session.value,
          exp: session.expires,
        });

        const authenticated = await validateSession(db, session);

        console.log(
          `User authentication ${authenticated ? "successful" : "failed"}.`,
        );

        if (!authenticated) {
          return redirect("/");
        }
      })
      .use(adminRoutes),
  )
  .use(publicRoutes)
  .listen(3000);

console.log(
  `Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
