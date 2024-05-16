import { type HomeSectionEntryData } from "../../../models/home";
import { Link, Markdown, TextDivider } from "../../shared";

export interface HomeSectionEntryProps {
  entry: HomeSectionEntryData;
}

const HomeSectionEntry = ({ entry }: HomeSectionEntryProps): JSX.Element => {
  const titleSpan = <span class="text-lg font-bold">{entry.title}</span>;

  const entryHeader = (
    <div class="text-secondary-text dark:text-secondary-text-dark mb-3">
      {entry.titleLink ? (
        <Link href={entry.titleLink} arrow={true}>
          {titleSpan}
        </Link>
      ) : (
        titleSpan
      )}
      <ul>
        {entry.subtitles.map(({ title, detail }) => (
          <li class="flex w-full justify-between">
            <div>{title}</div>
            <div class="ml-6 whitespace-nowrap italic">{detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );

  const entryBody = (
    <div>
      <Markdown text={entry.text} />
    </div>
  );

  return (
    <div class="group/homesection">
      {entry.title || entry.subtitles.length ? entryHeader : null}
      {entry.text ? entryBody : null}
      <TextDivider className="group-last/homesection:hidden" />
    </div>
  );
};

export default HomeSectionEntry;
