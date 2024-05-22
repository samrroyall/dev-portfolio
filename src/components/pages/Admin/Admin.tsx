import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Heading, SectionDivider } from "../../shared";

const Admin = ({ theme }: DefaultPageProps): JSX.Element => (
  <BasePage theme={theme} title="Admin Panel">
    <Heading variant={3} text="Home Page" />
    <SectionDivider />
    <div class="flex justify-center">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>

    <Heading variant={3} text="Blog Page" />
    <SectionDivider />
    <div class="flex justify-center">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </BasePage>
);

export default Admin;
