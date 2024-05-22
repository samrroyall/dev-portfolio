import { type Cookie } from "elysia";
import { Heading, Icon } from "../../shared";
import Nav from "./Nav";

const githubIcon = (
  <Icon icon={"\uf113"} link={"https://github.com/samrroyall"} />
);

const linkedInIcon = (
  <Icon icon={"\udb80\udf3b"} link={"https://linkedin.com/in/samrroyall"} />
);

const menuIcon = <Icon icon={"\ueb94"} />;

const darkModeIcon = <Icon icon={"\udb81\udd94"} />;

const lightModeIcon = <Icon icon={"\uf522"} />;

const optimisticallyUpdateTheme = `
document.body.addEventListener("htmx:afterRequest", function(evt) {
  const toggleButton = document.getElementById("toggle-theme-button");
  if (evt.target === toggleButton) {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      toggleButton.innerHTML = ${JSON.stringify(lightModeIcon)};
    } else {
      html.classList.add("dark");
      toggleButton.innerHTML = ${JSON.stringify(darkModeIcon)};
    }
  }
})
`;

interface FooterProps {
  current: string | undefined;
  theme: Cookie<string | undefined>;
}

const Footer = ({ current, theme }: FooterProps): JSX.Element => {
  const themeButton = (
    <button
      id="toggle-theme-button"
      hx-post="/toggletheme"
      hx-trigger="click"
      hx-swap="none"
    >
      {theme.value === "dark" ? darkModeIcon : lightModeIcon}
    </button>
  );

  const icons = [themeButton, linkedInIcon, githubIcon];

  return (
    <footer class="w-full text-lg max-sm:text-xl">
      <hr class="border-secondary-text dark:border-secondary-text-dark max-lg:hidden" />
      <div class="text-secondary-text dark:text-secondary-text-dark relative flex items-center justify-between p-2 ">
        <div
          class="basis-20 cursor-pointer lg:hidden"
          hx-on:click={`htmx.toggleClass("#footer-nav", "hidden")`}
        >
          {menuIcon}
        </div>
        <Heading variant={3} text="Sam Royall" className="lg:hidden" />
        <ul class="flex basis-20 justify-end lg:ml-auto">
          {icons.map((icon) => (
            <li class="mx-1 first:ml-0 last:mr-0">{icon}</li>
          ))}
        </ul>
      </div>
      <div
        id="footer-nav"
        class="border-secondary-text dark:border-secondary-text-dark absolute hidden w-full border-b"
      >
        <Nav current={current} />
      </div>
      <hr class="border-secondary-text dark:border-secondary-text-dark lg:hidden" />
      <script>{optimisticallyUpdateTheme}</script>
    </footer>
  );
};

export default Footer;
