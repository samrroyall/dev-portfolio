import { Icon } from "../../shared";

const icons = [
  {link: "#", icon: "\udb80\uddee"},
  {link: "#", icon: "\udb80\ude19"},
  {link: "https://linkedin.com/in/samrroyall", icon: "\udb80\udf3b"},
  {link: "https://github.com/samrroyall", icon: "\uf113"},
];

const Footer = () => (
  <footer class="pt-2 w-full">
    <hr class="text-white"/>
    <div class="p-2 flex justify-between items-center">
      <div class="flex text-sm">
        <Icon className="mr-2" icon={"\ueb1a"} />
        <div>Chicago, IL</div>
      </div>
      <ul class="flex text-lg">
        {icons.map(({link, icon}) => 
          <li class="mx-1 first:ml-0 last:mr-0">
            <Icon link={link} icon={icon} />
          </li>
        )}
      </ul>
    </div>
  </footer>
);

export default Footer;
