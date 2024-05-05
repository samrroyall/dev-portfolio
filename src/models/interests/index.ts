import { type Track } from "./spotify";
import { type RunMonth } from "./strava";

export interface InterestsData {
  letterboxd: null;
  spotify: Promise<Track[]>;
  strava: Promise<RunMonth>;
}

export {
  type ApiSpotifyTopTracksResponse,
  type Track,
  mapApiSpotifyTrackToTrack,
} from "./spotify";

export {
  mapApiStravaActivityToRunDay,
  type ApiStravaActivitiesResponse,
  type RunDay,
  type RunMonth,
  type RunWeek,
} from "./strava";
