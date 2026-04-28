import { useSlots } from '../contexts/SlotContext';

const StudentView = () => {
  const { slots, bookSlot } = useSlots();
  const availableSlots = slots.filter(slot => slot.status === 'Available');

  const handleBook = (id) => {
    bookSlot(id);
    alert('🎉 Booking Confirmed! See you there.');
  };

  return (
    <div className="student-view">
      <header className="view-header">
        <h1>Book a Session</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Select a time slot that works best for your schedule.
        </p>
      </header>

      <div className="slots-grid">
        {availableSlots.length === 0 ? (
          <div className="no-slots">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <p>No available slots right now. Check back soon!</p>
          </div>
        ) : (
          availableSlots.map(slot => (
            <div key={slot.id} className="slot-card available">
              <div className="slot-time-box">
                <div className="time-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div className="time-text">
                   {new Date(slot.startTime).toLocaleDateString()}
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Instructor</span>
                <span style={{ fontWeight: '600' }}>{slot.teacherName}</span>
              </div>

              <button 
                className="book-btn" 
                onClick={() => handleBook(slot.id)}
              >
                Reserve Spot
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentView;
