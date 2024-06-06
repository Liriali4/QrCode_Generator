// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDreskiKo5uEC35Z20P2GDfoIRNKA5oFBU",
  authDomain: "qrcodegenerator-9c9cd.firebaseapp.com",
  projectId: "qrcodegenerator-9c9cd",
  storageBucket: "qrcodegenerator-9c9cd.appspot.com",
  messagingSenderId: "545773174157",
  appId: "1:545773174157:web:dc9ff43709f1f9451951c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);