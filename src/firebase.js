import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2XW3PjM2elIfoOtw_O_gEGJYNT8CumNk",
  authDomain: "livestock-management-sys-c4de4.firebaseapp.com",
  projectId: "livestock-management-sys-c4de4",
  storageBucket: "livestock-management-sys-c4de4.firebasestorage.app",
  messagingSenderId: "442401559762",
  appId: "1:442401559762:web:d49f815a9efe11efc2890b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);