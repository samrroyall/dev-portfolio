import { musicText, runningText } from "../../../data/api/interests";
import { type DefaultPageProps } from "../../../models/components";
import { type RunMonth, type Track } from "../../../models/interests";
import { BasePage } from "../../pages";
import { NoData, Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps extends DefaultPageProps {
  spotifyData: Promise<Track[] | null>;
  stravaData: Promise<RunMonth | null>;
}

const Interests = async ({
  spotifyData,
  stravaData,
  theme,
}: InterestsProps): Promise<JSX.Element> => {
  const runs = await stravaData;
  const stravaContent = runs ? StravaCalendar({ runs }) : <NoData />;

  const tracks = await spotifyData;
  const spotifyContent = tracks ? SpotifyTopTracks({ tracks }) : <NoData />;

  const content = [
    {
      title: "Running",
      text: runningText,
      content: stravaContent,
    },
    {
      title: "Music",
      text: musicText,
      content: spotifyContent,
    },
  ];

  return (
    <BasePage current="interests" theme={theme} title="My Interests">
      <Sections
        sectionNum="01"
        entries={content.map(({ content, text, title }, i) => ({
          title,
          fullPage: true,
          content: [
            <InterestsPageEntry index={i} content={content} text={text} />,
          ],
        }))}
      />
    </BasePage>
  );
};

export default Interests;
