import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";

const Admin = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme}>
    <div class="text-center">{"Admin Page"}</div>
  </BasePage>
);

export default Admin;
