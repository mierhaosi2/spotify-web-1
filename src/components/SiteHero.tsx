import { siteConfig } from '@/config/site'
import { useSpotifyMe } from '@/hooks/useSpotifyMe'

export function SiteHero() {
  const { profile, loading } = useSpotifyMe()
  const name = profile?.displayName || siteConfig.name

  return (
    <header className="mb-16 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        {loading && !profile ? (
          <div className="size-14 shrink-0 animate-pulse rounded-full bg-secondary" />
        ) : profile?.avatarUrl ? (
          <a
            href={profile.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <img
              src={profile.avatarUrl}
              alt=""
              className="size-14 rounded-full object-cover ring-1 ring-border"
            />
          </a>
        ) : null}

        <div className="flex min-w-0 flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {name}
          </h1>
          <p className="text-lg text-muted-foreground">{siteConfig.title}</p>
        </div>
      </div>
    </header>
  )
}
