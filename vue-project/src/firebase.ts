import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// BU YERGA O'ZINGIZNING FIREBASE CONFIGINGIZNI QO'YISHINGIZ KERAK
// Firebase console (https://console.firebase.google.com/) dan olasiz
const firebaseConfig = {
  apiKey: "SINING_API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
