import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { BlogPostForm, NoMobile } from "../../shared";

interface CreateBlogPostProps extends DefaultPageProps {
  error?: string;
  success?: string;
}

const CreateBlogPost = ({
  error,
  success,
  theme,
}: CreateBlogPostProps): JSX.Element => {
  return (
    <BasePage
      admin={true}
      current="create blog post"
      fullPage={true}
      mobileNav={true}
      theme={theme}
      title="Create Blog Post"
    >
      <NoMobile className="mt-8 justify-center sm:hidden" />
      <BlogPostForm
        id="create-blog-post-form"
        action={`/admin/blog/new`}
        submitLabel="Publish Post"
        error={error}
        success={success}
      />
    </BasePage>
  );
};

export default CreateBlogPost;
