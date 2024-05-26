import { type DefaultPageProps } from "../../../models/components";
import { BasePage } from "../../pages";
import { Form, IconButton, Input, SectionDivider } from "../../shared";

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
  success?: boolean;
}

const CreateHomeSection = ({
  error,
  success,
  theme,
}: CreateHomeSectionProps): JSX.Element => {
  const attrs = {
    ...(error ? { error } : {}),
    ...(success ? { success } : {}),
  };

  return (
    <BasePage theme={theme} title="Create Home Section">
      <SectionDivider />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm">
        <>
          <script>{formFuncs}</script>
          <Form
            id="create-home-section-form"
            action="/admin/home/new"
            submitLabel="Publish Section"
            {...attrs}
          >
            <Input label="Section Title" name="sectionTitle" required={true} />
            <div id="entry-container" />
            <div class="text-center">
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
        </>
      </div>
    </BasePage>
  );
};

export default CreateHomeSection;
