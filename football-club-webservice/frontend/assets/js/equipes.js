import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ==========================
   AJOUTER ÉQUIPE
========================== */

const form = document.getElementById("equipeForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nom =
            document.getElementById("nom").value.trim();

        const ville =
            document.getElementById("ville").value.trim();

        const dateCreation =
            document.getElementById("dateCreation").value;

        const categorie =
            document.getElementById("categorie").value;

        const description =
            document.getElementById("description").value.trim();

        if (!nom || !ville) {

            alert("Veuillez remplir les champs obligatoires.");

            return;
        }

        try {

            await addDoc(
                collection(db, "equipes"),
                {
                    nom,
                    ville,
                    dateCreation,
                    categorie,
                    description,
                    createdAt: new Date().toISOString()
                }
            );

            alert("Équipe ajoutée avec succès.");

            form.reset();

            chargerEquipes();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}

/* ==========================
   AFFICHER ÉQUIPES
========================== */

async function chargerEquipes() {

    const table =
        document.getElementById("equipesTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const snapshot =
            await getDocs(
                collection(db, "equipes")
            );

        snapshot.forEach((documentItem) => {

            const equipe =
                documentItem.data();

            table.innerHTML += `
                <tr>

                    <td class="border p-3">
                        ${equipe.nom || ""}
                    </td>

                    <td class="border p-3">
                        ${equipe.ville || ""}
                    </td>

                    <td class="border p-3">
                        ${equipe.dateCreation || ""}
                    </td>

                    <td class="border p-3">
                        ${equipe.categorie || ""}
                    </td>

                    <td class="border p-3">
                        ${equipe.description || ""}
                    </td>

                    <td class="border p-3">

                        <button
                        onclick="supprimerEquipe('${documentItem.id}')"
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
   SUPPRIMER ÉQUIPE
========================== */

window.supprimerEquipe = async function (id) {

    const confirmation =
        confirm("Voulez-vous supprimer cette équipe ?");

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "equipes", id)
        );

        chargerEquipes();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

/* CHARGEMENT INITIAL */

chargerEquipes();