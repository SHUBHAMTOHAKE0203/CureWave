// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SEND_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASURMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { app, db };