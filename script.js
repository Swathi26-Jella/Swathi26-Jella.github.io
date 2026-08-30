const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


let allVocabulary = [];


// ===============================
// CSV PARSER
// ===============================

function parseCSV(text) {

    const rows = [];

    let row = [];

    let value = "";

    let insideQuotes = false;


    for (let i = 0; i < text.length; i++) {

        const char = text[i];

        const nextChar = text[i + 1];


        if (char === '"' && insideQuotes && nextChar === '"') {

            value += '"';

            i++;

        }

        else if (char === '"') {

            insideQuotes = !insideQuotes;

        }

        else if (char === "," && !insideQuotes) {

            row.push(value.trim());

            value = "";

        }

        else if ((char === "\n" || char === "\r") && !insideQuotes) {

            if (char === "\r" && nextChar === "\n") {
                i++;
            }

            row.push(value.trim());

            value = "";

            if (row.some(cell => cell !== "")) {
                rows.push(row);
            }

            row = [];

        }

        else {

            value += char;

        }

    }


    if (value !== "" || row.length > 0) {

        row.push(value.trim());

        rows.push(row);

    }


    return rows;

}



// ===============================
// LOAD VOCABULARY
// ===============================

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        const csvText = await response.text();


        const rows = parseCSV(csvText);


        // Skip header row

        allVocabulary = rows.slice(1).map(row => {

            return {

                date: row[0] || "",

                topic: row[1] || "",

                german: row[2] || "",

                english: row[3] || "",

                plural: row[4] || "",

                example: row[5] || ""

            };

        });


        displayVocabulary(allVocabulary);


    }

    catch (error) {

        console.error("Error loading vocabulary:", error);

    }

}



// ===============================
// DISPLAY WORDS
// ===============================

function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");


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



// ===============================
// WORD COUNT
// ===============================

function updateWordCount(vocabulary) {

    const wordCount =
        document.getElementById("wordCount");


    if (wordCount) {

        wordCount.textContent =
            vocabulary.length;

    }

}



// ===============================
// 📚 ALLE WÖRTER
// ===============================

function showAll() {

    displayVocabulary(allVocabulary);

}



// ===============================
// 🧠 THEMEN
// ===============================

function showTopics() {

    const container =
        document.getElementById("vocabulary-container");


    container.innerHTML = "";


    const topics =
        [...new Set(
            allVocabulary.map(word => word.topic)
        )];


    topics.forEach(topic => {

        const button =
            document.createElement("button");


        button.className = "topic-button";

        button.textContent =
            "🧠 " + topic;


        button.onclick = function () {

            const filtered =
                allVocabulary.filter(
                    word => word.topic === topic
                );


            displayVocabulary(filtered);

        };


        container.appendChild(button);

    });


    updateWordCount([]);


}



// ===============================
// 📅 TAGE
// ===============================

function showDays() {

    const container =
        document.getElementById("vocabulary-container");


    container.innerHTML = "";


    const dates =
        [...new Set(
            allVocabulary.map(word => word.date)
        )];


    dates.forEach(date => {

        const button =
            document.createElement("button");


        button.className = "day-button";

        button.textContent =
            "📅 " + date;


        button.onclick = function () {

            const filtered =
                allVocabulary.filter(
                    word => word.date === date
                );


            displayVocabulary(filtered);

        };


        container.appendChild(button);

    });


    updateWordCount([]);

}



// ===============================
// START WEBSITE
// ===============================

loadVocabulary();
