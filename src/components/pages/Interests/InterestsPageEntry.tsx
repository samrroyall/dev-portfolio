interface InterestsPageEntryProps {
  index: number;
  widget: JSX.Element | null;
  text: string | null;
}

const InterestsPageEntry = ({
  index,
  widget,
  text,
}: InterestsPageEntryProps) => (
  <div class="group/interestsection">
    <div
      class={`flex justify-center ${index % 2 === 0 ? "lg:justify-end" : "lg:justify-start"}`}
    >
      <div class="flex flex-col items-center lg:max-w-[350]">
        {widget}
        {text ? <p class="mt-3">{text}</p> : null}
      </div>
    </div>
    <hr class="border-secondary-bg my-6 group-last/interestsection:hidden" />
  </div>
);

export default InterestsPageEntry;
