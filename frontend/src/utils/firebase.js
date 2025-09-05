// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "edulearn-7655f.firebaseapp.com",
    projectId: "edulearn-7655f",
    storageBucket: "edulearn-7655f.firebasestorage.app",
    messagingSenderId: "452514331843",
    appId: "1:452514331843:web:f2ec2942c33b04652a7676"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }