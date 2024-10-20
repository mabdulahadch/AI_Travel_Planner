// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQUakLHlt5vtuYGQKuawmjA4Rip8H8zuU",
  authDomain: "ai-travel-app-e43de.firebaseapp.com",
  projectId: "ai-travel-app-e43de",
  storageBucket: "ai-travel-app-e43de.appspot.com",
  messagingSenderId: "295930417524",
  appId: "1:295930417524:web:b5f05afc42fa043dcd1c21",
  measurementId: "G-H7CQ0JSJRQ"
};

// Initialize Firebase 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);