// js/ui/scrollToTop.js
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Mostrar el botón cuando el usuario ha hecho scroll hacia abajo
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) { // Mostrar después de 400px de scroll
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Hacer scroll suave hacia arriba cuando se hace clic en el botón
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});