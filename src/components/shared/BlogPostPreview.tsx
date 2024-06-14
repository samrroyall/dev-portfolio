import { Heading, Markdown, SectionDivider } from ".";
import { type BlogPost } from "../../models/blog";
import { getPrettyDate } from "../../utils";

const firstLineClasses = `
  first-letter:float-left first-letter:mr-3 first-letter:text-7xl 
  first-letter:font-bold first-letter:text-secondary-text 
  first-letter:dark:text-secondary-text-dark
`;

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
    <article class={`py-3 ${firstLineClasses}`}>
      <Markdown text={post.text ?? ""} />
    </article>
  </div>
);

export default BlogPostPreview;
