import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  }

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">{t('navbar.classScheduler')}</div>
      <div className="nav-links">
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/teacher">{t('navbar.teacherDashboard')}</Link>
            <Link to="/student">{t('navbar.studentView')}</Link>
            <span style={{ marginLeft: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentUser.email}
            </span>
            
            {/* Language Selector */}
            <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.2rem', background: 'var(--bg-main)', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-solid)' }}>
              {['en', 'es', 'fr', 'de'].map((lng) => (
                <button 
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  style={{ 
                    background: i18n.language === lng ? 'var(--bg-card)' : 'transparent', 
                    color: i18n.language === lng ? 'var(--primary)' : 'var(--text-muted)',
                    boxShadow: i18n.language === lng ? 'var(--shadow-sm)' : 'none',
                    border: 'none',
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s'
                  }}
                >
                  {lng}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-main)',
                border: '1px solid var(--border-solid)',
                color: 'var(--text-main)',
                padding: '0.5rem',
                borderRadius: '8px',
                marginLeft: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>

            <button 
              onClick={handleLogout}
              style={{ 
                background: 'rgba(244, 63, 94, 0.1)', 
                border: '1px solid rgba(244, 63, 94, 0.2)', 
                padding: '0.4rem 1rem', 
                borderRadius: '8px',
                marginLeft: '1rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                color: 'var(--danger)',
                fontWeight: '700',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.target.style.background = 'rgba(244, 63, 94, 0.2)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseOut={(e) => { e.target.style.background = 'rgba(244, 63, 94, 0.1)'; e.target.style.transform = 'translateY(0)'; }}
            >
              {t('navbar.logout')}
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
