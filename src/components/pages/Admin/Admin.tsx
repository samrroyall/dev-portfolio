import { type BlogData } from "../../../models/blog";
import { type DefaultPageProps } from "../../../models/components";
import { type HomeData } from "../../../models/home";
import { BasePage } from "../../pages";
import { Heading, SectionDivider } from "../../shared";
import AdminTable from "./AdminTable";

interface AdminProps extends DefaultPageProps {
  blogData: BlogData;
  homeData: HomeData;
}

const Admin = async ({
  blogData,
  homeData,
  theme,
}: AdminProps): Promise<JSX.Element> => (
  <BasePage theme={theme} title="Admin Panel">
    <Heading variant={3} text="Blog Posts" className="text-right" />
    <SectionDivider />
    <div class="flex justify-center px-2 py-6">
      <AdminTable
        createHref="/admin/blog/new"
        deleteHref={(id: string) => `/admin/blog/${id}`}
        editHref={(id: string) => `/admin/blog/${id}`}
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
        deleteHref={(id: string) => `/admin/home/${id}`}
        editHref={(id: string) => `/admin/home/${id}`}
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
