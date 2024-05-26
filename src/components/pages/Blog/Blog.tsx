import { type BlogPostInfo } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { NoData, Sections } from "../../shared";
import BlogPageEntry from "./BlogPageEntry";

interface BlogProps extends DefaultPageProps {
  data: Promise<BlogPostInfo[]>;
}

const Blog = async ({ data, theme }: BlogProps): Promise<JSX.Element> => {
  const posts = await data;

  return (
    <BasePage current="blog" theme={theme} title="Blog">
      {posts.length === 0 ? (
        <NoData />
      ) : (
        <Sections
          sectionNum="02"
          entries={posts.map((post) => ({
            title: post.title,
            content: [<BlogPageEntry post={post} />],
          }))}
        />
      )}
    </BasePage>
  );
};

export default Blog;
