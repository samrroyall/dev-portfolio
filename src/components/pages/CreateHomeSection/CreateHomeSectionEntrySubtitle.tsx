import { IconButton, Input } from "../../shared";

interface CreateNewHomeSectionEntrySubtitleProps {
  id: string;
  entryId: string;
}

const CreateNewHomeSectionEntrySubtitle = ({
  id,
  entryId,
}: CreateNewHomeSectionEntrySubtitleProps) => (
  <div id={`entry-${entryId}-subtitle-${id}`}>
    <div class="flex">
      <Input
        className="w-full"
        label="Entry Subtitle"
        name={`entrySubtitle-${entryId}-${id}`}
        required={true}
      />
      <Input
        className="ml-2 w-full"
        label="Entry Subtitle Detail"
        name={`entrySubtitleDetail-${entryId}-${id}`}
      />
    </div>
    <div class="text-center">
      <IconButton
        icon={"\udb80\uddb4"}
        label="Delete subtitle"
        hx-on-click={`deleteEntrySubtitle("${entryId}", "${id}");`}
      />
    </div>
  </div>
);

export default CreateNewHomeSectionEntrySubtitle;
