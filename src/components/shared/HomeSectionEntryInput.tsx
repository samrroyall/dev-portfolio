import { randomBytes } from "crypto";
import { type HomeSectionEntryData } from "../../models/home";
import {
  HomeSectionEntrySubtitleInput,
  IconButton,
  Input,
  Modal,
} from "../shared";

interface CreateNewHomeSectionEntryProps {
  entry?: HomeSectionEntryData;
}

const HomeSectionEntryInput = ({
  entry,
}: CreateNewHomeSectionEntryProps): JSX.Element => {
  const id = randomBytes(8).toString("hex");

  const toggleDeleteModal = `htmx.toggleClass(htmx.find("#delete-entry-${id}-modal"), "hidden");`;

  const hideSectionEntry = `htmx.find("#homesection-entry-${id}").remove();`;

  return (
    <div
      id={`homesection-entry-${id}`}
      class="homesection-entry dark:border-secondary-bg-dark border-t p-3 first:border-t-0"
    >
      {entry ? (
        <Input
          label="Entry ID"
          name="entryId"
          type="hidden"
          value={entry.id.toString()}
        />
      ) : null}
      <Input label="Entry Title" name="entryTitle" value={entry?.title ?? ""} />
      <div class="homesection-entry-subtitles dark:border-secondary-bg-dark my-6 border-y p-4">
        {entry?.subtitles
          ? entry.subtitles.map((subtitle) => (
              <HomeSectionEntrySubtitleInput subtitle={subtitle} />
            ))
          : null}
      </div>
      <div class="my-4 text-center">
        <IconButton
          icon={"\uf44d"}
          label="Add new subtitle"
          hx-post={`/admin/home/entry/subtitle/new`}
          hx-swap="beforeend"
          hx-target={`previous .homesection-entry-subtitles`}
          hx-trigger="click"
        />
      </div>
      <Input
        label="Entry Title Link"
        name="entryTitleLink"
        value={entry?.titleLink ?? ""}
      />
      <Input
        label="Entry Text"
        name="entryText"
        type="textarea"
        required={true}
        noResize={true}
        value={entry?.text ?? ""}
      />
      <div class="my-4 text-center">
        {entry ? (
          <>
            <Modal
              id={`delete-entry-${id}-modal`}
              className="flex flex-col items-center justify-center"
            >
              <p class="mb-3">
                {"Are you sure you want to delete this home section entry?"}
              </p>
              <IconButton
                icon={"\udb80\uddb4"}
                label="Delete"
                hx-delete={`/admin/home/entry/${entry.id}`}
                hx-swap="none"
                hx-trigger="click"
                hx-on-click={`${toggleDeleteModal} ${hideSectionEntry}`}
              />
            </Modal>
            <IconButton
              icon={"\udb80\uddb4"}
              label="Delete section entry"
              hx-on-click={toggleDeleteModal}
            />
          </>
        ) : (
          <IconButton
            icon={"\udb80\uddb4"}
            label="Delete section entry"
            hx-on-click={hideSectionEntry}
          />
        )}
      </div>
    </div>
  );
};

export default HomeSectionEntryInput;
