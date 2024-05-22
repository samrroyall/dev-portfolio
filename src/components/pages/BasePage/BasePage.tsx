import { type DefaultPageProps } from "../../../models/routes";
import { BaseHtml, PageTitle } from "../../shared";
import Footer from "./Footer";
import Nav from "./Nav";

const contentFlexClasses = "flex flex-col lg:justify-between";

const contentSizeClasses =
  "h-screen w-full lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg";

interface BasePageProps extends DefaultPageProps {
  children: Html.Children;
  current?: string;
  pageTitle?: boolean;
  title?: string;
}

const BasePage = ({
  current,
  children,
  theme,
  pageTitle,
  title,
}: BasePageProps): JSX.Element => {
  return (
    <BaseHtml theme={theme} title={title}>
      <main class="relative">
        <div class="absolute left-0 top-0 hidden px-5 py-4 lg:inline-block">
          <Nav current={current} />
        </div>
        <div class={`mx-auto ${contentSizeClasses} ${contentFlexClasses}`}>
          <div class="overflow-y-auto overflow-x-hidden px-3 pb-6 pt-3 max-sm:pb-20">
            {pageTitle !== false && title ? (
              <PageTitle current={current} title={title} />
            ) : null}
            {children}
          </div>
          <div class="order-first w-full lg:order-last">
            <Footer current={current} theme={theme} />
          </div>
        </div>
      </main>
    </BaseHtml>
  );
};

export default BasePage;
