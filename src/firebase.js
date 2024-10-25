// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBD4t_O-zNJ_wDMG1M7qqIhsp83-a3_tw",
    authDomain: "neighbours-life.firebaseapp.com",
    projectId: "neighbours-life",
    storageBucket: "neighbours-life.appspot.com",
    messagingSenderId: "902965953508",
    appId: "1:902965953508:web:9509b1e843d5f400aa7df1",
    measurementId: "G-GT2RTJ08ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)

export { auth, signOut, onAuthStateChanged, storage };