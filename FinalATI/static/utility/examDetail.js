// __________________________HANDLE DELETE STD EXAM___________________________

const dltExamBtns = document.querySelectorAll(".delete--std");
const dltPopup = document.querySelector(".popup--dlt");
const dltBtn = document.querySelector(".popup--dlt button");
const exitBtn = document.querySelector(".popup--dlt i");
const blurLayer = document.querySelector(".hidden_layer");

dltExamBtns.forEach((dltExamBtn, index) => {
  dltExamBtn.addEventListener("click", function () {
    handleShowPopup();
    const dltBtnClickListener = () => {
      handleHiddenPopup();
      handleRemoveExam(index);
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

function handleRemoveExam(index) {
  console.log("removed exam " + index);
}

// __________________________HANDLE EDIT STD SCORE___________________________

const canvas = document.getElementById("barChart");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 600;
canvas.height = 250;

// Data for the chart
const scores = [2, 5, 10, 15, 3, 18, 12, 9, 6, 4]; // Number of students for each score (1-10)
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
const ySteps = 5; // Number of Y-axis steps
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
      const barHeight = ((score / maxScore) * chartHeight) * progress;
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
