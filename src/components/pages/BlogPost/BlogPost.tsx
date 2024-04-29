import { getBlogPostMockData } from "../../../api/mocks/blog";
import { type BlogPost } from "../../../api/models/blog";
import { getPrettyDate } from "../../../utils";
import { Markdown } from "../../shared";
import BasePage from "../BasePage";

interface BlogPostProps {
  id: string;
}

const BlogPost = async ({ id }: BlogPostProps) => {
  const data = await getBlogPostMockData(id);

  return data ? (
    <BasePage current="">
      <header class="px-1">
        <div class="text-secondary-text text-2xl font-bold">{data.title}</div>
        <div>{data.subtitle}</div>
      </header>
      <hr class="border-primary-text border border-dashed" />
      <div class="text-secondary-text w-full text-right">
        {getPrettyDate(data.date)}
      </div>
      <article class="p-3">
        <Markdown text={data.text} />
      </article>
    </BasePage>
  ) : (
    "Something went wrong"
  );
};

export default BlogPost;
