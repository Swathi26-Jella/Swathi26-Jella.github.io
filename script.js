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


        // Handle double quotes inside quoted text
        if (char === '"' && insideQuotes && nextChar === '"') {

            value += '"';
            i++;

        }

        // Open or close quotes
        else if (char === '"') {

            insideQuotes = !insideQuotes;

        }

        // New column
        else if (char === "," && !insideQuotes) {

            row.push(value.trim());
            value = "";

        }

        // New row
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


    // Add the last row
    if (value !== "" || row.length > 0) {

        row.push(value.trim());
        rows.push(row);

    }


    return rows;

}



// ===============================
// LOAD VOCABULARY FROM GOOGLE SHEETS
// ===============================

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        const csvText = await response.text();

        const rows = parseCSV(csvText);


        // Skip the first row (header)
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


        // Display all words when website opens
        displayVocabulary(allVocabulary);


    } catch (error) {

        console.error("Error loading vocabulary:", error);

    }

}



// ===============================
// DISPLAY VOCABULARY
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

    showNoResultsMessage(vocabulary);

}



// ===============================
// UPDATE WORD COUNT
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
// NO RESULTS MESSAGE
// ===============================

function showNoResultsMessage(vocabulary) {

    const noResults =
        document.getElementById("no-results");


    if (!noResults) return;


    if (vocabulary.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}



// ===============================
// 📚 ALLE WÖRTER
// ===============================

function showAll() {

    // Clear search box
    document.getElementById("search").value = "";

    // Show all vocabulary
    displayVocabulary(allVocabulary);

}



// ===============================
// 🧠 THEMEN
// ===============================

function showTopics() {

    const container =
        document.getElementById("vocabulary-container");


    container.innerHTML = "";


    // Clear search
    document.getElementById("search").value = "";


    // Get unique topics
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


    // Hide no results message
    document.getElementById("no-results").style.display = "none";

    // Show number of topics
    updateWordCount([]);

}



// ===============================
// 📅 TAGE
// ===============================

function showDays() {

    const container =
        document.getElementById("vocabulary-container");


    container.innerHTML = "";


    // Clear search
    document.getElementById("search").value = "";


    // Get unique dates
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


    // Hide no results message
    document.getElementById("no-results").style.display = "none";

    // Don't show word count while choosing dates
    updateWordCount([]);

}



// ===============================
// 🔍 SEARCH VOCABULARY
// ===============================

const searchInput =
    document.getElementById("search");


searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredVocabulary =
        allVocabulary.filter(word => {

            return (

                word.german.toLowerCase().includes(searchText) ||

                word.english.toLowerCase().includes(searchText) ||

                word.plural.toLowerCase().includes(searchText) ||

                word.example.toLowerCase().includes(searchText) ||

                word.topic.toLowerCase().includes(searchText) ||

                word.date.toLowerCase().includes(searchText)

            );

        });


    displayVocabulary(filteredVocabulary);

});



// ===============================
// START WEBSITE
// ===============================

loadVocabulary();
