export function LoadingState() {
  return <div className="collection-state">Loading the latest data...</div>
}

export function ErrorState({ error }) {
  return <div className="collection-state collection-state--error">{error.message}</div>
}

export function EmptyState({ label }) {
  return <div className="collection-state">No {label} have been added yet.</div>
}
