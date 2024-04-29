import { Icon, Tooltip } from "../../shared";
import Nav from "./Nav";

interface FooterIcon {
  link: string;
  icon: string;
  title: string;
}

const icons: FooterIcon[] = [
  { link: "#", icon: "\udb80\ude19", title: "resume" },
  {
    link: "https://linkedin.com/in/samrroyall",
    icon: "\udb80\udf3b",
    title: "linkedin",
  },
  {
    link: "https://github.com/samrroyall",
    icon: "\uf113",
    title: "github",
  },
];

const menuIcon = <Icon icon={"\ueb94"} />;

interface FooterProps {
  current: string | null;
}

const Footer = ({ current }: FooterProps) => (
  <footer class="w-full text-lg">
    <hr class="border-secondary-text hidden lg:block" />
    <div class="flex items-center p-2">
      <div
        class="cursor-pointer lg:hidden"
        hx-on:click={`htmx.toggleClass("#footer-nav", "hidden")`}
      >
        {menuIcon}
      </div>
      <ul class="text-secondary-text ml-auto flex">
        {icons.map(({ link, icon, title }) => (
          <li class="mx-1 first:ml-0 last:mr-0">
            <div class="hidden lg:inline-block">
              <Tooltip text={title}>
                <Icon link={link} icon={icon} />
              </Tooltip>
            </div>
            <div class="lg:hidden">
              <Icon link={link} icon={icon} />
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div id="footer-nav" class="border-bottom hidden">
      <Nav current={current} />
    </div>
    <hr class="border-secondary-text lg:hidden" />
  </footer>
);

export default Footer;
