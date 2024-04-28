import { type InterestsData } from "../../../index";
import { Sections } from "../../shared";
import BasePage from "../BasePage";
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
          <StravaCalendar data={data.strava} />
        </div>,
      ],
    },
    {
      title: "Music",
      content: [<div class="text-center">Spotify recently listened to</div>],
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
