import { type BlogPost } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/routes";
import { getPrettyDate } from "../../../utils";
import { BasePage, NotFound } from "../../pages";
import { Markdown, SectionDivider } from "../../shared";

const titleClasses =
  "text-secondary-text dark:text-secondary-text-dark text-2xl font-bold";

const dateClasses =
  "text-secondary-text dark:text-secondary-text-dark w-full text-right";

interface BlogPostProps extends DefaultPageProps {
  data: Promise<BlogPost | null>;
}

const BlogPost = async ({
  data,
  theme,
}: BlogPostProps): Promise<JSX.Element> => {
  const post = await data;

  return post ? (
    <BasePage theme={theme}>
      <div class="my-3 p-2">
        <header>
          <div class={titleClasses}>{post.title}</div>
          <div>{post.subtitle}</div>
        </header>
        <SectionDivider />
        <div class={dateClasses}>{getPrettyDate(post.date)}</div>
        <article class="py-3">
          <Markdown text={post.text} />
        </article>
      </div>
    </BasePage>
  ) : (
    <NotFound theme={theme} />
  );
};

export default BlogPost;
