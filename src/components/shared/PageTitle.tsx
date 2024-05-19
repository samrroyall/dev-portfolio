const borderClasses =
  "border-b dark:border-secondary-text-dark border-secondary-text max-lg:border-0";

const textClasses =
  "text-center text-4xl font-black text-secondary-text dark:text-secondary-text-dark";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => (
  <div class={`mt-3 block py-3 ${borderClasses} ${textClasses}`}>{title}</div>
);

export default PageTitle;
