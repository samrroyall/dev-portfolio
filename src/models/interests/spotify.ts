interface ApiSpotifyLink {
  external_urls: {
    spotify: string;
  };
}

interface ApiSpotifyNameLink extends ApiSpotifyLink {
  name: string;
}

interface ApiSpotifyImage {
  height: number;
  width: number;
  url: string;
}

interface ApiSpotifyAlbum extends ApiSpotifyNameLink {
  images: ApiSpotifyImage[];
}

interface ApiSpotifyTrack extends ApiSpotifyNameLink {
  album: ApiSpotifyAlbum;
  artists: ApiSpotifyNameLink[];
}

export interface ApiSpotifyTopTracksResponse {
  items: [ApiSpotifyTrack, ApiSpotifyTrack, ApiSpotifyTrack];
}

interface Artist {
  name: string;
  url: string;
}

interface Album {
  name: string;
  url: string;
  artUrl: string | null;
}

export interface Track {
  name: string;
  url: string;
  artists: Artist[];
  album: Album;
}

export const mapApiSpotifyTrackToTrack = ({
  name,
  external_urls,
  album,
  artists,
}: ApiSpotifyTrack): Track => ({
  name,
  url: external_urls.spotify,
  album: {
    name: album.name,
    url: album.external_urls.spotify,
    artUrl: album.images.find(({ height }) => height === 640)?.url || null,
  },
  artists: artists.map((a) => ({
    name: a.name,
    url: a.external_urls.spotify,
  })),
});

export default {};
