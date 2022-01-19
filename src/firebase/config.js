import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB95NBB4mBMEwnbblXqV1dvCQ_rurlQgjA",
  authDomain: "final-project-4-26cfc.firebaseapp.com",
  projectId: "final-project-4-26cfc",
  storageBucket: "final-project-4-26cfc.appspot.com",
  messagingSenderId: "1010974068030",
  appId: "1:1010974068030:web:0525ff825135fc1850306f",
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
