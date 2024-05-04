import { type PropsWithChildren } from "beth-stack/jsx";
import { BaseHtml } from "../../shared";
import Footer from "./Footer";
import Nav from "./Nav";

const footerFlexClasses = "flex flex-col lg:justify-between";

const footerSizeClasses =
  "h-screen w-full lg:w-auto lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg";

interface BasePageProps {
  current?: string;
}

const BasePage = ({ current, children }: BasePageProps & PropsWithChildren) => (
  <BaseHtml>
    <main class="relative">
      <div class="absolute left-0 top-0 hidden px-5 py-4 lg:inline-block">
        <Nav current={current || null} />
      </div>
      <div class={`mx-auto ${footerSizeClasses} ${footerFlexClasses}`}>
        <div class="overflow-y-auto px-3 py-2">{children}</div>
        <div class="order-first w-full lg:order-last">
          <Footer current={current || null} />
        </div>
      </div>
    </main>
  </BaseHtml>
);

export default BasePage;
