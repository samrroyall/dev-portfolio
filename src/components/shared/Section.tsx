import { type PropsWithChildren } from "beth-stack/jsx";
import { Strong } from ".";

interface SectionProps {
  title: string;
  subtitle?: string;
}

const Section = ({
  title,
  subtitle,
  children,
}: SectionProps & PropsWithChildren) => (
  <section class="group w-full">
    <div class="mb-10 mt-3 flex flex-col p-2 lg:flex-row lg:justify-between">
      <div class="mb-3 max-lg:text-base lg:mb-0 lg:w-1/3">
        <Strong>{title}</Strong>
        {subtitle ? (
          <div class="text-secondary-text font-light">{subtitle}</div>
        ) : null}
      </div>
      <div class="lg:w-2/3">{children}</div>
    </div>
    <hr class="border-secondary-bg group-last:hidden" />
  </section>
);

export default Section;
