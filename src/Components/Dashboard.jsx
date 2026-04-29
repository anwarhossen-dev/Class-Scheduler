import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';
import ActivitiesFeed from './ActivitiesFeed';
import QuickActions from './QuickActions';
import Analytics from './Analytics';
import UpcomingSessions from './UpcomingSessions';
import Search from './Search';
import './Dashboard.css';

const Dashboard = () => {
  const { slots } = useSlots();
  const { currentUser } = useAuth();

  // Calculate stats directly during render (Better performance, no cascading renders)
  const stats = {
    totalSessions: slots.length,
    bookedSessions: slots.filter(s => s.status === 'Booked').length,
    availableSessions: slots.filter(s => s.status === 'Available').length,
    completedSessions: slots.filter(s => s.status === 'Completed').length,
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <div className="dashboard-welcome">
          <h1>Welcome back, <strong>{currentUser?.email?.split('@')[0].charAt(0).toUpperCase() + currentUser?.email?.split('@')[0].slice(1)}</strong>! 👋</h1>
          <p>You have {stats.availableSessions} sessions available for booking today.</p>
        </div>
        <Search />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff' }}>
            <span>📊</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Sessions</p>
            <h3 className="stat-value">{stats.totalSessions}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe' }}>
            <span>✓</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Booked Sessions</p>
            <h3 className="stat-value">{stats.bookedSessions}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7' }}>
            <span>⏰</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Available Sessions</p>
            <h3 className="stat-value">{stats.availableSessions}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}>
            <span>✅</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">Completed Sessions</p>
            <h3 className="stat-value">{stats.completedSessions}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-col-1">
          <UpcomingSessions />
          <QuickActions />
          <ActivitiesFeed />
        </div>
        <div className="grid-col-2">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
