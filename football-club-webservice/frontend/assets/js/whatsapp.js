const CLUB_WHATSAPP_NUMBER =
    "25765449293";


function initialiserWhatsApp() {

    const form =
        document.getElementById("whatsappForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                document.getElementById("whatsappName").value;

            const message =
                document.getElementById("whatsappMessage").value;

            const finalMessage =
                `Bonjour Football Club,%0A%0A` +
                `Nom : ${encodeURIComponent(name)}%0A` +
                `Message : ${encodeURIComponent(message)}`;

            const url =
                `https://wa.me/${CLUB_WHATSAPP_NUMBER}?text=${finalMessage}`;

            window.open(
                url,
                "_blank"
            );

        }
    );

}


export {
    initialiserWhatsApp
};