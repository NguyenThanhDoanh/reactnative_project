// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import  {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHnOhYJi7pzBkGOxmnMtfd267pHiLmajE",
  authDomain: "chat-app-98b52.firebaseapp.com",
  projectId: "chat-app-98b52",
  storageBucket: "chat-app-98b52.appspot.com",
  messagingSenderId: "530063644480",
  appId: "1:530063644480:web:7a9d1f0a70c7eaa7724ca5",
  measurementId: "G-KG6XDPE30V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);