import { type BlogPost } from "../../../api/models/blog";
import { getPrettyDate } from "../../../utils";
import { BasePage, NotFound } from "../../pages";
import { Markdown } from "../../shared";

interface BlogPostProps {
  data: Promise<BlogPost | null>;
}

const BlogPost = async ({ data }: BlogPostProps) => {
  const post = await data;

  return post ? (
    <BasePage>
      <header class="px-1">
        <div class="text-secondary-text text-2xl font-bold">{post.title}</div>
        <div>{post.subtitle}</div>
      </header>
      <hr class="border-primary-text border border-dashed" />
      <div class="text-secondary-text w-full text-right">
        {getPrettyDate(post.date)}
      </div>
      <article class="p-3">
        <Markdown text={post.text} />
      </article>
    </BasePage>
  ) : (
    <NotFound />
  );
};

export default BlogPost;
