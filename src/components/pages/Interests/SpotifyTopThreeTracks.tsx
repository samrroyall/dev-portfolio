import { type Track } from "../../../api/models/spotify";
import SpotifyTrackCard from "./SpotifyTrackCard";

interface SpotifyTopThreeTracksProps {
  tracks: Promise<[Track, Track, Track]>;
}

const SpotifyTopThreeTracks = async ({
  tracks,
}: SpotifyTopThreeTracksProps) => (
  <div>
    {(await tracks).map((track, i) => (
      <span id={`spotify-track-card-${i}`} class={i !== 0 ? "hidden" : ""}>
        <SpotifyTrackCard id={i} track={track} />
      </span>
    ))}
  </div>
);

export default SpotifyTopThreeTracks;
