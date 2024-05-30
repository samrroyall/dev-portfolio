import { type DefaultPageProps } from "../../../models/components";
import { type HomeSection } from "../../../models/home";
import {
  Form,
  HomeSectionEntryInput,
  IconButton,
  Input,
  NoMobile,
} from "../../shared";
import BasePage from "../BasePage";
import NotFound from "../NotFound";

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
    ...(success ? { success: success === "true" } : {}),
  };

  const section = await data;

  return section === null ? (
    <NotFound theme={theme} />
  ) : (
    <BasePage admin={true} theme={theme} title="Modify Home Section">
      <NoMobile className="my-6 justify-center sm:hidden" />
      <div class="mx-auto mb-6 mt-3 max-w-screen-sm max-sm:hidden">
        <script>{formFuncs}</script>
        <Form
          id="update-home-section-form"
          action={`/admin/home/${section.id}`}
          submitLabel="Update Section"
          {...attrs}
        >
          <Input
            label="Section Title"
            name="sectionTitle"
            required={true}
            value={section.title}
          />
          <Input
            label="Section Order"
            name="sectionOrder"
            required={true}
            type="number"
            value={section.order.toString()}
          />
          <div id="entry-container">
            {section.entries
              ? section.entries.map((entry) => (
                  <HomeSectionEntryInput
                    id={entry.id.toString()}
                    data={entry}
                  />
                ))
              : null}
          </div>
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

export default ModifyHomeSection;
