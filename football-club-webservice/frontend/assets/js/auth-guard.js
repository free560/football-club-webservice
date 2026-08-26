// ==========================================
// AUTH GUARD - PROTECTION DES PAGES
// ==========================================

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


// ==========================================
// VÉRIFICATION DE L'AUTHENTIFICATION
// ==========================================

onAuthStateChanged(auth, (user) => {

    // --------------------------------------
    // UTILISATEUR NON CONNECTÉ
    // --------------------------------------

    if (!user) {

        console.log(
            "Accès refusé : utilisateur non connecté."
        );

        // Redirection vers login
        window.location.replace("login.html");

        return;
    }


    // --------------------------------------
    // UTILISATEUR CONNECTÉ
    // --------------------------------------

    console.log(
        "Utilisateur authentifié :",
        user.email
    );


    // --------------------------------------
    // AFFICHER L'EMAIL
    // --------------------------------------

    const userEmail =
        document.getElementById("userEmail");


    if (userEmail) {

        userEmail.textContent =
            user.email;

    }


    // --------------------------------------
    // AFFICHER UID SI NÉCESSAIRE
    // --------------------------------------

    const userUid =
        document.getElementById("userUid");


    if (userUid) {

        userUid.textContent =
            user.uid;

    }

});