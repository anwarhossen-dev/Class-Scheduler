import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';
import './UpcomingSessions.css';
import { useTranslation } from 'react-i18next';

const UpcomingSessions = () => {
  const { slots } = useSlots();
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  // Filter next 3 sessions for this user
  const upcoming = slots
    .filter(slot => {
      const isFuture = new Date(slot.startTime) > new Date(); 
      const isRelated = currentUser && currentUser.role === 'Teacher' // Safely check currentUser before accessing properties
        ? slot.teacherId === currentUser.id // Safely check currentUser before accessing properties
        : slot.status === 'Booked'; // In a real app, you'd filter by studentId
      return isFuture && isRelated;
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

  return (
    <div className="upcoming-sessions-card">
      <div className="section-header">
        <h2>{t('upcomingSessions.title')}</h2>
        <span className="badge-count">{t('upcomingSessions.sessionCount', { count: upcoming.length })}</span>
      </div>

      <div className="upcoming-list">
        {upcoming.length === 0 ? (
          <div className="empty-upcoming">
            <p>{t('upcomingSessions.noSessions')}</p>
          </div>
        ) : (
          upcoming.map(slot => (
            <div key={slot.id} className="upcoming-item">
              <div className="time-pill">
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="upcoming-info">
                <h4>{t('upcomingSessions.sessionLabel')}</h4>
                <p>{slot.teacherName}</p>
              </div>
              <div className="upcoming-date">
                {new Date(slot.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;
