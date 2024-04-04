import { Code, Icon, Link } from "../../shared";

interface NavProps {
  current: string;
}

const pages = [
  { label: "home", link: "/" },
  { label: "interests", link: "/interests" },
  { label: "blog", link: "/blog" },
  { label: "contact", link: "/contact" },
];

const Nav = ({ current }: NavProps) => (
  <nav>
    <ul>
      {pages.map(({ label, link }, i) => (
        <li class="flex">
          <div class="w-8 text-center font-light">
            {label === current ? (
              <Icon icon={"\uf111"} />
            ) : (
              <Code>{`0${i}`}</Code>
            )}
          </div>
          <div class="text-secondary-text font-medium">
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
