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


/* AJOUTER JOUEUR */

const form = document.getElementById("joueurForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) {
            alert("Veuillez vous reconnecter.");
            return;
        }

        const nom =
            document.getElementById("nom").value;

        const prenom =
            document.getElementById("prenom").value;

        const poste =
            document.getElementById("poste").value;

        const numero =
            document.getElementById("numero").value;

        try {

            await addDoc(
                collection(db, "joueurs"),
                {
                    nom,
                    prenom,
                    poste,
                    numero,

                    userId: auth.currentUser.uid,
                    userEmail: auth.currentUser.email,

                    createdAt: new Date()
                }
            );

            alert("Joueur ajouté avec succès");

            form.reset();

            chargerJoueurs();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}


/* AFFICHER LES JOUEURS DU MANAGER CONNECTÉ */

async function chargerJoueurs() {

    if (!auth.currentUser) return;

    const table =
        document.getElementById("joueursTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const joueursQuery = query(
            collection(db, "joueurs"),
            where(
                "userId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(joueursQuery);

        snapshot.forEach((documentItem) => {

            const joueur =
                documentItem.data();

            table.innerHTML += `
            <tr>

                <td class="border p-2">
                    ${joueur.nom}
                </td>

                <td class="border p-2">
                    ${joueur.prenom}
                </td>

                <td class="border p-2">
                    ${joueur.poste}
                </td>

                <td class="border p-2">
                    ${joueur.numero}
                </td>

                <td class="border p-2">

                    <button
                    onclick="supprimerJoueur('${documentItem.id}')"
                    class="bg-red-600 text-white px-3 py-1 rounded">

                    Supprimer

                    </button>

                </td>

            </tr>
            `;

        });

    } catch (error) {

        console.error("Erreur chargement joueurs :", error);

    }

}


/* SUPPRIMER JOUEUR */

window.supprimerJoueur =
async function(id) {

    const confirmation =
        confirm(
            "Voulez-vous supprimer ce joueur ?"
        );

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "joueurs", id)
        );

        chargerJoueurs();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/* CHARGEMENT INITIAL */

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "Utilisateur connecté :",
            user.email
        );

        chargerJoueurs();

    } else {

        console.log(
            "Aucun utilisateur connecté"
        );

        window.location.href =
            "login.html";

    }

});