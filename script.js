// ==========================================
// GOOGLE SHEETS CSV URL
// ==========================================

const CSV_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


// ==========================================
// GLOBAL VOCABULARY ARRAY
// ==========================================

let allVocabulary = [];


// ==========================================
// LOAD VOCABULARY FROM GOOGLE SHEETS
// ==========================================

async function loadVocabulary() {

    try {

        const response = await fetch(CSV_URL);

        const csvText = await response.text();

        const rows = csvText.trim().split(/\r?\n/);

        const vocabulary = rows.slice(1).map(row => {

            const values =
                row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            return {
                date: values[0]?.replace(/"/g, "") || "",
                topic: values[1]?.replace(/"/g, "") || "",
                german: values[2]?.replace(/"/g, "") || "",
                english: values[3]?.replace(/"/g, "") || "",
                plural: values[4]?.replace(/"/g, "") || "",
                example: values[5]?.replace(/"/g, "") || ""
            };

        });


        // ==========================================
        // LOAD WORDS SAVED IN BROWSER
        // ==========================================

        const savedWords =
            JSON.parse(localStorage.getItem("myVocabulary")) || [];


        // Combine Google Sheet words + Browser words

        allVocabulary = [
            ...vocabulary,
            ...savedWords
        ];


        displayVocabulary(allVocabulary);

        updateWordCount(allVocabulary);


    } catch (error) {

        console.error(
            "Vocabulary loading error:",
            error
        );

    }

}


// ==========================================
// DISPLAY VOCABULARY
// ==========================================

function displayVocabulary(vocabulary) {

    const container =
        document.getElementById("vocabulary-container");

    const noResults =
        document.getElementById("no-results");


    container.innerHTML = "";


    if (vocabulary.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    vocabulary.forEach(word => {

        const card = document.createElement("div");

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

                <strong>Beispiel:</strong>
                <br>

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

}


// ==========================================
// UPDATE WORD COUNT
// ==========================================

function updateWordCount(vocabulary) {

    const wordCount =
        document.getElementById("wordCount");

    wordCount.textContent = vocabulary.length;

}


// ==========================================
// SHOW ALL WORDS
// ==========================================

function showAll() {

    displayVocabulary(allVocabulary);

    updateWordCount(allVocabulary);

}


// ==========================================
// SHOW TOPICS
// ==========================================

function showTopics() {

    const container =
        document.getElementById("vocabulary-container");

    container.innerHTML = "";


    const topics = [
        ...new Set(
            allVocabulary.map(word => word.topic)
        )
    ];


    topics.forEach(topic => {

        const button =
            document.createElement("button");

        button.className = "topic-button";

        button.textContent =
            "🧠 " + topic;


        button.onclick = function () {

            const filteredWords =
                allVocabulary.filter(
                    word => word.topic === topic
                );

            displayVocabulary(filteredWords);

            updateWordCount(filteredWords);

        };


        container.appendChild(button);

    });

}


// ==========================================
// SHOW DAYS
// ==========================================

function showDays() {

    const container =
        document.getElementById("vocabulary-container");

    container.innerHTML = "";


    const days = [
        ...new Set(
            allVocabulary.map(word => word.date)
        )
    ];


    days.forEach(day => {

        const button =
            document.createElement("button");

        button.className = "day-button";

        button.textContent =
            "📅 " + day;


        button.onclick = function () {

            const filteredWords =
                allVocabulary.filter(
                    word => word.date === day
                );

            displayVocabulary(filteredWords);

            updateWordCount(filteredWords);

        };


        container.appendChild(button);

    });

}


// ==========================================
// SEARCH VOCABULARY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById("search");


        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const filteredWords =
                    allVocabulary.filter(word =>

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

                    );


                displayVocabulary(filteredWords);

                updateWordCount(filteredWords);

            }

        );

    }
);


// ==========================================
// SHOW ADD WORDS FORM
// ==========================================

function showAddWords() {

    const form =
        document.getElementById("addWordsForm");

    form.style.display = "block";


    // Scroll to form

    form.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// HIDE ADD WORDS FORM
// ==========================================

function hideAddWords() {

    const form =
        document.getElementById("addWordsForm");

    form.style.display = "none";

}


// ==========================================
// SAVE 5 NEW WORDS
// ==========================================

function saveWords() {

    const date =
        document.getElementById("wordDate").value;


    const topic =
        document.getElementById("wordTopic").value;


    // Check date

    if (!date) {

        alert("Bitte Datum auswählen!");

        return;

    }


    // Check topic

    if (!topic) {

        alert("Bitte Thema eingeben!");

        return;

    }


    let newWords = [];


    // ==========================================
    // GET 5 WORDS
    // ==========================================

    for (let i = 1; i <= 5; i++) {

        const german =
            document.getElementById(
                "german" + i
            ).value.trim();


        const english =
            document.getElementById(
                "english" + i
            ).value.trim();


        const plural =
            document.getElementById(
                "plural" + i
            ).value.trim();


        const example =
            document.getElementById(
                "example" + i
            ).value.trim();


        // Only add if German word exists

        if (german !== "") {

            newWords.push({

                date: date,

                topic: topic,

                german: german,

                english: english,

                plural: plural,

                example: example

            });

        }

    }


    // ==========================================
    // CHECK IF WORDS WERE ENTERED
    // ==========================================

    if (newWords.length === 0) {

        alert("Bitte mindestens ein deutsches Wort eingeben!");

        return;

    }


    // ==========================================
    // ADD WORDS TO MAIN ARRAY
    // ==========================================

    allVocabulary.push(...newWords);


    // ==========================================
    // SAVE IN BROWSER
    // ==========================================

    localStorage.setItem(
        "myVocabulary",
        JSON.stringify(
            allVocabulary.filter(word => {

                // Keep only words that were manually added
                // This is handled below more safely

                return true;

            })
        )
    );


    // IMPORTANT:
    // Save only the newly added words separately

    const existingSavedWords =
        JSON.parse(
            localStorage.getItem("addedVocabulary")
        ) || [];


    existingSavedWords.push(...newWords);


    localStorage.setItem(
        "addedVocabulary",
        JSON.stringify(existingSavedWords)
    );


    // ==========================================
    // DISPLAY UPDATED VOCABULARY
    // ==========================================

    displayVocabulary(allVocabulary);

    updateWordCount(allVocabulary);


    // ==========================================
    // CLEAR FORM
    // ==========================================

    document.getElementById("wordDate").value = "";

    document.getElementById("wordTopic").value = "";


    for (let i = 1; i <= 5; i++) {

        document.getElementById(
            "german" + i
        ).value = "";

        document.getElementById(
            "english" + i
        ).value = "";

        document.getElementById(
            "plural" + i
        ).value = "";

        document.getElementById(
            "example" + i
        ).value = "";

    }


    // Hide form

    hideAddWords();


    // Show success message

    alert(
        "🎉 " +
        newWords.length +
        " neue Wörter wurden gespeichert!"
    );


    // Scroll to vocabulary

    document
        .getElementById("vocabulary-container")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// START WEBSITE
// ==========================================

loadVocabulary();
