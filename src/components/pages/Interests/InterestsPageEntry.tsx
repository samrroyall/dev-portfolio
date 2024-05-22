import { Markdown, TextDivider } from "../../shared";

interface InterestsPageEntryProps {
  index: number;
  content: JSX.Element;
  text: string;
}

const InterestsPageEntry = ({
  index,
  content,
  text,
}: InterestsPageEntryProps): JSX.Element => {
  const even = index % 2 == 0;

  return (
    <div class="group/interestsection">
      <div
        class={`flex items-center max-lg:flex-col lg:flex-row${even ? "" : "-reverse"}`}
      >
        <div class={`py-6 max-lg:text-center lg:p${even ? "r" : "l"}-6`}>
          <Markdown text={text} />
        </div>
        {content}
      </div>
      <TextDivider className="group-last/interestsection:hidden" />
    </div>
  );
};

export default InterestsPageEntry;
