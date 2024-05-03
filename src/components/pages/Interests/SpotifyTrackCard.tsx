import { type Track } from "../../../api/models/spotify";
import { Icon, Link } from "../../shared";

const arrowClasses = "text-secondary-text cursor-pointer text-lg";

interface SpotifyTrackCardProps {
  id: number;
  total: number;
  track: Track;
}

const SpotifyTrackCard = ({ id, total, track }: SpotifyTrackCardProps) => {
  const toggleCard = (i: number) =>
    `htmx.toggleClass("#spotify-track-card-${i}", "hidden")`;

  const prevId = (id + total - 1) % total;
  const nextId = (id + 1) % total;

  return (
    <div class="flex items-center">
      <div hx-on:click={`${toggleCard(id)}; ${toggleCard(prevId)};`}>
        <Icon className={arrowClasses} icon={`\ueab5`} />
      </div>
      <div class="mx-3 w-[300]">
        <img
          src={track.album.artUrl || undefined}
          class="rounded"
          alt={`Cover art for ${track.name} by ${track.artists.join(", ")}`}
        />
        <div class="mt-2 leading-3">
          <Link href={track.url}>
            <span class="text-secondary-text text-lg font-semibold">
              {track.name}
            </span>
          </Link>
          <div>
            {track.artists.map((artist) => artist.name).join(", ")}
            {" · "}
            {track.album.name}
          </div>
        </div>
      </div>
      <div hx-on:click={`${toggleCard(id)}; ${toggleCard(nextId)};`}>
        <Icon className={arrowClasses} icon={`\ueab6`} />
      </div>
    </div>
  );
};

export default SpotifyTrackCard;
