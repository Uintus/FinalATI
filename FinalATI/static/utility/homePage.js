//_________________________HANDLE SHOW/HIDDEN FORM__________________________
const addCourseBtn = document.querySelector(".detail--left__addCourse");
const exitFormBtn = document.querySelector(".dlt_icon");
const formBox = document.querySelector(".addCourse__form");
const blurLayer = document.querySelector(".hidden_layer");

addCourseBtn.addEventListener("click", handleShowForm);
exitFormBtn.addEventListener("click", handleHiddenForm);

function handleShowForm() {
  formBox.style.top = "37px";
  blurLayer.classList.add("blur");
}

function handleHiddenForm() {
  formBox.style.top = "";
  blurLayer.classList.remove("blur");
}

//_________________________HANDLE SEARCH__________________________
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('.header__search input[type="text"]'); // Truy cập ô input search
  const courses = document.querySelectorAll('.course'); // Lấy tất cả các khóa học

  searchInput.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase(); // Lấy nội dung người dùng nhập và chuyển thành chữ thường

      courses.forEach(course => {
          const courseName = course.querySelector('.course--name').textContent.toLowerCase(); // Lấy tên khóa học
          if (courseName.includes(query)) {
              course.style.display = ""; // Hiển thị nếu khớp
          } else {
              course.style.display = "none"; // Ẩn nếu không khớp
          }
      });
  });
});


//_________________________HANDLE DELETE EXAM_______________________
const dotsBtns = document.querySelectorAll(".course--dots");
const dltBoxes = document.querySelectorAll(".course--delete");
const dltPopup = document.querySelector(".popup--dlt");
const dltBtn = document.querySelector(".popup--dlt button");
const exitPopup = document.querySelector(".popup--dlt i");

dotsBtns.forEach((dotsBtn, index) => {
  dotsBtn.addEventListener("mouseenter", () => handleShowDltBox(index));
  dotsBtn.addEventListener("mouseleave", () => handleShowDltBox(index));
});


//  send được index của exam vào handleDeleteExam
dltBoxes.forEach((dltBox, index) => {
  dltBox.addEventListener("click", function () {
    handleDltPopup();
    const dltBtnClickListener = () => {
      handleDeleteExam(dltBox.id);
      dltBtn.removeEventListener("click", dltBtnClickListener);
    };
    dltBtn.addEventListener("click", dltBtnClickListener);
  });
});

exitPopup.addEventListener("click", handleHiddenPopup);

function handleShowDltBox(index) {
  dltBoxes[index].classList.toggle("hidden");
}

function handleDltPopup() {
  blurLayer.classList.add("blur");
  dltPopup.style.top = "200px";
}

function handleHiddenPopup() {
  blurLayer.classList.remove("blur");
  dltPopup.style.top = "";
}

// delete exam here in DB
function handleDeleteExam(id) {
  blurLayer.classList.remove("blur");
  dltPopup.style.top = "";
  window.location.href = "/delete_subject?id=" + id;
}
//_________________________HANDLE EXAM DETAIL__________________________
const detailArrowBtns = document.querySelectorAll(".course--arrow");

detailArrowBtns.forEach((detailArrowBtn) => {
  detailArrowBtn.addEventListener("click", function () {
    window.location.href = "/detail?id=" + detailArrowBtn.id;
  });
});

