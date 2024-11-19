// __________________________HANDLE DELETE STD EXAM___________________________

const dltExamBtns = document.querySelectorAll(".delete--std");
const dltPopup = document.querySelector(".popup--dlt");
const dltBtn = document.querySelector(".popup--dlt button");
const exitBtn = document.querySelector(".popup--dlt i");
const blurLayer = document.querySelector(".hidden_layer");

dltExamBtns.forEach((dltExamBtn) => {
  dltExamBtn.addEventListener("click", function () {
    handleShowPopup();
    const dltBtnClickListener = () => {
      handleHiddenPopup();
      handleRemoveExam(dltExamBtn.id, dltExamBtn.dataset.subject);
      dltBtn.removeEventListener("click", dltBtnClickListener);
    };
    dltBtn.addEventListener("click", dltBtnClickListener);
  });
});

exitBtn.addEventListener("click", function () {
  handleHiddenPopup();
});

function handleHiddenPopup() {
  dltPopup.style.top = "";
  blurLayer.classList.remove("blur");
}

function handleShowPopup() {
  dltPopup.style.top = "200px";
  blurLayer.classList.add("blur");
}

function handleRemoveExam(id, subject_id) {
  window.location.href = "/delete_student_from_subject?id=" + id + '&subject_id=' + subject_id;
}

// __________________________HANDLE SEARCH DATA___________________________
// Lấy các phần tử cần sử dụng
const searchInput = document.querySelector('.stdExam__search input');
const tableRows = document.querySelectorAll('.stdExam__table tbody tr');

// Lắng nghe sự kiện nhập từ bàn phím
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.trim().toLowerCase();

    // Duyệt qua từng dòng trong bảng
    tableRows.forEach(row => {
        // Lấy giá trị từ các cột ID, Name, và Class
        const studentID = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        const studentName = row.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();
        const studentClass = row.querySelector('td:nth-child(4)').textContent.trim().toLowerCase();

        // Kiểm tra nếu bất kỳ cột nào chứa chuỗi tìm kiếm
        if (studentID.includes(searchValue) || studentName.includes(searchValue) || studentClass.includes(searchValue)) {
            // Nếu có, hiển thị dòng
            row.style.display = '';
        } else {
            // Nếu không, ẩn dòng
            row.style.display = 'none';
        }
    });
});



// __________________________HANDLE SUBMIT FILE___________________________

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const uploadBox = document.querySelector(".upload__box");
  const submitButton = document.getElementById("submitButton");
  const contentUpload = document.querySelector(".content__upload");

  function checkSuccessData() {
    return contentUpload.getAttribute("success-data") === "true";
  }

  function updateUploadBox() {
    const uploadText = uploadBox.querySelector("p");
    if (!checkSuccessData()) {
      if (!uploadText) {
        uploadBox.innerHTML = "<p>Wait a minute....</p>";
      } else {
        uploadText.textContent = "Wait a minute....";
      }
      fileInput.disabled = true;
    } else {
      if (!uploadText) {
        uploadBox.innerHTML = "<p>Drag or Drop Student's Exam Here!</p>";
      } else {
        uploadText.textContent = "Drag or Drop Student's Exam Here!";
      }
      fileInput.disabled = false;
    }
  }

  // Initialize the upload box status based on initial success-data attribute
  updateUploadBox();

  // Create an observer instance to watch for changes in success-data attribute
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "success-data") {
        updateUploadBox();
      }
    });
  });

  // Configure the observer to watch for attribute changes
  observer.observe(contentUpload, { attributes: true });

  uploadBox.addEventListener("click", function () {
    if (checkSuccessData()) {
      fileInput.click();
    }
  });

  fileInput.addEventListener("change", function () {
    if (checkSuccessData()) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          uploadBox.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
        };
        reader.readAsDataURL(file);
        submitButton.disabled = false;
      }
    }
  });

  submitButton.addEventListener("click", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const subjectID = submitButton.dataset.subject;
      fileInput.value = "";
      uploadBox.innerHTML = "<p>Drag or Drop Student's Exam Here!</p>";
      submitButton.disabled = true;
      contentUpload.setAttribute("success-data", "false");

      //----------------Received File here!!!-------------------
      console.log("Selected file:", file.name);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subjectID', subjectID);
      
      fetch("/uploadImg", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          console.log("Send to BE successfully");
        })
        .catch((error) => {
          console.log("Error uploading the file:", error);
        });
    }
  });
});

// __________________________HANDLE SHOW CHART___________________________

const canvas = document.getElementById("barChart");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 600;
canvas.height = 250;

// Data for the chart
const scores = JSON.parse(canvas.dataset.score); // Number of students for each score (1-10)
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Scores

const chartWidth = canvas.width - 100; // Padding for labels
const chartHeight = canvas.height - 100; // Padding for labels
const barWidth = chartWidth / scores.length - 10; // Width of each bar
const maxScore = Math.max(...scores); // Maximum value for scaling

// Draw axes
ctx.strokeStyle = "#000";
ctx.lineWidth = 1;
// Y-axis
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(50, chartHeight + 50);
ctx.stroke();

// X-axis
ctx.beginPath();
ctx.moveTo(50, chartHeight + 50);
ctx.lineTo(chartWidth + 50, chartHeight + 50);
ctx.stroke();

// Add X-axis labels (scores)
ctx.fillStyle = "#000";
labels.forEach((label, index) => {
  const x = 60 + index * (barWidth + 10) + barWidth / 2;
  const y = chartHeight + 70;

  ctx.fillText(label, x, y);
});

// Add Y-axis labels
const ySteps = Math.max(...scores); // Number of Y-axis steps
const yStepValue = Math.ceil(maxScore / ySteps); // Step size
ctx.textAlign = "right";
for (let i = 0; i <= ySteps; i++) {
  const y = chartHeight + 50 - (i * chartHeight) / ySteps;
  ctx.fillText(i * yStepValue, 45, y + 5);
}

// Add X-axis label (Score)
ctx.font = "16px Arial";
ctx.textAlign = "center";

ctx.fillText("Scores", canvas.width / 2, canvas.height - 10);

// Add Y-axis label (Number of Students)
ctx.save();
ctx.translate(15, canvas.height / 2);
ctx.rotate(-Math.PI / 2);
ctx.textAlign = "center";
ctx.fillText("Number of Students", 0, 0);
ctx.restore();

// Animation: Draw bars with transition
function drawBars() {
  let progress = 0; // Animation progress (0 to 1)
  const duration = 1000; // Duration of animation in ms
  const startTime = performance.now();

  function animate(time) {
    progress = (time - startTime) / duration;
    if (progress > 1) progress = 1;

    // Clear canvas and redraw axes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw axes
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, chartHeight + 50);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, chartHeight + 50);
    ctx.lineTo(chartWidth + 50, chartHeight + 50);
    ctx.stroke();

    // Add X-axis labels
    labels.forEach((label, index) => {
      const x = 60 + index * (barWidth + 10) + barWidth / 2;
      const y = chartHeight + 70;
      ctx.fillText(label, x, y);
    });

    // Add Y-axis labels
    for (let i = 0; i <= ySteps; i++) {
      const y = chartHeight + 50 - (i * chartHeight) / ySteps;
      ctx.fillText(i * yStepValue, 35, y + 5);
    }

    // Draw bars with current progress
    ctx.fillStyle = "#4a90e2";
    scores.forEach((score, index) => {
      const barHeight = (score / maxScore) * chartHeight * progress;
      const x = 60 + index * (barWidth + 10);
      const y = chartHeight + 50 - barHeight;

      // Draw bar
      ctx.fillRect(x, y, barWidth, barHeight);

      // Add labels (score value above bar)
      if (progress === 1) {
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(score, x + barWidth / 2, y - 5);
        ctx.fillStyle = "#4a90e2"; // Reset bar color
      }
    });

    // Add axis labels
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scores", canvas.width / 2, canvas.height - 10);

    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillText("Number of Students", 0, 0);
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate); // Continue animation
    }
  }

  requestAnimationFrame(animate);
}

drawBars();
