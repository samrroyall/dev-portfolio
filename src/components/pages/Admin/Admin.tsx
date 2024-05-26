import { type BlogData } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { type HomeData } from "../../../models/home";
import { BasePage } from "../../pages";
import { Heading, SectionDivider } from "../../shared";
import AdminTable from "./AdminTable";

const reloadPageAfterDelete = `
  document.body.addEventListener("htmx:afterRequest", function(evt) {
    if (evt.target.id.startsWith("modal-delete-button-")) {
      window.location.reload();
    }
  })
`;

interface AdminProps extends DefaultPageProps {
  blogData: BlogData;
  homeData: HomeData;
}

const Admin = async ({
  blogData,
  homeData,
  theme,
}: AdminProps): Promise<JSX.Element> => (
  <BasePage admin={true} current="home" theme={theme} title="Admin Panel">
    <Heading variant={3} text="Blog Posts" className="text-right" />
    <SectionDivider />
    <script>{reloadPageAfterDelete}</script>
    <div class="flex justify-center px-2 py-6">
      <AdminTable
        createHref="/admin/blog/new"
        deleteHref={(id: number) => `/admin/blog/${id}`}
        editHref={(id: number) => `/admin/blog/${id}`}
        rows={(await blogData).map(
          ({ id, title, createdAt, lastModifiedAt }) => ({
            id,
            title,
            createdAt,
            lastModifiedAt,
          }),
        )}
      />
    </div>
    <Heading variant={3} text="Home Sections" className="text-right" />
    <SectionDivider />
    <div class="flex justify-center px-2 py-6">
      <AdminTable
        createHref="/admin/home/new"
        deleteHref={(id: number) => `/admin/home/${id}`}
        editHref={(id: number) => `/admin/home/${id}`}
        rows={(await homeData).map(
          ({ id, title, createdAt, lastModifiedAt }) => ({
            id,
            title,
            createdAt,
            lastModifiedAt,
          }),
        )}
      />
    </div>
  </BasePage>
);

export default Admin;
