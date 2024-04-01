import type { PropsWithChildren } from "beth-stack/jsx";

import { BaseHtml } from "../../shared";
import Footer from "./Footer";
import Header from "./Header";

const BasePage = ({ children }: PropsWithChildren) => (
  <BaseHtml>
    <main class="relative">
      <nav class="absolute top-0 left-0 py-4 px-5">
        <Header />
      </nav>
      <div class="mx-auto h-screen max-w-screen-md flex flex-col justify-between">
        <div class="pr-3 align-self-top overflow-y-scroll">
          {children}
        </div>
        <div class="pt-2 w-full">
          <Footer />
        </div>
      </div>
    </main>
  </BaseHtml>
);

export default BasePage;
