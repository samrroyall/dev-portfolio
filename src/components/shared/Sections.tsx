import { getLowercaseCharAt } from "../../utils";

interface SectionEntry {
  title: string;
  content: JSX.Element[];
}

interface SectionProps {
  entries: SectionEntry[];
  sectionNum: string;
}

const Sections = ({ entries, sectionNum }: SectionProps) => (
  <section>
    {entries.map(({ title, content }, i) => (
      <section class="group/section w-full">
        <div class="my-3 flex flex-col p-2">
          <div class="ml-auto w-full max-lg:text-right">
            <div class="font-sauce-code-pro">
              {`${sectionNum}.${getLowercaseCharAt(i)}`}
            </div>
            <div class="text-secondary-text text-2xl font-bold leading-none">
              {title}
            </div>
            <hr class="border-secondary-text border-dashed" />
          </div>
          <div class="py-4 lg:w-2/3 lg:self-end">{content}</div>
        </div>
      </section>
    ))}
  </section>
);

export default Sections;
