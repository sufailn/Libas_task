import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-6">Page not found</h1>
      <p className="text-muted">The page you are looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn btn-dark">Back to Home</Link>
    </div>
  )
}
