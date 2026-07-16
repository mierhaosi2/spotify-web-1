const sections = [
  {
    title: 'Experience',
    body: 'Placeholder for roles, studios, and companies you’ve worked with.',
  },
  {
    title: 'Recent',
    body: 'Placeholder for recent press, launches, or studio notes.',
  },
  {
    title: 'Selected Work',
    body: 'Placeholder for selected projects and case studies.',
  },
  {
    title: 'Writing',
    body: 'Placeholder for essays and long-form notes.',
  },
] as const

export function SitePlaceholders() {
  return (
    <div className="flex w-full flex-col gap-14">
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            {section.title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground/70">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  )
}
