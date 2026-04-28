import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace these with your actual Firebase project configuration
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrFuyqicANWoKM4Ap8iSd1aMsvPHlH-cw",
  authDomain: "class-scheduler-c9bfb.firebaseapp.com",
  projectId: "class-scheduler-c9bfb",
  storageBucket: "class-scheduler-c9bfb.firebasestorage.app",
  messagingSenderId: "1018285713524",
  appId: "1:1018285713524:web:198746a5e72ac2b3898921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);

