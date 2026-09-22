'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep error reporting available to a monitoring service without exposing details in the UI.
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <section className="flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle aria-hidden="true" />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Something went wrong</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">We couldn&apos;t load this page.</h1>
        <p className="mt-4 max-w-md text-pretty leading-7 text-muted-foreground">
          An unexpected error interrupted the page. Try again, or return to the top and continue from there.
        </p>
        <Alert className="mt-8 text-left">
          <AlertCircle />
          <AlertTitle>Page unavailable</AlertTitle>
          <AlertDescription>Refreshing the page is usually enough to resolve this temporary issue.</AlertDescription>
        </Alert>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset}>
            <RefreshCw data-icon="inline-start" />
            Try again
          </Button>
          <Button asChild variant="outline">
            
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
