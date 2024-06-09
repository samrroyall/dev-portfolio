import { type Cookie } from "elysia";
import { Heading, Icon, Link } from "../../shared";
import Nav from "./Nav";

const borderSecondaryText =
  "border-secondary-text dark:border-secondary-text-dark";

const textSecondary = "text-secondary-text dark:text-secondary-text-dark";

const footerNavClasses = `
  absolute flex hidden w-full items-end justify-between border-b bg-primary-bg 
  dark:bg-primary-bg-dark ${borderSecondaryText}
`;

const iconItemClasses = "mx-1 leading-6 first:ml-0 last:mr-0 max-sm:leading-7";

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
  mobileNav: boolean;
  theme: Cookie<string | undefined>;
}

const Footer = ({
  admin,
  current,
  mobileNav,
  theme,
}: FooterProps): JSX.Element => {
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

  const menuButton = (
    <button
      class={`cursor-pointer ${!mobileNav ? "lg:hidden" : ""}`}
      hx-on-click={`htmx.toggleClass("#mobile-dropdown", "hidden")`}
    >
      {menuIcon}
    </button>
  );

  const icons = [
    {
      icon: linkedInIcon,
      moveToMobileDropdown: true,
    },
    {
      icon: githubIcon,
      moveToMobileDropdown: true,
    },
    {
      icon: themeButton,
      moveToMobileDropdown: false,
    },
  ];

  const mobileDropdown = (
    <>
      <div id="mobile-dropdown" class={footerNavClasses}>
        <Nav admin={admin} current={current} mobileNav={mobileNav} />
        <ul class="flex items-center pb-3 pr-3">
          {icons
            .filter(({ moveToMobileDropdown }) => moveToMobileDropdown)
            .map(({ icon }) => (
              <li class={iconItemClasses}>{icon}</li>
            ))}
        </ul>
      </div>
      <hr class={`${borderSecondaryText} ${!mobileNav ? "lg:hidden" : ""}`} />
    </>
  );

  const footerIcons = (
    <ul
      class={`flex items-center justify-end ${!mobileNav ? "lg:ml-auto" : ""}`}
    >
      {icons.map(({ icon, moveToMobileDropdown }) =>
        moveToMobileDropdown ? (
          <li class={`${iconItemClasses} ${mobileNav ? "" : "max-lg:"}hidden`}>
            {icon}
          </li>
        ) : (
          <li class={iconItemClasses}>{icon}</li>
        ),
      )}
    </ul>
  );

  return (
    <footer class={`max-xs:text-3xl w-full text-2xl ${textSecondary}`}>
      <hr
        class={`${borderSecondaryText} ${mobileNav ? "" : "max-lg:"}hidden`}
      />
      <div class="relative flex items-center justify-between p-2">
        {menuButton}
        <Link href="/" noUnderline={true} target="_self">
          <Heading
            variant={3}
            text="Sam Royall"
            className={!mobileNav ? "lg:hidden" : ""}
          />
        </Link>
        {footerIcons}
      </div>
      {mobileDropdown}
      <script>{optimisticallyUpdateTheme}</script>
    </footer>
  );
};

export default Footer;
