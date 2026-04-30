/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const defaultUsers = [
  { id: 1, email: 'teacher@example.com', password: 'test123', name: 'Dr. Smith', role: 'Teacher' },
  { id: 2, email: 'student@example.com', password: 'test123', name: 'John Doe', role: 'Student' }
];

export const AuthProvider = ({ children }) => {
  // Initialize default users if empty
  if (!localStorage.getItem('app_users')) {
    localStorage.setItem('app_users', JSON.stringify(defaultUsers));
  }

  const [currentUser, setCurrentUser] = useState(() => {
    const session = localStorage.getItem('current_session');
    if (session) {
      try {
        return JSON.parse(session);
      } catch (err) {
        console.error("Invalid session data", err);
        localStorage.removeItem('current_session');
        return null;
      }
    }
    return null;
  });

  // Sign Up logic using LocalStorage
  async function signup(email, password, name, role) {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    const cleanEmail = email.trim().toLowerCase();
    
    if (users.find(u => u.email.trim().toLowerCase() === cleanEmail)) {
      throw new Error("User already exists");
    }

    const newUser = { id: Date.now(), email: cleanEmail, password, name, role };
    users.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(users));
    
    // Log them in automatically
    setCurrentUser(newUser);
    localStorage.setItem('current_session', JSON.stringify(newUser));
    return newUser;
  }

  // Login logic using LocalStorage
  async function login(email, password) {
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    const cleanEmail = email.trim().toLowerCase();
    
    const user = users.find(u => u.email.trim().toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    setCurrentUser(user);
    localStorage.setItem('current_session', JSON.stringify(user));
    return user;
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('current_session');
  }

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
