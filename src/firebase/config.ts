// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoK02ClwRbCQm8piIdLwGFo9pYGAIzeYY",
  authDomain: "boletos-199f9.firebaseapp.com",
  projectId: "boletos-199f9",
  storageBucket: "boletos-199f9.appspot.com",
  messagingSenderId: "864788994284",
  appId: "1:864788994284:web:d8e91dc9438f6177dc2dc9"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const FirebaseDB = getFirestore(FirebaseApp);
const FirebaseStorage = getStorage(FirebaseApp);

export { FirebaseApp, FirebaseDB, FirebaseStorage };