import "dotenv/config";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { cookieSchema } from "./models/routes";
import { adminRoutes, db, publicRoutes, sentry } from "./plugins";
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
  .use(sentry)
  .use(db)
  .onError(({ code, error, logger, redirect }) => {
    if (code === "NOT_FOUND") {
      return redirect("/404");
    } else {
      logger.error(`Received HTTP Status ${code}`, error);
      return new Response(`${code}: ${JSON.stringify(error)}`);
    }
  })
  .guard(
    {
      ...cookieSchema,
      beforeHandle: async ({ cookie: { session }, db, logger, redirect }) => {
        const authenticated = await validateSession(db, session.value);

        if (!authenticated) {
          logger.warn(
            `User could not be authenticated via session cookie: ${session.value}`,
          );

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
