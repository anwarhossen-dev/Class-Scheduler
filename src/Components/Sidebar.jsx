import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isMobileOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = currentUser?.role === 'Teacher' ? [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '📅', label: 'Schedule', href: '/teacher' },
    { icon: '📝', label: 'Attendance', href: '/attendance' },
    { icon: '🎉', label: 'Events', href: '/events' },
    { icon: '⚙️', label: 'Settings', href: '/settings' }
  ] : [
    { icon: '📚', label: 'Dashboard', href: '/dashboard' },
    { icon: '📅', label: 'Available Slots', href: '/student' },
    { icon: '🎉', label: 'Events', href: '/events' },
    { icon: '🔔', label: 'Notifications', href: '/dashboard' },
    { icon: '⚙️', label: 'Settings', href: '/settings' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
        {!collapsed && <h3>Menu</h3>}
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, idx) => (
          item.href.startsWith('/') ? (
            <Link key={idx} to={item.href} className="menu-item" onClick={onClose}>
              <span className="menu-icon">{item.icon}</span>
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </Link>
          ) : (
            <a key={idx} href={item.href} className="menu-item" onClick={onClose}>
              <span className="menu-icon">{item.icon}</span>
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </a>
          )
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {currentUser?.email?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div>
              <p className="user-name">{currentUser?.email?.split('@')[0]}</p>
              <p className="user-role">{currentUser?.role}</p>
            </div>
          )}
        </div>
        <button className="logout-btn" onClick={logout} title="Logout">
          🚪
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
