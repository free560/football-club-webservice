import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const form = document.getElementById("registerForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(
                doc(db, "users", user.uid),
                {
                    uid: user.uid,
                    nom: name,
                    email: email,
                    role: "utilisateur",
                    createdAt: new Date().toISOString()
                }
            );

            alert("Compte créé avec succès.");

            window.location.href = "login.html";

        } catch (error) {

            alert("Erreur : " + error.message);

        }

    });

}
