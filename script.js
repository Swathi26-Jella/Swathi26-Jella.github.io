const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


let allVocabulary = [];


// =========================
// LOAD VOCABULARY FROM CSV
// =========================

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        const csvText = await response.text();

        const rows = csvText.trim().split(/\r?\n/);


        allVocabulary = rows.slice(1).map(row => {

            const values =
                row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];


            return {

                date: values[0]?.replace(/^"|"$/g, "") || "",

                topic: values[1]?.replace(/^"|"$/g, "") || "",

                german: values[2]?.replace(/^"|"$/g, "") || "",

                english: values[3]?.replace(/^"|"$/g, "") || "",

                plural: values[4]?.replace(/^"|"$/g, "") || "",

                example: values[5]?.replace(/^"|"$/g, "") || ""

            };

        });


        displayVocabulary(allVocabulary);

        updateWordCount(allVocabulary);


    } catch (error) {

        console.error("Vocabulary loading error:", error);

    }

}



// =========================
// DISPLAY VOCABULARY
// =========================

function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");


    if (!container) {

        console.error(
            "vocabulary-container not found in index.html"
        );

        return;

    }


    container.innerHTML = "";


    vocabulary.forEach(word => {

        const card =
            document.createElement("div");


        card.className = "word-card";


        card.innerHTML = `

            <div class="german">
                ${word.german}
            </div>

            <div class="english">
                🇬🇧 ${word.english}
            </div>

            <div class="plural">
                <strong>Plural:</strong>
                ${word.plural}
            </div>

            <div class="example">
                <strong>Beispiel:</strong><br>
                ${word.example}
            </div>

            <small>
                📅 ${word.date}
                |
                🧠 ${word.topic}
            </small>

        `;


        container.appendChild(card);

    });


    updateWordCount(vocabulary);

}



// =========================
// WORD COUNT
// =========================

function updateWordCount(vocabulary) {

    const count =
        document.getElementById("wordCount");


    if (count) {

        count.textContent = vocabulary.length;

    }

}



// =========================
// 📚 ALLE WÖRTER
// =========================

function showAll() {

    displayVocabulary(allVocabulary);

}



// =========================
// 🧠 THEMEN
// =========================

function showTopics() {

    alert("Themen-Funktion kommt als nächster Schritt.");

}



// =========================
// 📅 TAGE
// =========================

function showDays() {

    alert("Tage-Funktion kommt als nächster Schritt.");

}



// =========================
// START
// =========================

loadVocabulary();
