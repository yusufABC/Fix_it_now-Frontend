import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading page" className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Skeleton className="h-6 w-28" />
          <div className="hidden items-center gap-8 md:flex">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-14" />
          </div>
          <Skeleton className="size-9 rounded-full" />
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-20">
        <div className="flex max-w-2xl flex-col gap-5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-12 w-full max-w-xl sm:h-16" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="h-5 w-4/5 max-w-md" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>
      </section>
    </main>
  )
}
