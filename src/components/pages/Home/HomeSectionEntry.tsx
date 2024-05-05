import { type HomeSectionEntryData } from "../../../models/home";
import { Link, Markdown } from "../../shared";

export interface HomeSectionEntryProps {
  entry: HomeSectionEntryData;
}

const HomeSectionEntry = ({ entry }: HomeSectionEntryProps) => {
  const titleSpan = <span class="text-lg font-bold">{entry.title}</span>;

  const entryHeader = (
    <div class="text-secondary-text mb-3">
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
            {title}
            <span class="italic">{detail}</span>
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
      <hr class="border-secondary-bg my-6 group-last/homesection:hidden" />
    </div>
  );
};

export default HomeSectionEntry;
