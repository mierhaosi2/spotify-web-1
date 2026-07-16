import { LastListened } from '@/components/LastListened'
import { RecentlyPlayed } from '@/components/RecentlyPlayed'
import { SiteHero } from '@/components/SiteHero'
import { SitePlaceholders } from '@/components/SitePlaceholders'
import { TopTracks } from '@/components/TopTracks'
import { useLastListened } from '@/hooks/useLastListened'

export default function App() {
  const lastListened = useLastListened()

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-16 sm:px-8 sm:py-24">
      <SiteHero />

      <main className="mb-24 flex flex-1 flex-col gap-14">
        <SitePlaceholders />
        <TopTracks />
        <RecentlyPlayed nowPlayingId={lastListened.track?.id} />
      </main>

      <footer className="mt-auto">
        <LastListened state={lastListened} />
      </footer>
    </div>
  )
}
