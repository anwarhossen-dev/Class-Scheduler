import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SlotProvider } from './contexts/SlotContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Auth from './Components/Auth';
import TeacherDashboard from './Components/TeacherDashboard';
import StudentView from './Components/StudentView';
import Navbar from './Components/navbar';
import NotificationCenter from './Components/NotificationCenter';
import './App.css';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    const redirectPath = currentUser.role === 'Teacher' ? '/teacher' : '/student';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <SlotProvider>
          <Router>
            <Navbar />
            <NotificationCenter />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Auth />} />
                <Route path="/teacher" element={
                  <ProtectedRoute role="Teacher"><TeacherDashboard /></ProtectedRoute>
                } />
                <Route path="/student" element={
                  <ProtectedRoute role="Student"><StudentView /></ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </Router>
        </SlotProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;