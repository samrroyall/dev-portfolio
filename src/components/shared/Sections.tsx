import { Heading, Link, SectionDivider } from "../../components/shared";
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
          <div class="ml-auto w-full text-right">
            <div class="font-geist-mono">
              {`${sectionNum}.${getLowercaseCharAt(i)}`}
            </div>
            {titleLink ? (
              <Link href={titleLink} arrow={true} target="_self">
                <Heading variant={3} text={title} />
              </Link>
            ) : (
              <Heading variant={3} text={title} />
            )}
            <SectionDivider />
          </div>
          <div class={`py-4 ${fullPage === true ? "" : "lg:mx-auto lg:w-3/4"}`}>
            {content}
          </div>
        </div>
      </section>
    ))}
  </section>
);

export default Sections;
