import { LastListened } from '@/components/LastListened'
import { SitePlaceholders } from '@/components/SitePlaceholders'
import { siteConfig } from '@/config/site'

export default function App() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-16 sm:px-8 sm:py-24">
      <header className="mb-16 flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-muted-foreground">{siteConfig.title}</p>
      </header>

      <main className="mb-24 flex-1">
        <SitePlaceholders />
      </main>

      <footer className="mt-auto">
        <LastListened />
      </footer>
    </div>
  )
}
