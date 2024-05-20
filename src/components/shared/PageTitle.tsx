import { Heading } from "../shared";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => (
  <Heading
    variant={1}
    text={title}
    className={`dark:border-secondary-text-dark border-secondary-text mt-3 border-b py-3 text-center max-lg:border-0`}
  />
);

export default PageTitle;
