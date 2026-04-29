import { useState } from 'react';
import Calendar from 'react-calendar';
import { useSlots } from '../contexts/SlotContext';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import 'react-calendar/dist/Calendar.css';

const StudentView = () => {
  const { slots, bookSlot, cancelSlot } = useSlots(); // Import cancelSlot
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const availableSlots = slots.filter(slot => {
    return slot.status === 'Available' && new Date(slot.startTime) > new Date();
  });

  const availableOnSelectedDate = availableSlots.filter(slot => {
    return new Date(slot.startTime).toDateString() === selectedDate.toDateString();
  });

  const myBookings = slots.filter(slot => slot.studentId === currentUser?.id);

  const handleBook = (id) => {
    Swal.fire({
      title: 'Confirm Booking',
      text: "Do you want to reserve this time slot?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary)',
      cancelButtonColor: 'var(--text-muted)',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {
        bookSlot(id);
        Swal.fire({
          title: 'Booked!',
          text: '🎉 Your session has been confirmed.',
          icon: 'success',
          confirmButtonColor: 'var(--primary)',
        });
      }
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Confirm Cancellation',
      text: "Are you sure you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--danger)', // Use danger color for cancellation
      cancelButtonColor: 'var(--text-muted)',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelSlot(id);
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your booking has been cancelled.',
          icon: 'info', // Changed to info for cancellation
          confirmButtonColor: 'var(--primary)',
        });
      }
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && availableSlots.some(s => new Date(s.startTime).toDateString() === date.toDateString())) {
      return 'has-slots';
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <header className="view-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1>Book a Session</h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Welcome, <strong>{currentUser?.name}</strong>! Select a time slot that works best for you.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div 
              className="stat-pill clickable" 
              onClick={() => document.getElementById('available-slots-section')?.scrollIntoView({ behavior: 'smooth' })}
              title="Jump to Available Slots"
            >
              Booking: <strong>{availableOnSelectedDate.length}</strong>
            </div>
            <div 
              className="stat-pill clickable" 
              onClick={() => document.getElementById('my-bookings-section')?.scrollIntoView({ behavior: 'smooth' })}
              title="Jump to My Bookings"
            >
              My Bookings: <strong>{myBookings.length}</strong>
            </div>
          </div>
        </div>
      </header>

      <div className="student-booking-layout">
        <section className="calendar-section">
          <h2 className="section-title">Select Date</h2>
          <div className="calendar-container">
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate}
              tileClassName={tileClassName}
              minDate={new Date()}
            />
          </div>
        </section>

        <section id="available-slots-section" className="slots-section">
          <h2 className="section-title">Available for {selectedDate.toLocaleDateString()}</h2>
          <div className="slots-grid">
          {availableOnSelectedDate.length === 0 ? (
            <div className="no-slots">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              <p>No available slots for this date.</p>
            </div>
          ) : (
            availableOnSelectedDate.map(slot => (
              <div key={slot.id} className="slot-card available" style={{ border: 'none', borderRadius: '20px' }}>
                <div className="slot-time-box">
                  <div className="time-icon">⏰</div>
                  <div className="time-text">
                     {new Date(slot.startTime).toLocaleDateString()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
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
        </section>
      </div>

      <section id="my-bookings-section" style={{ paddingTop: '2rem', borderTop: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="section-title" style={{ margin: 0 }}>My Bookings</h2>
          <button 
            className="btn-link"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', color: 'var(--primary)', fontWeight: '600' }}
          >
            ↑ Book Another Session
          </button>
        </div>
        <div className="slots-grid">
          {myBookings.length === 0 ? (
            <div className="no-slots">
              <p>You haven't booked any sessions yet.</p>
            </div>
          ) : (
            myBookings.map(slot => (
              <div key={slot.id} className="slot-card booked" style={{ border: 'none', borderRadius: '20px', opacity: new Date(slot.startTime) < new Date() ? 0.6 : 1 }}>
                {/* Determine if the slot is in the past */}
                {(() => {
                  const isPastSlot = new Date(slot.endTime) < new Date(); // Check against endTime for completion
                  const icon = isPastSlot ? '🕰️' : '✅'; // Clock for past, check for upcoming
                  const statusText = isPastSlot ? 'Completed' : slot.status;
                  const statusClass = isPastSlot ? 'badge-completed' : 'badge-booked'; // Assuming badge-completed exists or will be added

                  return (
                    <>
                <div className="slot-time-box">
                  <div className="time-icon">{icon}</div>
                  <div className="time-text">
                     {new Date(slot.startTime).toLocaleDateString()}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#475569' }}>
                  {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block' }}>Instructor</span>
                  <span style={{ fontWeight: '600' }}>{slot.teacherName}</span>
                </div>
                <div className={`badge ${statusClass}`}>{statusText}</div>
                {!isPastSlot && ( // Only show cancel button for upcoming bookings
                  <button
                    className="btn-danger" // Use a new danger button style
                    onClick={() => handleCancel(slot.id)}
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    Cancel Booking
                  </button>
                )}
                    </>
                  );
                })()}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentView;
