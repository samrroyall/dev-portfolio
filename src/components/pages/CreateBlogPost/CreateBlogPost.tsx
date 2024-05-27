import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";

const CreateBlogPost = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage
    admin={true}
    current="create blog post"
    theme={theme}
    title="Create Blog Post"
  >
    <p>{"This is the CreateBlogPost page..."}</p>
  </BasePage>
);

export default CreateBlogPost;
