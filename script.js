const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";
let allVocabulary = [];
async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);
        const csvText = await response.text();

        const rows = csvText.trim().split(/\r?\n/);

        allVocabulary = rows.slice(1).map(row => {
            const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            return {
                date: values[0]?.replace(/"/g, "") || "",
                topic: values[1]?.replace(/"/g, "") || "",
                german: values[2]?.replace(/"/g, "") || "",
                english: values[3]?.replace(/"/g, "") || "",
                plural: values[4]?.replace(/"/g, "") || "",
                example: values[5]?.replace(/"/g, "") || ""
            };

        });

        displayVocabulary(allvocabulary);

    } catch (error) {

        console.error("Vocabulary loading error:", error);

    }
}


function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");

    container.innerHTML = "";

    // Update word counter
    const counter =
        document.getElementById("wordCount");

    if (counter) {
        counter.textContent = vocabulary.length;
    }

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
function showAll() {
    displayVocabulary(allVocabulary);
}
