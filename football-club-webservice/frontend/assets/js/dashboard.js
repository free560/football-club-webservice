import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function chargerDashboard() {

    try {

        /* JOUEURS */

        const joueursSnapshot =
            await getDocs(
                collection(db, "joueurs")
            );

        document.getElementById("totalJoueurs")
            .textContent = joueursSnapshot.size;

        /* STAFF */

        const staffSnapshot =
            await getDocs(
                collection(db, "staff")
            );

        document.getElementById("totalStaff")
            .textContent = staffSnapshot.size;

        /* EQUIPES */

        const equipesSnapshot =
            await getDocs(
                collection(db, "equipes")
            );

        document.getElementById("totalEquipes")
            .textContent = equipesSnapshot.size;

        /* MATCHS */

        const matchsSnapshot =
            await getDocs(
                collection(db, "matchs")
            );

        document.getElementById("totalMatchs")
            .textContent = matchsSnapshot.size;

        /* STADES */

        const stadesSnapshot =
            await getDocs(
                collection(db, "stades")
            );

        document.getElementById("totalStades")
            .textContent = stadesSnapshot.size;

        /* SPONSORS */

        const sponsorsSnapshot =
            await getDocs(
                collection(db, "sponsors")
            );

        document.getElementById("totalSponsors")
            .textContent = sponsorsSnapshot.size;

        /* FINANCES */

        const financesSnapshot =
            await getDocs(
                collection(db, "finances")
            );

        let recettes = 0;
        let depenses = 0;

        financesSnapshot.forEach((docItem) => {

            const finance =
                docItem.data();

            const montant =
                Number(finance.montant) || 0;

            if (finance.type === "Recette") {

                recettes += montant;

            } else if (finance.type === "Dépense") {

                depenses += montant;

            }

        });

        document.getElementById("totalRecettes")
            .textContent =
            recettes.toLocaleString() + " BIF";

        document.getElementById("totalDepenses")
            .textContent =
            depenses.toLocaleString() + " BIF";

    }

    catch (error) {

        console.error(error);

    }

}

chargerDashboard();