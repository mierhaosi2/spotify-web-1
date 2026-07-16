import { cn } from '@/lib/utils'
import type { TrackSummary } from '@/lib/api'

type TrackListItemProps = {
  track: TrackSummary
  index?: number
  meta?: string
}

export function TrackListItem({ track, index, meta }: TrackListItemProps) {
  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group flex items-center gap-3 rounded-lg py-2 transition-colors',
        'hover:text-foreground',
      )}
    >
      {typeof index === 'number' ? (
        <span className="w-6 shrink-0 text-sm tabular-nums text-muted-foreground/60">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}

      {track.albumArtUrl ? (
        <img
          src={track.albumArtUrl}
          alt=""
          className="size-10 shrink-0 rounded-md object-cover"
        />
      ) : (
        <div className="size-10 shrink-0 rounded-md bg-secondary" />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-foreground group-hover:underline">
          {track.name}
        </p>
        <p className="truncate text-sm text-muted-foreground">{track.artists}</p>
      </div>

      {meta ? (
        <span className="shrink-0 text-xs text-muted-foreground/70">{meta}</span>
      ) : null}
    </a>
  )
}
