import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle session persistence and fetch role/name from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data (role, name) from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setCurrentUser({ uid: user.uid, ...userDoc.data() });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name, role) => {
    // 1. Create user in Firebase Authentication
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    try {
      // 2. Store the role and name in Firestore using the auth UID
      const userData = { email, name, role, id: uid };
      await setDoc(doc(db, 'users', uid), userData);
    } catch (firestoreError) {
      // If Firestore fails, we should ideally handle it or log it
      console.error("Failed to create user profile in Firestore:", firestoreError);
      throw new Error("Account created, but profile setup failed. Please contact support.");
    }

    return res.user;
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // User data is fetched in onAuthStateChanged
    return res.user;
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};