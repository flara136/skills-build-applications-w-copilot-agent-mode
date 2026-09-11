import useCollection from './useCollection'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/

export function CollectionPage({ title, eyebrow, description, loading, error, empty, children }) {
  return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div><span className="record-badge">LIVE DATA</span></div>{loading ? <LoadingState /> : error ? <ErrorState error={error} /> : empty ? <EmptyState label={title.toLowerCase()} /> : children}</section>
}

function Activities() {
  const { data, loading, error } = useCollection('activities')
  return <CollectionPage title="Activities" eyebrow="MOVEMENT LOG" description="Every session is a signal. Keep yours visible." loading={loading} error={error} empty={!data.length}>
    <div className="data-list">{data.map((activity) => <article className="data-row" key={activity._id || `${activity.type}-${activity.completedAt}`}><div><span className="row-kicker">{activity.type}</span><strong>{activity.durationMinutes} min</strong></div><span>{activity.distanceMiles ? `${activity.distanceMiles} mi` : 'Strength'}</span><time>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recent'}</time><b className="points">+{activity.points} pts</b></article>)}</div>
  </CollectionPage>
}

export default Activities
