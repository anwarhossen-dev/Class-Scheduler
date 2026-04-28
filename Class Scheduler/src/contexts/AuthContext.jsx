/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
    
    if (users.find(u => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = { id: Date.now(), email, password, name, role };
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
    const user = users.find(u => u.email === email && u.password === password);

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
