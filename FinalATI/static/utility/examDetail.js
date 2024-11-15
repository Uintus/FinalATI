document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.querySelector('.upload__box');
    const fileInput = document.getElementById('fileInput');

    uploadBox.addEventListener('click', () => {
        fileInput.click();
    });

    uploadBox.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadBox.classList.add('dragover');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });

    uploadBox.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadBox.classList.remove('dragover');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            console.log('File:', files[i].name);
            // Bạn có thể thêm mã xử lý tệp ở đây, ví dụ: tải lên tệp, hiển thị tệp, v.v.
        }
    }
});