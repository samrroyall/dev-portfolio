import { Link, Strong } from "../../shared";

interface HomeSectionEntry {
  title: string;
  titleLink?: string;
  subtitles: string[];
  dateString?: string;
  text: string;
}

interface HomeSectionEntriesProps {
  entries: HomeSectionEntry[];
}

const HomeSectionEntries = ({ entries }: HomeSectionEntriesProps) => (
  <ul>
    {entries.map((entry) => (
      <li class="my-3 first:mt-0 last:mb-0">
        {entry.titleLink ? (
          <Link href={entry.titleLink} arrow={true}>
            <Strong>{entry.title}</Strong>
          </Link>
        ) : (
          <Strong>{entry.title}</Strong>
        )}
        <div class="flex w-full justify-between font-light text-secondary-text">
          <ul>
            {entry.subtitles.map((subtitle) => (
              <li>{subtitle}</li>
            ))}
          </ul>
          {entry.dateString ? (
            <div class="italic">{entry.dateString}</div>
          ) : null}
        </div>
        <p class="mt-3">{entry.text}</p>
      </li>
    ))}
  </ul>
);

export default HomeSectionEntries;
