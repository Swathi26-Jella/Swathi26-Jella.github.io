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
// SHOW ADD WORD FORM
// =====================================================

function showAddWords() {

    const form = document.getElementById("addWordsForm");

    if (!form) return;

    form.style.display = "block";

    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// =====================================================
// HIDE ADD WORD FORM
// =====================================================

function hideAddWords() {

    const form = document.getElementById("addWordsForm");

    if (form) {
        form.style.display = "none";
    }
}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateString) {

    if (!dateString) return "";

    const value = String(dateString).trim();

    if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
        return value;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

        const [year, month, day] = value.split("-");

        return `${day}.${month}.${year}`;
    }

    if (/^\d{4}\.\d{2}\.\d{2}$/.test(value)) {

        const [year, month, day] = value.split(".");

        return `${day}.${month}.${year}`;
    }

    return value;
}


// =====================================================
// CSV PARSER
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


    row.push(field.trim());

    if (row.some(cell => cell !== "")) {
        rows.push(row);
    }


    return rows;
}


// =====================================================
// LOAD VOCABULARY
// =====================================================

async function loadVocabulary() {

    const container =
        document.getElementById("vocabulary-container");


    try {

        container.innerHTML = `
            <div class="loading">
                ⏳ Wörter werden geladen...
            </div>
        `;


        const response = await fetch(
            CSV_URL + "&cache=" + Date.now()
        );


        if (!response.ok) {
            throw new Error("Could not load vocabulary");
        }


        const csvText = await response.text();

        const rows = parseCSV(csvText);


        const dataRows = rows.slice(1);


        allVocabulary = dataRows

            .filter(row =>
                row.some(cell => cell.trim() !== "")
            )

            .map((row, index) => ({

                id: index,

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


        currentWords = [...allVocabulary];


        displayVocabulary(currentWords);

        updateWordCount(allVocabulary.length);


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="no-results">
                ❌ Wörter konnten nicht geladen werden.
                <br><br>
                Bitte aktualisiere die Seite.
            </div>
        `;

    }
}


// =====================================================
// DISPLAY VOCABULARY
// =====================================================

function displayVocabulary(words) {

    const container =
        document.getElementById("vocabulary-container");

    const noResults =
        document.getElementById("no-results");


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
            document.createElement("article");

        card.className = "word-card";


        card.innerHTML = `

            <div class="card-top">

                <span class="topic-tag">
                    🧠 ${escapeHTML(word.topic || "Allgemein")}
                </span>

                <span class="date-tag">
                    📅 ${escapeHTML(word.date)}
                </span>

            </div>


            <div class="german">
                ${escapeHTML(word.german)}
            </div>


            <div class="english">
                ${escapeHTML(word.english)}
            </div>


            ${word.plural ? `

                <div class="plural">

                    <span class="label">
                        Plural
                    </span>

                    <span>
                        ${escapeHTML(word.plural)}
                    </span>

                </div>

            ` : ""}


            ${word.example ? `

                <div class="example">

                    <span class="example-label">
                        💬 Beispiel
                    </span>

                    <p>
                        ${escapeHTML(word.example)}
                    </p>

                </div>

            ` : ""}


            <div class="card-actions">

                <button
                    class="delete-button"
                    onclick="deleteWord(
                        '${escapeForAttribute(word.date)}',
                        '${escapeForAttribute(word.topic)}',
                        '${escapeForAttribute(word.german)}'
                    )"
                >
                    🗑️ Löschen
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// =====================================================
// ESCAPE HTML
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
// ESCAPE FOR BUTTON ATTRIBUTE
// =====================================================

function escapeForAttribute(value) {

    if (value === undefined || value === null) {
        return "";
    }

    return String(value)

        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\n/g, " ");

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
// SHOW ALL
// =====================================================

function showAll() {

    currentWords = [...allVocabulary];

    displayVocabulary(currentWords);

    updateWordCount(allVocabulary.length);

}


// =====================================================
// SHOW TOPICS
// =====================================================

function showTopics() {

    const container =
        document.getElementById("vocabulary-container");


    const topics =
        [...new Set(

            allVocabulary

                .map(word =>
                    word.topic.trim()
                )

                .filter(topic =>
                    topic !== ""
                )

        )]


        .sort((a, b) =>
            a.localeCompare(b)
        );


    container.innerHTML = `

        <div class="filter-page">

            <h2>
                🧠 Alle Themen
            </h2>

            <p>
                Wähle ein Thema aus.
            </p>

            <div class="topic-list"></div>

        </div>

    `;


    const topicList =
        container.querySelector(".topic-list");


    topics.forEach(topic => {

        const button =
            document.createElement("button");


        button.className =
            "topic-button";


        const count =
            allVocabulary.filter(
                word => word.topic === topic
            ).length;


        button.innerHTML = `
            🧠 ${escapeHTML(topic)}
            <span>${count}</span>
        `;


        button.onclick = () =>
            filterByTopic(topic);


        topicList.appendChild(button);

    });


    updateWordCount(allVocabulary.length);

}


// =====================================================
// FILTER BY TOPIC
// =====================================================

function filterByTopic(topic) {

    currentWords =
        allVocabulary.filter(
            word => word.topic === topic
        );


    displayVocabulary(currentWords);

    updateWordCount(currentWords.length);

}


// =====================================================
// SHOW DAYS
// =====================================================

function showDays() {

    const container =
        document.getElementById("vocabulary-container");


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


    dates.sort((a, b) => {

        return (
            convertDateForSort(b) -
            convertDateForSort(a)
        );

    });


    container.innerHTML = `

        <div class="filter-page">

            <h2>
                📅 Alle Lerntage
            </h2>

            <p>
                Wähle einen Tag aus.
            </p>

            <div class="day-list"></div>

        </div>

    `;


    const dayList =
        container.querySelector(".day-list");


    dates.forEach(date => {

        const button =
            document.createElement("button");


        button.className =
            "day-button";


        const count =
            allVocabulary.filter(
                word => word.date === date
            ).length;


        button.innerHTML = `
            📅 ${escapeHTML(date)}
            <span>${count} Wörter</span>
        `;


        button.onclick = () =>
            filterByDate(date);


        dayList.appendChild(button);

    });


    updateWordCount(allVocabulary.length);

}


// =====================================================
// FILTER BY DATE
// =====================================================

function filterByDate(date) {

    currentWords =
        allVocabulary.filter(
            word => word.date === date
        );


    displayVocabulary(currentWords);

    updateWordCount(currentWords.length);

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

        Number(parts[1]) - 1,

        parts[0]

    );

}


// =====================================================
// SEARCH
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

        showAll();

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


    displayVocabulary(currentWords);

    updateWordCount(currentWords.length);

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


    if (!date) {

        alert("📅 Bitte wähle ein Datum.");

        return;

    }


    if (!topic) {

        alert("🧠 Bitte gib ein Thema ein.");

        return;

    }


    const newWords = [];


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


        if (!german) continue;


        newWords.push({

            date,
            topic,
            german,
            english,
            plural,
            example

        });

    }


    if (newWords.length === 0) {

        alert(
            "Bitte gib mindestens ein deutsches Wort ein."
        );

        return;

    }


    const saveButton =
        document.querySelector(".save-button");


    try {

        saveButton.disabled = true;

        saveButton.textContent =
            "⏳ Speichern...";


        const requestData = {

            action: "add",

            words: newWords

        };


        await fetch(SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body:
                JSON.stringify(requestData)

        });


        // Wait for Google Sheet update

        await new Promise(resolve =>
            setTimeout(resolve, 2500)
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
            "❌ Fehler beim Speichern."
        );

    }

    finally {

        saveButton.disabled = false;

        saveButton.textContent =
            "💾 Wörter speichern";

    }

}


// =====================================================
// DELETE WORD
// =====================================================

async function deleteWord(date, topic, german) {

    const confirmed =
        confirm(
            `Möchtest du "${german}" wirklich löschen?`
        );


    if (!confirmed) return;


    try {

        const requestData = {

            action: "delete",

            date: date,

            topic: topic,

            german: german

        };


        await fetch(SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body:
                JSON.stringify(requestData)

        });


        // Wait for Google Sheets

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );


        await loadVocabulary();


        alert(
            `🗑️ "${german}" wurde gelöscht.`
        );


    }

    catch (error) {

        console.error(error);

        alert(
            "❌ Fehler beim Löschen."
        );

    }

}


// =====================================================
// CLEAR FORM
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
