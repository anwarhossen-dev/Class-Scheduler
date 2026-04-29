import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const FeatureUnderConstruction = ({ title, icon }) => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-welcome">
        <h1>{icon} {title}</h1>
        <p>Accessing the {title} module for {currentUser?.role} account.</p>
      </div>

      <div className="auth-card-3d" style={{ marginTop: '3rem', textAlign: 'center', padding: '4rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏗️</div>
        <h2 style={{ color: '#111827', marginBottom: '1rem' }}>{title} Module is Coming Soon</h2>
        <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
          We are currently engineering the professional {title} management system for the Academic Atelier portal.
        </p>
        <button 
          className="btn-primary" 
          style={{ marginTop: '2rem' }}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FeatureUnderConstruction;
