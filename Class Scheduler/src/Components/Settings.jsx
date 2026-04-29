import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css'; // Reuse some layout styles

const Settings = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>Account Settings</h1>
        <p>Manage your profile and preferences.</p>
      </div>

      <div className="auth-card-3d" style={{ marginTop: '2rem', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="settings-section">
            <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Profile Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                <span style={{ color: '#6b7280', fontWeight: '600' }}>Full Name</span>
                <span style={{ fontWeight: '700' }}>{currentUser?.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                <span style={{ color: '#6b7280', fontWeight: '600' }}>Email Address</span>
                <span style={{ fontWeight: '700' }}>{currentUser?.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                <span style={{ color: '#6b7280', fontWeight: '600' }}>Account Role</span>
                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{currentUser?.role}</span>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3 style={{ marginBottom: '1rem', color: '#111827' }}>Preferences</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Email notifications are currently enabled.</p>
            <button className="btn-primary" style={{ marginTop: '1rem' }}>Update Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
