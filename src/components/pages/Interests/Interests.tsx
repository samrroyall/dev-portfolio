import { type InterestsData } from "../../../api/models/interests";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps {
  data: InterestsData;
}

const Interests = ({ data }: InterestsProps) => {
  const entries = [
    {
      text: `I love to run. This is a live view of my runs so far this month 
via the Strava API.`,
      widget: <StravaCalendar month={data.strava} />,
    },
    {
      text: `I also love to listen to music. These are my top songs over the 
past month via the Spotify API.`,
      widget: <SpotifyTopTracks tracks={data.spotify} />,
    },
    {
      text: "Wait and see if I get access to Letterboxd API beta...",
    },
  ];

  return (
    <BasePage current="interests">
      <Sections
        sectionNum="01"
        entries={[
          {
            title: "Interests",
            fullPage: true,
            content: entries.map(({ widget, text }, i) => (
              <InterestsPageEntry
                index={i}
                widget={widget || null}
                text={text || null}
              />
            )),
          },
        ]}
      />
    </BasePage>
  );
};

export default Interests;
