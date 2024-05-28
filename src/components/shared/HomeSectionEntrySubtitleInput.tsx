import { type HomeSectionEntrySubtitle } from "../../models/home";
import { IconButton, Input } from "../shared";

interface CreateNewHomeSectionEntrySubtitleProps {
  id: string;
  entryId: string;
  data?: HomeSectionEntrySubtitle;
}

const HomeSectionEntrySubtitleInput = ({
  id,
  data,
  entryId,
}: CreateNewHomeSectionEntrySubtitleProps): JSX.Element => (
  <div id={`entry-${entryId}-subtitle-${id}`}>
    <div class="flex gap-x-2 *:w-full">
      <Input
        label="Entry Subtitle"
        name={`entrySubtitle-${entryId}-${id}`}
        required={true}
        value={data?.title ?? ""}
      />
      <Input
        label="Entry Subtitle Detail"
        name={`entrySubtitleDetail-${entryId}-${id}`}
        value={data?.detail ?? ""}
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

export default HomeSectionEntrySubtitleInput;
