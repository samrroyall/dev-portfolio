import { musicText, runningText } from "../../../data/api/interests";
import { type InterestsData } from "../../../models/interests";
import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps extends DefaultPageProps {
  data: InterestsData;
}

const Interests = async ({
  data,
  theme,
}: InterestsProps): Promise<JSX.Element> => {
  const content = [
    {
      title: "Running",
      text: runningText,
      content: await StravaCalendar({ month: data.strava }),
    },
    {
      title: "Music",
      text: musicText,
      content: await SpotifyTopTracks({ data: data.spotify }),
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
