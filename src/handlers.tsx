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
import ModifyBlogPost from "./components/pages/ModifyBlogPost/ModifyBlogPost";
import {
  BlogPostPreview,
  HomeSectionEntryInput,
  HomeSectionEntrySubtitleInput,
} from "./components/shared";
import { getSpotifyData, getStravaData } from "./data/api/interests";
import { type HandlerContext } from "./models/handlers";
import {
  type AuthenticateSchema,
  type BlogPostPageSchema,
  type ContactPageSchema,
  type CreateBlogPostPageSchema,
  type CreateBlogPostSchema,
  type CreateHomeSectionPageSchema,
  type DeleteBlogPostSchema,
  type DeleteHomeSectionEntrySchema,
  type DeleteHomeSectionSchema,
  type LoginPageSchema,
  type ModifyBlogPostPageSchema,
  type ModifyBlogPostSchema,
  type ModifyHomeSectionPageSchema,
  type ModifyHomeSectionSchema,
  type NewHomeSectionEntrySubtitleSchema,
  type PreviewBlogPostSchema,
  type SendEmailSchema,
  type ToggleThemeSchema,
} from "./models/routes";
import {
  createBlogPost,
  createHomeSection,
  createNewSession,
  deleteBlogPost,
  deleteHomeSection,
  deleteHomeSectionEntry,
  getBlogPost,
  getBlogPostBySlug,
  getBlogPosts,
  getHomeSection,
  getHomeSections,
  isAdmin,
  modifyBlogPost,
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
  try {
    set.status = 303;

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
  db,
}: HandlerContext) =>
  Admin({ blogData: getBlogPosts(db), homeData: getHomeSections(db), theme });

export const blogPageHandler = async ({
  cookie: { theme },
  db,
}: HandlerContext) => Blog({ data: getBlogPosts(db), theme });

export const blogPostPageHandler = async ({
  cookie: { theme },
  db,
  params: { slug },
}: HandlerContext<BlogPostPageSchema>) =>
  BlogPost({ data: getBlogPostBySlug(db, slug), theme });

export const contactPageHandler = ({
  cookie: { theme },
  query: { error, success },
}: HandlerContext<ContactPageSchema>) => (
  <Contact error={error} success={success} theme={theme} />
);

export const createBlogPostHandler = async ({
  db,
  body,
  set,
}: HandlerContext<CreateBlogPostSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = "/admin/blog/new?success=false&error=recaptcha";
    } else {
      await createBlogPost(db, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while creating new blog post: ${err}`,
    );

    set.headers.location = "/admin/blog/new?success=false&error=unknown";
  }
};

export const createBlogPostPageHandler = ({
  cookie: { theme },
  query: { error, success },
}: HandlerContext<CreateBlogPostPageSchema>) => (
  <CreateBlogPost error={error} success={success} theme={theme} />
);

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
  try {
    set.status = 303;

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

export const deleteBlogPostHandler = async ({
  db,
  params: { id },
  set,
}: HandlerContext<DeleteBlogPostSchema>) => {
  try {
    await deleteBlogPost(db, id);
  } catch (err) {
    console.error(
      `Unexpected error encountered while deleting blog post: ${err}`,
    );

    set.status = 500;
    return JSON.stringify(err);
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
      `Unexpected error encountered while deleting home section: ${err}`,
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
      `Unexpected error encountered while deleting home section entry: ${err}`,
    );

    set.status = 500;
    return JSON.stringify(err);
  }
};

export const modifyBlogPostPageHandler = async ({
  cookie: { theme },
  db,
  params: { id },
  query: { success, error },
}: HandlerContext<ModifyBlogPostPageSchema>) =>
  ModifyBlogPost({ data: getBlogPost(db, id), error, success, theme });

export const modifyBlogPostHandler = async ({
  body,
  db,
  params: { id },
  set,
}: HandlerContext<ModifyBlogPostSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = `/admin/blog/${id}?success=false&error=recaptcha`;
    } else {
      await modifyBlogPost(db, id, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while modifying blog post: ${err}`,
    );

    set.headers.location = `/admin/blog/${id}?success=false&error=unknown`;
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
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      set.headers.location = `/admin/home/${id}?success=false&error=recaptcha`;
    } else {
      await modifyHomeSection(db, id, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    console.error(
      `Unexpected error encountered while modifying home section: ${err}`,
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
  db,
}: HandlerContext) => Home({ data: getHomeSections(db), theme });

export const interestsPageHandler = async ({
  cookie: { theme },
}: HandlerContext) =>
  Interests({ spotify: getSpotifyData(), strava: getStravaData(), theme });

export const loginPageHandler = ({
  cookie: { theme },
  query: { success, error },
}: HandlerContext<LoginPageSchema>) => (
  <AdminLogin success={success} error={error} theme={theme} />
);

export const notFoundPageHandler = ({ cookie: { theme } }: HandlerContext) => (
  <NotFound theme={theme} />
);

export const previewBlogPostHandler = ({
  body,
}: HandlerContext<PreviewBlogPostSchema>) => <BlogPostPreview post={body} />;

export const sendEmailHandler = async ({
  body,
  set,
}: HandlerContext<SendEmailSchema>) => {
  try {
    set.status = 303;

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
