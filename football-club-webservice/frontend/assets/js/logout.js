// ==========================================
// LOGOUT - DÉCONNEXION FIREBASE
// ==========================================
/*
import { auth } from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ==========================================
// BOUTON DE DÉCONNEXION
// ==========================================

const logoutButton =
    document.getElementById("logoutButton");

// ==========================================
// VÉRIFIER QUE LE BOUTON EXISTE
// ==========================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            const confirmation =
                confirm(
                    "Voulez-vous vraiment vous déconnecter ?"
                );

            if (!confirmation) {
                return;
            }

            try {

                await signOut(auth);

                console.log(
                    "Utilisateur déconnecté."
                );

                window.location.replace(
                    "login.html"
                );

            } catch (error) {

                console.error(
                    "Erreur lors de la déconnexion :",
                    error
                );

                alert(
                    "Une erreur est survenue lors de la déconnexion."
                );

            }

        }
    );

}
*/
