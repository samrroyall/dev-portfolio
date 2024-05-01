import { type Track } from "../../../api/models/spotify";
import { Icon, Link } from "../../shared";

interface SpotifyTrackCardProps {
  id: number;
  track: Track;
}

const SpotifyTrackCard = ({ id, track }: SpotifyTrackCardProps) => {
  const toggleCard = (i: number) =>
    `htmx.toggleClass("#spotify-track-card-${i}", "hidden")`;

  const prevArrow = (
    <div hx-on:click={`${toggleCard(id)}; ${toggleCard((id + 2) % 3)};`}>
      <Icon className="text-secondary-text cursor-pointer" icon={`\ueab5`} />
    </div>
  );

  const nextArrow = (
    <div hx-on:click={`${toggleCard(id)}; ${toggleCard((id + 1) % 3)};`}>
      <Icon className="text-secondary-text cursor-pointer" icon={`\ueab6`} />
    </div>
  );

  const art = (
    <Link href={track.url}>
      <img
        src={track.album.artUrl || undefined}
        class="h-[300] w-[300] cursor-pointer rounded"
        alt={`Cover art for ${track.name} by ${track.artists.join(", ")}`}
      />
    </Link>
  );

  const info = (
    <div class="mt-2 leading-3">
      <div class="text-secondary-text text-lg font-semibold">{track.name}</div>
      <div>
        {track.artists.map((artist, i) => `${i > 0 ? ", " : ""}${artist.name}`)}
        {" · "}
        {track.album.name}
      </div>
    </div>
  );

  return (
    <div>
      <div class="flex items-center">
        {prevArrow}
        <div class="mx-3">
          {art}
          {info}
        </div>
        {nextArrow}
      </div>
    </div>
  );
};

export default SpotifyTrackCard;
