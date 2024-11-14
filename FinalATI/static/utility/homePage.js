//_________________________HANDLE SHOW/HIDDEN FORM__________________________
const addCourseBtn = document.querySelector('.detail--left__addCourse')
const exitFormBtn = document.querySelector('.dlt_icon')
const formBox = document.querySelector('.addCourse__form')
const blurLayer = document.querySelector('.hidden_layer')


addCourseBtn.addEventListener('click', handleShowForm)
exitFormBtn.addEventListener('click', handleHiddenForm)

function handleShowForm() {
    formBox.style.top = '37px'
    blurLayer.classList.add('blur')
}

function handleHiddenForm() {
    formBox.style.top = ''
    blurLayer.classList.remove('blur')
}

//_________________________HANDLE POST FORM__________________________




//_________________________HANDLE DELETE EXAM_______________________
const dotsBtns = document.querySelectorAll('.course--dots');
const dltBoxes = document.querySelectorAll('.course--delete');
const dltPopup = document.querySelector('.popup--dlt'); 
const dltBtn = document.querySelector('.popup--dlt button');
const exitPopup = document.querySelector('.popup--dlt i');

dotsBtns.forEach((dotsBtn, index) => {
  dotsBtn.addEventListener('mouseenter', () => handleShowDltBox(index));
  dotsBtn.addEventListener('mouseleave', () => handleShowDltBox(index));
});

dltBoxes.forEach((dltBox) => {
  dltBox.addEventListener('click', handleDltPopup);
});

exitPopup.addEventListener('click', handleHiddenPopup);
dltBtn.addEventListener('click', handleDeleteExam);

function handleShowDltBox(index) {
  dltBoxes[index].classList.toggle('hidden');
}

function handleDltPopup() {
  blurLayer.classList.add('blur');
  dltPopup.style.top = '200px';
}

function handleHiddenPopup() {
  blurLayer.classList.remove('blur');
  dltPopup.style.top = '';
}

// delete exam here in DB
function handleDeleteExam() {
  blurLayer.classList.remove('blur');
  dltPopup.style.top = '';
}
