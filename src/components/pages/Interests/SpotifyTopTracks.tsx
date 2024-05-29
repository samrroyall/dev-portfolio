import { type Track } from "../../../models/interests";
import { NoData } from "../../shared";
import SpotifyTrackCard from "./SpotifyTrackCard";

interface SpotifyTopTracksProps {
  data: Promise<Track[] | null>;
}

const SpotifyTopTracks = async ({
  data,
}: SpotifyTopTracksProps): Promise<JSX.Element> => {
  const tracks = await data;

  return tracks ? (
    <div class="w-[350px] py-9">
      <NoData centered={false} />
    </div>
  ) : (
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
