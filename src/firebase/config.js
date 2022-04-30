import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD06S8yqhjoTWoBbxtIX7AEV8Ec-jFF7tU",
  authDomain: "final-project-4-bc6ae.firebaseapp.com",
  projectId: "final-project-4-bc6ae",
  storageBucket: "final-project-4-bc6ae.appspot.com",
  messagingSenderId: "1036084069026",
  appId: "1:1036084069026:web:903352af04bd62bdbe0dfb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get database
const db = getFirestore();

// Ref collection tweets
const tweetsCollectionRef = collection(db, "tweets");

// Authentication
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { db, tweetsCollectionRef, auth, googleProvider };

export default app;
