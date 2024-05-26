import { randomBytes } from "crypto";
import {
  Admin,
  AdminLogin,
  Blog,
  BlogPost,
  Contact,
  CreateBlogPost,
  CreateHomeSection,
  Home,
  Interests,
  NotFound,
} from "./components/pages";
import CreateNewHomeSectionEntry from "./components/pages/CreateHomeSection/CreateHomeSectionEntry";
import CreateHomeSectionEntrySubtitle from "./components/pages/CreateHomeSection/CreateHomeSectionEntrySubtitle";
import { type HandlerContext } from "./models/handlers";
import {
  type AuthenticateSchema,
  type BlogPostSchema,
  type ContactSchema,
  type LoginSchema,
  type NewHomeSectionEntrySubtitleSchema,
  type SendEmailSchema,
  type ToggleThemeSchema,
} from "./models/routes";
import { createNewSession, isAdmin, sendEmail, verifyRecaptcha } from "./utils";
import { createNewHomeSection } from "./utils/homesections";

export const authenticateHandler = async ({
  body,
  set,
  db,
  cookie: { session },
}: HandlerContext<AuthenticateSchema>) => {
  set.status = 303;

  try {
    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/login?success=false&error=recaptcha";
    } else if (!(await isAdmin(body.username, body.password))) {
      set.headers.location = "/login?success=false&error=unauthenticated";
    } else {
      await createNewSession(db, session);

      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while authenticating: ${JSON.stringify(err)}`,
    );

    set.headers.location = `/login?success=false&error=unknown`;
  }
};

export const adminHandler = async ({
  cookie: { theme },
  blog,
  home,
}: HandlerContext) => Admin({ blogData: blog, homeData: home, theme });

export const blogHandler = async ({
  cookie: { theme },
  blog,
}: HandlerContext) => Blog({ data: blog, theme });

export const blogPostHandler = async ({
  cookie: { theme },
  blogPost,
  params: { slug },
}: HandlerContext<BlogPostSchema>) =>
  BlogPost({ data: blogPost.get(slug), theme });

export const contactHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<ContactSchema>) => (
  <Contact success={success} error={error} theme={theme} />
);

export const createBlogPostHandler = ({
  cookie: { theme },
}: HandlerContext) => <CreateBlogPost theme={theme} />;

export const createHomeSectionHandler = ({
  cookie: { theme },
}: HandlerContext) => <CreateHomeSection theme={theme} />;

export const insertHomeSectionHandler = async ({
  body,
  db,
  set,
}: HandlerContext) => {
  set.status = 303;

  try {
    await createNewHomeSection(db, body);

    set.headers.location = "/admin?success=true";
  } catch (err) {
    console.error(
      `Unexpected error encountered while creating contact message: ${err}`,
    );

    set.headers.location = "/admin/home/new?error=unknown";
  }
};

export const newHomeSectionEntryHandler = () => {
  const id = randomBytes(8).toString("hex");

  return <CreateNewHomeSectionEntry id={id} />;
};

export const newHomeSectionEntrySubtitleHandler = ({
  query: { entryId },
}: HandlerContext<NewHomeSectionEntrySubtitleSchema>) => {
  const id = randomBytes(8).toString("hex");

  return <CreateHomeSectionEntrySubtitle id={id} entryId={entryId} />;
};

export const homeHandler = async ({
  cookie: { theme },
  home,
}: HandlerContext) => Home({ data: home, theme });

export const interestsHandler = async ({
  cookie: { theme },
  interests,
}: HandlerContext) => Interests({ data: interests, theme });

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
  if (theme.value === "dark") {
    theme.value = "light";
  } else {
    theme.value = "dark";
  }

  return "";
};
