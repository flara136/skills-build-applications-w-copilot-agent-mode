const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (payload.data && Array.isArray(payload.data.items)) return payload.data.items
  return []
}

export async function fetchCollection(collection) {
  const response = await fetch(`${apiBaseUrl}/${collection}/`)
  if (!response.ok) throw new Error(`Unable to load ${collection} (${response.status})`)
  return normalizeCollection(await response.json())
}
