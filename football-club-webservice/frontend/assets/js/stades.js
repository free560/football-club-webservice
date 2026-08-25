import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* AJOUTER */

const form = document.getElementById("stadeForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

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
                    createdAt: new Date().toISOString()
                }
            );

            alert("Stade ajouté avec succès");

            form.reset();

            chargerStades();

        } catch (error) {

            alert(error.message);

        }

    });

}

/* AFFICHER */

async function chargerStades() {

    const table =
        document.getElementById("stadesTable");

    if (!table) return;

    table.innerHTML = "";

    const snapshot =
        await getDocs(
            collection(db, "stades")
        );

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

}

/* SUPPRIMER */

window.supprimerStade =
async function (id) {

    if (!confirm("Supprimer ce stade ?"))
        return;

    await deleteDoc(
        doc(db, "stades", id)
    );

    chargerStades();

};

chargerStades();