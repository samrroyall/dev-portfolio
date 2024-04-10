import { Link, Markdown } from "../../shared";

export interface HomeSectionEntryProps {
  title: string;
  subtitles: string[];
  text: string;
  titleLink?: string;
  date?: string;
}

const HomeSectionEntry = ({
  title,
  subtitles,
  text,
  titleLink,
  date,
}: HomeSectionEntryProps) => {
  const entryHeader = (
    <div class="text-secondary-text mb-3">
      {titleLink ? (
        <Link href={titleLink} arrow={true}>
          <span class="font-semibold">{title}</span>
        </Link>
      ) : (
        <span class="font-semibold">{title}</span>
      )}
      <div class="flex w-full justify-between font-light">
        <ul>
          {subtitles.map((subtitle) => (
            <li>{subtitle}</li>
          ))}
        </ul>
        {date ? <div class="italic">{date}</div> : null}
      </div>
    </div>
  );

  const entryBody = (
    <div>
      <Markdown text={text} />
    </div>
  );

  return (
    <div class="group/homesection">
      {title || subtitles.length ? entryHeader : null}
      {text ? entryBody : null}
      <hr class="border-secondary-bg my-6 group-last/homesection:hidden" />
    </div>
  );
};

export default HomeSectionEntry;
