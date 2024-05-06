import { bethStack } from "beth-stack/elysia";
import { Elysia, t } from "elysia";
import {
  Admin,
  AdminLogin,
  Blog,
  BlogPost,
  Contact,
  Home,
  Interests,
  NotFound,
} from "./components/pages";
import { getMockBlogData, getMockBlogPostData } from "./data/mocks/blog";
import { getMockHomeData } from "./data/mocks/home";
import { getMockSpotifyData, getMockStravaData } from "./data/mocks/interests";
import { isAdmin, sendEmail, verifyRecaptcha } from "./utils";

const before = new Elysia()
  .use(bethStack())
  .onError(({ html, code }) => {
    if (code === "NOT_FOUND") {
      return html(() => <NotFound />);
    }
  })
  .post(
    "/authenticate",
    async ({ body, set }) => {
      if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
        set.status = 400;
        return "Captcha Verification Failed";
      } else if (!(await isAdmin(body.username, body.password))) {
        set.status = 401;
        return "Unauthenticated";
      } else {
        return "Success";
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
        "g-recaptcha-response": t.String(),
      }),
    },
  )
  .post(
    "/send",
    async ({ body, set }) => {
      if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
        set.status = 400;
        return "Captcha Verification Failed";
      } else {
        const { status, text } = await sendEmail(
          body.name || "Anonymous",
          body.email,
          body.body,
        );

        set.status = status;
        return text;
      }
    },
    {
      body: t.Object({
        name: t.Union([t.String(), t.Undefined()]),
        email: t.String(),
        body: t.String(),
        "g-recaptcha-response": t.String(),
      }),
    },
  );

const publicRoutes = new Elysia().group("", (app) =>
  app
    .use(bethStack())
    .state({
      home: getMockHomeData(),
      interests: {
        letterboxd: null,
        spotify: getMockSpotifyData(),
        strava: getMockStravaData(),
      },
      blog: getMockBlogData(),
      blogPost: {
        get: (id: number) => getMockBlogPostData(id),
      },
    })
    .get("/", ({ html, store }) => html(() => <Home data={store.home} />))
    .get("/interests", ({ html, store }) =>
      html(() => <Interests data={store.interests} />),
    )
    .get("/blog", ({ html, store }) => html(() => <Blog data={store.blog} />))
    .get(
      "/blog/post/:id",
      ({ html, store, params: { id } }) =>
        html(() => <BlogPost data={store.blogPost.get(id)} />),
      {
        params: t.Object({
          id: t.Numeric(),
        }),
      },
    )
    .get("/contact", ({ html }) => html(() => <Contact />))
    .get("/login", ({ html }) => html(() => <AdminLogin />)),
);

const adminRoutes = new Elysia().group("/admin", (app) =>
  app.use(bethStack()).get("", ({ html }) => html(() => <Admin />)),
);

export default new Elysia().use(before).use(publicRoutes).use(adminRoutes);
