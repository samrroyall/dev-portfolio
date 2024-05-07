import { type Context, type DecoratorBase, type RouteSchema } from "elysia";
import {
  Admin,
  AdminLogin,
  Blog,
  BlogPost,
  Contact,
  Home,
  Interests,
} from "./components/pages";
import {
  type AuthSchema,
  type BlogPostSchema,
  type ContactSchema,
  type LoginSchema,
  type SendSchema,
} from "./schemas";
import { type Store } from "./store";
import { isAdmin, sendEmail, verifyRecaptcha } from "./utils";

interface HtmlDecorator {
  html: <A extends JSX.Element, B extends Promise<Request>>(a: () => A) => B;
}

type HandlerContext<T extends RouteSchema = RouteSchema> = Context<
  T,
  {
    request: DecoratorBase["request"] & HtmlDecorator;
    store: DecoratorBase["store"] & Store;
    derive: DecoratorBase["derive"];
    resolve: DecoratorBase["resolve"];
  }
>;

export const adminHandler = ({ html }: HandlerContext) => html(() => <Admin />);

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

export const blogHandler = ({ html, store }: HandlerContext) =>
  html(() => <Blog data={store.blog} />);

export const blogPostHandler = ({
  html,
  store,
  params: { id },
}: HandlerContext<BlogPostSchema>) =>
  html(() => <BlogPost data={store.blogPost.get(id)} />);

export const contactHandler = ({
  html,
  query: { success, error },
}: HandlerContext<ContactSchema>) =>
  html(() => <Contact success={success} error={error} />);

export const homeHandler = ({ html, store }: HandlerContext) =>
  html(() => <Home data={store.home} />);

export const interestsHandler = ({ html, store }: HandlerContext) =>
  html(() => <Interests data={store.interests} />);

export const loginHandler = ({
  html,
  query: { success, error },
}: HandlerContext<LoginSchema>) =>
  html(() => <AdminLogin success={success} error={error} />);

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
        body.name || "Anonymous",
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
