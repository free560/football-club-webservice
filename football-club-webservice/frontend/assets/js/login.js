import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!email || !password) {

            alert("Veuillez remplir tous les champs.");

            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Connexion réussie.");

            window.location.href =
                "services.html";

        } catch (error) {

            alert("Erreur : " + error.message);

        }

    });

}

