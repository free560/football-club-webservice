const SPREADSHEET_ID =
    "1cl8NACh5U3DBmelzBNeDMgmDnS1PAJymZxlT6XriLZs";

const GOOGLE_SHEET_URL =
    `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;


function ouvrirGoogleSheets() {

    window.open(
        GOOGLE_SHEET_URL,
        "_blank"
    );

}


function afficherStatistiques({
    joueurs = 0,
    matchs = 0,
    victoires = 0
}) {

    const playersCount =
        document.getElementById("playersCount");

    const matchesCount =
        document.getElementById("matchesCount");

    const statPlayers =
        document.getElementById("statPlayers");

    const statMatches =
        document.getElementById("statMatches");

    const statWins =
        document.getElementById("statWins");

    if (playersCount)
        playersCount.textContent = joueurs;

    if (matchesCount)
        matchesCount.textContent = matchs;

    if (statPlayers)
        statPlayers.textContent = joueurs;

    if (statMatches)
        statMatches.textContent = matchs;

    if (statWins)
        statWins.textContent = victoires;

}


export {
    ouvrirGoogleSheets,
    afficherStatistiques
};