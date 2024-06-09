import { type DefaultPageProps } from "../../../models/components";
import { type HomeSection } from "../../../models/home";
import { HomeSectionForm, NoMobile } from "../../shared";
import BasePage from "../BasePage";
import NotFound from "../NotFound";

interface ModifyHomeSectionProps extends DefaultPageProps {
  data: Promise<HomeSection | null>;
  error?: string;
  success?: string;
}

const ModifyHomeSection = async ({
  data,
  error,
  success,
  theme,
}: ModifyHomeSectionProps): Promise<JSX.Element> => {
  const attrs = {
    ...(error ? { error } : {}),
    ...(success === "true" ? { success } : {}),
  };

  const section = await data;

  return section === null ? (
    <NotFound theme={theme} />
  ) : (
    <BasePage
      admin={true}
      fullPage={true}
      mobileNav={true}
      theme={theme}
      title="Modify Home Section"
    >
      <NoMobile className="mt-8 justify-center sm:hidden" />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm max-sm:hidden">
        <HomeSectionForm
          id="update-home-section-form"
          action={`/admin/home/${section.id}`}
          section={section}
          submitLabel="Update Section"
          {...attrs}
        />
      </div>
    </BasePage>
  );
};

export default ModifyHomeSection;
