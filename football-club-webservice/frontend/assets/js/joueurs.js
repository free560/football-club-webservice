import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* AJOUTER JOUEUR */

const form = document.getElementById("joueurForm");

if(form){

    form.addEventListener("submit", async (e)=>{

        e.preventDefault();

        const nom =
        document.getElementById("nom").value;

        const prenom =
        document.getElementById("prenom").value;

        const poste =
        document.getElementById("poste").value;

        const numero =
        document.getElementById("numero").value;

        try{

            await addDoc(
                collection(db,"joueurs"),
                {
                    nom,
                    prenom,
                    poste,
                    numero
                }
            );

            alert("Joueur ajouté avec succès");

            form.reset();

            chargerJoueurs();

        }catch(error){

            alert(error.message);

        }

    });

}

/* AFFICHER JOUEURS */

async function chargerJoueurs(){

    const table =
    document.getElementById("joueursTable");

    if(!table) return;

    table.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"joueurs")
    );

    snapshot.forEach((documentItem)=>{

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

}

/* SUPPRIMER */

window.supprimerJoueur =
async function(id){

    const confirmation =
    confirm("Voulez-vous supprimer ce joueur ?");

    if(!confirmation) return;

    await deleteDoc(
        doc(db,"joueurs",id)
    );

    chargerJoueurs();

}

/* CHARGEMENT INITIAL */

chargerJoueurs();

