import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';

const Attendance = () => {
  const { slots, completeSlot } = useSlots();
  const { currentUser } = useAuth();

  // Teachers see their booked/completed slots to manage attendance
  const managedSlots = slots.filter(slot => 
    slot.teacherId === currentUser?.id && 
    (slot.status === 'Booked' || slot.status === 'Completed')
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Attendance <strong>Tracker</strong></h1>
        <p>Manage student presence for your scheduled 15-minute sessions.</p>
      </div>

      <div className="auth-card-3d" style={{ marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
              <th style={{ padding: '1rem' }}>Date & Time</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {managedSlots.length === 0 ? (
              <tr><td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No bookings found for attendance.</td></tr>
            ) : (
              managedSlots.map(slot => (
                <tr key={slot.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    {new Date(slot.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`badge badge-${slot.status.toLowerCase()}`}>{slot.status}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {slot.status === 'Booked' ? (
                      <button 
                        onClick={() => completeSlot(slot.id)}
                        className="btn-primary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >Mark Present</button>
                    ) : (
                      <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Attended</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;