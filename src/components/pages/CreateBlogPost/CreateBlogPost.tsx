import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";

const CreateBlogPost = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme} title="Create Blog Post">
    <div>{"This is the CreateBlogPost page..."}</div>
  </BasePage>
);

export default CreateBlogPost;
