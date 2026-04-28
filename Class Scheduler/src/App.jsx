import { Routes, Route, Navigate } from 'react-router-dom';
import { SlotProvider } from './contexts/SlotContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './Components/navbar';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import TeacherDashboard from './Components/TeacherDashboard';
import StudentView from './Components/StudentView';
import Auth from './Components/Auth';
import NotificationCenter from './Components/NotificationCenter';
import './App.css';

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return <Navigate to="/login" />;
  
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to={currentUser.role === 'Teacher' ? '/teacher' : '/student'} />;
  }
  
  return children;
};

const AppContent = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <Navbar />
      <NotificationCenter />
      <main className="main-content with-sidebar">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
            path="/teacher" 
            element={
              <PrivateRoute requiredRole="Teacher">
                <TeacherDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/student" 
            element={
              <PrivateRoute requiredRole="Student">
                <StudentView />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SlotProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </SlotProvider>
    </AuthProvider>
  );
}

export default App;
