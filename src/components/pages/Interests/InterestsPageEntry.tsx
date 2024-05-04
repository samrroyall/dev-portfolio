import { Markdown } from "../../shared";

interface InterestsPageEntryProps {
  index: number;
  content: JSX.Element;
  text: string;
}

const InterestsPageEntry = ({
  index,
  content,
  text,
}: InterestsPageEntryProps) => {
  const order = index % 2 == 0 ? "" : "-reverse";
  const flexClasses = `flex items-center max-lg:flex-col lg:flex-row${order}`;
  const textPadding = `py-6 lg:p${index % 2 == 0 ? "r" : "l"}-6`;

  return (
    <div class="group/interestsection">
      <div class={flexClasses}>
        <div class={textPadding}>
          <Markdown text={text} />
        </div>
        {content}
      </div>
      <hr class="border-secondary-bg my-6 group-last/interestsection:hidden" />
    </div>
  );
};

export default InterestsPageEntry;
