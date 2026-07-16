const API_BASE = '/api/v1'

export type SpotifyImage = {
  url: string
  height: number | null
  width: number | null
}

export type SpotifyArtist = {
  id?: string
  name: string
}

export type SpotifyTrack = {
  id: string
  name: string
  duration_ms: number
  artists: SpotifyArtist[]
  album: {
    id?: string
    name: string
    images: SpotifyImage[]
  }
  external_urls: {
    spotify: string
  }
}

export type PlayingResponse = {
  is_playing?: boolean
  playing?: boolean
  progress_ms?: number
  item: SpotifyTrack | null
}

export type RecentlyPlayedResponse = {
  items: Array<{
    track: SpotifyTrack
    played_at: string
  }>
  next?: string | null
}

export type LastListenedTrack = {
  id: string
  name: string
  artists: string
  albumArtUrl: string | null
  spotifyUrl: string
  isPlaying: boolean
  playedAt: string | null
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const detail =
      body && typeof body === 'object' && 'detail' in body
        ? String((body as { detail: unknown }).detail)
        : `Request failed (${res.status})`
    throw new Error(detail)
  }
  return res.json() as Promise<T>
}

export function getPlaying() {
  return apiFetch<PlayingResponse>('/spotify/auto/playing')
}

export function getRecentlyPlayed(limit = 1) {
  return apiFetch<RecentlyPlayedResponse>(
    `/spotify/auto/recently-played?limit=${limit}`,
  )
}

function pickAlbumArt(images: SpotifyImage[] | undefined): string | null {
  if (!images?.length) return null
  const sorted = [...images].sort(
    (a, b) => (a.width ?? 0) - (b.width ?? 0),
  )
  return sorted.find((img) => (img.width ?? 0) >= 64)?.url ?? sorted[0]?.url ?? null
}

function toLastListened(
  track: SpotifyTrack,
  opts: { isPlaying: boolean; playedAt: string | null },
): LastListenedTrack {
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map((a) => a.name).join(', '),
    albumArtUrl: pickAlbumArt(track.album.images),
    spotifyUrl: track.external_urls.spotify,
    isPlaying: opts.isPlaying,
    playedAt: opts.playedAt,
  }
}

export async function fetchLastListened(): Promise<LastListenedTrack | null> {
  const playing = await getPlaying()
  const hasItem = Boolean(playing.item)
  const isPlaying = Boolean(playing.is_playing ?? playing.playing)

  if (hasItem && playing.item) {
    return toLastListened(playing.item, {
      isPlaying,
      playedAt: null,
    })
  }

  const recent = await getRecentlyPlayed(1)
  const first = recent.items?.[0]
  if (!first?.track) return null

  return toLastListened(first.track, {
    isPlaying: false,
    playedAt: first.played_at,
  })
}
