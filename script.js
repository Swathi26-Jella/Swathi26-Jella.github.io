const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        const csvText = await response.text();

        console.log(csvText);

    } catch (error) {

        console.error("Error loading vocabulary:", error);

    }

}

loadVocabulary();
