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
   AJOUTER SPONSOR
========================== */

const form = document.getElementById("sponsorForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        if (!auth.currentUser) {

            alert("Veuillez vous reconnecter.");

            return;

        }

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

                    userId: auth.currentUser.uid,
                    userEmail: auth.currentUser.email,

                    createdAt: new Date()
                }
            );

            alert("Sponsor ajouté avec succès");

            form.reset();

            chargerSponsors();

        } catch (error) {

            console.error(error);

            alert(error.message);

        }

    });

}


/* ==========================
   AFFICHER SPONSORS
========================== */

async function chargerSponsors() {

    if (!auth.currentUser) return;

    const table =
        document.getElementById("sponsorsTable");

    if (!table) return;

    table.innerHTML = "";

    try {

        const sponsorsQuery = query(
            collection(db, "sponsors"),
            where(
                "userId",
                "==",
                auth.currentUser.uid
            )
        );

        const snapshot =
            await getDocs(sponsorsQuery);

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

    } catch (error) {

        console.error(
            "Erreur chargement sponsors :",
            error
        );

    }

}


/* ==========================
   SUPPRIMER SPONSOR
========================== */

window.supprimerSponsor =
async function(id) {

    const confirmation =
        confirm("Supprimer ce sponsor ?");

    if (!confirmation) return;

    try {

        await deleteDoc(
            doc(db, "sponsors", id)
        );

        chargerSponsors();

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

        chargerSponsors();

    } else {

        window.location.href =
            "login.html";

    }

});