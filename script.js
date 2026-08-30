const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


async function loadVocabulary() {

    const response = await fetch(CSV_URL);

    const csvText = await response.text();

    const rows = csvText.trim().split("\n");

    const headers = rows[0].split(",");

    const vocabulary = rows.slice(1).map(row => {

        const values = row.split(",");

        return {
            date: values[0],
            topic: values[1],
            german: values[2],
            english: values[3],
            plural: values[4],
            example: values[5]
        };

    });

    displayVocabulary(vocabulary);
}


function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");

    container.innerHTML = "";

    vocabulary.forEach(word => {

        const card = document.createElement("div");

        card.className = "word-card";

        card.innerHTML = `
            <div class="german">
                ${word.german}
            </div>

            <div class="english">
                🇬🇧 ${word.english}
            </div>

            <div class="plural">
                <strong>Plural:</strong> ${word.plural}
            </div>

            <div class="example">
                <strong>Beispiel:</strong><br>
                ${word.example}
            </div>

            <small>
                📅 ${word.date} |
                🧠 ${word.topic}
            </small>
        `;

        container.appendChild(card);

    });

}


loadVocabulary();
