
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDkcaWWGqXelr3zbqZAKYIlzBcDR0tnpns",
    authDomain: "receipttracker-ef9f9.firebaseapp.com",
    projectId: "receipttracker-ef9f9",
    storageBucket: "receipttracker-ef9f9.appspot.com",
    messagingSenderId: "352396880080",
    appId: "1:352396880080:web:f7bc00de09284395c3d6d5",
    measurementId: "G-ZMHLPSLJ1V"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
