import { siteConfig } from '@/config/site'
import type { LastListenedTrack } from '@/lib/api'
import { formatPlayedAt } from '@/lib/format'
import { cn } from '@/lib/utils'
import { SpotifyIcon } from '@/components/SpotifyIcon'

type LastListenedState = {
  track: LastListenedTrack | null
  loading: boolean
  error: string | null
}

type LastListenedProps = {
  state: LastListenedState
}

export function LastListened({ state }: LastListenedProps) {
  const { track, loading, error } = state
  const timeLabel = formatPlayedAt(track?.playedAt ?? null)

  return (
    <section className="flex w-full flex-col items-center gap-5">
      <p className="text-sm text-muted-foreground">Last listened to...</p>

      {loading && !track ? (
        <div
          className={cn(
            'flex w-full max-w-md items-center gap-3 rounded-2xl border border-border',
            'bg-card px-4 py-3',
          )}
          aria-hidden
        >
          <div className="size-12 shrink-0 animate-pulse rounded-md bg-secondary" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
          </div>
          <div className="size-5 shrink-0 animate-pulse rounded-full bg-secondary" />
        </div>
      ) : error && !track ? (
        <p className="text-sm text-muted-foreground">Unable to load</p>
      ) : track ? (
        <a
          href={track.spotifyUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'group flex w-full max-w-md items-center gap-3 rounded-2xl border border-border',
            'bg-card px-4 py-3 transition-colors hover:border-muted-foreground/40',
          )}
        >
          {track.albumArtUrl ? (
            <img
              src={track.albumArtUrl}
              alt=""
              className="size-12 shrink-0 rounded-md object-cover"
            />
          ) : (
            <div className="size-12 shrink-0 rounded-md bg-secondary" />
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-wide text-foreground uppercase">
              {track.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {track.artists}
            </p>
          </div>

          <SpotifyIcon className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        </a>
      ) : (
        <p className="text-sm text-muted-foreground">Nothing played yet</p>
      )}

      <div className="flex w-full max-w-md items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>{timeLabel}</span>
        <span>{siteConfig.location}</span>
        <a
          href={`mailto:${siteConfig.email}`}
          className="transition-colors hover:text-foreground"
        >
          Email →
        </a>
      </div>
    </section>
  )
}
