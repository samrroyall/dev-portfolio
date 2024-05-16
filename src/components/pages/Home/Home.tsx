import { type HomeSection } from "../../../models/home";
import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import HomeSectionEntry from "./HomeSectionEntry";

interface HomeProps extends DefaultPageProps {
  data: Promise<HomeSection[]>;
}

const Home = async ({ data, theme }: HomeProps): Promise<JSX.Element> => (
  <BasePage current="home" theme={theme}>
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
