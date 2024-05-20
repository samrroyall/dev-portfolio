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
  title?: string;
}

const BasePage = ({
  current,
  children,
  theme,
  title,
}: BasePageProps): JSX.Element => (
  <BaseHtml theme={theme}>
    <main class="relative">
      <div class="absolute left-0 top-0 hidden px-5 py-4 lg:inline-block">
        <Nav current={current} />
      </div>
      <div class={`mx-auto ${contentSizeClasses} ${contentFlexClasses}`}>
        <div class="max-lg:hidden">
          {title ? <PageTitle title={title} /> : null}
        </div>
        <div class="overflow-y-auto overflow-x-hidden px-3 pb-6 pt-3 max-sm:pb-14">
          <div class="lg:hidden">
            {title ? <PageTitle title={title} /> : null}
          </div>
          {children}
        </div>
        <div class="order-first w-full lg:order-last">
          <Footer current={current} theme={theme} />
        </div>
      </div>
    </main>
  </BaseHtml>
);

export default BasePage;
