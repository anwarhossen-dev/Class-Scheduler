import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';
import './UpcomingSessions.css';

const UpcomingSessions = () => {
  const { slots } = useSlots();
  const { currentUser } = useAuth();

  // Filter next 3 sessions for this user
  const upcoming = slots
    .filter(slot => {
      const isFuture = new Date(slot.startTime) > new Date();
      const isRelated = currentUser.role === 'Teacher' 
        ? slot.teacherId === currentUser.id 
        : slot.status === 'Booked'; // In a real app, you'd filter by studentId
      return isFuture && isRelated;
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 3);

  return (
    <div className="upcoming-sessions-card">
      <div className="section-header">
        <h2>Next on your Schedule</h2>
        <span className="badge-count">{upcoming.length} Sessions</span>
      </div>

      <div className="upcoming-list">
        {upcoming.length === 0 ? (
          <div className="empty-upcoming">
            <p>No upcoming sessions scheduled for today.</p>
          </div>
        ) : (
          upcoming.map(slot => (
            <div key={slot.id} className="upcoming-item">
              <div className="time-pill">
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="upcoming-info">
                <h4>15 Min Session</h4>
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
