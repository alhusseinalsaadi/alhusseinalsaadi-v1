import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbMNxeWSIiZbvVus2Qe9ihaidB9fVL1pw",
  authDomain: "alhusseinalsaadi-97b41.firebaseapp.com",
  projectId: "alhusseinalsaadi-97b41",
  storageBucket: "alhusseinalsaadi-97b41.firebasestorage.app",
  messagingSenderId: "639044083736",
  appId: "1:639044083736:web:827ef62cf1ab3ac9d4a36d",
  measurementId: "G-4JNHVHB884"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(firebaseApp) : null;
