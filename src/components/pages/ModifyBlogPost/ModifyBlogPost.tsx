import { type BlogPost } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { BasePage, NotFound } from "../../pages";
import { BlogPostPreview, Form, Icon, Input, NoMobile } from "../../shared";

const previewWindowClasses = `
  hidden h-[79vh] w-[640px] py-3 px-2 rounded overflow-y-scroll border 
  border-secondary-text dark:border-secondary-text-dark
`;

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
  const attrs = {
    ...(error ? { error } : {}),
    ...(success ? { success: success === "true" } : {}),
  };

  const hxAttrs = {
    "hx-post": "/admin/blog/preview",
    "hx-target": "#blog-post-preview",
    "hx-trigger": "keyup changed delay:1s",
  };

  const post = await data;

  return post === null ? (
    <NotFound theme={theme} />
  ) : (
    <BasePage
      admin={true}
      current="create blog post"
      theme={theme}
      title="Create Blog Post"
      fullPage={true}
    >
      <NoMobile className="my-6 justify-center sm:hidden" />
      <div class="mb-6 mt-3 flex items-start justify-center space-x-6 max-sm:hidden">
        <div class="w-[640px] self-start">
          <div class="text-right">
            <button
              class="text-secondary-text dark:text-secondary-text-dark"
              type="button"
              hx-on-click={`htmx.toggleClass("#blog-post-preview", "hidden");`}
            >
              <Icon icon={"\ueb28"} />
            </button>
          </div>
          <Form
            id="update-blog-post-form"
            action={`/admin/blog/${post.id}`}
            submitLabel="Update Post"
            {...attrs}
          >
            <Input label="Slug" name="slug" required={true} value={post.slug} />
            <Input
              label="Title"
              name="title"
              required={true}
              value={post.title}
              {...hxAttrs}
            />
            <Input
              label="Subtitle"
              name="subtitle"
              required={true}
              value={post.subtitle}
              {...hxAttrs}
            />
            <Input
              label="Blurb"
              name="blurb"
              required={true}
              type="textarea"
              noResize={true}
              value={post.blurb}
              className="h-[3rem]"
            />
            <Input
              label="Text"
              name="text"
              required={true}
              type="textarea"
              noResize={true}
              value={post.text}
              {...hxAttrs}
            />
          </Form>
        </div>
        <div id="blog-post-preview" class={previewWindowClasses}>
          <BlogPostPreview post={post} />
        </div>
      </div>
    </BasePage>
  );
};

export default ModifyBlogPost;
