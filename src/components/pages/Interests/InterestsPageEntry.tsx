import { Markdown, NoData, TextDivider } from "../../shared";

interface InterestsPageEntryProps {
  index: number;
  content: JSX.Element | null;
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
        class={`flex max-lg:flex-col max-lg:items-center lg:flex-row${even ? "" : "-reverse"}`}
      >
        <div class={`py-6 max-lg:text-center lg:p${even ? "r" : "l"}-6`}>
          <Markdown text={text} />
        </div>
        {content ? (
          content
        ) : (
          <NoData
            className={`w-[350px] justify-center lg:mt-9 lg:justify-${even ? "end" : "start"}`}
          />
        )}
      </div>
      <TextDivider className="group-last/interestsection:hidden" />
    </div>
  );
};

export default InterestsPageEntry;
