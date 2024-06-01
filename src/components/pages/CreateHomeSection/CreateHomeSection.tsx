import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { HomeSectionForm, NoMobile } from "../../shared";

interface CreateHomeSectionProps extends DefaultPageProps {
  error?: string;
  success?: string;
}

const CreateHomeSection = ({
  error,
  success,
  theme,
}: CreateHomeSectionProps): JSX.Element => {
  const attrs = {
    ...(error ? { error } : {}),
    ...(success === "true" ? { success } : {}),
  };

  return (
    <BasePage
      admin={true}
      current="create home section"
      fullPage={true}
      mobileNav={true}
      theme={theme}
      title="Create Home Section"
    >
      <NoMobile className="my-6 justify-center sm:hidden" />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm max-sm:hidden">
        <HomeSectionForm
          id="create-home-section-form"
          action="/admin/home/new"
          submitLabel="Publish Section"
          {...attrs}
        />
      </div>
    </BasePage>
  );
};

export default CreateHomeSection;
