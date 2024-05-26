import { type Cookie } from "elysia";
import { Heading, Icon } from "../../shared";
import Nav from "./Nav";

const footerNavColorClasses =
  "border-secondary-text dark:border-secondary-text-dark bg-primary-bg dark:bg-primary-bg-dark";

const footerNavPositionClasses =
  "absolute flex hidden w-full items-end justify-between border-b";

const footerNavClasses = `${footerNavPositionClasses} ${footerNavColorClasses}`;

const githubIcon = (
  <Icon icon={"\uf113"} link={"https://github.com/samrroyall"} />
);

const linkedInIcon = (
  <Icon icon={"\udb80\udf3b"} link={"https://linkedin.com/in/samrroyall"} />
);

const darkModeIcon = <Icon icon={"\uf4ee"} />;

const lightModeIcon = <Icon icon={"\uf522"} />;

const menuIcon = <Icon icon={"\ueb94"} />;

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
  admin: boolean;
  current: string | undefined;
  theme: Cookie<string | undefined>;
}

const Footer = ({ admin, current, theme }: FooterProps): JSX.Element => {
  const themeButton = (
    <button
      id="toggle-theme-button"
      hx-post="/toggletheme"
      hx-trigger="click"
      hx-swap="none"
      class="flex items-center"
    >
      {theme.value === "dark" ? darkModeIcon : lightModeIcon}
    </button>
  );

  const icons = [
    {
      icon: linkedInIcon,
      inMobileDropdown: true,
    },
    {
      icon: githubIcon,
      inMobileDropdown: true,
    },
    {
      icon: themeButton,
      inMobileDropdown: false,
    },
  ];

  return (
    <footer class="w-full text-xl max-sm:text-2xl xl:text-2xl">
      <hr class="border-secondary-text dark:border-secondary-text-dark max-lg:hidden" />
      <div class="relative flex items-center justify-between p-2">
        <button
          class="text-secondary-text dark:text-secondary-text-dark cursor-pointer lg:hidden"
          hx-on-click={`htmx.toggleClass("#footer-nav", "hidden")`}
        >
          {menuIcon}
        </button>
        <Heading variant={3} text="Sam Royall" className="lg:hidden" />
        <ul class="text-secondary-text dark:text-secondary-text-dark flex items-center justify-end lg:ml-auto">
          {icons.map(({ icon, inMobileDropdown }) => (
            <li
              class={`mx-1 first:ml-0 last:mr-0 ${inMobileDropdown ? "max-lg:hidden" : ""}`}
            >
              {icon}
            </li>
          ))}
        </ul>
      </div>
      <div id="footer-nav" class={footerNavClasses}>
        <Nav admin={admin} current={current} />
        <ul class="text-secondary-text dark:text-secondary-text-dark flex items-center pb-3 pr-3">
          {icons.map(({ icon, inMobileDropdown }) => (
            <li
              class={`mx-1 leading-6 first:ml-0 last:mr-0 max-sm:leading-7 ${!inMobileDropdown ? "hidden" : ""}`}
            >
              {icon}
            </li>
          ))}
        </ul>
      </div>
      <hr class="border-secondary-text dark:border-secondary-text-dark lg:hidden" />
      <script>{optimisticallyUpdateTheme}</script>
    </footer>
  );
};

export default Footer;
