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
    { title: "Music", content: [<span>Spotify recently listened to</span>] },
    { title: "Movies", content: [<span>Letterboxd recently seen</span>] },
  ];

  return (
    <BasePage current="interests">
      <Sections sectionNum="01" entries={entries} />
    </BasePage>
  );
};

export default Interests;
