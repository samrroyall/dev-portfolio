import { type HomeSection } from "../../../api/models/home";
import { Sections } from "../../shared";
import BasePage from "../BasePage";
import HomeSectionEntry from "./HomeSectionEntry";

interface HomeProps {
  data: Promise<HomeSection[]>;
}

const Home = async ({ data }: HomeProps) => (
  <BasePage current="home">
    <Sections
      sectionNum="00"
      entries={(await data).map(({ title, entries }) => ({
        title,
        content: entries.map((entry) => <HomeSectionEntry entry={entry} />),
      }))}
    />
  </BasePage>
);

export default Home;
