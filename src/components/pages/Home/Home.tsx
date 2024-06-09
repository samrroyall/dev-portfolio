import { type DefaultPageProps } from "../../../models/components";
import { type HomeSection } from "../../../models/home";
import { BasePage } from "../../pages";
import { NoData, Sections } from "../../shared";
import HomeSectionEntry from "./HomeSectionEntry";

interface HomeProps extends DefaultPageProps {
  data: Promise<HomeSection[]>;
}

const Home = async ({ data, theme }: HomeProps): Promise<JSX.Element> => {
  const sections = await data;

  return (
    <BasePage current="home" theme={theme} title="Home">
      {sections.length === 0 ? (
        <NoData className="my-3 justify-center" />
      ) : (
        <Sections
          sectionNum="00"
          entries={sections.map(({ title, entries }) => ({
            title,
            content: entries.map((entry) => <HomeSectionEntry entry={entry} />),
          }))}
        />
      )}
    </BasePage>
  );
};

export default Home;
