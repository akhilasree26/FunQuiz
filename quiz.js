// Quiz Data
const questions = [
    {
        question: "1. What sport uses the term 'love' for a score of zero?",
        options: ["Hockey","Football","Tennis","Basketball"],
        answer: "C"
    },
    {
        question: "2. In which sport, a score of 111 is considered unlucky?",
        options: ["Cricket","Baseball","Badminton","Football"],
        answer: "A"
    },
    {
        question: "3. Which living creature has 3 hearts?",
        options: ["Human","Blue Whale","Elephant","Octopus"],
        answer: "D"
    },
    {
        question: "4. The natural food that never spoils?",
        options: ["Wheat","Rice","Honey","Seeds"],
        answer: "C"
    },
    {
        question: "5. Which country has a 'Floating Post Office'?",
        options: ["South Korea","India","Japan","Italy"],
        answer: "B"
    }
];

let currentQuestion = 0;
let score = 0;

// DOM Elements
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');

// Start Quiz
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hide');
    quiz.classList.remove('hide');
    showQuestion();
    updateProgress();
});

// Show Question
function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    const buttons = optionsEl.querySelectorAll('.option-btn');
    const letters = ["A","B","C","D"];
    buttons.forEach((btn, index) => {
        btn.textContent = `${letters[index]}. ${q.options[index]}`;
        btn.disabled = false;
        btn.style.backgroundColor = '#dde499';
    });
}

// Handle Option Click
optionsEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('option-btn')) return;

    const selectedLetter = e.target.textContent.charAt(0);
    const correct = questions[currentQuestion].answer;
    const buttons = optionsEl.querySelectorAll('.option-btn');

    buttons.forEach(btn => btn.disabled = true); // disable all buttons

    if (selectedLetter === correct) {
        score++;
        e.target.style.backgroundColor = '#2ecc71'; // correct green
    } else {
        e.target.style.backgroundColor = '#e74c3c'; // wrong red
        // Highlight correct option
        buttons.forEach(btn => {
            if (btn.textContent.charAt(0) === correct) {
                btn.style.backgroundColor = '#2ecc71';
            }
        });
    }
});

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
        updateProgress();
    } else {
        showResult();
    }
});

// Update Progress Bar
function updateProgress() {
    const progress = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Result
function showResult() {
    quiz.classList.add('hide');
    result.classList.remove('hide');
    scoreEl.textContent = `${score} out of ${questions.length}`;
    progressBar.style.width = '100%';
}

