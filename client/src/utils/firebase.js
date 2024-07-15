// Import the functions you need from the SDKs you need
// this is directly copied from the firebase documentation which generate firebase configuration for me
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-7bc67.firebaseapp.com",
  projectId: "taskmanager-7bc67",
  storageBucket: "taskmanager-7bc67.appspot.com",
  messagingSenderId: "100573589226",
  appId: "1:100573589226:web:5f4c5801e80368ae77f193"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);