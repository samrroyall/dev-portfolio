import { musicText, runningText } from "../../../data/api/interests";
import { type DefaultPageProps } from "../../../models/components";
import { type RunMonth, type Track } from "../../../models/interests";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps extends DefaultPageProps {
  spotify: Promise<Track[]>;
  strava: Promise<RunMonth>;
}

const Interests = async ({
  spotify,
  strava,
  theme,
}: InterestsProps): Promise<JSX.Element> => {
  const content = [
    {
      title: "Running",
      text: runningText,
      content: await StravaCalendar({ month: strava }),
    },
    {
      title: "Music",
      text: musicText,
      content: await SpotifyTopTracks({ data: spotify }),
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
