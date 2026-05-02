import { useMemo } from 'react';
import { useSlots } from '../contexts/SlotContext';
import './ActivitiesFeed.css';

const ActivitiesFeed = () => {
  const { slots } = useSlots();

  const activities = useMemo(() => {
    // Generate activities from slots
    return slots
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      .slice(0, 5)
      .map(slot => ({
        id: slot.id,
        type: slot.status,
        title: `Session ${slot.status === 'Available' ? 'Created' : slot.status}`,
        description: `${slot.teacherName} - ${new Date(slot.startTime).toLocaleString()}`,
        time: new Date(slot.startTime),
        icon: slot.status === 'Booked' ? '✓' : slot.status === 'Completed' ? '✅' : '⏰'
      }));
  }, [slots]);

  const getActivityColor = (type) => {
    switch(type) {
      case 'Booked': return '#3b82f6';
      case 'Completed': return '#10b981';
      case 'Available': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="activities-feed">
      <div className="activities-header">
        <h2>Recent Activities</h2>
        <a href="#all-activities" className="view-all">View All →</a>
      </div>

      <div className="activities-list">
        {activities.length === 0 ? (
          <p className="no-activities">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-icon"
                style={{ background: getActivityColor(activity.type) }}
              >
                {activity.icon}
              </div>
              <div className="activity-content">
                <h4 className="activity-title">{activity.title}</h4>
                <p className="activity-description">{activity.description}</p>
              </div>
              <span className="activity-time">
                {activity.time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesFeed;
