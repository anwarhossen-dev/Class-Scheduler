import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

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
        // Navigation is handled by App.jsx re-render
      } else {
        await signup(email, password, name, role);
        // Navigation is handled by App.jsx re-render
      }
    } catch (err) {
      // Map Firebase error codes to user-friendly messages
      let message = err.message;
      
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          message = "Invalid email or password. Please check your credentials and try again.";
          break;
        case 'auth/email-already-in-use':
          message = "This email is already registered. Try logging in instead.";
          break;
        case 'auth/weak-password':
          message = "Password should be at least 6 characters.";
          break;
      }
      
      setError(message);
      setLoading(false); // Only reset loading on error
    }
  }

  return (
    <div className="auth-container" style={{ maxWidth: '480px', margin: '4rem auto' }}>
      <div className="auth-card-3d">
        <h2 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{isLogin ? t('auth.welcomeBack') : t('auth.joinClassScheduler')}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          {isLogin ? t('auth.loginDescription') : t('auth.signupDescription')}
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {!isLogin && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.fullName')}</label>
                <input 
                  type="text" 
                  className="auth-input-3d"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder={t('auth.namePlaceholder')}
                  style={{ padding: '0.8rem', fontSize: '1rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.iAm')}</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="button"
                    onClick={() => setRole('Student')}
                    className="btn-3d"
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
                    className="btn-3d"
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
              className="auth-input-3d"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder={t('auth.emailPlaceholder')}
              style={{ padding: '0.8rem', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.password')}</label>
            <input 
              type="password" 
              className="auth-input-3d"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder={t('auth.passwordPlaceholder')}
              style={{ padding: '0.8rem', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>{t('auth.confirmPassword')}</label>
              <input 
                type="password" 
                className="auth-input-3d"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder={t('auth.confirmPasswordPlaceholder')}
                style={{ padding: '0.8rem', fontSize: '1rem', outline: 'none' }}
              />
            </div>
          )}
          
          {error && <div className="message error" style={{ margin: '0' }}>⚠ {error}</div>}
          
          <button disabled={loading} type="submit" className="btn-primary btn-3d" style={{ marginTop: '1rem', width: '100%' }}>
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
