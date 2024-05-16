import { randomBytes } from "crypto";
import { type Context, type RouteSchema } from "elysia";
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
import { sessions } from "./models/db";
import {
  type AuthenticateSchema,
  type BlogPostSchema,
  type ContactSchema,
  type CookieSchema,
  type LoginSchema,
  type SendEmailSchema,
  type ToggleThemeSchema,
} from "./models/routes";
import { type Store } from "./models/store";
import { isAdmin, sendEmail, verifyRecaptcha } from "./utils";

interface StoreSchema {
  store: Store;
}

type HandlerContext<Schema extends RouteSchema = RouteSchema> = Context<
  Schema & CookieSchema
> &
  StoreSchema;

export const authenticateHandler = async ({
  body,
  cookie: { session },
  set,
  store: { db },
}: HandlerContext<AuthenticateSchema>) => {
  set.status = 303;

  try {
    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/login?success=false&error=recaptcha";
    } else if (!(await isAdmin(body.username, body.password))) {
      set.headers.location = "/login?success=false&error=unauthenticated";
    } else {
      const sessionId = randomBytes(16).toString("hex");
      const expiry = new Date(Date.now() + 24 * 3600 * 1000);

      await db.sessions.insert(sessions).values({ sessionId, expiry });

      session.set({
        value: {
          sessionId: sessionId,
        },
        expires: expiry,
        httpOnly: true,
      });

      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(`Unexpected error encountered while authenticating: ${err}`);

    set.headers.location = "/login?success=false&error=unknown";
  }
};

export const adminHandler = ({ cookie: { theme } }: HandlerContext) => (
  <Admin theme={theme} />
);

export const blogHandler = async ({
  cookie: { theme },
  store,
}: HandlerContext) => Blog({ data: store.blog, theme });

export const blogPostHandler = async ({
  cookie: { theme },
  store,
  params: { id },
}: HandlerContext<BlogPostSchema>) =>
  BlogPost({ data: store.blogPost.get(id), theme });

export const contactHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<ContactSchema>) => (
  <Contact success={success} error={error} theme={theme} />
);

export const homeHandler = async ({
  cookie: { theme },
  store,
}: HandlerContext) => Home({ data: store.home, theme });

export const interestsHandler = async ({
  cookie: { theme },
  store,
}: HandlerContext) => Interests({ data: store.interests, theme });

export const loginHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<LoginSchema>) => (
  <AdminLogin success={success} error={error} theme={theme} />
);

export const notFoundHandler = ({ cookie: { theme } }: HandlerContext) => (
  <NotFound theme={theme} />
);

export const sendEmailHandler = async ({
  body,
  set,
}: HandlerContext<SendEmailSchema>) => {
  set.status = 303;

  try {
    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/contact?success=false&error=recaptcha";
    } else {
      const { status, text } = await sendEmail(
        body.name ?? "Anonymous",
        body.email,
        body.body,
      );

      if (status === 200) {
        set.headers.location = "/contact?success=true";
      } else {
        console.error(`Failed to send contact message: ${status} '${text}'`);

        set.headers.location = "/contact?success=false&error=unknown";
      }
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while sending contact message: ${err}`,
    );

    set.headers.location = "/contact?success=false&error=unknown";
  }
};

export const toggleThemeHandler = ({
  cookie: { theme },
}: HandlerContext<ToggleThemeSchema>) => {
  if (!theme.value || !["dark", "light"].includes(theme.value)) {
    theme.value = "dark";
  } else {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  return "";
};
