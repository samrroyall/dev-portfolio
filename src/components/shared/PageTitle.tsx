import { navRoutes } from "../../models/routes";
import { Heading } from "../shared";

interface PageTitleProps {
  title: string;
  current?: string;
}

const PageTitle = ({ current, title }: PageTitleProps) => {
  const currentIdx = navRoutes.findIndex(({ label }) => label === current);

  return (
    <div class="mx-2 mt-3 flex items-end p-2">
      {current ? (
        <span class="font-geist-mono mr-1 leading-7">{`0${currentIdx}`}</span>
      ) : null}
      <Heading variant={1} text={title} />
    </div>
  );
};

export default PageTitle;
