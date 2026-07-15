// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAciH-NiMzFTy1HUXOCf7mJ3X9la1ey3eA",
  authDomain: "todoapp-d26f1.firebaseapp.com",
  databaseURL: "https://todoapp-d26f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todoapp-d26f1",
  storageBucket: "todoapp-d26f1.firebasestorage.app",
  messagingSenderId: "34868709512",
  appId: "1:34868709512:web:1cb1dcf48296bf67edb73d",
  measurementId: "G-GF3F0EYESV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
}

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password);
}

export const logOut = () => signOut(auth);