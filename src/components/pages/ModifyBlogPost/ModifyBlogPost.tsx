import { type BlogPost } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { BasePage, NotFound } from "../../pages";
import { BlogPostForm, NoMobile } from "../../shared";

interface ModifyBlogPostProps extends DefaultPageProps {
  data: Promise<BlogPost | null>;
  error?: string;
  success?: string;
}

const ModifyBlogPost = async ({
  data,
  error,
  success,
  theme,
}: ModifyBlogPostProps): Promise<JSX.Element> => {
  const post = await data;

  return post === null ? (
    <NotFound theme={theme} />
  ) : (
    <BasePage
      admin={true}
      fullPage={true}
      mobileNav={true}
      theme={theme}
      title="Modify Blog Post"
    >
      <NoMobile className="mt-8 justify-center sm:hidden" />
      <BlogPostForm
        id="update-blog-post-form"
        action={`/admin/blog/${post.id}`}
        post={post}
        submitLabel="Update Post"
        error={error}
        success={success}
      />
    </BasePage>
  );
};

export default ModifyBlogPost;
