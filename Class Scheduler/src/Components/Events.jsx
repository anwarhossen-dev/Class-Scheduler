import { useState } from 'react';
import { useSlots } from '../contexts/SlotContext';
import { useTranslation } from 'react-i18next';
import './Events.css'; // Import the new CSS file

const Events = () => {
  const { slots } = useSlots();
  const { t } = useTranslation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 5;

  const upcomingEvents = slots
    .filter(slot => new Date(slot.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const totalPages = Math.ceil(upcomingEvents.length / EVENTS_PER_PAGE);
  const currentEvents = upcomingEvents.slice((currentPage - 1) * EVENTS_PER_PAGE, currentPage * EVENTS_PER_PAGE);

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>{t('events.title')} <strong>{t('events.strongTitle')}</strong></h1>
        <p>{t('events.subtitle')}</p>
      </div>

      <div className="dashboard-grid" style={{ marginTop: '2rem' }}>
        {currentEvents.length === 0 ? (
          <p>{t('events.noEvents')}</p>
        ) : (
          currentEvents.map(event => (
            <div key={event.id} className="event-item-card">
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div className="stat-icon" style={{ background: '#e0e7ff' }}>📅</div>
                <div>
                  <h4 style={{ margin: 0 }}>{t('events.classOf', { teacherName: event.teacherName })}</h4>
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

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            ← {t('common.previous') || 'Previous'}
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button 
              key={idx} 
              className={`pagination-btn ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            {t('common.next') || 'Next'} →
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;