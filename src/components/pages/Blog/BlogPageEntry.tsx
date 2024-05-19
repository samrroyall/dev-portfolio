import { type BlogPostInfo } from "../../../models/blog";
import { getPrettyDate } from "../../../utils";
import { Link, TextDivider } from "../../shared";

const subtitleClasses = "text-secondary-text dark:text-secondary-text-dark";

const dateClasses =
  "text-secondary-text dark:text-secondary-text-dark ml-6 whitespace-nowrap";

const readMoreClasses =
  "text-secondary-text dark:text-secondary-text-dark font-medium";

interface BlogPageEntryProps {
  post: BlogPostInfo;
}

const BlogPageEntry = ({ post }: BlogPageEntryProps): JSX.Element => (
  <div class="group/blogsection">
    <div class="flex justify-between">
      <span class={subtitleClasses}>{post.subtitle}</span>
      <div class={dateClasses}>{getPrettyDate(post.date)}</div>
    </div>
    <Link href={`/blog/post/${post.id}`} arrow={true} target="_self">
      <span class={readMoreClasses}>{"Read more"}</span>
    </Link>
    <TextDivider className="group-last/blogsection:hidden" />
  </div>
);

export default BlogPageEntry;
