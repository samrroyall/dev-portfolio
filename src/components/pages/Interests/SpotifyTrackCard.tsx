import { type Track } from "../../../models/interests";
import { Icon, Link } from "../../shared";

const textSecondary = "text-secondary-text dark:text-secondary-text-dark";

const arrowClasses = `
  ${textSecondary} hover:text-tertiary-text hover:dark:text-tertiary-text-dark 
  max-sm:text-3xl text-2xl 
`;

const imageSize = 275;

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
    <div class="mx-3">
      <div class="flex items-center">
        <button
          class="mx-4"
          hx-on-click={`${toggleCard(id)}; ${toggleCard(prevId)};`}
        >
          <Icon icon={"\udb80\udc4d"} className={arrowClasses} />
        </button>
        <div class={`h-[${imageSize}px] w-[${imageSize}px]`}>
          <img
            src={track.album.artUrl ?? ""}
            class="rounded"
            alt={`Cover art for ${track.name} by ${track.artists.join(", ")}`}
          />
        </div>
        <button
          class="mx-4"
          hx-on-click={`${toggleCard(id)}; ${toggleCard(nextId)};`}
        >
          <Icon icon={"\udb80\udc54"} className={arrowClasses} />
        </button>
      </div>
      <div class="ml-12 mt-2">
        <Link href={track.url}>
          <span class={`text-lg font-semibold ${textSecondary}`}>
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
  );
};

export default SpotifyTrackCard;
