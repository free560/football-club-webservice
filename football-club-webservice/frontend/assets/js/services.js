import { auth, db } from "./firebase.js";
/*
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
*/
import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    chargerMeteo
} from "./weather.js";

import {
    ouvrirGoogleSheets,
    afficherStatistiques
} from "./sheets.js";

import {
    initialiserPaiement
} from "./payment.js";

import {
    initialiserWhatsApp
} from "./whatsapp.js";


/* =========================
   AUTHENTIFICATION
========================= 

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;
        }

        console.log(
            "Utilisateur connecté :",
            user.email
        );

        await chargerStatistiques();

    }
);
*/

/* =========================
   STATISTIQUES FIRESTORE
========================= */

async function chargerStatistiques() {

    if (!auth.currentUser) return;

    try {

        const userId =
            auth.currentUser.uid;


        /* JOUEURS */

        const joueursQuery =
            query(
                collection(db, "joueurs"),
                where(
                    "userId",
                    "==",
                    userId
                )
            );

        const joueursSnapshot =
            await getDocs(
                joueursQuery
            );

        const nombreJoueurs =
            joueursSnapshot.size;


        /* MATCHS */

        const matchsQuery =
            query(
                collection(db, "matchs"),
                where(
                    "userId",
                    "==",
                    userId
                )
            );

        const matchsSnapshot =
            await getDocs(
                matchsQuery
            );

        const nombreMatchs =
            matchsSnapshot.size;


        /*
         * Pour les victoires :
         *
         * Cette partie dépend de la structure
         * exacte de ta collection "matchs".
         *
         * Pour le moment :
         */

        let nombreVictoires = 0;


        afficherStatistiques({
            joueurs: nombreJoueurs,
            matchs: nombreMatchs,
            victoires: nombreVictoires
        });


        const status =
            document.getElementById(
                "sheetsStatus"
            );

        if (status) {

            status.textContent =
                `Données Firestore : ${nombreJoueurs} joueurs et ${nombreMatchs} matchs.`;

        }

    } catch (error) {

        console.error(
            "Erreur statistiques :",
            error
        );

    }

}


/* =========================
   BOUTON GOOGLE SHEETS
========================= */

const openSheets =
    document.getElementById(
        "openSheets"
    );

if (openSheets) {

    openSheets.addEventListener(
        "click",
        ouvrirGoogleSheets
    );

}


/* =========================
   METEO
========================= */

const refreshWeather =
    document.getElementById(
        "refreshWeather"
    );

if (refreshWeather) {

    refreshWeather.addEventListener(
        "click",
        chargerMeteo
    );

}


/* =========================
   INITIALISATION
========================= */

chargerMeteo();

initialiserPaiement();

initialiserWhatsApp();


/* =========================
   DECONNEXION
========================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                window.location.href =
                    "login.html";

            } catch (error) {

                console.error(
                    "Erreur déconnexion :",
                    error
                );

            }

        }
    );

}
