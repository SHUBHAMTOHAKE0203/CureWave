// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpRd35lTWr4WPyfLBRHkFKspUU_o69kUs",
  authDomain: "curewave-94b5b.firebaseapp.com",
  databaseURL: "https://curewave-94b5b-default-rtdb.firebaseio.com",
  projectId: "curewave-94b5b",
  storageBucket: "curewave-94b5b.firebasestorage.app",
  messagingSenderId: "62179482418",
  appId: "1:62179482418:web:8caba1e624e0e06cde552b",
  measurementId: "G-XZNX1BZS78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { app, db };
