import { Link, SectionDivider } from "../../components/shared";
import { getLowercaseCharAt } from "../../utils";

interface SectionEntry {
  title: string;
  content: JSX.Element[];
  titleLink?: string;
  fullPage?: boolean;
}

interface SectionProps {
  entries: SectionEntry[];
  sectionNum: string;
}

const Sections = ({ entries, sectionNum }: SectionProps): JSX.Element => (
  <section>
    {entries.map(({ title, content, titleLink, fullPage }, i) => (
      <section class="group/section w-full">
        <div class="my-3 flex flex-col p-2">
          <div class="ml-auto w-full max-lg:text-right">
            <div class="font-sauce-code-pro">
              {`${sectionNum}.${getLowercaseCharAt(i)}`}
            </div>
            <div class="text-secondary-text dark:text-secondary-text-dark text-2xl font-bold">
              {titleLink ? (
                <Link href={titleLink} arrow={true} target="_self">
                  <span>{title}</span>
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </div>
            <SectionDivider />
          </div>
          <div
            class={`py-4 ${fullPage === true ? "" : "lg:w-2/3 lg:self-end"}`}
          >
            {content}
          </div>
        </div>
      </section>
    ))}
  </section>
);

export default Sections;
