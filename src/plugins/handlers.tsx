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
  ModifyBlogPost,
  ModifyHomeSection,
  NotFound,
} from "../components/pages";
import {
  BlogPostPreview,
  HomeSectionEntryInput,
  HomeSectionEntrySubtitleInput,
} from "../components/shared";
import { getSpotifyData, getStravaData } from "../data/api/interests";
import { type HandlerContext } from "../models/handlers";
import {
  type AuthenticateSchema,
  type BlogPostPageSchema,
  type ContactPageSchema,
  type CreateBlogPostPageSchema,
  type CreateBlogPostSchema,
  type CreateHomeSectionPageSchema,
  type CreateHomeSectionSchema,
  type DeleteBlogPostSchema,
  type DeleteHomeSectionEntrySchema,
  type DeleteHomeSectionSchema,
  type InterestsPageSchema,
  type LoginPageSchema,
  type ModifyBlogPostPageSchema,
  type ModifyBlogPostSchema,
  type ModifyHomeSectionPageSchema,
  type ModifyHomeSectionSchema,
  type PreviewBlogPostSchema,
  type SendEmailSchema,
  type ToggleThemeSchema,
} from "../models/routes";
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
} from "../utils";

export const authenticateHandler = async ({
  body,
  cookie: { session },
  db,
  logger,
  set,
}: HandlerContext<AuthenticateSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = "/login?success=false&error=recaptcha";
    } else if (!(await isAdmin(body.username, body.password))) {
      logger.info("User authenticated failed.");
      set.headers.location = "/login?success=false&error=unauthenticated";
    } else {
      logger.info("User successfully authenticated as admin.");
      await createNewSession(db, session);
      set.headers.location = "/admin";
    }
  } catch (err) {
    logger.error("Unexpected error encountered while authenticating.", err);
    set.headers.location = `/login?success=false&error=unknown`;
  }
};

export const adminPageHandler = async ({
  cookie: { theme },
  db,
  logger,
}: HandlerContext) => {
  try {
    return await Admin({
      blogData: getBlogPosts(db),
      homeData: getHomeSections(db),
      theme,
    });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving data for admin page.",
      err,
    );
  }
};

export const blogPageHandler = async ({
  cookie: { theme },
  db,
  logger,
}: HandlerContext) => {
  try {
    return await Blog({ data: getBlogPosts(db), theme });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving blog data.",
      err,
    );
  }
};

export const blogPostPageHandler = async ({
  cookie: { theme },
  db,
  logger,
  params: { slug },
}: HandlerContext<BlogPostPageSchema>) => {
  try {
    return await BlogPost({ data: getBlogPostBySlug(db, slug), theme });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving blog post data.",
      err,
    );
  }
};

export const contactPageHandler = ({
  cookie: { theme },
  query: { error, success },
}: HandlerContext<ContactPageSchema>) => (
  <Contact error={error} success={success} theme={theme} />
);

export const createBlogPostHandler = async ({
  body,
  db,
  logger,
  set,
}: HandlerContext<CreateBlogPostSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = "/admin/blog/new?success=false&error=recaptcha";
    } else {
      logger.debug("Recaptcha verification successful.");
      await createBlogPost(db, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    logger.error(
      "Unexpected error encountered while creating new blog post.",
      err,
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
  logger,
  set,
}: HandlerContext<CreateHomeSectionSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = "/admin/home/new?success=false&error=recaptcha";
    } else {
      logger.debug("Recaptcha verification successful.");
      await createHomeSection(db, JSON.parse(body.jsonData));
      set.headers.location = "/admin";
    }
  } catch (err) {
    logger.error(
      "Unexpected error encountered while creating new home section.",
      err,
    );
    set.headers.location = "/admin/home/new?success=false&error=unknown";
  }
};

export const deleteBlogPostHandler = async ({
  db,
  logger,
  params: { id },
  set,
}: HandlerContext<DeleteBlogPostSchema>) => {
  try {
    await deleteBlogPost(db, id);
  } catch (err) {
    logger.error("Unexpected error encountered while deleting blog post.", err);
    set.status = 500;
    return JSON.stringify(err);
  }
};

export const deleteHomeSectionHandler = async ({
  db,
  logger,
  params: { id },
  set,
}: HandlerContext<DeleteHomeSectionSchema>) => {
  try {
    await deleteHomeSection(db, id);
  } catch (err) {
    logger.error(
      "Unexpected error encountered while deleting home section.",
      err,
    );
    set.status = 500;
    return JSON.stringify(err);
  }
};

export const deleteHomeSectionEntryHandler = async ({
  db,
  logger,
  params: { id },
  set,
}: HandlerContext<DeleteHomeSectionEntrySchema>) => {
  try {
    await deleteHomeSectionEntry(db, id);
  } catch (err) {
    logger.error(
      "Unexpected error encountered while deleting home section entry.",
      err,
    );
    set.status = 500;
    return JSON.stringify(err);
  }
};

export const modifyBlogPostPageHandler = async ({
  cookie: { theme },
  db,
  logger,
  params: { id },
  query: { success, error },
}: HandlerContext<ModifyBlogPostPageSchema>) => {
  try {
    return await ModifyBlogPost({
      data: getBlogPost(db, id),
      error,
      success,
      theme,
    });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving blog post data to modify.",
      err,
    );
  }
};

export const modifyBlogPostHandler = async ({
  body,
  db,
  logger,
  params: { id },
  set,
}: HandlerContext<ModifyBlogPostSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = `/admin/blog/${id}?success=false&error=recaptcha`;
    } else {
      logger.debug("Recaptcha verification successful.");
      await modifyBlogPost(db, id, body);
      set.headers.location = "/admin";
    }
  } catch (err) {
    logger.error(
      "Unexpected error encountered while modifying blog post.",
      err,
    );
    set.headers.location = `/admin/blog/${id}?success=false&error=unknown`;
  }
};

export const modifyHomeSectionPageHandler = async ({
  cookie: { theme },
  db,
  logger,
  params: { id },
  query: { success, error },
}: HandlerContext<ModifyHomeSectionPageSchema>) => {
  try {
    return await ModifyHomeSection({
      data: getHomeSection(db, id),
      error,
      success,
      theme,
    });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving home section data to modify.",
      err,
    );
  }
};

export const modifyHomeSectionHandler = async ({
  db,
  body,
  logger,
  params: { id },
  set,
}: HandlerContext<ModifyHomeSectionSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = `/admin/home/${id}?success=false&error=recaptcha`;
    } else {
      logger.debug("Recaptcha verification successful.");
      await modifyHomeSection(db, id, JSON.parse(body.jsonData));
      set.headers.location = "/admin";
    }
  } catch (err) {
    logger.error(
      "Unexpected error encountered while modifying home section.",
      err,
    );
    set.headers.location = `/admin/home/${id}?success=false&error=unknown`;
  }
};

export const newHomeSectionEntryHandler = () => <HomeSectionEntryInput />;

export const newHomeSectionEntrySubtitleHandler = () => (
  <HomeSectionEntrySubtitleInput />
);

export const homePageHandler = async ({
  cookie: { theme },
  db,
  logger,
}: HandlerContext) => {
  try {
    return await Home({ data: getHomeSections(db), theme });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving home section data.",
      err,
    );
  }
};

export const interestsPageHandler = async ({
  cookie: { theme },
  logger,
  query: { offset },
}: HandlerContext<InterestsPageSchema>) => {
  try {
    console.log(`offset: ${offset}`);

    return await Interests({
      offset,
      spotifyData: getSpotifyData(),
      stravaData: getStravaData(),
      theme,
    });
  } catch (err) {
    logger.error(
      "Unexpected error encountered while retrieving interests data",
      err,
    );

    return await Interests({
      offset,
      spotifyData: Promise.resolve(null),
      stravaData: Promise.resolve(null),
      theme,
    });
  }
};

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
  logger,
  set,
}: HandlerContext<SendEmailSchema>) => {
  try {
    set.status = 303;

    if (!(await verifyRecaptcha(body["g-recaptcha-response"]))) {
      logger.info("Recaptcha verification failed.");
      set.headers.location = "/contact?success=false&error=recaptcha";
    } else {
      logger.debug("Recaptcha verification successful.");

      const { status, text } = await sendEmail(
        body.name ?? "Anonymous",
        body.email,
        body.body,
      );

      if (status === 200) {
        set.headers.location = "/contact?success=true";
      } else {
        logger.warn(
          `Failed to send contact message. Received HTTP Status ${status}: ${text}.`,
        );
        set.headers.location = "/contact?success=false&error=unknown";
      }
    }
  } catch (err) {
    logger.error(
      "Unexpected error encountered while sending contact message.",
      err,
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
