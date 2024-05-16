import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";

const CreateBlogPost = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme}>
    <div>{"This is the CreateBlogPost page..."}</div>
  </BasePage>
);

export default CreateBlogPost;
