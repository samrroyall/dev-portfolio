import { type DefaultPageProps } from "../../../models/components";
import { BaseHtml, PageTitle } from "../../shared";
import Footer from "./Footer";
import Nav from "./Nav";

const injectDateIntoInterestsLink = `
  const links = document.querySelectorAll("a[href='/interests']");

  links.forEach(link => {
    link.addEventListener("click", function(event) {
      const currentDate = new Date();
      const originalUrl = event.currentTarget.href;

      const url = new URL(originalUrl);
      url.searchParams.append('clientDate', currentDate);

      event.currentTarget.href = url.toString();
    });
  })
    
`;

interface BasePageProps extends DefaultPageProps {
  children: Html.Children;
  admin?: boolean;
  current?: string;
  fullPage?: boolean;
  mobileNav?: boolean;
  pageTitle?: boolean;
  title?: string;
}

const BasePage = ({
  admin,
  current,
  children,
  fullPage,
  mobileNav,
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
      <main class="relative h-full">
        <div
          class={`absolute left-0 top-0 px-5 py-4 ${mobileNav ? "hidden" : "max-lg:hidden"}`}
        >
          <Nav
            admin={admin ?? false}
            mobileNav={mobileNav ?? false}
            current={current}
          />
        </div>
        <div
          class={`flex h-full w-full flex-col lg:justify-between ${contentSizeClasses}`}
        >
          <div class="h-full overflow-y-auto overflow-x-hidden p-3">
            {pageTitle !== false && title ? (
              <PageTitle
                admin={admin}
                className={fullPage && !mobileNav ? "mx-auto w-[640px]" : ""}
                current={current}
                title={title}
              />
            ) : null}
            {children}
          </div>
          <div
            class={`order-first w-full ${!mobileNav ? "lg:order-last" : ""}`}
          >
            <Footer
              admin={admin ?? false}
              current={current}
              mobileNav={mobileNav ?? false}
              theme={theme}
            />
          </div>
          <script>{injectDateIntoInterestsLink}</script>
        </div>
      </main>
    </BaseHtml>
  );
};

export default BasePage;
