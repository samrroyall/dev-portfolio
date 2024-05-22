import { navRoutes } from "../../../models/routes";
import { Heading, Icon, Link } from "../../shared";

const colorClasses =
  "bg-primary-bg dark:bg-primary-bg-dark text-secondary-text dark:text-secondary-text-dark";

const circleIcon = (
  <Icon className="text-sm max-sm:text-base" icon={"\uebb4"} />
);

interface NavProps {
  current: string | undefined;
}

const Nav = ({ current }: NavProps): JSX.Element => (
  <nav class={`pb-3 pl-1 text-base max-lg:pl-3 ${colorClasses}`}>
    <Heading variant={3} text="Sam Royall" className="max-lg:hidden" />
    <ul>
      {navRoutes.map(({ label, link }, i) => (
        <li class="flex h-5 items-end max-sm:h-7">
          <div class="mr-2 basis-5 text-center">
            {current && label === current ? (
              <div class="mb-[1px]">{circleIcon}</div>
            ) : (
              <span class="font-geist-mono text-primary-text dark:text-primary-text-dark">{`0${i}`}</span>
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
