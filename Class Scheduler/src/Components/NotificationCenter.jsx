import { useNotifications } from '../contexts/NotificationContext';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notification-center">
      {notifications.map(notif => (
        <div key={notif.id} className={`notification notification-${notif.type}`}>
          <span className="notification-message">{notif.message}</span>
          <button 
            className="notification-close"
            onClick={() => removeNotification(notif.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
