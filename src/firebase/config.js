import { initializeApp } from "firebase/app";

import { getFirestore, collection } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkAK7XCJUWdNZy9yLkC8TzLrmtpjuXhaI",
  authDomain: "final-project-4-50315.firebaseapp.com",
  projectId: "final-project-4-50315",
  storageBucket: "final-project-4-50315.appspot.com",
  messagingSenderId: "113577989443",
  appId: "1:113577989443:web:316dc5112cec11d987cbf6",
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
