import { useState, useMemo } from 'react';
import { useSlots } from '../contexts/SlotContext';
import Swal from 'sweetalert2';

const getNextRoundHour = () => {
  const now = new Date();
  // Move to the next hour and reset minutes/seconds
  now.setHours(now.getHours() + 1);
  now.setMinutes(0, 0, 0);
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = '00';
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const TeacherDashboard = () => {
  const { teacherSlots, addSlot, deleteSlot, completeSlot, teacherName } = useSlots();
  const [startTime, setStartTime] = useState(getNextRoundHour());

  // Calculate teacher-specific stats using useMemo for optimization
  const stats = useMemo(() => ({
    total: teacherSlots.length,
    booked: teacherSlots.filter(s => s.status === 'Booked').length,
    available: teacherSlots.filter(s => s.status === 'Available').length,
    completed: teacherSlots.filter(s => s.status === 'Completed').length,
  }), [teacherSlots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime) return;

    const result = await addSlot(startTime);
    if (result.success) {
      setStartTime(getNextRoundHour());
      Swal.fire({
        title: 'Slot Created',
        text: 'Your 15-minute session has been added.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire('Error', result.message, 'error');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <div className="dashboard-welcome">
          <h1>Teacher <strong>Management</strong></h1>
          <p>Welcome back, {teacherName}. You have {stats.booked} active bookings today.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0e7ff' }}><span>📅</span></div>
          <div className="stat-content">
            <p className="stat-label">Total Slots</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dbeafe' }}><span>👤</span></div>
          <div className="stat-content">
            <p className="stat-label">Booked</p>
            <h3 className="stat-value">{stats.booked}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7' }}><span>⏰</span></div>
          <div className="stat-content">
            <p className="stat-label">Available</p>
            <h3 className="stat-value">{stats.available}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fef3c7' }}><span>✅</span></div>
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <h3 className="stat-value">{stats.completed}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-col-1">
          <section className="add-slot-section" style={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: 'none' }}>
            <h2 className="section-title">Create New Session</h2>
            <form onSubmit={handleSubmit} className="slot-form">
              <input 
                type="datetime-local" 
                className="auth-input-3d"
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                required
                style={{ borderRadius: '12px', border: 'none', padding: '1rem' }}
              />
              <button type="submit" className="btn-primary btn-3d">
                + Generate 15m Slot
              </button>
            </form>
          </section>

          <section className="slots-list-section">
            <h2 className="section-title">My Live Schedule</h2>
            <div className="slots-grid">
              {teacherSlots.length === 0 ? (
                <div className="no-slots">
                  <p>No sessions scheduled yet. Start by creating a slot above.</p>
                </div>
              ) : (
                [...teacherSlots]
                  .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                  .map(slot => (
                  <div key={slot.id} className={`slot-card ${slot.status.toLowerCase()}`} style={{ borderRadius: '20px', border: 'none' }}>
                    <div className="slot-time-box">
                      <div className="time-icon">⏰</div>
                      <div className="time-text">
                        {new Date(slot.startTime).toLocaleDateString()} @ {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="slot-footer">
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className={`badge badge-${slot.status.toLowerCase()}`}>
                          {slot.status}
                        </span>
                        {slot.status === 'Booked' && (
                          <button 
                            onClick={() => completeSlot(slot.id)}
                            className="btn-3d"
                            style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                          >
                            ✓ COMPLETE
                          </button>
                        )}
                      </div>
                      <button 
                        onClick={() => deleteSlot(slot.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', fontSize: '1.2rem' }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
        
        <div className="grid-col-2">
          <div className="auth-card-3d" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Teacher Tips</h3>
            <ul style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
              <li>Slots are fixed at 15 minutes.</li>
              <li>Past slots are hidden from students.</li>
              <li>Click 'Complete' to finish a session.</li>
              <li>Deleted slots cannot be recovered.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
