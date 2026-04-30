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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">{t('navbar.classScheduler')}</div>
      <div className="nav-links">
        {currentUser ? (
          <>
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
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
