import { type HomeSectionEntryData } from "../../models/home";
import {
  HomeSectionEntrySubtitleInput,
  IconButton,
  Input,
  Modal,
} from "../shared";

const reloadPageAfterDelete = `
  document.body.addEventListener("htmx:afterRequest", function(evt) {
    if (evt.target.id.startsWith("modal-delete-button-entry-")) {
      window.location.reload();
    }
  })
`;

interface CreateNewHomeSectionEntryProps {
  id: string;
  data?: HomeSectionEntryData;
}

const HomeSectionEntryInput = ({
  data,
  id,
}: CreateNewHomeSectionEntryProps): JSX.Element => (
  <div id={`entry-${id}`}>
    {data ? (
      <Input
        label="Entry ID"
        name={`entryId-${id}`}
        type="hidden"
        value={data.id}
      />
    ) : null}
    <Input
      label="Entry Title"
      name={`entryTitle-${id}`}
      value={data?.title ?? ""}
    />
    <div id={`entry-${id}-subtitle-container`} class="p-2">
      {data?.subtitles
        ? data.subtitles.map((subtitle, i) => (
            <HomeSectionEntrySubtitleInput
              id={i.toString()}
              entryId={data.id.toString()}
              data={subtitle}
            />
          ))
        : null}
    </div>
    <div class="my-4 text-center">
      <IconButton
        icon={"\uf44d"}
        label="Add new subtitle"
        hx-post={`/admin/home/entry/subtitle/new?entryId=${id}`}
        hx-swap="beforeend"
        hx-target={`#entry-${id}-subtitle-container`}
        hx-trigger="click"
      />
    </div>
    <Input
      label="Entry Title Link"
      name={`entryTitleLink-${id}`}
      value={data?.titleLink ?? ""}
    />
    <Input
      label="Entry Text"
      name={`entryText-${id}`}
      type="textarea"
      required={true}
      noResize={true}
      value={data?.text ?? ""}
    />
    <div class="my-4 text-center">
      {data ? (
        <>
          <script>{reloadPageAfterDelete}</script>
          <Modal
            id={`delete-entry-${id}-modal`}
            className="flex flex-col items-center justify-center"
          >
            <p class="mb-3">
              {"Are you sure you want to delete this home section entry?"}
            </p>
            <IconButton
              id={`modal-delete-button-entry-${id}`}
              label="Delete"
              icon={"\udb80\uddb4"}
              hx-delete={`/admin/home/entry/${data.id}`}
              hx-swap="none"
              hx-trigger="click"
              hx-on-click={`htmx.toggleClass("#delete-entry-${id}-modal", "hidden");`}
            />
          </Modal>
          <IconButton
            id={`delete-entry-button-${data.id}`}
            label="Delete section entry"
            icon={"\udb80\uddb4"}
            hx-on-click={`htmx.toggleClass("#delete-entry-${id}-modal", "hidden");`}
          />
        </>
      ) : (
        <IconButton
          icon={"\udb80\uddb4"}
          label="Delete section entry"
          hx-on-click={`deleteEntry("${id}");`}
        />
      )}
    </div>
  </div>
);

export default HomeSectionEntryInput;
