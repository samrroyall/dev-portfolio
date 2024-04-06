import { type PropsWithChildren } from "beth-stack/jsx";
import { BaseHtml } from "../../shared";
import Footer from "./Footer";
import Nav from "./Nav";

interface BasePageProps {
  current: string;
}

const BasePage = ({ current, children }: BasePageProps & PropsWithChildren) => (
  <BaseHtml>
    <main class="relative">
      <div class="absolute left-0 top-0 hidden px-5 py-4 lg:inline-block">
        <Nav current={current} />
      </div>
      <div class="mx-auto flex h-screen w-full flex-col justify-between md:w-auto md:max-w-screen-md">
        <div class="align-self-top my-2 overflow-y-auto px-3">{children}</div>
        <div class="w-full">
          <Footer current={current} />
        </div>
      </div>
    </main>
  </BaseHtml>
);

export default BasePage;
