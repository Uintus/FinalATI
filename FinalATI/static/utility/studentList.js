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
