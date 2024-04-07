import { Code, Icon, Link } from "../../shared";

const pages = [
  { label: "home", link: "/" },
  { label: "interests", link: "/interests" },
  { label: "blog", link: "/blog" },
  { label: "contact", link: "/contact" },
];

const circleIcon = <Icon icon={"\uf111"} />;

interface NavProps {
  current: string;
}

const Nav = ({ current }: NavProps) => (
  <nav class="bg-primary-bg pb-3 pl-1 text-sm">
    <ul>
      {pages.map(({ label, link }, i) => (
        <li class="flex">
          <div class="w-8 text-center font-light">
            {label === current ? circleIcon : <Code>{`0${i}`}</Code>}
          </div>
          <div class="text-secondary-text">
            {label !== current ? (
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
