const BUJUMBURA_LATITUDE = -3.3614;
const BUJUMBURA_LONGITUDE = 29.3599;

async function chargerMeteo() {

    const temperature =
        document.getElementById("temperature");

    const description =
        document.getElementById("weatherDescription");

    const humidity =
        document.getElementById("humidity");

    const windSpeed =
        document.getElementById("windSpeed");

    if (!temperature) return;

    try {

        description.textContent =
            "Chargement...";

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${BUJUMBURA_LATITUDE}` +
            `&longitude=${BUJUMBURA_LONGITUDE}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
            `&timezone=Africa%2FBujumbura`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Erreur API météo");
        }

        const data =
            await response.json();

        const current =
            data.current;

        temperature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        windSpeed.textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;

        description.textContent =
            obtenirDescriptionMeteo(
                current.weather_code
            );

    } catch (error) {

        console.error(
            "Erreur météo :",
            error
        );

        description.textContent =
            "Météo indisponible";

    }
}


function obtenirDescriptionMeteo(code) {

    const descriptions = {

        0: "Ciel dégagé",

        1: "Principalement dégagé",

        2: "Partiellement nuageux",

        3: "Couvert",

        45: "Brouillard",

        48: "Brouillard givrant",

        51: "Bruine légère",

        53: "Bruine modérée",

        55: "Bruine forte",

        61: "Pluie légère",

        63: "Pluie modérée",

        65: "Forte pluie",

        71: "Neige légère",

        73: "Neige modérée",

        75: "Forte neige",

        80: "Averses légères",

        81: "Averses modérées",

        82: "Fortes averses",

        95: "Orage",

        96: "Orage avec grêle",

        99: "Orage avec forte grêle"

    };

    return descriptions[code] ||
        "Conditions inconnues";
}


export {
    chargerMeteo
};