import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <section className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Compass aria-hidden="true" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Error 404</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-md text-pretty leading-7 text-muted-foreground">
          The page you&apos;re looking for may have moved, been removed, or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/#top">
              <ArrowLeft data-icon="inline-start" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#projects">Explore projects</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
