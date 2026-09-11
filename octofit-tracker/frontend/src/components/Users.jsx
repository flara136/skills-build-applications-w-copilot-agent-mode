import useCollection from './useCollection'
import { CollectionPage } from './Activities'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

function Users() {
  const { data, loading, error } = useCollection('users')
  return <CollectionPage title="Members" eyebrow="THE CREW" description="The people turning good intentions into real habits." loading={loading} error={error} empty={!data.length}><div className="member-grid">{data.map((user) => <article className="member-row" key={user._id || user.email}><div className="avatar">{user.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><strong>{user.name}</strong><span>{user.email}</span></div></article>)}</div></CollectionPage>
}

export default Users
