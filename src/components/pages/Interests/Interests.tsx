import { Sections } from "../../shared";
import BasePage from "../BasePage";

const entries = [
  { title: "Running", content: [<span>Strava calendar</span>] },
  { title: "Music", content: [<span>Spotify recently listened to</span>] },
  { title: "Movies", content: [<span>Letterboxd recently seen</span>] },
  { title: "Other Interest", content: [<span>Other interest widget</span>] },
];

const Interests = () => (
  <BasePage current="interests">
    <Sections sectionNum="01" entries={entries} />
  </BasePage>
);

export default Interests;
