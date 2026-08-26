function initialiserPaiement() {

    const form =
        document.getElementById("paymentForm");

    const message =
        document.getElementById("paymentMessage");

    if (!form) return;

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const payerName =
                document.getElementById("payerName").value;

            const phoneNumber =
                document.getElementById("phoneNumber").value;

            const amount =
                document.getElementById("paymentAmount").value;

            const reason =
                document.getElementById("paymentReason").value;

            if (!payerName ||
                !phoneNumber ||
                !amount) {

                message.textContent =
                    "Veuillez remplir tous les champs.";

                message.className =
                    "mt-4 text-sm text-red-600";

                return;
            }

            /*
             * IMPORTANT :
             *
             * Ici nous connecterons plus tard
             * l'API LumiCash via Firebase Functions.
             *
             * Ne jamais mettre une clé API
             * LumiCash directement dans le frontend.
             */

            console.log(
                "Paiement demandé :",
                {
                    payerName,
                    phoneNumber,
                    amount,
                    reason
                }
            );

            message.textContent =
                "Le module de paiement est prêt. " +
                "L'intégration de l'API LumiCash sera ajoutée après réception des informations API.";

            message.className =
                "mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg";

        }
    );

}


export {
    initialiserPaiement
};