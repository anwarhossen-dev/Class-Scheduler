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
            <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => changeLanguage('en')}
                style={{ 
                  background: i18n.language === 'en' ? 'var(--primary)' : '#f3f4f6', 
                  color: i18n.language === 'en' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                EN
              </button>
              <button 
                onClick={() => changeLanguage('es')}
                style={{ 
                  background: i18n.language === 'es' ? 'var(--primary)' : '#f3f4f6', 
                  color: i18n.language === 'es' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ES
              </button>
              <button 
                onClick={() => changeLanguage('fr')}
                style={{ 
                  background: i18n.language === 'fr' ? 'var(--primary)' : '#f3f4f6', 
                  color: i18n.language === 'fr' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                FR
              </button>
              <button 
                onClick={() => changeLanguage('de')}
                style={{ 
                  background: i18n.language === 'de' ? 'var(--primary)' : '#f3f4f6', 
                  color: i18n.language === 'de' ? 'white' : 'var(--text-main)',
                  border: 'none',
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                DE
              </button>
            </div>

            <button 
              onClick={handleLogout}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0.4rem 0.8rem', 
                borderRadius: '6px',
                marginLeft: '1rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                color: 'var(--text-main)',
                fontWeight: '600'
              }}
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
