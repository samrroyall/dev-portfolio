import { type BlogPostInfo } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { type HomeSection } from "../../../models/home";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import AdminTable from "./AdminTable";

const reloadPageAfterDelete = `
  document.body.addEventListener("htmx:afterRequest", function(evt) {
    if (evt.target.id.startsWith("modal-delete-button-")) {
      window.location.reload();
    }
  })
`;

interface AdminProps extends DefaultPageProps {
  blogData: Promise<BlogPostInfo[]>;
  homeData: Promise<HomeSection[]>;
}

const Admin = async ({
  blogData,
  homeData,
  theme,
}: AdminProps): Promise<JSX.Element> => (
  <BasePage admin={true} current="home" theme={theme} title="Admin Panel">
    <script>{reloadPageAfterDelete}</script>
    <Sections
      sectionNum="00"
      entries={[
        {
          title: "Blog Posts",
          fullPage: true,
          content: [
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
            </div>,
          ],
        },
        {
          title: "Home Sections",
          fullPage: true,
          content: [
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
            </div>,
          ],
        },
      ]}
    />
  </BasePage>
);

export default Admin;
