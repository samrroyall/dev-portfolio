import { type Track } from "../../../models/interests";
import { Icon, Link } from "../../shared";

const imageSize = 300;
const arrowClasses =
  "text-secondary-text dark:text-secondary-text-dark cursor-pointer text-lg";

interface SpotifyTrackCardProps {
  id: number;
  total: number;
  track: Track;
}

const SpotifyTrackCard = ({
  id,
  total,
  track,
}: SpotifyTrackCardProps): JSX.Element => {
  const toggleCard = (i: number) =>
    `htmx.toggleClass("#spotify-track-card-${i}", "hidden")`;

  const prevId = (id + total - 1) % total;
  const nextId = (id + 1) % total;

  return (
    <div class="flex items-center">
      <div hx-on:click={`${toggleCard(id)}; ${toggleCard(prevId)};`}>
        <Icon className={arrowClasses} icon={`\ueab5`} />
      </div>
      <div class="mx-3">
        <div class={`h-[${imageSize}px] w-[${imageSize}px]`}>
          <img
            src={track.album.artUrl ?? ""}
            class="rounded"
            alt={`Cover art for ${track.name} by ${track.artists.join(", ")}`}
          />
        </div>
        <div class="mt-2">
          <Link href={track.url}>
            <span class="text-secondary-text dark:text-secondary-text-dark text-lg font-semibold">
              {track.name}
            </span>
          </Link>
          <div>
            <span>{track.artists.map((artist) => artist.name).join(", ")}</span>
            <span>{" · "}</span>
            <span>{track.album.name}</span>
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
