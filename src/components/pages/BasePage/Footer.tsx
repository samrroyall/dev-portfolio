import { Icon, Tooltip } from "../../shared";

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

const Footer = () => (
  <footer class="w-full">
    <hr class="text-secondary-text" />
    <div class="flex items-center justify-between p-2">
      <div class="flex text-sm">
        <Icon className="mr-2" icon={"\ueb1a"} />
        <div>Chicago, IL</div>
      </div>
      <ul class="flex text-lg">
        {icons.map(({ link, icon, title }) => (
          <li class="mx-1 first:ml-0 last:mr-0">
            <Tooltip text={title}>
              <Icon link={link} icon={icon} />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
