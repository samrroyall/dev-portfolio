import { Heading, Markdown, SectionDivider } from ".";
import { type BlogPost } from "../../models/blog";
import { getPrettyDate } from "../../utils";

interface BlogPostPreviewProps {
  post: Partial<BlogPost>;
}

const BlogPostPreview = ({ post }: BlogPostPreviewProps): JSX.Element => (
  <div>
    <header>
      <Heading variant={1} text={post.title ?? ""} />
      <div class="mb-1">{post.subtitle ?? ""}</div>
    </header>
    <SectionDivider />
    <div class={`text-secondary-text dark:text-secondary-text-dark text-right`}>
      {getPrettyDate(new Date())}
    </div>
    <article class="py-3">
      <Markdown text={post.text ?? ""} />
    </article>
  </div>
);

export default BlogPostPreview;
