import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getDatabase, type Database } from 'firebase/database'

// BU YERGA O'ZINGIZNING FIREBASE CONFIGINGIZNI QO'YISHINGIZ KERAK
const firebaseConfig = {
  apiKey: 'SINING_API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID-default-rtdb.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID'
}

let db: Database | null = null

try {
  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig)
  db = getDatabase(app)
} catch (e) {
  console.warn('[BookShare] Firebase ishga tushmadi, demo (localStorage) rejimi.', e)
}

export { db }

export function isFirebaseLive(): boolean {
  return !!(db && !db.app.options.apiKey?.includes('SINING_API_KEY'))
}
