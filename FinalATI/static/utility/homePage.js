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
