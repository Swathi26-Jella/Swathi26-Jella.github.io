// =====================================================
// GOOGLE SHEETS CONFIGURATION
// =====================================================

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyaTXiyE0PVXtuzZJZ4NBI0TaEa_rOBRd-iob-HB4d3XnNxrE0TQ0OWC5wIfqrVoXiO/exec";


// =====================================================
// GLOBAL DATA
// =====================================================

let allVocabulary = [];
let currentWords = [];


// =====================================================
// SHOW ADD WORDS FORM
// =====================================================

function showAddWords() {

    const form = document.getElementById("addWordsForm");

    if (!form) return;

    form.style.display = "flex";

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =====================================================
// HIDE ADD WORDS FORM
// =====================================================

function hideAddWords() {

    const form = document.getElementById("addWordsForm");

    if (!form) return;

    form.style.display = "none";
}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateString) {

    if (!dateString) return "";

    const value = String(dateString).trim();

    // dd.mm.yyyy

    if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
        return value;
    }


    // yyyy-mm-dd

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

        const [year, month, day] = value.split("-");

        return `${day}.${month}.${year}`;
    }


    // yyyy.mm.dd

    if (/^\d{4}\.\d{2}\.\d{2}$/.test(value)) {

        const [year, month, day] = value.split(".");

        return `${day}.${month}.${year}`;
    }

    return value;
}


// =====================================================
// SAFE CSV PARSER
// =====================================================

function parseCSV(text) {

    const rows = [];

    let row = [];
    let field = "";

    let insideQuotes = false;


    for (let i = 0; i < text.length; i++) {

        const char = text[i];
        const nextChar = text[i + 1];


        if (char === '"') {

            if (insideQuotes && nextChar === '"') {

                field += '"';
                i++;

            } else {

                insideQuotes = !insideQuotes;
            }
        }


        else if (char === "," && !insideQuotes) {

            row.push(field.trim());

            field = "";
        }


        else if (
            (char === "\n" || char === "\r") &&
            !insideQuotes
        ) {

            if (char === "\r" && nextChar === "\n") {
                i++;
            }


            row.push(field.trim());


            if (row.some(cell => cell !== "")) {
                rows.push(row);
            }


            row = [];
            field = "";
        }


        else {

            field += char;
        }
    }


    // Last row

    row.push(field.trim());


    if (row.some(cell => cell !== "")) {
        rows.push(row);
    }


    return rows;
}


// =====================================================
// LOAD VOCABULARY FROM GOOGLE SHEETS
// =====================================================

async function loadVocabulary() {

    try {

        const response = await fetch(
            CSV_URL + "&cache=" + Date.now()
        );


        if (!response.ok) {

            throw new Error(
                "Could not load Google Sheet"
            );
        }


        const csvText = await response.text();


        const rows = parseCSV(csvText);


        // Remove header row

        const dataRows = rows.slice(1);


        allVocabulary = dataRows

            .filter(row =>
                row.some(cell => cell.trim() !== "")
            )

            .map((row, index) => ({

                id: index + 1,

                date:
                    formatDate(row[0] || ""),

                topic:
                    row[1] || "",

                german:
                    row[2] || "",

                english:
                    row[3] || "",

                plural:
                    row[4] || "",

                example:
                    row[5] || ""

            }))

            .filter(word =>
                word.german.trim() !== ""
            );


        currentWords = [];


        // IMPORTANT:
        // Only update count.
        // DO NOT display words automatically.

        updateWordCount(allVocabulary.length);


        showWelcomeMessage();


        console.log(
            "Loaded words:",
            allVocabulary.length
        );

    }

    catch (error) {

        console.error(
            "Error loading vocabulary:",
            error
        );

        showErrorMessage();
    }
}


// =====================================================
// WELCOME MESSAGE
// =====================================================

function showWelcomeMessage() {

    const container =
        document.getElementById("vocabulary-container");


    if (!container) return;


    container.innerHTML = `
        <div class="welcome-box">

            <div class="welcome-icon">
                🇩🇪
            </div>

            <h2>
                Willkommen in deinem Deutsch-Lernjournal!
            </h2>

            <p>
                Wähle oben <strong>Alle Wörter</strong>,
                <strong>Themen</strong> oder
                <strong>Tage</strong>, um deinen Wortschatz zu entdecken.
            </p>

            <p class="welcome-small">
                📚 ${allVocabulary.length} Wörter gespeichert
            </p>

        </div>
    `;
}


// =====================================================
// ERROR MESSAGE
// =====================================================

function showErrorMessage() {

    const container =
        document.getElementById("vocabulary-container");


    if (!container) return;


    container.innerHTML = `
        <div class="no-results">

            ❌ Wörter konnten nicht geladen werden.

            <br><br>

            Bitte aktualisiere die Seite.

        </div>
    `;
}


// =====================================================
// DISPLAY VOCABULARY
// =====================================================

function displayVocabulary(words) {

    const container =
        document.getElementById(
            "vocabulary-container"
        );


    const noResults =
        document.getElementById(
            "no-results"
        );


    if (!container) return;


    container.innerHTML = "";


    if (!words || words.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                ❌ Keine Wörter gefunden.
            </div>
        `;

        return;
    }


    if (noResults) {
        noResults.style.display = "none";
    }


    words.forEach(word => {

        const card =
            document.createElement("div");


        card.className =
            "word-card";


        card.innerHTML = `

            <div class="card-top">

                <div class="card-meta">

                    <span class="topic-tag">
                        🧠 ${escapeHTML(word.topic || "Allgemein")}
                    </span>

                    <span class="date-tag">
                        📅 ${escapeHTML(word.date)}
                    </span>

                </div>


                <button
                    class="delete-button"
                    title="Wort löschen"
                >
                    🗑️
                </button>

            </div>


            <div class="german">
                🇩🇪 ${escapeHTML(word.german)}
            </div>


            <div class="english">
                🇬🇧 ${escapeHTML(word.english)}
            </div>


            ${
                word.plural
                    ? `
                    <div class="plural">

                        <span class="label">
                            Plural
                        </span>

                        <strong>
                            ${escapeHTML(word.plural)}
                        </strong>

                    </div>
                    `
                    : ""
            }


            ${
                word.example
                    ? `
                    <div class="example">

                        <span class="example-label">
                            💬 Beispiel
                        </span>

                        <p>
                            ${escapeHTML(word.example)}
                        </p>

                    </div>
                    `
                    : ""
            }

        `;


        // DELETE BUTTON EVENT

        const deleteButton =
            card.querySelector(".delete-button");


        deleteButton.addEventListener(
            "click",
            function () {

                deleteWord(word);
            }
        );


        container.appendChild(card);
    });
}


// =====================================================
// DELETE WORD
// =====================================================

async function deleteWord(word) {

    const confirmDelete =
        confirm(
            `Möchtest du "${word.german}" wirklich löschen?`
        );


    if (!confirmDelete) return;


    // Immediately remove from website

    allVocabulary =
        allVocabulary.filter(
            item => item !== word
        );


    currentWords =
        currentWords.filter(
            item => item !== word
        );


    displayVocabulary(currentWords);


    updateWordCount(allVocabulary.length);


    // Send delete request to Google Apps Script

    try {

        await fetch(
            SCRIPT_URL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "text/plain;charset=utf-8"
                },

                body:
                    JSON.stringify({

                        action: "delete",

                        date: word.date,

                        topic: word.topic,

                        german: word.german,

                        english: word.english

                    })

            }
        );


        console.log(
            "Delete request sent"
        );

    }

    catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "⚠️ Das Wort wurde von der Website entfernt, aber Google Sheets konnte möglicherweise nicht aktualisiert werden."
        );
    }
}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    if (
        value === undefined ||
        value === null
    ) {
        return "";
    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


// =====================================================
// UPDATE WORD COUNT
// =====================================================

function updateWordCount(count) {

    const element =
        document.getElementById("wordCount");


    if (element) {

        element.textContent = count;
    }
}


// =====================================================
// SHOW ALL WORDS
// =====================================================

function showAll() {

    currentWords =
        [...allVocabulary];


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        allVocabulary.length
    );
}


// =====================================================
// SHOW TOPICS
// =====================================================

function showTopics() {

    const container =
        document.getElementById(
            "vocabulary-container"
        );


    if (!container) return;


    const topics =
        [...new Set(

            allVocabulary

                .map(word =>
                    word.topic.trim()
                )

                .filter(topic =>
                    topic !== ""
                )

        )];


    container.innerHTML = `

        <div class="selection-box">

            <h2>
                🧠 Wähle ein Thema
            </h2>

            <p>
                Wähle ein Thema, um die Wörter zu sehen.
            </p>

            <div class="topic-list">
            </div>

        </div>

    `;


    const topicList =
        container.querySelector(
            ".topic-list"
        );


    topics.forEach(topic => {

        const button =
            document.createElement("button");


        button.className =
            "topic-button";


        button.textContent =
            "🧠 " + topic;


        button.onclick = function () {

            filterByTopic(topic);
        };


        topicList.appendChild(button);
    });
}


// =====================================================
// FILTER BY TOPIC
// =====================================================

function filterByTopic(topic) {

    currentWords =
        allVocabulary.filter(
            word =>
                word.topic.trim() === topic
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );
}


// =====================================================
// SHOW DAYS
// =====================================================

function showDays() {

    const container =
        document.getElementById(
            "vocabulary-container"
        );


    if (!container) return;


    const dates =
        [...new Set(

            allVocabulary

                .map(word =>
                    word.date.trim()
                )

                .filter(date =>
                    date !== ""
                )

        )];


    // Newest first

    dates.sort((a, b) => {

        const dateA =
            convertDateForSort(a);

        const dateB =
            convertDateForSort(b);

        return dateB - dateA;
    });


    container.innerHTML = `

        <div class="selection-box">

            <h2>
                📅 Wähle einen Tag
            </h2>

            <p>
                Wähle ein Datum, um die Wörter dieses Tages zu sehen.
            </p>

            <div class="day-list">
            </div>

        </div>

    `;


    const dayList =
        container.querySelector(
            ".day-list"
        );


    dates.forEach(date => {

        const button =
            document.createElement("button");


        button.className =
            "day-button";


        button.textContent =
            "📅 " + date;


        button.onclick = function () {

            filterByDate(date);
        };


        dayList.appendChild(button);
    });
}


// =====================================================
// FILTER BY DATE
// =====================================================

function filterByDate(date) {

    currentWords =
        allVocabulary.filter(
            word =>
                word.date.trim() === date
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );
}


// =====================================================
// DATE SORTING
// =====================================================

function convertDateForSort(dateString) {

    const parts =
        dateString.split(".");


    if (parts.length !== 3) {

        return new Date(0);
    }


    return new Date(
        parts[2],
        parts[1] - 1,
        parts[0]
    );
}


// =====================================================
// SEARCH VOCABULARY
// =====================================================

function searchVocabulary() {

    const input =
        document.getElementById("search");


    if (!input) return;


    const searchText =
        input.value
            .toLowerCase()
            .trim();


    // If search is empty, return to welcome screen

    if (!searchText) {

        currentWords = [];

        updateWordCount(
            allVocabulary.length
        );

        showWelcomeMessage();

        return;
    }


    currentWords =
        allVocabulary.filter(word => {

            return [

                word.german,

                word.english,

                word.plural,

                word.example,

                word.topic,

                word.date

            ]

                .join(" ")

                .toLowerCase()

                .includes(searchText);

        });


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );
}


// =====================================================
// SAVE WORDS
// =====================================================

async function saveWords() {

    const dateInput =
        document.getElementById("wordDate");


    const topicInput =
        document.getElementById("wordTopic");


    const date =
        formatDate(dateInput.value);


    const topic =
        topicInput.value.trim();


    // VALIDATION

    if (!date) {

        alert(
            "📅 Bitte wähle ein Datum."
        );

        return;
    }


    if (!topic) {

        alert(
            "🧠 Bitte gib ein Thema ein."
        );

        return;
    }


    const newWords = [];


    // COLLECT WORDS

    for (let i = 1; i <= 5; i++) {

        const german =
            document
                .getElementById(`german${i}`)
                .value
                .trim();


        const english =
            document
                .getElementById(`english${i}`)
                .value
                .trim();


        const plural =
            document
                .getElementById(`plural${i}`)
                .value
                .trim();


        const example =
            document
                .getElementById(`example${i}`)
                .value
                .trim();


        // Ignore empty rows

        if (!german) continue;


        newWords.push({

            date: date,

            topic: topic,

            german: german,

            english: english,

            plural: plural,

            example: example

        });
    }


    if (newWords.length === 0) {

        alert(
            "Bitte gib mindestens ein deutsches Wort ein."
        );

        return;
    }


    const saveButton =
        document.querySelector(
            ".save-button"
        );


    try {

        if (saveButton) {

            saveButton.disabled = true;

            saveButton.textContent =
                "⏳ Speichern...";
        }


        await fetch(
            SCRIPT_URL,
            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "text/plain;charset=utf-8"

                },

                body:
                    JSON.stringify({

                        action: "add",

                        words: newWords

                    })

            }
        );


        await new Promise(
            resolve =>
                setTimeout(resolve, 2000)
        );


        clearWordForm();

        hideAddWords();


        await loadVocabulary();


        alert(
            `✅ ${newWords.length} Wörter erfolgreich gespeichert!`
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "❌ Fehler beim Speichern der Wörter."
        );
    }


    finally {

        if (saveButton) {

            saveButton.disabled = false;

            saveButton.textContent =
                "💾 Wörter speichern";
        }
    }
}


// =====================================================
// CLEAR WORD FORM
// =====================================================

function clearWordForm() {

    document.getElementById("wordDate").value = "";

    document.getElementById("wordTopic").value = "";


    for (let i = 1; i <= 5; i++) {

        document.getElementById(
            `german${i}`
        ).value = "";

        document.getElementById(
            `english${i}`
        ).value = "";

        document.getElementById(
            `plural${i}`
        ).value = "";

        document.getElementById(
            `example${i}`
        ).value = "";
    }
}


// =====================================================
// START WEBSITE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("search");


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchVocabulary
            );
        }


        loadVocabulary();

    }
);
