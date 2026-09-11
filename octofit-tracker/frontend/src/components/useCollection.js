import { useEffect, useState } from 'react'
import { fetchCollection } from './api'

export default function useCollection(collection) {
  const [state, setState] = useState({ data: [], loading: true, error: null })

  useEffect(() => {
    let active = true
    fetchCollection(collection)
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState({ data: [], loading: false, error }))
    return () => { active = false }
  }, [collection])

  return state
}
