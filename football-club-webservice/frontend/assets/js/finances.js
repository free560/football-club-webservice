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
   AJOUTER OPÉRATION
========================== */

const form = document.getElementById("financeForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) {

            alert("Veuillez vous reconnecter.");

            return;

        }

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

                    userId: auth.currentUser.uid,
                    userEmail: auth.currentUser.email,

                    createdAt: new Date()
                }
            );

            alert(
                "Opération enregistrée avec succès"
            );

            form.reset();

            chargerFinances();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}


/* ==========================
   AFFICHER OPÉRATIONS
========================== */

async function chargerFinances() {

    if (!auth.currentUser) return;

    const table =
        document.getElementById("financesTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const financesQuery = query(
            collection(db, "finances"),
            where(
                "userId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(financesQuery);

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

    } catch (error) {

        console.error(
            "Erreur chargement finances :",
            error
        );

    }

}


/* ==========================
   SUPPRIMER OPÉRATION
========================== */

window.supprimerFinance =
async function(id) {

    const confirmation =
        confirm(
            "Supprimer cette opération ?"
        );

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "finances", id)
        );

        chargerFinances();

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

        chargerFinances();

    } else {

        window.location.href =
            "login.html";

    }

});