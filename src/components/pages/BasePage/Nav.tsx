import { navRoutes } from "../../../models/routes";
import { Icon, Link } from "../../shared";

const circleIcon = (
  <Icon className="text-sm max-sm:text-base" icon={"\uebb4"} />
);

interface NavProps {
  current: string | undefined;
}

const Nav = ({ current }: NavProps): JSX.Element => (
  <nav class="bg-primary-bg dark:bg-primary-bg-dark text-secondary-text dark:text-secondary-text-dark pb-3 pl-1 text-base">
    <ul>
      {navRoutes.map(({ label, link }, i) => (
        <li class="flex h-5 items-end max-sm:h-7">
          <div class="w-8 text-center max-sm:mr-1">
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
