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
    <div className="auth-container" style={{ maxWidth: '450px', margin: '3rem auto' }}>
      <div className="add-slot-section">
        <h2 className="section-title">{isLogin ? t('auth.welcomeBack') : t('auth.joinClassScheduler')}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {isLogin ? t('auth.loginDescription') : t('auth.signupDescription')}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {!isLogin && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.fullName')}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder={t('auth.namePlaceholder')}
                  style={{ padding: '0.8rem', borderRadius: '10px', background: '#f8fafc', fontSize: '1rem', border: 'none', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.iAm')}</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="button"
                    onClick={() => setRole('Student')}
                    style={{ 
                      flex: 1, 
                      background: role === 'Student' ? 'var(--primary)' : '#f8fafc',
                      color: role === 'Student' ? 'white' : 'var(--text-main)',
                      border: 'none',
                      padding: '0.6rem',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >{t('auth.student')}</button>
                  <button 
                    type="button"
                    onClick={() => setRole('Teacher')}
                    style={{ 
                      flex: 1, 
                      background: role === 'Teacher' ? 'var(--primary)' : '#f8fafc',
                      color: role === 'Teacher' ? 'white' : 'var(--text-main)',
                      border: 'none',
                      padding: '0.6rem',
                      borderRadius: '10px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >{t('auth.teacher')}</button>
                </div>
              </div>
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.email')}</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder={t('auth.emailPlaceholder')}
              style={{ padding: '0.8rem', borderRadius: '10px', background: '#f8fafc', fontSize: '1rem', border: 'none', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.password')}</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder={t('auth.passwordPlaceholder')}
              style={{ padding: '0.8rem', borderRadius: '10px', background: '#f8fafc', fontSize: '1rem', border: 'none', outline: 'none' }}
            />
          </div>

          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.confirmPassword')}</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder={t('auth.confirmPasswordPlaceholder')}
                style={{ padding: '0.8rem', borderRadius: '10px', background: '#f8fafc', fontSize: '1rem', border: 'none', outline: 'none' }}
              />
            </div>
          )}
          
          {error && <div className="message error" style={{ margin: '0' }}>⚠ {error}</div>}
          
          <button disabled={loading} type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            {loading ? 'Processing...' : (isLogin ? t('auth.login') : t('auth.signup'))}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
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
              fontWeight: '700', 
              padding: '0', 
              display: 'inline', 
              cursor: 'pointer' 
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
