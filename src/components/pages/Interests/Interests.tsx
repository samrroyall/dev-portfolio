import { type InterestsData } from "../../../index";
import { Sections } from "../../shared";
import BasePage from "../BasePage";
import SpotifyTopThreeTracks from "./SpotifyTopThreeTracks";
import StravaCalendar from "./StravaCalendar";

interface InterestsProps {
  data: InterestsData;
}

const Interests = ({ data }: InterestsProps) => {
  const entries = [
    {
      title: "Running",
      content: [
        <div class="flex justify-center">
          <StravaCalendar month={data.strava} />
        </div>,
      ],
    },
    {
      title: "Music",
      content: [
        <div class="flex justify-center">
          <SpotifyTopThreeTracks tracks={data.spotify} />
        </div>,
      ],
    },
    {
      title: "Movies",
      content: [<div class="text-center">Letterboxd recently seen</div>],
    },
  ];

  return (
    <BasePage current="interests">
      <Sections sectionNum="01" entries={entries} />
    </BasePage>
  );
};

export default Interests;
