// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCipia4o2W4orfxsoYr-7Ig9xrtQhEsIg8",

  authDomain: "z-wish.firebaseapp.com",

  projectId: "z-wish",

  storageBucket: "z-wish.appspot.com",

  messagingSenderId: "1012301965364",

  appId: "1:1012301965364:web:830b8ed900a437b6538261",

  measurementId: "G-289V0XLVBF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };
