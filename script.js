const container = document.getElementById("vocabulary-container");
const searchInput = document.getElementById("search");
const wordCount = document.getElementById("wordCount");
const noResults = document.getElementById("no-results");

let allWords = [];

const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpPGVhnR14FZyiMvfiQLuAco2rnIU9FKPiM1V29aL7Lpd5NuYtmiG9d0tVOo96pjjzVVeSm1jvHM_A/pub?output=csv";


function displayWords(words) {

    container.innerHTML = "";

    wordCount.textContent = words.length;

    if (words.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";


    words.forEach(word => {

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
                <strong>Plural:</strong> ${word.plural}
            </div>

            <div class="example">
                <strong>Beispiel:</strong><br>
                ${word.example}
            </div>

            <div class="date">
                📅 ${word.date}
            </div>

            <div class="topic">
                🧠 ${word.topic}
            </div>
        `;

        container.appendChild(card);

    });
}


function loadVocabulary() {

    fetch(CSV_URL)
        .then(response => response.text())
        .then(csv => {

            const lines = csv.trim().split("\n");

            const headers = lines[0].split(",");

            allWords = lines.slice(1).map(line => {

                const values = line.split(",");

                return {
                    date: values[0]?.trim() || "",
                    topic: values[1]?.trim() || "",
                    german: values[2]?.trim() || "",
                    english: values[3]?.trim() || "",
                    plural: values[4]?.trim() || "",
                    example: values.slice(5).join(",").trim() || ""
                };

            });

            displayWords(allWords);

        })

        .catch(error => {

            console.error("Error loading vocabulary:", error);

            wordCount.textContent = "0";

        });

}


searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredWords = allWords.filter(word =>

        word.german.toLowerCase().includes(searchText) ||
        word.english.toLowerCase().includes(searchText) ||
        word.plural.toLowerCase().includes(searchText) ||
        word.example.toLowerCase().includes(searchText) ||
        word.topic.toLowerCase().includes(searchText)

    );

    displayWords(filteredWords);

});


function showAll() {

    displayWords(allWords);

}


function showTopics() {

    const topics = [...new Set(allWords.map(word => word.topic))];

    container.innerHTML = "";

    wordCount.textContent = topics.length;

    topics.forEach(topic => {

        const button = document.createElement("button");

        button.className = "topic-button";

        button.textContent = "🧠 " + topic;

        button.onclick = function () {

            displayWords(
                allWords.filter(word => word.topic === topic)
            );

        };

        container.appendChild(button);

    });

}


function showDays() {

    const days = [...new Set(allWords.map(word => word.date))];

    container.innerHTML = "";

    wordCount.textContent = days.length;

    days.forEach(day => {

        const button = document.createElement("button");

        button.className = "day-button";

        button.textContent = "📅 " + day;

        button.onclick = function () {

            displayWords(
                allWords.filter(word => word.date === day)
            );

        };

        container.appendChild(button);

    });

}


loadVocabulary();
