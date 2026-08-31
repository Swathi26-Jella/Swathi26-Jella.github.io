// ==========================================
// GOOGLE SHEETS CSV URL
// ==========================================

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


// ==========================================
// GLOBAL VOCABULARY
// ==========================================

let allVocabulary = [];


// ==========================================
// LOAD VOCABULARY
// ==========================================

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        if (!response.ok) {
            throw new Error("Could not load Google Sheet");
        }

        const csvText = await response.text();


        // Split CSV into lines
        const lines = csvText.trim().split(/\r?\n/);


        // Skip header row
        allVocabulary = lines.slice(1).map(line => {

            // Split CSV columns
            const values = line.match(
                /(".*?"|[^",]+)(?=\s*,|\s*$)/g
            ) || [];


            return {

                date: cleanValue(values[0]),
                topic: cleanValue(values[1]),
                german: cleanValue(values[2]),
                english: cleanValue(values[3]),
                plural: cleanValue(values[4]),
                example: cleanValue(values[5])

            };

        });


        console.log("Vocabulary loaded:", allVocabulary.length);


        displayVocabulary(allVocabulary);


    } catch (error) {

        console.error("Vocabulary loading error:", error);

    }

}


// ==========================================
// CLEAN CSV VALUE
// ==========================================

function cleanValue(value) {

    if (!value) return "";

    return value
        .replace(/^"|"$/g, "")
        .replace(/""/g, '"')
        .trim();

}


// ==========================================
// DISPLAY VOCABULARY
// ==========================================

function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");

    const noResults =
        document.getElementById("no-results");


    // Clear old content
    container.innerHTML = "";


    // No results
    if (vocabulary.length === 0) {

        if (noResults) {
            noResults.style.display = "block";
        }

        updateWordCount(0);

        return;

    }


    // Hide no results message
    if (noResults) {
        noResults.style.display = "none";
    }


    // Create vocabulary cards
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
                📅 ${word.date} |
                🧠 ${word.topic}
            </small>

        `;


        container.appendChild(card);

    });


    updateWordCount(vocabulary.length);

}


// ==========================================
// UPDATE WORD COUNT
// ==========================================

function updateWordCount(count) {

    const wordCount =
        document.getElementById("wordCount");


    if (wordCount) {

        wordCount.textContent = count;

    }

}


// ==========================================
// 🔍 SEARCH
// ==========================================

function searchVocabulary() {

    const searchInput =
        document.getElementById("search");


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // If empty → show all words
    if (searchText === "") {

        displayVocabulary(allVocabulary);

        return;

    }


    const filteredWords =
        allVocabulary.filter(word => {

            const german =
                (word.german || "").toLowerCase();

            const english =
                (word.english || "").toLowerCase();

            const plural =
                (word.plural || "").toLowerCase();

            const example =
                (word.example || "").toLowerCase();

            const topic =
                (word.topic || "").toLowerCase();

            const date =
                (word.date || "").toLowerCase();


            return (

                german.includes(searchText) ||
                english.includes(searchText) ||
                plural.includes(searchText) ||
                example.includes(searchText) ||
                topic.includes(searchText) ||
                date.includes(searchText)

            );

        });


    displayVocabulary(filteredWords);

}


// ==========================================
// 📚 ALLE WÖRTER
// ==========================================

function showAll() {

    document.getElementById("search").value = "";

    displayVocabulary(allVocabulary);

}


// ==========================================
// 🧠 THEMEN
// ==========================================

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

            const filteredWords =
                allVocabulary.filter(word =>
                    word.topic === topic
                );


            displayVocabulary(filteredWords);

        };


        container.appendChild(button);

    });


    document.getElementById("no-results").style.display =
        "none";

}


// ==========================================
// 📅 TAGE
// ==========================================

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

            const filteredWords =
                allVocabulary.filter(word =>
                    word.date === date
                );


            displayVocabulary(filteredWords);

        };


        container.appendChild(button);

    });


    document.getElementById("no-results").style.display =
        "none";

}


// ==========================================
// ➕ SHOW ADD WORDS FORM
// ==========================================

function showAddWords() {

    document.getElementById("addWordsForm")
        .style.display = "block";

}


// ==========================================
// ❌ HIDE ADD WORDS FORM
// ==========================================

function hideAddWords() {

    document.getElementById("addWordsForm")
        .style.display = "none";

}


// ==========================================
// 💾 SAVE WORDS
// ==========================================

function saveWords() {

    alert(
        "Your words are ready to be added. Next we will connect this form directly to Google Sheets!"
    );

}


// ==========================================
// START WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Load vocabulary
    loadVocabulary();


    // Connect search box
    const searchInput =
        document.getElementById("search");


    searchInput.addEventListener(
        "input",
        searchVocabulary
    );

});
