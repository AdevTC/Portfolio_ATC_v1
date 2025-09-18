// js/utils/footerUtils.js
document.addEventListener('DOMContentLoaded', function () {
    const currentYearSpan = document.getElementById('currentYear');

    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear.toString();
    }
});