// =====================================================
// GOOGLE SHEETS CONFIGURATION
// =====================================================

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyaTXiyE0PVXtuzZJZ4NBI0TaEa_rOBRd-iob-HB4d3XnNxrE0TQ0OWC5wIfqrVoXiO/exec";


// =====================================================
// GLOBAL VOCABULARY
// =====================================================

let allVocabulary = [];


// =====================================================
// SHOW ADD WORDS FORM
// =====================================================

function showAddWords() {

    const form =
        document.getElementById("addWordsForm");

    if (form) {
        form.style.display = "block";
    }
}


// =====================================================
// HIDE ADD WORDS FORM
// =====================================================

function hideAddWords() {

    const form =
        document.getElementById("addWordsForm");

    if (form) {
        form.style.display = "none";
    }
}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }

    dateString = dateString.trim();

    // Already dd.mm.yyyy
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
        return dateString;
    }

    // yyyy-mm-dd → dd.mm.yyyy
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {

        const [year, month, day] =
            dateString.split("-");

        return `${day}.${month}.${year}`;
    }

    // yyyy.mm.dd → dd.mm.yyyy
    if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateString)) {

        const [year, month, day] =
            dateString.split(".");

        return `${day}.${month}.${year}`;
    }

    return dateString;
}


// =====================================================
// CSV PARSER
// Handles commas inside quoted examples
// =====================================================

function parseCSVLine(line) {

    const result = [];

    let current = "";

    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {

        const char = line[i];

        const nextChar = line[i + 1];

        // Handle quotation marks
        if (char === '"') {

            // Double quote inside quoted field
            if (insideQuotes && nextChar === '"') {

                current += '"';

                i++;

            } else {

                insideQuotes = !insideQuotes;
            }

        }

        // Comma outside quotation marks
        else if (char === "," && !insideQuotes) {

            result.push(current.trim());

            current = "";

        }

        else {

            current += char;
        }
    }

    // Add final value
    result.push(current.trim());

    return result;
}


// =====================================================
// LOAD VOCABULARY FROM GOOGLE SHEETS
// =====================================================

async function loadVocabulary() {

    try {

        console.log(
            "Loading vocabulary from Google Sheets..."
        );

        // Cache busting
        const response =
            await fetch(
                CSV_URL +
                "&cache=" +
                Date.now()
            );

        if (!response.ok) {

            throw new Error(
                `Google Sheets request failed: ${response.status}`
            );
        }

        const csvText =
            await response.text();

        if (!csvText.trim()) {

            console.warn(
                "Google Sheet returned empty data."
            );

            allVocabulary = [];

            displayVocabulary([]);

            updateWordCount([]);

            return;
        }


        // Split rows
        const rows =
            csvText
                .trim()
                .split(/\r?\n/);


        // Remove header
        const dataRows =
            rows.slice(1);


        // Convert rows into vocabulary objects
        allVocabulary =
            dataRows

                .filter(
                    row => row.trim() !== ""
                )

                .map(row => {

                    const columns =
                        parseCSVLine(row);

                    return {

                        date:
                            formatDate(
                                columns[0] || ""
                            ),

                        topic:
                            columns[1] || "",

                        german:
                            columns[2] || "",

                        english:
                            columns[3] || "",

                        plural:
                            columns[4] || "",

                        example:
                            columns[5] || ""
                    };
                });


        console.log(
            "Vocabulary loaded:",
            allVocabulary
        );

        console.log(
            "Total words:",
            allVocabulary.length
        );


        // Display
        displayVocabulary(
            allVocabulary
        );

        // Count
        updateWordCount(
            allVocabulary
        );

    }

    catch (error) {

        console.error(
            "Could not load vocabulary from Google Sheets:",
            error
        );

        const container =
            document.getElementById(
                "vocabulary-container"
            );

        if (container) {

            container.innerHTML = `
                <p>
                    ❌ Could not load vocabulary.
                    Please refresh the page.
                </p>
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


    if (!container) {

        console.error(
            "Vocabulary container not found."
        );

        return;
    }


    // Clear old content
    container.innerHTML = "";


    // No words
    if (!words || words.length === 0) {

        if (noResults) {
            noResults.style.display = "block";
        }

        return;
    }


    if (noResults) {
        noResults.style.display = "none";
    }


    // Create vocabulary cards
    words.forEach(word => {

        const card =
            document.createElement("div");

        card.className =
            "vocabulary-card";


        card.innerHTML = `

            <div class="word-date">
                📅 ${escapeHTML(word.date)}
            </div>

            <div class="word-topic">
                🧠 ${escapeHTML(word.topic)}
            </div>

            <div class="german-word">
                ${escapeHTML(word.german)}
            </div>

            <div class="english-word">
                ${escapeHTML(word.english)}
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
                        <strong>Beispiel:</strong>
                        ${escapeHTML(word.example)}
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
// Prevents special characters from breaking the page
// =====================================================

function escapeHTML(value) {

    if (value === undefined || value === null) {
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

function updateWordCount(words) {

    const countElement =
        document.getElementById(
            "wordCount"
        );

    if (countElement) {

        countElement.textContent =
            words.length;
    }
}


// =====================================================
// SHOW ALL WORDS
// =====================================================

function showAll() {

    displayVocabulary(
        allVocabulary
    );

    updateWordCount(
        allVocabulary
    );
}


// =====================================================
// SHOW TOPICS
// =====================================================

function showTopics() {

    const topics = [
        ...new Set(
            allVocabulary
                .map(word => word.topic)
                .filter(topic => topic)
        )
    ];


    if (topics.length === 0) {

        displayVocabulary([]);

        return;
    }


    const filteredWords =
        allVocabulary.filter(
            word =>
                word.topic &&
                topics.includes(word.topic)
        );


    displayVocabulary(
        filteredWords
    );

    updateWordCount(
        filteredWords
    );
}


// =====================================================
// SHOW DAYS
// =====================================================

function showDays() {

    const dates = [
        ...new Set(
            allVocabulary
                .map(word => word.date)
                .filter(date => date)
        )
    ];


    if (dates.length === 0) {

        displayVocabulary([]);

        return;
    }


    const filteredWords =
        allVocabulary.filter(
            word =>
                word.date &&
                dates.includes(word.date)
        );


    displayVocabulary(
        filteredWords
    );

    updateWordCount(
        filteredWords
    );
}


// =====================================================
// SEARCH
// =====================================================

function searchVocabulary() {

    const searchInput =
        document.getElementById(
            "search"
        );

    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // Empty search
    if (!searchText) {

        displayVocabulary(
            allVocabulary
        );

        updateWordCount(
            allVocabulary
        );

        return;
    }


    // Search all important fields
    const filteredWords =
        allVocabulary.filter(word => {

            return (

                word.german
                    .toLowerCase()
                    .includes(searchText)

                ||

                word.english
                    .toLowerCase()
                    .includes(searchText)

                ||

                word.plural
                    .toLowerCase()
                    .includes(searchText)

                ||

                word.example
                    .toLowerCase()
                    .includes(searchText)

                ||

                word.topic
                    .toLowerCase()
                    .includes(searchText)

                ||

                word.date
                    .toLowerCase()
                    .includes(searchText)
            );
        });


    displayVocabulary(
        filteredWords
    );

    updateWordCount(
        filteredWords
    );
}


// =====================================================
// SAVE 5 WORDS
// WEBSITE → GOOGLE APPS SCRIPT → GOOGLE SHEETS
// =====================================================

async function saveWords() {

    // -------------------------------------------------
    // GET DATE
    // -------------------------------------------------

    const dateInput =
        document.getElementById(
            "wordDate"
        );


    // -------------------------------------------------
    // GET TOPIC
    // -------------------------------------------------

    const topicInput =
        document.getElementById(
            "wordTopic"
        );


    if (!dateInput || !topicInput) {

        console.error(
            "Date or topic input not found."
        );

        return;
    }


    const date =
        formatDate(
            dateInput.value
        );


    const topic =
        topicInput.value.trim();


    // -------------------------------------------------
    // VALIDATE DATE + TOPIC
    // -------------------------------------------------

    if (!date) {

        alert(
            "Please select a date."
        );

        return;
    }


    if (!topic) {

        alert(
            "Please enter a topic."
        );

        return;
    }


    // -------------------------------------------------
    // COLLECT 5 WORDS
    // -------------------------------------------------

    const newWords = [];


    for (let i = 1; i <= 5; i++) {

        const germanInput =
            document.getElementById(
                `german${i}`
            );

        const englishInput =
            document.getElementById(
                `english${i}`
            );

        const pluralInput =
            document.getElementById(
                `plural${i}`
            );

        const exampleInput =
            document.getElementById(
                `example${i}`
            );


        const german =
            germanInput
                ? germanInput.value.trim()
                : "";


        const english =
            englishInput
                ? englishInput.value.trim()
                : "";


        const plural =
            pluralInput
                ? pluralInput.value.trim()
                : "";


        const example =
            exampleInput
                ? exampleInput.value.trim()
                : "";


        // Ignore completely empty rows
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


    // -------------------------------------------------
    // CHECK WHETHER WORDS WERE ENTERED
    // -------------------------------------------------

    if (newWords.length === 0) {

        alert(
            "Please enter at least one German word."
        );

        return;
    }


    console.log(
        "Words to save:",
        newWords
    );


    // -------------------------------------------------
    // DISABLE SAVE BUTTON WHILE SAVING
    // -------------------------------------------------

    const saveButton =
        document.querySelector(
            ".save-button"
        );


    if (saveButton) {

        saveButton.disabled = true;

        saveButton.textContent =
            "⏳ Speichern...";
    }


    // -------------------------------------------------
    // SEND TO GOOGLE APPS SCRIPT
    // -------------------------------------------------

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
                    JSON.stringify(
                        newWords
                    )
            }
        );


        console.log(
            "Words sent to Google Apps Script."
        );


        // -------------------------------------------------
        // WAIT A LITTLE FOR GOOGLE SHEETS
        // -------------------------------------------------

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1500
                )
        );


        // -------------------------------------------------
        // RELOAD FROM GOOGLE SHEETS
        // -------------------------------------------------

        await loadVocabulary();


        // -------------------------------------------------
        // CLEAR FORM
        // -------------------------------------------------

        clearWordForm();


        // -------------------------------------------------
        // HIDE FORM
        // -------------------------------------------------

        hideAddWords();


        alert(
            "✅ Wörter erfolgreich gespeichert!"
        );


    }

    catch (error) {

        console.error(
            "Error saving words:",
            error
        );


        alert(
            "❌ Die Wörter konnten nicht gespeichert werden. Bitte versuche es erneut."
        );
    }


    // -------------------------------------------------
    // ENABLE SAVE BUTTON AGAIN
    // -------------------------------------------------

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

    const dateInput =
        document.getElementById(
            "wordDate"
        );

    const topicInput =
        document.getElementById(
            "wordTopic"
        );


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

            const input =
                document.getElementById(id);


            if (input) {
                input.value = "";
            }
        });
    }
}


// =====================================================
// SEARCH EVENT
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById(
                "search"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchVocabulary
            );
        }


        // Load vocabulary when page opens
        loadVocabulary();
    }
);
