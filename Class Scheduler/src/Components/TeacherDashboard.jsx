import { useState } from 'react';
import { useSlots } from '../contexts/SlotContext';

const TeacherDashboard = () => {
  const { slots, addSlot, teacherName, totalSlots } = useSlots();
  const [startTime, setStartTime] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startTime) return;

    const result = addSlot(startTime);
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setStartTime('');
    
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="stats">
          <div className="stat-pill">
            Teacher: <strong>{teacherName}</strong>
          </div>
          <div className="stat-pill">
            Created Slots: <strong>{totalSlots}</strong>
          </div>
        </div>
      </header>

      <section className="add-slot-section glass-panel">
        <h2 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Create New Session
        </h2>
        <form onSubmit={handleSubmit} className="slot-form">
          <input 
            type="datetime-local" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Generate 15m Slot
          </button>
        </form>
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.type === 'success' ? '✓' : '⚠'} {message.text}
          </div>
        )}
      </section>

      <section className="slots-list-section">
        <h2 className="section-title">Schedule Overview</h2>
        <div className="slots-grid">
          {slots.length === 0 ? (
            <div className="no-slots">
              <p>No sessions scheduled yet. Start by creating a slot above.</p>
            </div>
          ) : (
            slots.map(slot => (
              <div key={slot.id} className={`slot-card ${slot.status.toLowerCase()}`}>
                <div className="slot-time-box">
                  <div className="time-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className="time-text">
                    {new Date(slot.startTime).toLocaleDateString()} @ {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="slot-footer">
                  <span className={`badge badge-${slot.status.toLowerCase()}`}>
                    {slot.status}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>15 Min Session</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
