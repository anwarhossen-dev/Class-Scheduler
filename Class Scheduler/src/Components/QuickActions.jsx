import { useAuth } from '../contexts/AuthContext';
import './QuickActions.css';

const QuickActions = () => {
  const { currentUser } = useAuth();

  const handleAction = (action) => {
    alert(`${action} feature coming soon!`);
  };

  const teacherActions = [
    { icon: '➕', label: 'Create Session', action: 'create-session' },
    { icon: '📋', label: 'View Schedule', action: 'view-schedule' },
    { icon: '👥', label: 'Manage Students', action: 'manage-students' },
    { icon: '📊', label: 'View Reports', action: 'view-reports' }
  ];

  const studentActions = [
    { icon: '📅', label: 'Book Session', action: 'book-session' },
    { icon: '📋', label: 'My Bookings', action: 'my-bookings' },
    { icon: '📝', label: 'Feedback', action: 'feedback' },
    { icon: '❓', label: 'Help', action: 'help' }
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
            onClick={() => handleAction(act.label)}
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
