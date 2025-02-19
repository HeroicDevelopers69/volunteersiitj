// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCG_ggNGtsyOhHtQOQCEXu0fBuoEHm_Pc8",
  authDomain: "volunteersiitj.firebaseapp.com",
  projectId: "volunteersiitj",
  storageBucket: "volunteersiitj.firebasestorage.app",
  messagingSenderId: "853721043278",
  appId: "1:853721043278:web:bacd9e48b72382ef2cce1f",
  measurementId: "G-0B2MV9WZBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Firebase Auth instance
const auth = getAuth(app);

export { auth };