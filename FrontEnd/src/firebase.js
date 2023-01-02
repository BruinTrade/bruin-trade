import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Zb6goXSY67o8Fu8phhgreN4fA4caejw",
  authDomain: "bruintrade-2f257.firebaseapp.com",
  projectId: "bruintrade-2f257",
  storageBucket: "bruintrade-2f257.appspot.com",
  messagingSenderId: "433276600445",
  appId: "1:433276600445:web:15b784dcc4ad0b13abb114"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
