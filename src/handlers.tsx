import { type Context, type DecoratorBase, type RouteSchema } from "elysia";
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
import {
  type AuthSchema,
  type BlogPostSchema,
  type ContactSchema,
  type LoginSchema,
  type SendSchema,
} from "./models/routes";
import { type Store } from "./models/store";
import { isAdmin, sendEmail, verifyRecaptcha } from "./utils";

interface HandlerContext<Schema extends RouteSchema = RouteSchema>
  extends Context<Schema> {
  store: DecoratorBase["store"] & Store;
}

export const authHandler = async ({
  body,
  set,
}: HandlerContext<AuthSchema>) => {
  set.status = 303;

  try {
    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/login?success=false&error=recaptcha";
    } else if (!(await isAdmin(body.username, body.password))) {
      set.headers.location = "/login?success=false&error=unauthenticated";
    } else {
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(`Unexpected error encountered while authenticating: ${err}`);

    set.headers.location = "/login?success=false&error=unknown";
  }
};

export const adminHandler = (_: HandlerContext) => <Admin />;

export const blogHandler = ({ store }: HandlerContext) => (
  <Blog data={store.blog} />
);

export const blogPostHandler = ({
  store,
  params: { id },
}: HandlerContext<BlogPostSchema>) => (
  <BlogPost data={store.blogPost.get(id)} />
);

export const contactHandler = ({
  query: { success, error },
}: HandlerContext<ContactSchema>) => (
  <Contact success={success} error={error} />
);

export const homeHandler = ({ store }: HandlerContext) => (
  <Home data={store.home} />
);

export const interestsHandler = ({ store }: HandlerContext) => (
  <Interests data={store.interests} />
);

export const loginHandler = ({
  query: { success, error },
}: HandlerContext<LoginSchema>) => (
  <AdminLogin success={success} error={error} />
);

export const notFoundHandler = (_: HandlerContext) => <NotFound />;

export const sendHandler = async ({
  body,
  set,
}: HandlerContext<SendSchema>) => {
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
