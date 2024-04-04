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
  <section class="group">
    <div class="mb-10 mt-3 flex justify-between p-2">
      <div class="w-1/3">
        <Strong>{title}</Strong>
        {subtitle ? <div class="font-light text-white">{subtitle}</div> : null}
      </div>
      <div class="w-2/3">{children}</div>
    </div>
    <hr class="border-zinc-800 group-last:hidden" />
  </section>
);

export default Section;
