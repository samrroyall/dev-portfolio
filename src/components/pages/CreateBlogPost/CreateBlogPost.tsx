import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { Form, Icon, Input } from "../../shared";

const previewWindowClasses = `
  hidden h-[90%] w-[640px] py-3 px-2 rounded overflow-y-scroll border 
  border-secondary-text dark:border-secondary-text-dark
`;

interface CreateBlogPostProps extends DefaultPageProps {
  error?: string;
  success?: string;
}

const CreateBlogPost = ({
  error,
  success,
  theme,
}: CreateBlogPostProps): JSX.Element => {
  const attrs = {
    ...(error ? { error } : {}),
    ...(success ? { success: success === "true" } : {}),
  };

  const hxAttrs = {
    "hx-post": "/admin/blog/preview",
    "hx-target": "#blog-post-preview",
    "hx-trigger": "keyup changed delay:1s",
  };

  return (
    <BasePage
      admin={true}
      current="create blog post"
      theme={theme}
      title="Create Blog Post"
      fullPage={true}
    >
      <div class="mb-6 mt-3 flex h-full items-start justify-center space-x-6">
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
            id="create-blog-post-form"
            action="/admin/blog/new"
            submitLabel="Publish Post"
            {...attrs}
          >
            <Input label="Slug" name="slug" required={true} />
            <Input label="Title" name="title" required={true} {...hxAttrs} />
            <Input
              label="Subtitle"
              name="subtitle"
              required={true}
              {...hxAttrs}
            />
            <Input
              label="Blurb"
              name="blurb"
              required={true}
              type="textarea"
              noResize={true}
            />
            <Input
              label="Text"
              name="text"
              required={true}
              type="textarea"
              noResize={true}
              {...hxAttrs}
            />
          </Form>
        </div>
        <div id="blog-post-preview" class={previewWindowClasses} />
      </div>
    </BasePage>
  );
};

export default CreateBlogPost;
