// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdjf45ynsEtBJhz1_ttqN83FpHp6AORio",
  authDomain: "footballclubserviceweb.firebaseapp.com",
  projectId: "footballclubserviceweb",
  storageBucket: "footballclubserviceweb.firebasestorage.app",
  messagingSenderId: "563186984458",
  appId: "1:563186984458:web:e92987765db10ddf6ba1f3",
  measurementId: "G-KNWM0J0HHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// npm install firebase
// npm install -g firebase-tools