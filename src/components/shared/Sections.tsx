const getLowercaseCharAt = (i: number): string | null =>
  i >= 0 && i <= 25
    ? String.fromCharCode("a".charCodeAt(0) + i)
    : i > 25
      ? getLowercaseCharAt(i / 26 - 1)! + getLowercaseCharAt(i % 26)
      : null;

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
      <section class="group w-full">
        <div class="mb-6 mt-3 flex flex-col p-2 lg:flex-row lg:justify-between">
          <div class="lg:mb-0 lg:w-1/3">
            <span class="font-sauce-code-pro mr-2">
              {`${sectionNum}.${getLowercaseCharAt(i)}`}
            </span>
            <span class="text-secondary-text font-bold max-lg:text-base">
              {title}
            </span>
            <hr class="border-secondary-bg mb-8 mt-2 lg:hidden" />
          </div>
          <div class="lg:w-2/3">{content}</div>
        </div>
        <hr class="border-secondary-bg hidden group-last:hidden lg:block" />
      </section>
    ))}
  </section>
);

export default Sections;
