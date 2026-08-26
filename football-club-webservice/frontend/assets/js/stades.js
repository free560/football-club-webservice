import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


/* ==========================
   AJOUTER STADE
========================== */

const form = document.getElementById("stadeForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) {

            alert("Veuillez vous reconnecter.");

            return;

        }

        const nom =
            document.getElementById("nom").value.trim();

        const ville =
            document.getElementById("ville").value.trim();

        const capacite =
            document.getElementById("capacite").value;

        const adresse =
            document.getElementById("adresse").value.trim();

        try {

            await addDoc(
                collection(db, "stades"),
                {
                    nom,
                    ville,
                    capacite,
                    adresse,

                    userId: auth.currentUser.uid,
                    userEmail: auth.currentUser.email,

                    createdAt: new Date()
                }
            );

            alert("Stade ajouté avec succès");

            form.reset();

            chargerStades();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}


/* ==========================
   AFFICHER STADES
========================== */

async function chargerStades() {

    if (!auth.currentUser) return;

    const table =
        document.getElementById("stadesTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const stadesQuery = query(
            collection(db, "stades"),
            where(
                "userId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(stadesQuery);

        snapshot.forEach((documentItem) => {

            const stade =
                documentItem.data();

            table.innerHTML += `
            <tr>

                <td class="border p-3">
                    ${stade.nom || ""}
                </td>

                <td class="border p-3">
                    ${stade.ville || ""}
                </td>

                <td class="border p-3">
                    ${stade.capacite || ""}
                </td>

                <td class="border p-3">
                    ${stade.adresse || ""}
                </td>

                <td class="border p-3">

                    <button
                    onclick="supprimerStade('${documentItem.id}')"
                    class="bg-red-600 text-white px-3 py-1 rounded">

                    Supprimer

                    </button>

                </td>

            </tr>
            `;

        });

    } catch (error) {

        console.error(
            "Erreur chargement stades :",
            error
        );

    }

}


/* ==========================
   SUPPRIMER STADE
========================== */

window.supprimerStade =
async function(id) {

    const confirmation =
        confirm("Supprimer ce stade ?");

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "stades", id)
        );

        chargerStades();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};


/* ==========================
   CHARGEMENT INITIAL
========================== */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "Utilisateur connecté :",
            user.email
        );

        chargerStades();

    } else {

        window.location.href =
            "login.html";

    }

});