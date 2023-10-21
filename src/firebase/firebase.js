// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "@firebase/firestore"
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkd8yHdnZQ9QzLqqVrKhM27bmSMBEN7nk",
  authDomain: "xbetrecharge-17c51.firebaseapp.com",
  projectId: "xbetrecharge-17c51",
  storageBucket: "xbetrecharge-17c51.appspot.com",
  messagingSenderId: "721236533121",
  appId: "1:721236533121:web:18ea16ee20fc2d1cd3d280",
  measurementId: "G-LFCK8SK95G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);