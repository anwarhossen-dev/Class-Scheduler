import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './QuickActions.css';

const QuickActions = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const teacherActions = [
    { icon: '➕', label: 'Create Session', path: '/teacher' },
    { icon: '📋', label: 'View Schedule', path: '/teacher' },
    { icon: '👥', label: 'Manage Students', path: '#' },
    { icon: '📊', label: 'View Reports', path: '/dashboard' }
  ];

  const studentActions = [
    { icon: '📅', label: 'Book Session', path: '/student' },
    { icon: '📋', label: 'My Bookings', path: '/student' },
    { icon: '📝', label: 'Feedback', path: '#' },
    { icon: '❓', label: 'Help', path: '#' }
  ];

  const actions = currentUser?.role === 'Teacher' ? teacherActions : studentActions;

  return (
    <div className="quick-actions">
      <div className="qa-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="qa-grid">
        {actions.map((act, idx) => (
          <button 
            key={idx}
            className="qa-button"
            onClick={() => act.path !== '#' && navigate(act.path)}
          >
            <span className="qa-icon">{act.icon}</span>
            <span className="qa-label">{act.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
