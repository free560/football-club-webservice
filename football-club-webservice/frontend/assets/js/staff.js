import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/*  AJOUTER STAFF */

const form = document.getElementById("staffForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nom = document.getElementById("nom").value.trim();

        const prenom = document.getElementById("prenom").value.trim();

        const fonction = document.getElementById("fonction").value;

        const telephone = document.getElementById("telephone").value.trim();

        const email = document.getElementById("email").value.trim();

        const salaire = document.getElementById("salaire").value;

        if (!nom || !prenom || !fonction) {
            alert("Veuillez remplir les champs obligatoires.");
            return;
        }

        try {

            await addDoc(
                collection(db, "staff"),
                {
                    nom,
                    prenom,
                    fonction,
                    telephone,
                    email,
                    salaire,
                    createdAt: new Date().toISOString()
                }
            );

            alert("Membre du staff ajouté avec succès.");

            form.reset();

            chargerStaff();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}

/* AFFICHER STAFF */

async function chargerStaff() {

    const table =
        document.getElementById("staffTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const snapshot =
            await getDocs(
                collection(db, "staff")
            );

        snapshot.forEach((documentItem) => {

            const membre =
                documentItem.data();

            table.innerHTML += `
                <tr>

                    <td class="border p-3">
                        ${membre.nom || ""}
                    </td>

                    <td class="border p-3">
                        ${membre.prenom || ""}
                    </td>

                    <td class="border p-3">
                        ${membre.fonction || ""}
                    </td>

                    <td class="border p-3">
                        ${membre.telephone || ""}
                    </td>

                    <td class="border p-3">
                        ${membre.email || ""}
                    </td>

                    <td class="border p-3">
                        ${membre.salaire || ""}
                    </td>

                    <td class="border p-3">

                        <button
                        onclick="supprimerStaff('${documentItem.id}')"
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

/* SUPPRIMER STAFF */

window.supprimerStaff = async function (id) {

    const confirmation =
        confirm("Voulez-vous supprimer ce membre du staff ?");

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "staff", id)
        );

        chargerStaff();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

/* CHARGEMENT INITIAL */

chargerStaff();