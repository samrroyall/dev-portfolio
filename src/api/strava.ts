export interface RunDay {
  id: number;
  dayOfMonth: number;
  miles: number;
  minutesPerMile: number;
  avgBpm: number | null;
}

export type RunMonth = RunDay[][];

export interface StravaData {
  firstDayOfMonth: number;
  daysInMonth: number;
  runs: RunMonth;
}

export const getStravaData = (): StravaData => ({
  firstDayOfMonth: 0,
  daysInMonth: 31,
  runs: [],
});
