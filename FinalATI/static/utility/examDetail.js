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

const editExamBtns = document.querySelectorAll(".edit--score");
const editPopup = document.querySelector(".popup--edit");
const editBtn = document.querySelector(".popup--edit button");
const exitEditBtn = document.querySelector(".popup--edit i");

editExamBtns.forEach((editExamBtn, index) => {
  editExamBtn.addEventListener("click", function () {
    handleShowEditPopup();
    const editBtnClickListener = () => {
      handleHiddenEditPopup();
      handleEditExam(index);
      editBtn.removeEventListener("click", editBtnClickListener);
    };
    editBtn.addEventListener("click", editBtnClickListener);
  });
});

exitEditBtn.addEventListener("click", function () {
  handleHiddenEditPopup();
});

function handleHiddenEditPopup() {
  editPopup.style.top = "";
  blurLayer.classList.remove("blur");
}

function handleShowEditPopup() {
  editPopup.style.top = "200px";
  blurLayer.classList.add("blur");
}

function handleEditExam(index) {
  console.log("edit sccore of exam " + index);
}

// __________________________HANDLE UPLOAD IMG___________________________
document.addEventListener("DOMContentLoaded", function () {
  const uploadBox = document.querySelector(".upload__box");
  const fileInput = document.getElementById("fileInput");

  uploadBox.addEventListener("click", () => {
    fileInput.click();
  });

  uploadBox.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadBox.classList.add("dragover");
  });

  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("dragover");
  });

  uploadBox.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadBox.classList.remove("dragover");
    const files = event.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    handleFiles(files);
  });

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      // Bạn có thể thêm mã xử lý tệp ở đây, ví dụ: tải lên tệp, hiển thị tệp, v.v.
    }
  }
});
