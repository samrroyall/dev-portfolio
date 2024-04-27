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

const emptyRunMonth = new Array(5)
  .fill(null)
  .map((_) => new Array(7).fill(null));

export const getStravaData = (): RunMonth => ({ runs: emptyRunMonth });
