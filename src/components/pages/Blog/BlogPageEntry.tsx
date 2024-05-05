import { type BlogPostInfo } from "../../../models/blog";
import { getPrettyDate } from "../../../utils";
import { Link } from "../../shared";

interface BlogPageEntryProps {
  post: BlogPostInfo;
}

const BlogPageEntry = ({ post }: BlogPageEntryProps) => (
  <div class="group/blogsection">
    <div class="flex justify-between">
      <span class="text-secondary-text text-lg font-bold">{post.title}</span>
      <div class="text-secondary-text ml-6 whitespace-nowrap">
        {getPrettyDate(post.date)}
      </div>
    </div>
    <div class="my-2">{post.subtitle}</div>
    <Link href={`/blog/post/${post.id}`} arrow={true} target="_self">
      <span class="text-secondary-text font-medium">{"Read more"}</span>
    </Link>
    <hr class="border-secondary-bg my-6 group-last/blogsection:hidden" />
  </div>
);

export default BlogPageEntry;
