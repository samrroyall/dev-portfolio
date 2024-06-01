import { type BlogPost } from "../pages";
import { BlogPostPreview, Form, Icon, Input } from "../shared";

const previewWindowClasses = `
  hidden h-[79vh] w-[640px] py-3 px-2 rounded overflow-y-scroll border 
  border-secondary-text dark:border-secondary-text-dark
`;

interface BlogPostFormProps {
  action: string;
  id: string;
  error?: string;
  post?: BlogPost;
  submitLabel?: string;
  success?: string;
}

const BlogPostForm = ({
  action,
  error,
  id,
  post,
  submitLabel,
  success,
}: BlogPostFormProps): JSX.Element => {
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
        <Form id={id} action={action} submitLabel={submitLabel} {...attrs}>
          <Input
            label="Slug"
            name="slug"
            required={true}
            value={post?.slug ?? ""}
          />
          <Input
            label="Title"
            name="title"
            required={true}
            value={post?.title ?? ""}
            {...hxAttrs}
          />
          <Input
            label="Subtitle"
            name="subtitle"
            required={true}
            value={post?.subtitle ?? ""}
            {...hxAttrs}
          />
          <Input
            label="Blurb"
            name="blurb"
            required={true}
            type="textarea"
            noResize={true}
            value={post?.blurb ?? ""}
            className="h-[3rem]"
          />
          <Input
            label="Text"
            name="text"
            required={true}
            type="textarea"
            noResize={true}
            value={post?.text ?? ""}
            {...hxAttrs}
          />
        </Form>
      </div>
      <div id="blog-post-preview" class={previewWindowClasses}>
        {post ? <BlogPostPreview post={post} /> : null}
      </div>
    </div>
  );
};

export default BlogPostForm;
