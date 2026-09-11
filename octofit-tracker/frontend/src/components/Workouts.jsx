import useCollection from './useCollection'
import { CollectionPage } from './Activities'

function Workouts() {
  const { data, loading, error } = useCollection('workouts')
  return <CollectionPage title="Workouts" eyebrow="YOUR NEXT SESSION" description="Good plans make showing up feel easier." loading={loading} error={error} empty={!data.length}><div className="card-grid">{data.map((workout) => <article className="workout-card" key={workout._id || workout.name}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.durationMinutes} MIN</span></div><h2>{workout.name}</h2><p>{workout.description}</p><div className="exercise-list">{workout.exercises?.map((exercise) => <span key={exercise}>{exercise}</span>)}</div></article>)}</div></CollectionPage>
}

export default Workouts
