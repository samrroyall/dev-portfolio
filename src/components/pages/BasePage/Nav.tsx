import { navRoutes } from "../../../models/routes";
import { Heading, Icon, Link } from "../../shared";

const colorClasses =
  "bg-primary-bg dark:bg-primary-bg-dark text-secondary-text dark:text-secondary-text-dark";

const circleIcon = <Icon icon={"\uebb4"} />;

const pageIndexClasses =
  "font-geist-mono text-primary-text dark:text-primary-text-dark";

interface NavProps {
  current: string | undefined;
}

const Nav = ({ current }: NavProps): JSX.Element => (
  <nav class={`pb-3 pl-1 text-lg max-lg:pl-3 max-sm:text-xl ${colorClasses}`}>
    <Heading variant={3} text="Sam Royall" className="max-lg:hidden" />
    <ul>
      {navRoutes.map(({ label, link }, i) => (
        <li class="flex h-5 items-end max-sm:h-7">
          <div class="mr-2 basis-5 text-center">
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

export default Nav;
