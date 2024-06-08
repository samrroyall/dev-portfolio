import { type Track } from "../../../models/interests";
import { mockFunc } from "../../../utils";

const mockData: Track[] = [
  {
    name: "one of wun",
    url: "https://open.spotify.com/track/4Na2HfNSr58chvfX69fy36",
    album: {
      name: "One of Wun",
      url: "https://open.spotify.com/album/7g0PJ7VbsOkYTECUFkyNPN",
      artUrl:
        "https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5",
    },
    artists: [
      {
        name: "Gunna",
        url: "https://open.spotify.com/artist/2hlmm7s2ICUX0LVIhVFlZQ",
      },
    ],
  },
  {
    name: "collage",
    url: "https://open.spotify.com/track/41TXadM22OIJY04xSW9iuv",
    album: {
      name: "One of Wun",
      url: "https://open.spotify.com/album/7g0PJ7VbsOkYTECUFkyNPN",
      artUrl:
        "https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5",
    },
    artists: [
      {
        name: "Gunna",
        url: "https://open.spotify.com/artist/2hlmm7s2ICUX0LVIhVFlZQ",
      },
    ],
  },
  {
    name: "hakuna matata",
    url: "https://open.spotify.com/track/32TTewBmtmhUmYxS1ajqaJ",
    album: {
      name: "One of Wun",
      url: "https://open.spotify.com/album/7g0PJ7VbsOkYTECUFkyNPN",
      artUrl:
        "https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5",
    },
    artists: [
      {
        name: "Gunna",
        url: "https://open.spotify.com/artist/2hlmm7s2ICUX0LVIhVFlZQ",
      },
    ],
  },
  {
    name: "treesh",
    url: "https://open.spotify.com/track/50vVMueaWOYOfyQUQKdaFq",
    album: {
      name: "One of Wun",
      url: "https://open.spotify.com/album/7g0PJ7VbsOkYTECUFkyNPN",
      artUrl:
        "https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5",
    },
    artists: [
      {
        name: "Gunna",
        url: "https://open.spotify.com/artist/2hlmm7s2ICUX0LVIhVFlZQ",
      },
    ],
  },
  {
    name: "neck on a yacht",
    url: "https://open.spotify.com/track/5zXTskPR6ybGjMoZfJnJ6O",
    album: {
      name: "One of Wun",
      url: "https://open.spotify.com/album/7g0PJ7VbsOkYTECUFkyNPN",
      artUrl:
        "https://i.scdn.co/image/ab67616d0000b273c67636f3021f5869095c0fc5",
    },
    artists: [
      {
        name: "Gunna",
        url: "https://open.spotify.com/artist/2hlmm7s2ICUX0LVIhVFlZQ",
      },
    ],
  },
];

export const getMockSpotifyData = (): Promise<Track[]> => mockFunc(mockData);
