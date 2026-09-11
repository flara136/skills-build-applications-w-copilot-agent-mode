import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/', icon: '01' },
  { label: 'Activities', path: '/activities', icon: '02' },
  { label: 'Leaderboard', path: '/leaderboard', icon: '03' },
  { label: 'Teams', path: '/teams', icon: '04' },
  { label: 'Members', path: '/users', icon: '05' },
  { label: 'Workouts', path: '/workouts', icon: '06' },
]

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">SEPTEMBER 2026 / TEAM PULSE</p>
      <h1>Make your next<br /><em>move count.</em></h1>
      <p className="lede">A shared space for showing up, tracking momentum, and giving your team a little extra lift.</p>
      <div className="overview-grid">
        <NavLink to="/activities" className="feature-panel feature-panel--dark"><span className="panel-index">01</span><strong>Log an activity</strong><span>Turn today's effort into tomorrow's momentum <b>+</b></span></NavLink>
        <NavLink to="/leaderboard" className="feature-panel feature-panel--lime"><span className="panel-index">02</span><strong>See the leaderboard</strong><span>Find out who's setting the pace <b>+</b></span></NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Octofit home"><span className="brand-mark">O</span><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.path} to={item.path} end={item.path === '/'} className="nav-link"><span className="nav-index">{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" />API connected</div>
      </aside>
      <main className="main-content">
        <header className="topbar"><span>OCTOFIT TRACKER</span><span className="topbar-date">THU / 11 SEP 2026</span></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
