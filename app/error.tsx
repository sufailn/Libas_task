"use client"

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <div className="container py-5 text-center">
          <h1 className="display-6">Something went wrong</h1>
          <p className="text-muted">{error.message || "Please try again later."}</p>
          {error.digest && <code className="text-muted">Ref: {error.digest}</code>}
        </div>
      </body>
    </html>
  )
}
