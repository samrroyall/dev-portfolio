import { type RunMonth } from "../../../models/interests";
import { mockFunc } from "../../../utils";

const mockData: RunMonth = [
  [null, null, null, [], [], [], []],
  [
    [],
    [],
    [
      {
        id: 11352517345,
        day: 7,
        miles: 7.341562773403324,
        minutesPerMile: 8.740191788474073,
        avgBpm: 159.8,
      },
    ],
    [],
    [],
    [],
    [
      {
        id: 11385338931,
        day: 11,
        miles: 13.26826334208224,
        minutesPerMile: 9.811633216567072,
        avgBpm: 151,
      },
    ],
  ],
  [[], [], [], [], [], [], []],
  [
    [],
    [],
    [
      {
        id: 11462937583,
        day: 21,
        miles: 7.113457408732999,
        minutesPerMile: 9.28287463312369,
        avgBpm: 150.3,
      },
    ],
    [],
    [],
    [],
    [
      {
        id: 11493722704,
        day: 25,
        miles: 8.044892825896763,
        minutesPerMile: 9.055434494477485,
        avgBpm: 156.8,
      },
    ],
  ],
  [
    [],
    [],
    [
      {
        id: 11516410717,
        day: 28,
        miles: 7.341749184760995,
        minutesPerMile: 9.246207085667859,
        avgBpm: 153.3,
      },
    ],
    [],
    [],
    [],
    null,
  ],
];

export const getMockStravaData = (): Promise<RunMonth> => mockFunc(mockData);
