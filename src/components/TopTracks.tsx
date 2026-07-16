import { TrackListItem } from '@/components/TrackListItem'
import { useTopTracks } from '@/hooks/useTopTracks'

export function TopTracks() {
  const { tracks, loading, error } = useTopTracks()

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-muted-foreground">Top Tracks</h2>

      {loading && tracks.length === 0 ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="h-4 w-6 animate-pulse rounded bg-secondary" />
              <div className="size-10 animate-pulse rounded-md bg-secondary" />
              <div className="h-4 flex-1 animate-pulse rounded bg-secondary" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-muted-foreground/70">Unable to load</p>
      ) : tracks.length === 0 ? (
        <p className="text-sm text-muted-foreground/70">No top tracks yet</p>
      ) : (
        <div className="flex flex-col">
          {tracks.map((track, i) => (
            <TrackListItem key={track.id} track={track} index={i + 1} />
          ))}
        </div>
      )}
    </section>
  )
}
