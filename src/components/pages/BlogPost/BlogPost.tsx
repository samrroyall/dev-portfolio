import { type BlogPost } from "../../../models/blog";
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
      <div class="my-3 p-2">
        <header>
          <div class="text-secondary-text text-2xl font-bold">{post.title}</div>
          <div>{post.subtitle}</div>
        </header>
        <hr class="border-secondary-text border border-dashed" />
        <div class="text-secondary-text w-full text-right">
          {getPrettyDate(post.date)}
        </div>
        <article class="py-3">
          <Markdown text={post.text} />
        </article>
      </div>
    </BasePage>
  ) : (
    <NotFound />
  );
};

export default BlogPost;
