import { Link } from "../../shared";

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
}: HomeSectionEntryProps) => (
  <div class="my-3 first:mt-0 last:mb-0">
    <span class="text-secondary-text">
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
    </span>
    <p class="mt-3">{text}</p>
  </div>
);

export default HomeSectionEntry;
