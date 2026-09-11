import useCollection from './useCollection'
import { CollectionPage } from './Activities'
import { EmptyState, ErrorState, LoadingState } from './CollectionState'

function Leaderboard() {
  const { data, loading, error } = useCollection('leaderboard')
  return <CollectionPage title="Leaderboard" eyebrow="THE RACE IS ON" description="A little friendly pressure goes a long way." loading={false} error={null} empty={false}>
    {loading ? <LoadingState /> : error ? <ErrorState error={error} /> : !data.length ? <EmptyState label="leaderboard entries" /> : <div className="leaderboard-list">{[...data].sort((a, b) => (a.rank || 99) - (b.rank || 99)).map((entry, index) => <article className="leader-row" key={entry._id || entry.user}><span className="rank">{String(entry.rank || index + 1).padStart(2, '0')}</span><div><strong>{entry.user?.name || entry.user || 'Athlete'}</strong><small>{entry.period || 'Current period'}</small></div><b>{entry.points} <small>PTS</small></b></article>)}</div>}
  </CollectionPage>
}

export default Leaderboard
