const subjects = [
    { name: "ATI", scores: [] },
    { name: "SAD", scores: [] },
    { name: "SPM", scores: [] }
];

function openAddSubjectPopup() {
    document.getElementById('popup-overlay').classList.add('show');
    document.getElementById('add-subject-popup').classList.add('show');
}

function closeAddSubjectPopup() {
    document.getElementById('popup-overlay').classList.remove('show');
    document.getElementById('add-subject-popup').classList.remove('show');
    document.getElementById('new-subject-name').value = '';
    document.getElementById('new-test-name').value = '';
    document.getElementById('correct-answer-upload').value = '';
}

function confirmAddSubject() {
    const subjectName = document.getElementById('new-subject-name').value;
    const testName = document.getElementById('new-test-name').value;
    const correctAnswerFile = document.getElementById('correct-answer-upload').files[0];

    if (subjectName && testName && correctAnswerFile) {
        subjects.push({ name: subjectName, scores: [] });
        alert("Subject created successfully!");
        renderSubjects();
        closeAddSubjectPopup();
    } else {
        alert("Please fill in all fields.");
    }
}

function renderSubjects() {
    const subjectList = document.getElementById('subject-list');
    subjectList.innerHTML = '';
    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = "subject-item cursor-pointer";
        subjectDiv.innerHTML = `
            <h2 class="text-xl font-semibold">${subject.name}</h2>
            <button onclick="markSubject(${index})" class="mt-2 bg-blue-800 text-white py-1 px-3 rounded">Mark</button>
            <button onclick="deleteSubject(${index})" class="mt-2 bg-red-600 text-white py-1 px-3 rounded">Delete</button>
        `;
        subjectDiv.onclick = () => showSubjectInfo(index);
        subjectList.appendChild(subjectDiv);
    });
}

function markSubject(index) {
    window.location.href = `/grading`; 
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    renderSubjects();
}

function showSubjectInfo(index) {
    const subject = subjects[index];
    const studentScores = Array.from({ length: 10 }, (_, idx) => ({
        studentID: `Student_${idx + 1}`,
        score: Math.floor(Math.random() * 11)
    }));

    const average = studentScores.length > 0 ? (studentScores.reduce((a, b) => a + b.score, 0) / studentScores.length).toFixed(2) : 0;
    const highest = Math.max(...studentScores.map(s => s.score));
    const lowest = Math.min(...studentScores.map(s => s.score));

    document.getElementById('popup-title').innerText = `Subject Information: ${subject.name}`;
    document.getElementById('average-score').innerText = average;
    document.getElementById('highest-score').innerText = highest;
    document.getElementById('lowest-score').innerText = lowest;

    const rankingList = document.getElementById('student-ranking');
    rankingList.innerHTML = '';
    studentScores.sort((a, b) => b.score - a.score).forEach(item => {
        const studentDiv = document.createElement('div');
        studentDiv.className = "bg-blue-100 p-2 mb-2 rounded shadow";
        studentDiv.innerText = `${item.studentID}: ${item.score}`;
        rankingList.appendChild(studentDiv);
    });

    document.getElementById('current-subject').innerText = `Subject: ${subject.name}`;
    document.getElementById('view-detail-popup').classList.add('show');
    document.getElementById('popup-overlay').classList.add('show');
    document.getElementById('subject-list-container').classList.add('subject-list-shrink');
}

function closeViewDetailPopup() {
    document.getElementById('view-detail-popup').classList.remove('show');
    document.getElementById('popup-overlay').classList.remove('show');
    document.getElementById('subject-list-container').classList.remove('subject-list-shrink');
    document.getElementById('current-subject').innerText = ''; 
}

function viewDetail() {
    window.location.href = '/detail';
}

renderSubjects();