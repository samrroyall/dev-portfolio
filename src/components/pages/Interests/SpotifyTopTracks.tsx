import { type Track } from "../../../models/interests";
import SpotifyTrackCard from "./SpotifyTrackCard";

interface SpotifyTopTracksProps {
  tracks: Track[];
}

const SpotifyTopTracks = ({ tracks }: SpotifyTopTracksProps): JSX.Element => (
  <div>
    {tracks.map((track, i) => (
      <span id={`spotify-track-card-${i}`} class={i !== 0 ? "hidden" : ""}>
        <SpotifyTrackCard id={i} total={tracks.length} track={track} />
      </span>
    ))}
  </div>
);

export default SpotifyTopTracks;
