import { type Track } from "./spotify";
import { type RunMonth } from "./strava";

export interface InterestsData {
  letterboxd: null;
  spotify: Promise<[Track, Track, Track]>;
  strava: Promise<RunMonth>;
}
