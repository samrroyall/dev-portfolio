import { type BlogPostInfo } from "../../../models/blog";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import BlogPageEntry from "./BlogPageEntry";

interface BlogProps {
  data: Promise<BlogPostInfo[]>;
}

const Blog = async ({ data }: BlogProps) => (
  <BasePage current="blog">
    <Sections
      sectionNum="02"
      entries={[
        {
          title: "Recent Posts",
          content: (await data).map((post) => <BlogPageEntry post={post} />),
        },
      ]}
    />
  </BasePage>
);

export default Blog;
