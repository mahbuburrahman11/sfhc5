const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit-btn");
const nameInput = document.getElementById("name");
const saveButton = document.getElementById("save-btn");
const scoresList = document.getElementById("scores");
const timerElement = document.getElementById('timer');
const history = document.getElementById('leaderboard');


let questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "New York", "Tokyo"],
        answer: "Paris"
    },
    {
        question: "What is the largest continent by area?",
        options: ["Africa", "Antarctica", "Asia", "Europe"],
        answer: "Asia"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["Mount Everest", "K2", "Makalu", "Lhotse"],
        answer: "Mount Everest"
    }
];

let currentQuestion = 0;
let score = 0;
let totalSeconds = 30;
let secondsLeft = totalSeconds;
let timer;


function startQuiz() {
    quizContainer.classList.remove("hidden");
    showQuestion();
    startTimer();
}

// Function to show the current question
function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question").innerHTML = question.question;
    const options = document.getElementById("options").querySelectorAll(".btn");
    for (let i = 0; i < options.length; i++) {
        options[i].innerHTML = question.options[i];
        options[i].addEventListener("click", selectOption);
    }
}

// Function to select an option
function selectOption(event) {
    const selectedOption = event.target;
    const answer = questions[currentQuestion].answer;
    if (selectedOption.innerHTML === answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    stopTimer();
    quizContainer.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    history.classList.remove("History");
    document.getElementById("score").innerHTML = score;
    document.getElementById("total").innerHTML = questions.length;
}

// Function to save the score to the leaderboard
function saveScore(event) {
    event.preventDefault();
    const name = nameInput.value;
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({
        name: name,
        score: score
    });
    localStorage.setItem("scores", JSON.stringify(scores));
    showScores();
}

// Function to show the scores on the leaderboard
function showScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort((a, b) => b.score - a.score);
    scoresList.innerHTML = "";
    scores.forEach(score => {
        const li = document.createElement("li");
        li.innerHTML = `${score.name} - ${score.score}`;
        scoresList.appendChild(li);
    });
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft < 0) {
            endQuiz();
        } else {
            document.getElementById("timer").innerHTML = `Time left: ${secondsLeft} seconds`;
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Event listeners
submitButton.addEventListener("click", endQuiz);
saveButton.addEventListener("click", saveScore);

// Start the quiz
startQuiz();
