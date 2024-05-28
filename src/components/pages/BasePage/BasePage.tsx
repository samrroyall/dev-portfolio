import { type DefaultPageProps } from "../../../models/components";
import { BaseHtml, PageTitle } from "../../shared";
import Footer from "./Footer";
import Nav from "./Nav";

interface BasePageProps extends DefaultPageProps {
  children: Html.Children;
  admin?: boolean;
  current?: string;
  fullPage?: boolean;
  pageTitle?: boolean;
  title?: string;
}

const BasePage = ({
  admin,
  current,
  children,
  fullPage,
  theme,
  pageTitle,
  title,
}: BasePageProps): JSX.Element => {
  const contentSizeClasses =
    fullPage !== true
      ? "mx-auto lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg"
      : "";

  return (
    <BaseHtml theme={theme} title={title}>
      <main class="relative">
        <div class="absolute left-0 top-0 hidden px-5 py-4 lg:inline-block">
          <Nav admin={admin ?? false} current={current} />
        </div>
        <div
          class={`flex h-screen w-full flex-col lg:justify-between ${contentSizeClasses}`}
        >
          <div class="h-full overflow-y-auto overflow-x-hidden px-3 pb-6 pt-3 max-sm:pb-20">
            {pageTitle !== false && title ? (
              <PageTitle
                admin={admin}
                className={fullPage ? "mx-auto w-[640px]" : ""}
                current={current}
                title={title}
              />
            ) : null}
            {children}
          </div>
          <div class="order-first w-full lg:order-last">
            <Footer admin={admin ?? false} current={current} theme={theme} />
          </div>
        </div>
      </main>
    </BaseHtml>
  );
};

export default BasePage;
