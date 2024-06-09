import { randomBytes } from "crypto";
import { type HomeSectionEntrySubtitle } from "../../models/home";
import { IconButton, Input } from "../shared";

const homeSectionEntrySubtitleClasses = `
  homesection-entry-subtitle mt-4 rounded border p-4 first:mt-0
  border-secondary-text dark:border-secondary-text-dark 
`;

interface CreateNewHomeSectionEntrySubtitleProps {
  subtitle?: HomeSectionEntrySubtitle;
}

const HomeSectionEntrySubtitleInput = ({
  subtitle,
}: CreateNewHomeSectionEntrySubtitleProps): JSX.Element => {
  const id = randomBytes(8).toString("hex");

  return (
    <div
      id={`homesection-entry-subtitle-${id}`}
      class={homeSectionEntrySubtitleClasses}
    >
      <div class="flex gap-x-2 *:w-full">
        <Input
          label="Entry Subtitle"
          name="entrySubtitle"
          required={true}
          value={subtitle?.title ?? ""}
        />
        <Input
          label="Entry Subtitle Detail"
          name="entrySubtitleDetail"
          value={subtitle?.detail ?? ""}
        />
      </div>
      <div class="text-center">
        <IconButton
          icon={"\udb80\uddb4"}
          label="Delete subtitle"
          hx-on-click={`htmx.find("#homesection-entry-subtitle-${id}").remove();`}
        />
      </div>
    </div>
  );
};

export default HomeSectionEntrySubtitleInput;
