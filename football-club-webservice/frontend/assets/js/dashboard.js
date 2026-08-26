import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

async function chargerDashboard() {

    try {

        const user = auth.currentUser;

        if (!user) return;

        document.getElementById("userEmail").textContent =
            user.email;

        /* JOUEURS */

        const joueursSnapshot =
            await getDocs(
                query(
                    collection(db, "joueurs"),
                    where("userId", "==", user.uid)
                )
            );

        document.getElementById("totalJoueurs")
            .textContent = joueursSnapshot.size;

        /* STAFF */

        const staffSnapshot =
            await getDocs(
                query(
                    collection(db, "staff"),
                    where("userId", "==", user.uid)
                )
            );

        document.getElementById("totalStaff")
            .textContent = staffSnapshot.size;

        /* EQUIPES */

        const equipesSnapshot =
            await getDocs(
                query(
                    collection(db, "equipes"),
                    where("userId", "==", user.uid)
                )
            );

        document.getElementById("totalEquipes")
            .textContent = equipesSnapshot.size;

        /* STADES */

        const stadesSnapshot =
            await getDocs(
                query(
                    collection(db, "stades"),
                    where("userId", "==", user.uid)
                )
            );

        document.getElementById("totalStades")
            .textContent = stadesSnapshot.size;

        /* SPONSORS */

        const sponsorsSnapshot =
            await getDocs(
                query(
                    collection(db, "sponsors"),
                    where("userId", "==", user.uid)
                )
            );

        document.getElementById("totalSponsors")
            .textContent = sponsorsSnapshot.size;

        /* MATCHS (TOUS LES MATCHS) */

        const matchsSnapshot =
            await getDocs(
                collection(db, "matchs")
            );

        document.getElementById("totalMatchs")
            .textContent = matchsSnapshot.size;

        /* AFFICHAGE MATCHS DISPONIBLES */

        const matchsContainer =
            document.getElementById(
                "matchsDisponibles"
            );

        if (matchsContainer) {

            matchsContainer.innerHTML = "";

            matchsSnapshot.forEach((docItem) => {

                const match =
                    docItem.data();
                matchsContainer.innerHTML += `
                <div class="bg-white rounded-xl shadow-lg p-5 border">

                    <div class="flex justify-between items-center mb-3">

                        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                            ${match.competition || "Match"}

                        </span>

                        <span class="text-gray-500">

                            ${match.date || ""}

                        </span>

                    </div>

                    <div class="text-center">

                        <h3 class="text-xl font-bold text-blue-700">

                            ${match.domicile || ""}

                        </h3>

                        <p class="text-2xl font-bold my-3">

                            VS

                        </p>

                        <h3 class="text-xl font-bold text-red-700">

                            ${match.exterieur || ""}

                        </h3>

                    </div>

                    <div class="mt-4 border-t pt-4">

                        <p class="text-gray-600">

                            🕒 Heure :
                            <strong>${match.heure || ""}</strong>

                        </p>

                        <p class="text-gray-600">

                            🏟️ Stade :
                            <strong>${match.stade || ""}</strong>

                        </p>

                    </div>

                </div>
                `;
            });
        }

        /* FINANCES */

        const financesSnapshot =
            await getDocs(
                query(
                    collection(db, "finances"),
                    where("userId", "==", user.uid)
                )
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

            }

            if (finance.type === "Dépense") {

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

auth.onAuthStateChanged((user) => {

    if (user) {

        chargerDashboard();

    }

});