import { useState, useEffect } from 'react';
import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';
import ActivitiesFeed from './ActivitiesFeed';
import QuickActions from './QuickActions';
import Analytics from './Analytics';
import Search from './Search';
import './Dashboard.css';

const Dashboard = () => {
  const { slots } = useSlots();
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalSessions: 0,
    bookedSessions: 0,
    availableSessions: 0,
    completedSessions: 0,
  });

  useEffect(() => {
    const booked = slots.filter(s => s.status === 'Booked').length;
    const available = slots.filter(s => s.status === 'Available').length;
    const completed = slots.filter(s => s.status === 'Completed').length;
    
    setStats({
      totalSessions: slots.length,
      bookedSessions: booked,
      availableSessions: available,
      completedSessions: completed,
    });
  }, [slots]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <div className="dashboard-welcome">
          <h1>Welcome back, <strong>{currentUser?.email?.split('@')[0]}</strong>! 👋</h1>
          <p>Here's a snapshot of your {currentUser?.role?.toLowerCase()} activity today.</p>
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
