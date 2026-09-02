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

    // Already dd.mm.yyyy
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


        // QUOTES

        if (char === '"') {

            if (insideQuotes && nextChar === '"') {

                field += '"';
                i++;

            } else {

                insideQuotes = !insideQuotes;
            }
        }


        // COMMA

        else if (char === "," && !insideQuotes) {

            row.push(field.trim());

            field = "";
        }


        // NEW LINE

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


        // NORMAL CHARACTER

        else {

            field += char;
        }
    }


    // LAST FIELD

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
                row.some(
                    cell => String(cell).trim() !== ""
                )
            )

            .map((row, index) => ({

                // Unique ID for display/delete

                id: `${index}-${row[0]}-${row[2]}`,

                date: formatDate(row[0] || ""),

                topic: String(row[1] || "").trim(),

                german: String(row[2] || "").trim(),

                english: String(row[3] || "").trim(),

                plural: String(row[4] || "").trim(),

                example: String(row[5] || "").trim()

            }))

            .filter(word => word.german !== "");


        // Keep words hidden initially

        currentWords = [];


        updateWordCount(
            allVocabulary.length
        );


        console.log(
            "Vocabulary loaded:",
            allVocabulary.length
        );

    }

    catch (error) {

        console.error(
            "Error loading vocabulary:",
            error
        );


        const container =
            document.getElementById(
                "vocabulary-container"
            );


        if (container) {

            container.innerHTML = `
                <div class="no-results">
                    ❌ Wörter konnten nicht geladen werden.
                    <br><br>
                    Bitte aktualisiere die Seite.
                </div>
            `;
        }
    }
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

        if (noResults) {

            noResults.style.display = "block";
        }

        return;
    }


    if (noResults) {

        noResults.style.display = "none";
    }


    words.forEach(word => {

        const card =
            document.createElement("div");


        card.className = "word-card";


        card.innerHTML = `

            <div class="card-top">

                <div class="card-meta">

                    <span class="topic-tag">
                        🧠 ${escapeHTML(
                            word.topic || "Allgemein"
                        )}
                    </span>

                    <span class="date-tag">
                        📅 ${escapeHTML(
                            word.date || ""
                        )}
                    </span>

                </div>


                <button
                    class="delete-button"
                    title="Wort löschen"
                    onclick="deleteWord('${escapeForAttribute(word.id)}')"
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

                            <strong>Plural:</strong>

                            ${escapeHTML(word.plural)}

                        </div>
                    `
                    : ""
            }


            ${
                word.example
                    ? `
                        <div class="example">

                            💬 ${escapeHTML(word.example)}

                        </div>
                    `
                    : ""
            }

        `;


        container.appendChild(card);
    });
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
// ESCAPE ATTRIBUTE
// =====================================================

function escapeForAttribute(value) {

    return String(value)

        .replace(/\\/g, "\\\\")

        .replace(/'/g, "\\'");
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
// CLEAR DISPLAY
// =====================================================

function clearDisplay() {

    const container =
        document.getElementById(
            "vocabulary-container"
        );


    const noResults =
        document.getElementById(
            "no-results"
        );


    if (container) {

        container.innerHTML = "";
    }


    if (noResults) {

        noResults.style.display = "none";
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


    const noResults =
        document.getElementById(
            "no-results"
        );


    if (!container) return;


    if (noResults) {

        noResults.style.display = "none";
    }


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

        <div class="filter-title">

            🧠 Wähle ein Thema

        </div>


        <div class="topic-list">

        </div>

    `;


    const topicList =
        container.querySelector(
            ".topic-list"
        );


    topics.sort();


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


    updateWordCount(
        allVocabulary.length
    );
}


// =====================================================
// FILTER BY TOPIC
// =====================================================

function filterByTopic(topic) {

    currentWords =
        allVocabulary.filter(
            word => word.topic === topic
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


    const noResults =
        document.getElementById(
            "no-results"
        );


    if (!container) return;


    if (noResults) {

        noResults.style.display = "none";
    }


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


    // NEWEST FIRST

    dates.sort((a, b) => {

        return (
            convertDateForSort(b) -
            convertDateForSort(a)
        );
    });


    container.innerHTML = `

        <div class="filter-title">

            📅 Wähle einen Tag

        </div>


        <div class="day-list">

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


    updateWordCount(
        allVocabulary.length
    );
}


// =====================================================
// FILTER BY DATE
// =====================================================

function filterByDate(date) {

    currentWords =
        allVocabulary.filter(
            word => word.date === date
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
        String(dateString).split(".");


    if (parts.length !== 3) {

        return new Date(0).getTime();
    }


    return new Date(

        Number(parts[2]),

        Number(parts[1]) - 1,

        Number(parts[0])

    ).getTime();
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


    if (!searchText) {

        clearDisplay();

        updateWordCount(
            allVocabulary.length
        );

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


    if (!dateInput || !topicInput) {

        alert("❌ Formular wurde nicht gefunden.");

        return;
    }


    const date =
        formatDate(
            dateInput.value
        );


    const topic =
        topicInput.value.trim();


    // VALIDATE DATE

    if (!date) {

        alert(
            "📅 Bitte wähle ein Datum."
        );

        return;
    }


    // VALIDATE TOPIC

    if (!topic) {

        alert(
            "🧠 Bitte gib ein Thema ein."
        );

        return;
    }


    const newWords = [];


    // COLLECT WORDS

    for (let i = 1; i <= 5; i++) {

        const germanElement =
            document.getElementById(
                `german${i}`
            );


        const englishElement =
            document.getElementById(
                `english${i}`
            );


        const pluralElement =
            document.getElementById(
                `plural${i}`
            );


        const exampleElement =
            document.getElementById(
                `example${i}`
            );


        const german =
            germanElement
                ? germanElement.value.trim()
                : "";


        const english =
            englishElement
                ? englishElement.value.trim()
                : "";


        const plural =
            pluralElement
                ? pluralElement.value.trim()
                : "";


        const example =
            exampleElement
                ? exampleElement.value.trim()
                : "";


        // Ignore empty rows

        if (!german) {

            continue;
        }


        newWords.push({

            date: date,

            topic: topic,

            german: german,

            english: english,

            plural: plural,

            example: example

        });
    }


    // CHECK WORDS

    if (newWords.length === 0) {

        alert(
            "🇩🇪 Bitte gib mindestens ein deutsches Wort ein."
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


        // SEND TO GOOGLE APPS SCRIPT

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
                    JSON.stringify(newWords)

            }
        );


        // WAIT FOR GOOGLE SHEETS

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );


        // CLEAR FORM

        clearWordForm();


        // HIDE FORM

        hideAddWords();


        // RELOAD DATA

        await loadVocabulary();


        // SHOW ALL WORDS AFTER SAVING

        showAll();


        alert(
            `✅ ${newWords.length} Wörter erfolgreich gespeichert!`
        );

    }

    catch (error) {

        console.error(
            "Save error:",
            error
        );


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
// CLEAR ADD WORD FORM
// =====================================================

function clearWordForm() {

    const dateInput =
        document.getElementById("wordDate");


    const topicInput =
        document.getElementById("wordTopic");


    if (dateInput) {

        dateInput.value = "";
    }


    if (topicInput) {

        topicInput.value = "";
    }


    for (let i = 1; i <= 5; i++) {

        const fields = [

            `german${i}`,

            `english${i}`,

            `plural${i}`,

            `example${i}`

        ];


        fields.forEach(id => {

            const element =
                document.getElementById(id);


            if (element) {

                element.value = "";
            }
        });
    }
}


// =====================================================
// DELETE WORD
// =====================================================

async function deleteWord(wordId) {

    const word =
        allVocabulary.find(
            item => item.id === wordId
        );


    if (!word) {

        alert("❌ Wort wurde nicht gefunden.");

        return;
    }


    const confirmation =
        confirm(
            `Möchtest du "${word.german}" wirklich löschen?`
        );


    if (!confirmation) {

        return;
    }


    // =================================================
    // REMOVE IMMEDIATELY FROM WEBSITE
    // =================================================

    allVocabulary =
        allVocabulary.filter(
            item => item.id !== wordId
        );


    currentWords =
        currentWords.filter(
            item => item.id !== wordId
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        allVocabulary.length
    );


    // =================================================
    // SEND DELETE REQUEST TO GOOGLE APPS SCRIPT
    // =================================================

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

                        english: word.english,

                        plural: word.plural,

                        example: word.example

                    })

            }
        );


        console.log(
            "Delete request sent for:",
            word.german
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
// START WEBSITE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("search");


        if (searchInput) {

            // Search while typing

            searchInput.addEventListener(
                "input",
                searchVocabulary
            );


            // Search when ENTER is pressed

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        searchVocabulary();
                    }
                }
            );
        }


        // LOAD WORDS
        // BUT DO NOT DISPLAY THEM

        loadVocabulary();
    }
);
