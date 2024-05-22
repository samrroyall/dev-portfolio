import { type BlogPost } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/routes";
import { getPrettyDate } from "../../../utils";
import { BasePage, NotFound } from "../../pages";
import { Heading, Markdown, SectionDivider } from "../../shared";

interface BlogPostProps extends DefaultPageProps {
  data: Promise<BlogPost | null>;
}

const BlogPost = async ({
  data,
  theme,
}: BlogPostProps): Promise<JSX.Element> => {
  const post = await data;

  return post ? (
    <BasePage theme={theme} title={post.title} pageTitle={false}>
      <div class="my-3 p-2">
        <header>
          <Heading variant={1} text={post.title} />
          <div class="mb-1">{post.subtitle}</div>
        </header>
        <SectionDivider />
        <div
          class={`text-secondary-text dark:text-secondary-text-dark text-right`}
        >
          {getPrettyDate(post.date)}
        </div>
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
