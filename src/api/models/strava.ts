export interface ApiStravaActivity {
  id: number;
  sport_type: string;
  distance: number;
  elapsed_time: number;
  start_date_local: string;
  average_heartrate?: number;
}

export type ApiStravaActivitiesResponse = ApiStravaActivity[];

export interface RunDay {
  id: number;
  day: number; // 1-indexed
  miles: number;
  minutesPerMile: number;
  avgBpm: number | null;
}

export type RunWeek = [
  RunDay[] | null,
  RunDay[] | null,
  RunDay[] | null,
  RunDay[] | null,
  RunDay[] | null,
  RunDay[] | null,
  RunDay[] | null,
];

export type RunMonth = RunWeek[];

const metersPerMile = 1609.344;

export const mapApiStravaActivityToRunDay = ({
  id,
  distance,
  elapsed_time,
  start_date_local,
  average_heartrate,
}: ApiStravaActivity): RunDay => {
  const minutes = elapsed_time / 60;
  const miles = distance / metersPerMile;

  return {
    id,
    day: new Date(start_date_local).getDate(),
    miles,
    minutesPerMile: minutes / miles,
    avgBpm: average_heartrate ? average_heartrate : null,
  };
};

export const emptyRunMonth: RunMonth = new Array(5)
  .fill(null)
  .map((_) => new Array(7).fill(null));
