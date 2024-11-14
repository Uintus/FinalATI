const subjects = [
    { name: "ATI", test: "Midterm Exam", correctAnswers: "correct_answers.pdf" },
    { name: "SAD", test: "Final Exam", correctAnswers: "final_answers.pdf" },
    { name: "SPM", test: "Quiz", correctAnswers: "quiz_answers.pdf" }
];

const subjectIndex = 0; // Change to dynamically select subject
document.getElementById('subject-name').innerText = subjects[subjectIndex].name;
document.getElementById('test-name').innerText = subjects[subjectIndex].test;

const fileUploadArea = document.getElementById('file-upload-area');
const fileInput = document.getElementById('file-input');
const resultsContainer = document.getElementById('results-container');
const viewAnswersButton = document.getElementById('view-answers');
const answersContainer = document.getElementById('answers-container');
const answersDisplay = document.getElementById('answers-display');

let studentAnswers = [];

// Drag and Drop Events
fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragging');
});

fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragging');
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragging');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileUploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    resultsContainer.innerHTML = ''; // Clear previous results
    studentAnswers = []; // Reset answers
    for (const file of files) {
        const score = Math.floor(Math.random() * 11); // Random score from 0 to 10
        const studentInfo = {
            name: `Student ${Math.floor(Math.random() * 100) + 1}`,
            id: `ID${Math.floor(Math.random() * 1000)}`,
            class: "10A",
            score: score,
            answers: generateAnswers() // Generate dummy answers
        };
        studentAnswers.push(studentInfo.answers);
        displayResult(studentInfo);
    }
    viewAnswersButton.classList.remove('hidden'); // Show View Answers button
}

function generateAnswers() {
    return {
        correct: ["Question 1", "Question 3"], // Example correct answers
        incorrect: ["Question 2", "Question 4"] // Example incorrect answers
    };
}

function displayResult(student) {
    resultsContainer.innerHTML = ''; // Clear previous messages
    const resultDiv = document.createElement('div');
    resultDiv.className = 'bg-white rounded-lg p-4 mb-2';
    resultDiv.innerHTML = `
        <div class="border-b-2 border-red-600 mb-2">
            <strong class="text-red-600">${student.name} (${student.id})</strong>
        </div>
        <p>Class: ${student.class}</p>
        <p class="text-lg font-bold text-red-600">Score: ${student.score} / 10</p>
    `;
    resultsContainer.appendChild(resultDiv);
}

// Return Home Button Functionality
document.getElementById('return-home').addEventListener('click', () => {
    window.location.href = '/';
});

// View Answers Button Functionality
viewAnswersButton.addEventListener('click', () => {
    answersContainer.classList.toggle('hidden'); // Toggle visibility
    if (!answersContainer.classList.contains('hidden')) {
        displayAnswers();
    }
});

function displayAnswers() {
    answersDisplay.innerHTML = ''; // Clear previous answers
    studentAnswers.forEach((answers, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'mt-2 p-2 border rounded';
        answerDiv.innerHTML = `
            <h4 class="font-bold">Student ${index + 1} Answers:</h4>
            <p class="text-green-600">Correct Answers: ${answers.correct.join(', ')}</p>
            <p class="text-red-600">Incorrect Answers: ${answers.incorrect.join(', ')}</p>
        `;
        answersDisplay.appendChild(answerDiv);
    });
}