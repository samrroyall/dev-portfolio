import { type BlogPostInfo } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import BlogPageEntry from "./BlogPageEntry";

interface BlogProps extends DefaultPageProps {
  data: Promise<BlogPostInfo[]>;
}

const Blog = async ({ data, theme }: BlogProps): Promise<JSX.Element> => (
  <BasePage current="blog" theme={theme}>
    <Sections
      sectionNum="02"
      entries={[
        {
          title: "Blog Posts",
          content: (await data).map((post) => <BlogPageEntry post={post} />),
        },
      ]}
    />
  </BasePage>
);

export default Blog;
