// Sample data for demonstration
let subjectDetail = {
    name: "ATI",
    scores: [
        { studentName: "Nguyen Van A", studentID: "Student_1", studentClass: "Class A", score: 8 },
        { studentName: "Tran Thi B", studentID: "Student_2", studentClass: "Class B", score: 9 },
        { studentName: "Le Van C", studentID: "Student_3", studentClass: "Class A", score: 6 },
        { studentName: "Pham Thi D", studentID: "Student_4", studentClass: "Class C", score: 10 },
        { studentName: "Hoang Van E", studentID: "Student_5", studentClass: "Class B", score: 7 }
    ]
};

function calculateScores(scores) {
    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b.score, 0) / scores.length).toFixed(2) : 0;
    const highest = Math.max(...scores.map(s => s.score));
    const lowest = Math.min(...scores.map(s => s.score));
    return { average, highest, lowest };
}

function renderDetail() {
    document.getElementById('detail-title').innerText = `Subject Information: ${subjectDetail.name}`;
    const { average, highest, lowest } = calculateScores(subjectDetail.scores);

    document.getElementById('detail-average-score').innerText = average;
    document.getElementById('detail-highest-score').innerText = highest;
    document.getElementById('detail-lowest-score').innerText = lowest;

    document.getElementById('detail-average-bar').style.width = `${(average / 10) * 100}%`;
    document.getElementById('detail-highest-bar').style.width = `${(highest / 10) * 100}%`;
    document.getElementById('detail-lowest-bar').style.width = `${(lowest / 10) * 100}%`;

    // Sort the scores from highest to lowest
    const sortedScores = subjectDetail.scores.slice().sort((a, b) => b.score - a.score);
    const rankingList = document.getElementById('detail-student-ranking');
    rankingList.innerHTML = '';
    sortedScores.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center border border-gray-300 px-4 py-2">${index + 1}</td>
            <td class="border border-gray-300 px-4 py-2">${item.studentName}</td>
            <td class="border border-gray-300 px-4 py-2">${item.studentID}</td>
            <td class="border border-gray-300 px-4 py-2">${item.studentClass}</td> <!-- New column -->
            <td class="border border-gray-300 px-4 py-2">
                <input type="number" value="${item.score}" onchange="updateScore(${index}, this.value)" class="text-center p-1 w-20" />
            </td>
            <td class="border border-gray-300 px-4 py-2">
                <button onclick="deleteStudent(${index})" class="bg-red-500 text-white px-2 rounded hover:bg-red-600">Delete</button>
            </td>
        `;
        rankingList.appendChild(row);
    });
}

function updateScore(index, newScore) {
    if (!isNaN(newScore) && newScore >= 0 && newScore <= 10) {
        subjectDetail.scores[index].score = parseFloat(newScore);
        renderDetail();
    } else {
        alert("Vui lòng nhập điểm hợp lệ (0-10).");
    }
}

function deleteStudent(index) {
    subjectDetail.scores.splice(index, 1);
    renderDetail();
}

// Render the subject detail when the page loads
renderDetail();