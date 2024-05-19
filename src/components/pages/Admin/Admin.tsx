import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";

const Admin = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme} title="Admin Panel">
    <div class="text-center">{"Admin Page"}</div>
  </BasePage>
);

export default Admin;
