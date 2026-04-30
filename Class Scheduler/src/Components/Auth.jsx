import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import { useTranslation } from 'react-i18next';
//import { useTranslation } from 'react-i18next';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      return setError(t('auth.passwordMismatch'));
    }

    try {
      setError('');
      setLoading(true);
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(email, password, name, role);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="auth-container" style={{ maxWidth: '480px', margin: '4rem auto', width: '100%', padding: '0 1rem' }}>
      <div className="glass-panel" style={{ padding: '3rem 2.5rem' }}>
        <h2 className="section-title" style={{ justifyContent: 'center', fontSize: '1.8rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {isLogin ? t('auth.welcomeBack') : t('auth.joinClassScheduler')}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
          {isLogin ? t('auth.loginDescription') : t('auth.signupDescription')}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {!isLogin && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t('auth.fullName')}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder={t('auth.namePlaceholder')}
                  style={{ padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', border: '1px solid var(--border-solid)', outline: 'none', transition: 'all 0.3s' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-glow)'; e.target.style.background = 'var(--bg-card)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'var(--bg-main)'; }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t('auth.iAm')}</label>
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-main)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-solid)' }}>
                  <button 
                    type="button"
                    onClick={() => setRole('Student')}
                    style={{ 
                      flex: 1, 
                      background: role === 'Student' ? 'var(--bg-card)' : 'transparent',
                      color: role === 'Student' ? 'var(--primary)' : 'var(--text-muted)',
                      boxShadow: role === 'Student' ? 'var(--shadow-sm)' : 'none',
                      border: 'none',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >{t('auth.student')}</button>
                  <button 
                    type="button"
                    onClick={() => setRole('Teacher')}
                    style={{ 
                      flex: 1, 
                      background: role === 'Teacher' ? 'var(--bg-card)' : 'transparent',
                      color: role === 'Teacher' ? 'var(--primary)' : 'var(--text-muted)',
                      boxShadow: role === 'Teacher' ? 'var(--shadow-sm)' : 'none',
                      border: 'none',
                      padding: '0.6rem',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >{t('auth.teacher')}</button>
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t('auth.email')}</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder={t('auth.emailPlaceholder')}
              style={{ padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', border: '1px solid var(--border-solid)', outline: 'none', transition: 'all 0.3s' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-glow)'; e.target.style.background = 'var(--bg-card)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'var(--bg-main)'; }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t('auth.password')}</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder={t('auth.passwordPlaceholder')}
              style={{ padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', border: '1px solid var(--border-solid)', outline: 'none', transition: 'all 0.3s' }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-glow)'; e.target.style.background = 'var(--bg-card)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'var(--bg-main)'; }}
            />
          </div>

          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t('auth.confirmPassword')}</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder={t('auth.confirmPasswordPlaceholder')}
                style={{ padding: '0.9rem 1.2rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', border: '1px solid var(--border-solid)', outline: 'none', transition: 'all 0.3s' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-glow)'; e.target.style.background = 'var(--bg-card)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border-solid)'; e.target.style.boxShadow = 'none'; e.target.style.background = 'var(--bg-main)'; }}
              />
            </div>
          )}
          
          {error && <div className="message error" style={{ margin: '0' }}>⚠ {error}</div>}
          
          <button disabled={loading} type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
            {loading ? 'Processing...' : (isLogin ? t('auth.login') : t('auth.signup'))}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary)', 
              fontWeight: '800', 
              padding: '0', 
              display: 'inline', 
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '4px'
            }}
          >
            {isLogin ? t('auth.signup') : t('auth.login')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
