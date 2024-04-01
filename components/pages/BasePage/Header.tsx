import { Link } from "../../shared";

const pages = [
  "home",
  "interests",
  "blog",
  "contact",
]

const Header = () => (
  <header>
    <ul class="sauce-code-pro">
      {pages.map((p, i) => 
        <li >
          <span class="ml-2 font-light">{`0${i}`}</span>
          <Link href="#">
            <span class="ml-2 font-medium text-white">/{p}</span>
          </Link>
        </li>
      )}
    </ul>
  </header>
);

export default Header;
