import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================
   AJOUTER OPÉRATION
========================== */

const form = document.getElementById("financeForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const type =
            document.getElementById("type").value;

        const categorie =
            document.getElementById("categorie").value.trim();

        const montant =
            document.getElementById("montant").value;

        const date =
            document.getElementById("date").value;

        const description =
            document.getElementById("description").value.trim();

        try {

            await addDoc(
                collection(db, "finances"),
                {
                    type,
                    categorie,
                    montant,
                    date,
                    description,
                    createdAt: new Date().toISOString()
                }
            );

            alert("Opération enregistrée avec succès");

            form.reset();

            chargerFinances();

        } catch (error) {

            alert(error.message);

        }

    });

}

/* ==========================
   AFFICHER OPÉRATIONS
========================== */

async function chargerFinances() {

    const table =
        document.getElementById("financesTable");

    if (!table) return;

    table.innerHTML = "";

    const snapshot =
        await getDocs(
            collection(db, "finances")
        );

    snapshot.forEach((documentItem) => {

        const finance =
            documentItem.data();

        table.innerHTML += `
        <tr>

            <td class="border p-3">
                ${finance.type || ""}
            </td>

            <td class="border p-3">
                ${finance.categorie || ""}
            </td>

            <td class="border p-3">
                ${finance.montant || ""}
            </td>

            <td class="border p-3">
                ${finance.date || ""}
            </td>

            <td class="border p-3">
                ${finance.description || ""}
            </td>

            <td class="border p-3">

                <button
                onclick="supprimerFinance('${documentItem.id}')"
                class="bg-red-600 text-white px-3 py-1 rounded">

                Supprimer

                </button>

            </td>

        </tr>
        `;

    });

}

/* ==========================
   SUPPRIMER OPÉRATION
========================== */

window.supprimerFinance =
async function (id) {

    if (!confirm("Supprimer cette opération ?"))
        return;

    await deleteDoc(
        doc(db, "finances", id)
    );

    chargerFinances();

};

chargerFinances();