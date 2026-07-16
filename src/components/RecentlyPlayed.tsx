import { TrackListItem } from '@/components/TrackListItem'
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed'
import { formatRelativeTime } from '@/lib/format'

type RecentlyPlayedProps = {
  nowPlayingId?: string | null
}

export function RecentlyPlayed({ nowPlayingId }: RecentlyPlayedProps) {
  const { items, loading, error } = useRecentlyPlayed(nowPlayingId)

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-muted-foreground">
        Recently Played
      </h2>

      {loading && items.length === 0 ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="size-10 animate-pulse rounded-md bg-secondary" />
              <div className="h-4 flex-1 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-12 animate-pulse rounded bg-secondary" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-muted-foreground/70">Unable to load</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground/70">No recent plays</p>
      ) : (
        <div className="flex flex-col">
          {items.map((item) => (
            <TrackListItem
              key={`${item.id}-${item.playedAt}`}
              track={item}
              meta={formatRelativeTime(item.playedAt)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
