import { useSlots } from '../contexts/SlotContext';
import './Analytics.css';

const Analytics = () => {
  const { slots } = useSlots();

  const getStats = () => {
    const total = slots.length;
    const booked = slots.filter(s => s.status === 'Booked').length;
    const available = slots.filter(s => s.status === 'Available').length;
    const completed = slots.filter(s => s.status === 'Completed').length;

    return {
      bookedPercent: total > 0 ? Math.round((booked / total) * 100) : 0,
      availablePercent: total > 0 ? Math.round((available / total) * 100) : 0,
      completedPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  };

  const stats = getStats();

  return (
    <div className="analytics-panel">
      <h2>Analytics</h2>

      <div className="chart-container">
        <div className="chart-title">Session Status Distribution</div>
        <div className="progress-item">
          <div className="progress-label">
            <span>Booked</span>
            <span className="progress-percent">{stats.bookedPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.bookedPercent}%`, background: '#3b82f6' }}></div>
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-label">
            <span>Available</span>
            <span className="progress-percent">{stats.availablePercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.availablePercent}%`, background: '#10b981' }}></div>
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-label">
            <span>Completed</span>
            <span className="progress-percent">{stats.completedPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.completedPercent}%`, background: '#f59e0b' }}></div>
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="qs-item">
          <span className="qs-label">Peak Hours</span>
          <p className="qs-value">10:00 AM</p>
        </div>
        <div className="qs-item">
          <span className="qs-label">Avg Rating</span>
          <p className="qs-value">4.8 ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
