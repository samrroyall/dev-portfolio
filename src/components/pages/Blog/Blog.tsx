import { type BlogPostInfo } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { NoData, SectionDivider } from "../../shared";
import BlogCard from "./BlogCard";

const cardContainerClasses = `
  my-6 grid grid-cols-1 gap-8 p-8 max-sm:gap-4 max-sm:p-4 sm:grid-cols-2 
  xl:grid-cols-3
`;

interface BlogProps extends DefaultPageProps {
  data: Promise<BlogPostInfo[]>;
}

const Blog = async ({ data, theme }: BlogProps): Promise<JSX.Element> => {
  const posts = await data;

  return (
    <BasePage current="blog" theme={theme} title="Blog">
      <SectionDivider />
      {posts.length === 0 ? (
        <NoData />
      ) : (
        <div class={cardContainerClasses}>
          {posts.map((post, i) => (
            <BlogCard data={post} sectionNum="02" index={i} />
          ))}
        </div>
      )}
    </BasePage>
  );
};

export default Blog;
