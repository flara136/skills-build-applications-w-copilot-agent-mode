import useCollection from './useCollection'
import { CollectionPage } from './Activities'

function Teams() {
  const { data, loading, error } = useCollection('teams')
  return <CollectionPage title="Teams" eyebrow="STRONGER TOGETHER" description="Find your people and make the group chat jealous." loading={loading} error={error} empty={!data.length}><div className="card-grid">{data.map((team, index) => <article className="team-card" key={team._id || team.name}><span className="card-number">TEAM / {String(index + 1).padStart(2, '0')}</span><h2>{team.name}</h2><p>{team.members?.length || 0} members</p><span className="coach">Coached by {team.coach}</span></article>)}</div></CollectionPage>
}

export default Teams
