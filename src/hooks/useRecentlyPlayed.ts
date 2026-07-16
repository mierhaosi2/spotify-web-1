import { useEffect, useState } from 'react'
import { fetchRecentlyPlayedList, type RecentlyPlayedItem } from '@/lib/api'

type State = {
  items: RecentlyPlayedItem[]
  loading: boolean
  error: string | null
}

/** Refresh when now-playing track id changes; otherwise load once. */
export function useRecentlyPlayed(nowPlayingId?: string | null): State {
  const [items, setItems] = useState<RecentlyPlayedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const next = await fetchRecentlyPlayedList(8)
        if (cancelled) return
        setItems(next)
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Unable to load')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [nowPlayingId])

  return { items, loading, error }
}
