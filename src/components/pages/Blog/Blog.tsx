import { type BlogPostInfo } from "../../../api/models/blog";
import { getPrettyDate } from "../../../utils";
import { Link, Sections } from "../../shared";
import BasePage from "../BasePage";

interface BlogProps {
  data: Promise<BlogPostInfo[]>;
}

const Blog = async ({ data }: BlogProps) => (
  <BasePage current="blog">
    <Sections
      sectionNum="02"
      entries={(await data).map((post) => ({
        title: "",
        content: [
          <div>
            <div class="flex justify-between">
              <Link href={`/blog/post/${post.id}`} arrow={true} target="_self">
                <span class="text-secondary-text text-2xl font-bold">
                  {post.title}
                </span>
              </Link>
              <div class="text-secondary-text ml-6 whitespace-nowrap">
                {getPrettyDate(post.date)}
              </div>
            </div>
            <div class="font-medium">{post.subtitle}</div>
          </div>,
        ],
      }))}
    />
  </BasePage>
);

export default Blog;
