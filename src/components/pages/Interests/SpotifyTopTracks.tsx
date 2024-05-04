import { type Track } from "../../../api/models/spotify";
import SpotifyTrackCard from "./SpotifyTrackCard";

interface SpotifyTopTracksProps {
  data: Promise<Track[]>;
}

const SpotifyTopTracks = async ({ data }: SpotifyTopTracksProps) => {
  const tracks = await data;

  return (
    <div>
      {tracks.map((track, i) => (
        <span id={`spotify-track-card-${i}`} class={i !== 0 ? "hidden" : ""}>
          <SpotifyTrackCard id={i} total={tracks.length} track={track} />
        </span>
      ))}
    </div>
  );
};

export default SpotifyTopTracks;
