import { type HomeSection } from "../../models/home";
import { Form, HomeSectionEntryInput, IconButton, Input } from "../shared";

const formFuncs = `
  function getJsonFormData() {
    const maybeOrder = document.querySelector("input[name='sectionOrder']")?.value;

    const formData = {
      title: document.querySelector("input[name='sectionTitle']").value,
      order: !!maybeOrder ? maybeOrder : undefined,
      entries: [],
    };

    document
      .getElementById("homesection-entries")
      .querySelectorAll(".homesection-entry")
      .forEach((entryElement) => {
        const maybeId = entryElement.querySelector("input[name='entryId']")?.value;
        const maybeTitle = entryElement.querySelector("input[name='entryTitle']")?.value;
        const maybeTitleLink = entryElement.querySelector("input[name='entryTitleLink']")?.value;

        const entry = {
          id: !!maybeId ? maybeId : undefined,
          title: !!maybeTitle ? maybeTitle : undefined,
          titleLink: !!maybeTitleLink ? maybeTitleLink : undefined,
          text: entryElement.querySelector("textarea[name='entryText']").value,
          subtitles: [],
        };

        entryElement
          .querySelectorAll(".homesection-entry-subtitle")
          .forEach((subtitleElement) => {
            const maybeDetail = subtitleElement.querySelector("input[name='entrySubtitleDetail']")?.value;

            const subtitle = {
              title: subtitleElement.querySelector("input[name='entrySubtitle']").value,
              detail: !!maybeDetail ? maybeDetail : undefined,
            };

            entry.subtitles.push(subtitle);
          });

        formData.entries.push(entry);
      });
    
    return formData;
  }

  function setJsonFormData() {
    document.getElementById("json-form-data").value = JSON.stringify(getJsonFormData());
  }
`;

interface HomeSectionFormProps {
  action: string;
  id: string;
  section?: HomeSection;
  error?: string;
  submitLabel?: string;
  success?: string;
}

const HomeSectionForm = ({
  action,
  section,
  id,
  error,
  submitLabel,
  success,
}: HomeSectionFormProps): JSX.Element => {
  const attrs = {
    ...(error ? { error } : {}),
    ...(submitLabel ? { submitLabel } : {}),
    ...(success ? { success: success === "true" } : {}),
  };

  return (
    <>
      <script>{formFuncs}</script>
      <Form action={action} id={id} hx-on-submit="setJsonFormData()" {...attrs}>
        <Input
          id="homesection-title"
          label="Section Title"
          name="sectionTitle"
          required={true}
          value={section?.title ?? ""}
        />
        {section?.order ? (
          <Input
            id="homesection-order"
            label="Section Order"
            name="sectionOrder"
            required={true}
            type="number"
            value={section.order.toString()}
          />
        ) : null}
        <div
          id="homesection-entries"
          class="dark:border-secondary-bg-dark my-4 border-y p-4"
        >
          {section?.entries
            ? section.entries.map((entry) => (
                <HomeSectionEntryInput entry={entry} />
              ))
            : null}
        </div>
        <div class="my-4 text-center">
          <IconButton
            icon={"\uf44d"}
            label="Add new section entry"
            hx-post="/admin/home/entry/new"
            hx-swap="beforeend"
            hx-target="#homesection-entries"
            hx-trigger="click"
          />
        </div>
        <Input label="" type="hidden" id="json-form-data" name="jsonData" />
      </Form>
    </>
  );
};

export default HomeSectionForm;
