// ==========================================
// GOOGLE SHEETS CONFIGURATION
// ==========================================

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyaTXiyE0PVXtuzZJZ4NBI0TaEa_rOBRd-iob-HB4d3XnNxrE0TQ0OWC5wIfqrVoXiO/exec";


// ==========================================
// GLOBAL VOCABULARY
// ==========================================

let allVocabulary = [];


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {
    if (!dateString) return "";

    dateString = dateString.trim();

    // dd.mm.yyyy
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
        return dateString;
    }

    // yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split("-");
        return `${day}.${month}.${year}`;
    }

    // yyyy.mm.dd
    if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split(".");
        return `${day}.${month}.${year}`;
    }

    return dateString;
}


// ==========================================
// LOAD VOCABULARY FROM GOOGLE SHEETS
// ==========================================

async function loadVocabulary() {
    try {
        console.log("Loading vocabulary from Google Sheets...");

        // Cache-busting parameter
        const response = await fetch(
            CSV_URL + "&cache=" + Date.now()
        );

        if (!response.ok) {
            throw new Error(
                `Google Sheets request failed: ${response.status}`
            );
        }

        const csvText = await response.text();

        console.log("Google Sheets CSV received.");

        const rows = csvText
            .trim()
            .split(/\r?\n/);

        // Remove header row
        const dataRows = rows.slice(1);

        const vocabulary = dataRows
            .filter(row => row.trim() !== "")
            .map(row => {

                // Handle CSV values with quotation marks
                const values =
                    row.match(
                        /(".*?"|[^",]+)(?=\s*,|\s*$)/g
                    ) || [];

                return {
                    date: formatDate(
                        values[0]
                            ?.replace(/^"|"$/g, "")
                            .trim() || ""
                    ),

                    topic:
                        values[1]
                            ?.replace(/^"|"$/g, "")
                            .trim() || "",

                    german:
                        values[2]
                            ?.replace(/^"|"$/g, "")
                            .trim() || "",

                    english:
                        values[3]
                            ?.replace(/^"|"$/g, "")
                            .trim() || "",

                    plural:
                        values[4]
                            ?.replace(/^"|"$/g, "")
                            .trim() || "",

                    example:
                        values[5]
                            ?.replace(/^"|"$/g, "")
                            .trim() || ""
                };
            });

        // ==========================================
        // GOOGLE SHEETS IS THE SINGLE SOURCE
        // ==========================================

        allVocabulary = vocabulary;

        console.log(
            "Vocabulary loaded:",
            allVocabulary
        );

        console.log(
            "Total words:",
            allVocabulary.length
        );

        // Display vocabulary
        displayVocabulary(allVocabulary);

        // Update word count
        updateWordCount(allVocabulary);

    } catch (error) {

        console.error(
            "Could not load Google Sheet:",
            error
        );

        const container =
            document.getElementById(
                "vocabularyContainer"
            );

        if (container) {
            container.innerHTML =
                `
                <p style="color:red;">
                    Could not load vocabulary from Google Sheets.
                    Please refresh the page.
                </p>
                `;
        }
    }
}


// ==========================================
// DISPLAY VOCABULARY
// ==========================================

function displayVocabulary(words) {

    const container =
        document.getElementById(
            "vocabularyContainer"
        );

    if (!container) {
        console.error(
            "vocabularyContainer not found."
        );
        return;
    }

    container.innerHTML = "";

    if (!words || words.length === 0) {

        container.innerHTML =
            `
            <p>
                No vocabulary found.
            </p>
            `;

        return;
    }

    words.forEach(word => {

        const card =
            document.createElement("div");

        card.className =
            "vocabulary-card";

        card.innerHTML =
            `
            <div class="word-date">
                ${word.date || ""}
            </div>

            <div class="word-topic">
                ${word.topic || ""}
            </div>

            <div class="german-word">
                ${word.german || ""}
            </div>

            <div class="english-word">
                ${word.english || ""}
            </div>

            ${
                word.plural
                    ? `
                    <div class="plural">
                        <strong>Plural:</strong>
                        ${word.plural}
                    </div>
                    `
                    : ""
            }

            ${
                word.example
                    ? `
                    <div class="example">
                        <strong>Example:</strong>
                        ${word.example}
                    </div>
                    `
                    : ""
            }
            `;

        container.appendChild(card);
    });
}


// ==========================================
// UPDATE WORD COUNT
// ==========================================

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


// ==========================================
// SHOW ALL WORDS
// ==========================================

function showAll() {

    displayVocabulary(
        allVocabulary
    );

    updateWordCount(
        allVocabulary
    );
}


// ==========================================
// SHOW TOPICS
// ==========================================

function showTopics() {

    const topics =
        [
            ...new Set(
                allVocabulary
                    .map(word => word.topic)
                    .filter(topic => topic)
            )
        ];

    console.log(
        "Topics:",
        topics
    );

    // If your existing HTML has a topic container,
    // populate it here.
}


// ==========================================
// SHOW DAYS
// ==========================================

function showDays() {

    const days =
        [
            ...new Set(
                allVocabulary
                    .map(word => word.date)
                    .filter(date => date)
            )
        ];

    console.log(
        "Days:",
        days
    );

    // If your existing HTML has a day container,
    // populate it here.
}


// ==========================================
// SEARCH VOCABULARY
// ==========================================

function searchVocabulary() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    if (!searchInput) return;

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    if (!searchText) {

        displayVocabulary(
            allVocabulary
        );

        updateWordCount(
            allVocabulary
        );

        return;
    }

    const filtered =
        allVocabulary.filter(word => {

            return (
                word.german
                    ?.toLowerCase()
                    .includes(searchText) ||

                word.english
                    ?.toLowerCase()
                    .includes(searchText) ||

                word.topic
                    ?.toLowerCase()
                    .includes(searchText) ||

                word.example
                    ?.toLowerCase()
                    .includes(searchText)
            );
        });

    displayVocabulary(
        filtered
    );

    updateWordCount(
        filtered
    );
}


// ==========================================
// SAVE WORDS TO GOOGLE SHEETS
// ==========================================

async function saveWords() {

    const dateInput =
        document.getElementById(
            "date"
        );

    const topicInput =
        document.getElementById(
            "topic"
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

    if (!date || !topic) {

        alert(
            "Please enter date and topic."
        );

        return;
    }

    const newWords = [];

    // ==========================================
    // COLLECT UP TO 5 WORDS
    // ==========================================

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

        if (!germanInput) continue;

        const german =
            germanInput.value.trim();

        const english =
            englishInput
                ?.value
                .trim() || "";

        const plural =
            pluralInput
                ?.value
                .trim() || "";

        const example =
            exampleInput
                ?.value
                .trim() || "";

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


    // ==========================================
    // CHECK WORDS
    // ==========================================

    if (newWords.length === 0) {

        alert(
            "Please enter at least one German word."
        );

        return;
    }


    // ==========================================
    // SEND TO GOOGLE APPS SCRIPT
    // ==========================================

    try {

        const response =
            await fetch(
                SCRIPT_URL,
                {
                    method: "POST",

                    body: JSON.stringify(
                        newWords
                    )
                }
            );

        console.log(
            "Words sent to Google Sheets."
        );


        // ==========================================
        // RELOAD FROM GOOGLE SHEETS
        // ==========================================

        alert(
            "Words saved successfully!"
        );

        await loadVocabulary();


        // ==========================================
        // CLEAR FORM
        // ==========================================

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

    } catch (error) {

        console.error(
            "Error saving words:",
            error
        );

        alert(
            "Could not save the words. Please try again."
        );
    }
}


// ==========================================
// INITIAL LOAD
// ==========================================

loadVocabulary();
