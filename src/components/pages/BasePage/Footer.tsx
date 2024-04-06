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
  current: string;
}

const Footer = ({ current }: FooterProps) => (
  <footer class="w-full text-lg">
    <hr class="text-secondary-text hidden lg:block" />
    <div class="flex items-center p-2">
      <div class="relative lg:hidden">
        <div id="footer-nav" class="absolute top-[1.5rem] hidden">
          <Nav current={current} border={true} />
        </div>
        <div
          class="cursor-pointer"
          hx-on:click={`htmx.toggleClass("#footer-nav", "hidden")`}
        >
          {menuIcon}
        </div>
      </div>
      <ul class="ml-auto flex">
        {icons.map(({ link, icon, title }) => (
          <>
            <li class="mx-1 hidden first:ml-0 last:mr-0 lg:inline-block">
              <Tooltip text={title}>
                <Icon link={link} icon={icon} />
              </Tooltip>
            </li>
            <li class="mx-1 first:ml-0 last:mr-0 lg:hidden">
              <Tooltip text={title} horizontal="left" vertical="below">
                <Icon link={link} icon={icon} />
              </Tooltip>
            </li>
          </>
        ))}
      </ul>
    </div>
    <hr class="text-secondary-text lg:hidden" />
  </footer>
);

export default Footer;
