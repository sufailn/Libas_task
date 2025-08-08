export default function LoadingProducts() {
  return (
    <div className="py-5 text-center">
      <div className="spinner-border text-dark" role="status" aria-label="Loading products" />
      <p className="mt-3 text-muted">Loading products...</p>
    </div>
  )
}
