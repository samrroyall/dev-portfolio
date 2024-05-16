import { type InterestsData } from "../../../models/interests";
import { type DefaultPageProps } from "../../../models/routes";
import { BasePage } from "../../pages";
import { Sections } from "../../shared";
import InterestsPageEntry from "./InterestsPageEntry";
import SpotifyTopTracks from "./SpotifyTopTracks";
import StravaCalendar from "./StravaCalendar";

const runningText = `Running is one of the best things I have found to regulate 
both my physical and mental health. 

I love to run as much as I can, and I upload all of my runs on Strava. I 
created this calendar widget using the Strava API to display my runs for the 
current month. 

Click on one of the days if you would like to see detailed information about a 
given run!`;

const musicText = `I also love to listen to music. I generally listen to 
ambient music while I work, but love many other genres from rap to dream pop to 
folk. 

If you're curious about what I'm listening to at the moment, I created this 
widget using the Spotify API that displays my top songs over the past month.`;

interface InterestsProps extends DefaultPageProps {
  data: InterestsData;
}

const Interests = async ({
  data,
  theme,
}: InterestsProps): Promise<JSX.Element> => {
  const entries = [
    {
      text: runningText,
      content: await StravaCalendar({ month: data.strava }),
    },
    {
      text: musicText,
      content: await SpotifyTopTracks({ data: data.spotify }),
    },
  ];

  return (
    <BasePage current="interests" theme={theme}>
      <Sections
        sectionNum="01"
        entries={[
          {
            title: "Interests",
            fullPage: true,
            content: entries.map(({ content, text }, i) => (
              <InterestsPageEntry index={i} content={content} text={text} />
            )),
          },
        ]}
      />
    </BasePage>
  );
};

export default Interests;
