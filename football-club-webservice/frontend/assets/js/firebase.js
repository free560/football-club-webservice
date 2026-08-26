import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyCdjf45ynsEtBJhz1_ttqN83FpHp6AORio",

    authDomain: "footballclubserviceweb.firebaseapp.com",

    projectId: "footballclubserviceweb",

    storageBucket: "footballclubserviceweb.firebasestorage.app",

    messagingSenderId: "563186984458",

    appId: "1:563186984458:web:e92987765db10ddf6ba1f3",

    measurementId: "G-KNWM0J0HHE"

};


// Initialisation Firebase
const app = initializeApp(firebaseConfig);


// Firebase Authentication
export const auth = getAuth(app);


// Firestore Database
export const db = getFirestore(app);