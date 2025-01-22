// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: "AIzaSyAMN_mmA9BxLw1CNgVQuBriSPo5yKn4G78",
  authDomain: "curewave-2e004.firebaseapp.com",
  databaseURL: "https://curewave-2e004-default-rtdb.firebaseio.com",
  projectId: "curewave-2e004",
  storageBucket: "curewave-2e004.firebasestorage.app",
  messagingSenderId: "1078651849057",
  appId: "1:1078651849057:web:f6813683dad5305cf19d20",
  measurementId: "G-BJB31JDNY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { app, db };