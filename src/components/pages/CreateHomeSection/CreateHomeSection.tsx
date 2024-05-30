import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { Form, IconButton, Input, NoMobile } from "../../shared";

const formFuncs = `
  function deleteEntry(entryId) {
    const entryContainer = document.getElementById("entry-" + entryId);

    entryContainer.remove();
  }

  function deleteEntrySubtitle(entryId, subtitleId) {
    const entryContainer = document.getElementById("entry-" + entryId + "-subtitle-" + subtitleId);

    entryContainer.remove();
  }
`;

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
    ...(success ? { success: success === "true" } : {}),
  };

  return (
    <BasePage
      admin={true}
      current="create home section"
      theme={theme}
      title="Create Home Section"
    >
      <NoMobile className="my-6 justify-center sm:hidden" />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm max-sm:hidden">
        <script>{formFuncs}</script>
        <Form
          id="create-home-section-form"
          action="/admin/home/new"
          submitLabel="Publish Section"
          {...attrs}
        >
          <Input label="Section Title" name="sectionTitle" required={true} />
          <div id="entry-container" />
          <div class="my-4 text-center">
            <IconButton
              icon={"\uf44d"}
              label="Add new section entry"
              hx-post="/admin/home/entry/new"
              hx-swap="beforeend"
              hx-target="#entry-container"
              hx-trigger="click"
            />
          </div>
        </Form>
      </div>
    </BasePage>
  );
};

export default CreateHomeSection;
