// =====================================================
// GOOGLE SHEETS CONFIGURATION
// =====================================================

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyaTXiyE0PVXtuzZJZ4NBI0TaEa_rOBRd-iob-HB4d3XnNxrE0TQ0OWC5wIfqrVoXiO/exec";



// =====================================================
// GLOBAL VARIABLES
// =====================================================

let allVocabulary = [];

let currentWords = [];

let currentView = "home";



// =====================================================
// SHOW ADD WORDS FORM
// =====================================================

function showAddWords() {

    const form =
        document.getElementById("addWordsForm");

    if (!form) return;


    form.style.display = "block";


    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}



// =====================================================
// HIDE ADD WORDS FORM
// =====================================================

function hideAddWords() {

    const form =
        document.getElementById("addWordsForm");

    if (!form) return;


    form.style.display = "none";
}



// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(value) {

    if (!value) return "";

    const text =
        String(value).trim();


    // dd.mm.yyyy

    if (
        /^\d{2}\.\d{2}\.\d{4}$/.test(text)
    ) {

        return text;
    }


    // yyyy-mm-dd

    if (
        /^\d{4}-\d{2}-\d{2}$/.test(text)
    ) {

        const parts =
            text.split("-");


        return (
            parts[2] +
            "." +
            parts[1] +
            "." +
            parts[0]
        );
    }


    // yyyy.mm.dd

    if (
        /^\d{4}\.\d{2}\.\d{2}$/.test(text)
    ) {

        const parts =
            text.split(".");


        return (
            parts[2] +
            "." +
            parts[1] +
            "." +
            parts[0]
        );
    }


    return text;
}



// =====================================================
// CSV PARSER
// Handles commas inside example sentences
// =====================================================

function parseCSV(text) {

    const rows = [];

    let row = [];

    let field = "";

    let insideQuotes = false;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const char =
            text[i];

        const next =
            text[i + 1];


        if (char === '"') {

            if (
                insideQuotes &&
                next === '"'
            ) {

                field += '"';

                i++;

            } else {

                insideQuotes =
                    !insideQuotes;
            }

        }


        else if (
            char === "," &&
            !insideQuotes
        ) {

            row.push(
                field.trim()
            );

            field = "";

        }


        else if (
            (char === "\n" ||
             char === "\r") &&
            !insideQuotes
        ) {

            if (
                char === "\r" &&
                next === "\n"
            ) {

                i++;
            }


            row.push(
                field.trim()
            );


            if (
                row.some(
                    cell =>
                        cell.trim() !== ""
                )
            ) {

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

    if (
        field !== "" ||
        row.length > 0
    ) {

        row.push(
            field.trim()
        );


        if (
            row.some(
                cell =>
                    cell.trim() !== ""
            )
        ) {

            rows.push(row);
        }
    }


    return rows;
}



// =====================================================
// LOAD VOCABULARY
// =====================================================

async function loadVocabulary() {

    try {

        const response =
            await fetch(
                CSV_URL +
                "&cache=" +
                Date.now()
            );


        if (!response.ok) {

            throw new Error(
                "Google Sheet could not be loaded."
            );
        }


        const csvText =
            await response.text();


        const rows =
            parseCSV(csvText);


        if (rows.length === 0) {

            allVocabulary = [];

            updateWordCount(0);

            return;
        }


        // Remove header

        const dataRows =
            rows.slice(1);


        allVocabulary =
            dataRows

                .map(
                    (row, index) => ({

                        id:
                            "word-" +
                            index +
                            "-" +
                            Date.now(),

                        date:
                            formatDate(
                                row[0] || ""
                            ),

                        topic:
                            String(
                                row[1] || ""
                            ).trim(),

                        german:
                            String(
                                row[2] || ""
                            ).trim(),

                        english:
                            String(
                                row[3] || ""
                            ).trim(),

                        plural:
                            String(
                                row[4] || ""
                            ).trim(),

                        example:
                            String(
                                row[5] || ""
                            ).trim()

                    })
                )

                .filter(
                    word =>
                        word.german !== ""
                );


        updateWordCount(
            allVocabulary.length
        );


        console.log(
            "Loaded:",
            allVocabulary.length,
            "words"
        );


    }

    catch (error) {

        console.error(
            "Loading error:",
            error
        );


        const container =
            document.getElementById(
                "vocabulary-container"
            );


        if (container) {

            container.innerHTML = `

                <div class="error-box">

                    ❌ Wörter konnten nicht geladen werden.

                    <br><br>

                    Bitte aktualisiere die Seite.

                </div>

            `;
        }
    }
}



// =====================================================
// DISPLAY WORDS
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


    if (
        !words ||
        words.length === 0
    ) {

        if (noResults) {

            noResults.style.display =
                "block";
        }

        return;
    }


    if (noResults) {

        noResults.style.display =
            "none";
    }


    words.forEach(
        (word, index) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "word-card";


            card.innerHTML = `

                <div class="card-top">

                    <div class="card-tags">

                        <span class="topic-tag">

                            🧠
                            ${escapeHTML(
                                word.topic ||
                                "Allgemein"
                            )}

                        </span>


                        <span class="date-tag">

                            📅
                            ${escapeHTML(
                                word.date
                            )}

                        </span>

                    </div>


                    <button
                        type="button"
                        class="delete-button"
                        title="Wort löschen"
                    >
                        🗑️
                    </button>

                </div>


                <div class="german-word">

                    🇩🇪
                    ${escapeHTML(
                        word.german
                    )}

                </div>


                <div class="english-word">

                    🇬🇧
                    ${escapeHTML(
                        word.english
                    )}

                </div>


                ${
                    word.plural
                        ? `

                            <div class="plural-box">

                                <span class="field-label">
                                    Plural
                                </span>

                                <span>
                                    ${escapeHTML(
                                        word.plural
                                    )}
                                </span>

                            </div>

                        `
                        : ""
                }


                ${
                    word.example
                        ? `

                            <div class="example-box">

                                <span class="field-label">
                                    💬 Beispiel
                                </span>

                                <div>
                                    ${escapeHTML(
                                        word.example
                                    )}
                                </div>

                            </div>

                        `
                        : ""
                }

            `;


            const deleteButton =
                card.querySelector(
                    ".delete-button"
                );


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteWord(word);
                }
            );


            container.appendChild(card);
        }
    );
}



// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    return String(
        value ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}



// =====================================================
// UPDATE WORD COUNT
// =====================================================

function updateWordCount(count) {

    const element =
        document.getElementById(
            "wordCount"
        );


    if (element) {

        element.textContent =
            count;
    }
}



// =====================================================
// SHOW ALL WORDS
// =====================================================

function showAll() {

    currentView =
        "all";


    currentWords =
        [...allVocabulary];


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );


    scrollToVocabulary();
}



// =====================================================
// SHOW TOPICS
// =====================================================

function showTopics() {

    currentView =
        "topics";


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

        noResults.style.display =
            "none";
    }


    const topics =
        [
            ...new Set(

                allVocabulary

                    .map(
                        word =>
                            word.topic.trim()
                    )

                    .filter(
                        topic =>
                            topic !== ""
                    )
            )
        ];


    topics.sort(
        (a, b) =>
            a.localeCompare(
                b,
                "de"
            )
    );


    container.innerHTML = `

        <div class="selection-box">

            <div class="selection-icon">
                🧠
            </div>

            <h2>
                Themen
            </h2>

            <p>
                Wähle ein Thema, um die Wörter anzuzeigen.
            </p>

            <div class="topic-list"></div>

        </div>

    `;


    const topicList =
        container.querySelector(
            ".topic-list"
        );


    topics.forEach(
        topic => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "topic-button";


            button.textContent =
                "🧠 " + topic;


            button.addEventListener(
                "click",
                function () {

                    filterByTopic(
                        topic
                    );
                }
            );


            topicList.appendChild(
                button
            );
        }
    );


    updateWordCount(
        allVocabulary.length
    );


    scrollToVocabulary();
}



// =====================================================
// FILTER TOPIC
// =====================================================

function filterByTopic(topic) {

    currentView =
        "topic";


    currentWords =
        allVocabulary.filter(
            word =>
                word.topic === topic
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );


    scrollToVocabulary();
}



// =====================================================
// SHOW DAYS
// =====================================================

function showDays() {

    currentView =
        "days";


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

        noResults.style.display =
            "none";
    }


    const dates =
        [
            ...new Set(

                allVocabulary

                    .map(
                        word =>
                            word.date.trim()
                    )

                    .filter(
                        date =>
                            date !== ""
                    )
            )
        ];


    dates.sort(
        (a, b) =>
            convertDateForSort(b) -
            convertDateForSort(a)
    );


    container.innerHTML = `

        <div class="selection-box">

            <div class="selection-icon">
                📅
            </div>

            <h2>
                Lerntage
            </h2>

            <p>
                Wähle einen Tag, um die Wörter anzuzeigen.
            </p>

            <div class="day-list"></div>

        </div>

    `;


    const dayList =
        container.querySelector(
            ".day-list"
        );


    dates.forEach(
        date => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "day-button";


            button.textContent =
                "📅 " + date;


            button.addEventListener(
                "click",
                function () {

                    filterByDate(
                        date
                    );
                }
            );


            dayList.appendChild(
                button
            );
        }
    );


    updateWordCount(
        allVocabulary.length
    );


    scrollToVocabulary();
}



// =====================================================
// FILTER DATE
// =====================================================

function filterByDate(date) {

    currentView =
        "date";


    currentWords =
        allVocabulary.filter(
            word =>
                word.date === date
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );


    scrollToVocabulary();
}



// =====================================================
// DATE SORT
// =====================================================

function convertDateForSort(dateString) {

    const parts =
        String(
            dateString
        ).split(".");


    if (
        parts.length !== 3
    ) {

        return 0;
    }


    return new Date(

        Number(parts[2]),

        Number(parts[1]) - 1,

        Number(parts[0])

    ).getTime();
}



// =====================================================
// SEARCH
// =====================================================

function searchVocabulary() {

    const input =
        document.getElementById(
            "search"
        );


    if (!input) return;


    const text =
        input.value
            .toLowerCase()
            .trim();


    if (!text) {

        clearVocabularyDisplay();

        updateWordCount(
            allVocabulary.length
        );

        return;
    }


    currentView =
        "search";


    currentWords =
        allVocabulary.filter(
            word => {

                const searchableText = [

                    word.german,

                    word.english,

                    word.plural,

                    word.example,

                    word.topic,

                    word.date

                ]

                    .join(" ")

                    .toLowerCase();


                return searchableText.includes(
                    text
                );
            }
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        currentWords.length
    );


    scrollToVocabulary();
}



// =====================================================
// CLEAR VOCABULARY DISPLAY
// =====================================================

function clearVocabularyDisplay() {

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

        noResults.style.display =
            "none";
    }


    currentWords = [];
}



// =====================================================
// SCROLL TO VOCABULARY
// =====================================================

function scrollToVocabulary() {

    const section =
        document.querySelector(
            ".vocabulary-section"
        );


    if (!section) return;


    setTimeout(
        function () {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        100
    );
}



// =====================================================
// SAVE WORDS
// =====================================================

async function saveWords() {

    const dateInput =
        document.getElementById(
            "wordDate"
        );


    const topicInput =
        document.getElementById(
            "wordTopic"
        );


    if (
        !dateInput ||
        !topicInput
    ) {

        alert(
            "❌ Formular nicht gefunden."
        );

        return;
    }


    const date =
        formatDate(
            dateInput.value
        );


    const topic =
        topicInput.value.trim();


    // Validate date

    if (!date) {

        alert(
            "📅 Bitte wähle ein Datum."
        );

        return;
    }


    // Validate topic

    if (!topic) {

        alert(
            "🧠 Bitte gib ein Thema ein."
        );

        return;
    }


    const newWords = [];


    // Read 5 rows

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        const german =
            document
                .getElementById(
                    `german${i}`
                )
                .value
                .trim();


        const english =
            document
                .getElementById(
                    `english${i}`
                )
                .value
                .trim();


        const plural =
            document
                .getElementById(
                    `plural${i}`
                )
                .value
                .trim();


        const example =
            document
                .getElementById(
                    `example${i}`
                )
                .value
                .trim();


        // Empty German word = skip row

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


    if (
        newWords.length === 0
    ) {

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

            saveButton.disabled =
                true;

            saveButton.textContent =
                "⏳ Speichern...";
        }


        // =========================================
        // SEND TO GOOGLE APPS SCRIPT
        // =========================================

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


        // Give Google Sheets time to update

        await wait(2500);


        // Reload from Google Sheets

        await loadVocabulary();


        // Clear form

        clearWordForm();


        // Hide form

        hideAddWords();


        // Show all words

        showAll();


        alert(
            `✅ ${newWords.length} Wörter wurden gespeichert.`
        );


    }

    catch (error) {

        console.error(
            "Save error:",
            error
        );


        alert(
            "❌ Die Wörter konnten nicht gespeichert werden."
        );

    }

    finally {

        if (saveButton) {

            saveButton.disabled =
                false;

            saveButton.textContent =
                "💾 Wörter speichern";
        }
    }
}



// =====================================================
// WAIT
// =====================================================

function wait(milliseconds) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );
}



// =====================================================
// CLEAR FORM
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


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        const ids = [

            `german${i}`,

            `english${i}`,

            `plural${i}`,

            `example${i}`

        ];


        ids.forEach(
            id => {

                const element =
                    document.getElementById(
                        id
                    );


                if (element) {

                    element.value = "";
                }
            }
        );
    }
}



// =====================================================
// DELETE WORD
// =====================================================

async function deleteWord(word) {

    const confirmation =
        confirm(
            `Möchtest du "${word.german}" wirklich löschen?`
        );


    if (!confirmation) {

        return;
    }


    // =========================================
    // REMOVE IMMEDIATELY FROM WEBSITE
    // =========================================

    allVocabulary =
        allVocabulary.filter(
            item =>
                item.id !== word.id
        );


    currentWords =
        currentWords.filter(
            item =>
                item.id !== word.id
        );


    displayVocabulary(
        currentWords
    );


    updateWordCount(
        allVocabulary.length
    );


    // =========================================
    // DELETE FROM GOOGLE SHEETS
    // =========================================

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
            "Delete request sent:",
            word.german
        );


    }

    catch (error) {

        console.error(
            "Delete error:",
            error
        );
    }
}



// =====================================================
// START WEBSITE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        const searchInput =
            document.getElementById(
                "search"
            );


        // =========================================
        // SEARCH WHILE TYPING
        // =========================================

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchVocabulary
            );


            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchVocabulary();
                    }
                }
            );
        }


        // =========================================
        // LOAD DATA
        // =========================================

        await loadVocabulary();


        // =========================================
        // IMPORTANT:
        // DO NOT SHOW WORDS AT START
        // =========================================

        clearVocabularyDisplay();

    }
);
