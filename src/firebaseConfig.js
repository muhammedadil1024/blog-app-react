// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC94tIy9r0WqgOkOrMb52pXVWI1HTlvezc",
    authDomain: "react-blog-39fe0.firebaseapp.com",
    projectId: "react-blog-39fe0",
    storageBucket: "react-blog-39fe0.appspot.com",
    messagingSenderId: "1053146428080",
    appId: "1:1053146428080:web:dbdf2b813c599ed0428175",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);
export default db;