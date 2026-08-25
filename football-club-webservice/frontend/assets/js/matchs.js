import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================
   AJOUTER MATCH
========================== */

const form = document.getElementById("matchForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const domicile =
            document.getElementById("domicile").value.trim();

        const exterieur =
            document.getElementById("exterieur").value.trim();

        const date =
            document.getElementById("date").value;

        const heure =
            document.getElementById("heure").value;

        const stade =
            document.getElementById("stade").value.trim();

        const competition =
            document.getElementById("competition").value;

        if (!domicile || !exterieur || !date || !heure) {

            alert("Veuillez remplir les champs obligatoires.");

            return;
        }

        try {

            await addDoc(
                collection(db, "matchs"),
                {
                    domicile,
                    exterieur,
                    date,
                    heure,
                    stade,
                    competition,
                    createdAt: new Date().toISOString()
                }
            );

            alert("Match ajouté avec succès.");

            form.reset();

            chargerMatchs();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}

/* ==========================
   AFFICHER MATCHS
========================== */

async function chargerMatchs() {

    const table =
        document.getElementById("matchsTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const snapshot =
            await getDocs(
                collection(db, "matchs")
            );

        snapshot.forEach((documentItem) => {

            const match =
                documentItem.data();

            table.innerHTML += `
                <tr>

                    <td class="border p-3">
                        ${match.domicile || ""}
                    </td>

                    <td class="border p-3">
                        ${match.exterieur || ""}
                    </td>

                    <td class="border p-3">
                        ${match.date || ""}
                    </td>

                    <td class="border p-3">
                        ${match.heure || ""}
                    </td>

                    <td class="border p-3">
                        ${match.stade || ""}
                    </td>

                    <td class="border p-3">
                        ${match.competition || ""}
                    </td>

                    <td class="border p-3">

                        <button
                        onclick="supprimerMatch('${documentItem.id}')"
                        class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">

                        Supprimer

                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

/* ==========================
   SUPPRIMER MATCH
========================== */

window.supprimerMatch = async function (id) {

    const confirmation =
        confirm("Voulez-vous supprimer ce match ?");

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "matchs", id)
        );

        chargerMatchs();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

/* ==========================
   CHARGEMENT INITIAL
========================== */

chargerMatchs();