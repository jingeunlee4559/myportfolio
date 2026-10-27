import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 값은 .env의 VITE_FIREBASE_* 에서 읽습니다. (.env는 git에 올리지 않습니다)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// .env가 없으면 방명록만 꺼지고 사이트는 정상으로 뜹니다.
export const firebaseReady = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
export const app = firebaseReady ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
