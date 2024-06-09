import { adminNavRoutes, navRoutes } from "../../../models/routes";
import { Heading, Icon, Link } from "../../shared";

const navClasses = `
  pb-3 pl-1 text-lg max-sm: bg-primary-bg dark:bg-primary-bg-dark 
  text-secondary-text dark:text-secondary-text-dark
`;

const circleIcon = <Icon icon={"\uebb4"} />;

const pageIndexClasses =
  "font-geist-mono text-primary-text dark:text-primary-text-dark";

interface NavProps {
  admin: boolean;
  current: string | undefined;
  mobileNav: boolean;
}

const Nav = ({ admin, current, mobileNav }: NavProps): JSX.Element => {
  const routes = admin === true ? adminNavRoutes : navRoutes;

  const listItemClasses = `
    flex h-5 items-end ${
      mobileNav
        ? "my-1 h-7 pl-3 text-xl"
        : "max-sm:h7 max-lg:pl-3 max-sm:my-1 max-sm:text-xl"
    }
  `;

  return (
    <nav class={navClasses}>
      <Heading
        variant={3}
        text="Sam Royall"
        className={mobileNav ? "hidden" : "max-lg:hidden"}
      />
      <ul>
        {routes.map(({ label, link }, i) => (
          <li class={listItemClasses}>
            <div class="mr-2 w-5 text-center max-sm:w-7">
              {current && label === current ? (
                <div>{circleIcon}</div>
              ) : (
                <span class={pageIndexClasses}>{`0${i}`}</span>
              )}
            </div>
            {current && label === current ? (
              <span>{label}</span>
            ) : (
              <Link href={link} target="_self">
                <span>{label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
