import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD-NPhYkkRC4R9YznryruY9pI3klr7Su4Y",
  authDomain: "project-zenith-001.firebaseapp.com",
  projectId: "project-zenith-001",
  storageBucket: "project-zenith-001.firebasestorage.app",
  messagingSenderId: "27511448256",
  appId: "1:27511448256:web:bee4c244c504cd366e0325",
  measurementId: "G-HL6Q22Q5V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;