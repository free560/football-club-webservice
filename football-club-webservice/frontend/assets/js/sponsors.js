import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================
   AJOUTER SPONSOR
========================== */

const form = document.getElementById("sponsorForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nom =
            document.getElementById("nom").value.trim();

        const contact =
            document.getElementById("contact").value.trim();

        const montant =
            document.getElementById("montant").value;

        const dateSignature =
            document.getElementById("dateSignature").value;

        try {

            await addDoc(
                collection(db, "sponsors"),
                {
                    nom,
                    contact,
                    montant,
                    dateSignature,
                    createdAt: new Date().toISOString()
                }
            );

            alert("Sponsor ajouté avec succès");

            form.reset();

            chargerSponsors();

        } catch (error) {

            alert(error.message);

        }

    });

}

/* ==========================
   AFFICHER SPONSORS
========================== */

async function chargerSponsors() {

    const table =
        document.getElementById("sponsorsTable");

    if (!table) return;

    table.innerHTML = "";

    const snapshot =
        await getDocs(
            collection(db, "sponsors")
        );

    snapshot.forEach((documentItem) => {

        const sponsor =
            documentItem.data();

        table.innerHTML += `
        <tr>

            <td class="border p-3">
                ${sponsor.nom || ""}
            </td>

            <td class="border p-3">
                ${sponsor.contact || ""}
            </td>

            <td class="border p-3">
                ${sponsor.montant || ""}
            </td>

            <td class="border p-3">
                ${sponsor.dateSignature || ""}
            </td>

            <td class="border p-3">

                <button
                onclick="supprimerSponsor('${documentItem.id}')"
                class="bg-red-600 text-white px-3 py-1 rounded">

                Supprimer

                </button>

            </td>

        </tr>
        `;

    });

}

/* ==========================
   SUPPRIMER SPONSOR
========================== */

window.supprimerSponsor =
async function (id) {

    if (!confirm("Supprimer ce sponsor ?"))
        return;

    await deleteDoc(
        doc(db, "sponsors", id)
    );

    chargerSponsors();

};

chargerSponsors();