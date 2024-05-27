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
  ModifyHomeSection,
  NotFound,
} from "./components/pages";
import {
  HomeSectionEntryInput,
  HomeSectionEntrySubtitleInput,
} from "./components/shared";
import { type HandlerContext } from "./models/handlers";
import {
  NewHomeSectionEntrySubtitleSchema,
  type AuthenticateSchema,
  type BlogPostPageSchema,
  type ContactPageSchema,
  type CreateHomeSectionPageSchema,
  type DeleteHomeSectionEntrySchema,
  type DeleteHomeSectionSchema,
  type LoginPageSchema,
  type ModifyHomeSectionPageSchema,
  type ModifyHomeSectionSchema,
  type SendEmailSchema,
  type ToggleThemeSchema,
} from "./models/routes";
import {
  createHomeSection,
  createNewSession,
  deleteHomeSection,
  deleteHomeSectionEntry,
  getHomeSection,
  isAdmin,
  modifyHomeSection,
  sendEmail,
  verifyRecaptcha,
} from "./utils";

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

export const adminPageHandler = async ({
  cookie: { theme },
  blog,
  home,
}: HandlerContext) => Admin({ blogData: blog, homeData: home, theme });

export const blogPageHandler = async ({
  cookie: { theme },
  blog,
}: HandlerContext) => Blog({ data: blog, theme });

export const blogPostPageHandler = async ({
  cookie: { theme },
  blogPost,
  params: { slug },
}: HandlerContext<BlogPostPageSchema>) =>
  BlogPost({ data: blogPost.get(slug), theme });

export const contactPageHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<ContactPageSchema>) => (
  <Contact success={success} error={error} theme={theme} />
);

export const createBlogPostPageHandler = ({
  cookie: { theme },
}: HandlerContext) => <CreateBlogPost theme={theme} />;

export const createHomeSectionPageHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<CreateHomeSectionPageSchema>) => (
  <CreateHomeSection error={error} success={success} theme={theme} />
);

export const createHomeSectionHandler = async ({
  body,
  db,
  set,
}: HandlerContext) => {
  set.status = 303;

  try {
    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/admin/home/new?success=false&error=recaptcha";
    } else {
      await createHomeSection(db, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while creating new home section: ${err}`,
    );

    set.headers.location = "/admin/home/new?success=false&error=unknown";
  }
};

export const deleteHomeSectionHandler = async ({
  db,
  params: { id },
  set,
}: HandlerContext<DeleteHomeSectionSchema>) => {
  try {
    await deleteHomeSection(db, id);
  } catch (err) {
    console.error(
      `Unexpected error encountered while deleting the home section: ${err}`,
    );

    set.status = 500;
    return JSON.stringify(err);
  }
};

export const deleteHomeSectionEntryHandler = async ({
  db,
  params: { id },
  set,
}: HandlerContext<DeleteHomeSectionEntrySchema>) => {
  try {
    await deleteHomeSectionEntry(db, id);
  } catch (err) {
    console.error(
      `Unexpected error encountered while deleting the home section entry: ${err}`,
    );

    set.status = 500;
    return JSON.stringify(err);
  }
};

export const modifyHomeSectionPageHandler = async ({
  db,
  cookie: { theme },
  params: { id },
  query: { success, error },
}: HandlerContext<ModifyHomeSectionPageSchema>) =>
  ModifyHomeSection({ data: getHomeSection(db, id), error, success, theme });

export const modifyHomeSectionHandler = async ({
  db,
  body,
  params: { id },
  set,
}: HandlerContext<ModifyHomeSectionSchema>) => {
  set.status = 303;

  try {
    console.log(body);

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = `/admin/home/${id}?success=false&error=recaptcha`;
    } else {
      await modifyHomeSection(db, id, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while modifying new home section: ${err}`,
    );

    set.headers.location = `/admin/home/${id}?success=false&error=unknown`;
  }
};

export const newHomeSectionEntryHandler = () => {
  const id = randomBytes(8).toString("hex");

  return <HomeSectionEntryInput id={id} />;
};

export const newHomeSectionEntrySubtitleHandler = ({
  query: { entryId },
}: HandlerContext<NewHomeSectionEntrySubtitleSchema>) => {
  const id = randomBytes(8).toString("hex");

  return <HomeSectionEntrySubtitleInput id={id} entryId={entryId} />;
};

export const homePageHandler = async ({
  cookie: { theme },
  home,
}: HandlerContext) => Home({ data: home, theme });

export const interestsPageHandler = async ({
  cookie: { theme },
  interests,
}: HandlerContext) => Interests({ data: interests, theme });

export const loginPageHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<LoginPageSchema>) => (
  <AdminLogin success={success} error={error} theme={theme} />
);

export const notFoundPageHandler = ({ cookie: { theme } }: HandlerContext) => (
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
