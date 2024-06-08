import { type HomeSectionEntryData } from "../../../models/home";
import { Heading, Link, Markdown, TextDivider } from "../../shared";

const textSecondary = "text-secondary-text dark:text-secondary-text-dark";

export interface HomeSectionEntryProps {
  entry: HomeSectionEntryData;
}

const HomeSectionEntry = ({ entry }: HomeSectionEntryProps): JSX.Element => {
  const entryHeader = (
    <div class={`mb-3 ${textSecondary}`}>
      {entry.titleLink ? (
        <Link href={entry.titleLink} arrow={true}>
          <Heading
            variant={4}
            text={entry.title}
            className={`underline ${textSecondary}`}
            inline={true}
          />
        </Link>
      ) : (
        <Heading
          variant={4}
          text={entry.title}
          className={textSecondary}
          inline={true}
        />
      )}
      <ul>
        {entry.subtitles.map(({ title, detail }) => (
          <li class="flex w-full justify-between">
            <div>{title}</div>
            <div class="ml-6 whitespace-nowrap font-light">{detail}</div>
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
