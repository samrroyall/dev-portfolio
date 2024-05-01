import { Icon, Link } from "../../shared";

const pages = [
  { label: "home", link: "/" },
  { label: "interests", link: "/interests" },
  { label: "blog", link: "/blog" },
  { label: "contact", link: "/contact" },
];

const circleIcon = <Icon className="text-secondary-text" icon={"\uf111"} />;

interface NavProps {
  current: string | null;
}

const Nav = ({ current }: NavProps) => (
  <nav class="bg-primary-bg pb-3 pl-1">
    <ul>
      {pages.map(({ label, link }, i) => (
        <li class="flex">
          <div class="w-8 text-center font-light">
            {current && label === current ? (
              circleIcon
            ) : (
              <span class="font-sauce-code-pro">{`0${i}`}</span>
            )}
          </div>
          <div class="text-secondary-text">
            {!current || label !== current ? (
              <Link href={link} target="_self">
                {label}
              </Link>
            ) : (
              label
            )}
          </div>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
