import { useSlots } from '../contexts/SlotContext';

const Events = () => {
  const { slots } = useSlots();
  const upcomingEvents = slots
    .filter(slot => new Date(slot.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Upcoming <strong>Events</strong></h1>
        <p>A full timeline of scheduled sessions across the platform.</p>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events scheduled.</p>
        ) : (
          upcomingEvents.map(event => (
            <div key={event.id} className="stat-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div className="stat-icon" style={{ background: '#e0e7ff' }}>📅</div>
                <div>
                  <h4 style={{ margin: 0 }}>{event.teacherName}'s Class</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    {new Date(event.startTime).toLocaleDateString()} at {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div>
                <span className={`badge badge-${event.status.toLowerCase()}`}>{event.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;