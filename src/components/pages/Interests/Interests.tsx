import {
  generalText,
  musicText,
  runningText,
} from "../../../data/api/interests";
import { type DefaultPageProps } from "../../../models/components";
import { type RunMonth, type Track } from "../../../models/interests";
import { BasePage } from "../../pages";
import { NoData, Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps extends DefaultPageProps {
  clientDate: Date | undefined;
  spotifyData: Promise<Track[] | null>;
  stravaData: Promise<RunMonth | null>;
}

const Interests = async ({
  clientDate,
  spotifyData,
  stravaData,
  theme,
}: InterestsProps): Promise<JSX.Element> => {
  const runs = await stravaData;
  const stravaContent = runs ? (
    StravaCalendar({ clientDate, runs })
  ) : (
    <NoData />
  );

  const tracks = await spotifyData;
  const spotifyContent = tracks ? SpotifyTopTracks({ tracks }) : <NoData />;

  const content = [
    {
      title: "General",
      text: generalText,
    },
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
