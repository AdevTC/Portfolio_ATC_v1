// js/utils/smoothScroll.js
document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.getElementById('navbar'); // Necesario para el cálculo del offset

    // La función closeMenu ya no está aquí, pero si un enlace de anclaje
    // está en el menú desplegable, el script navbar.js debería manejar el cierre del menú.

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Asegurarse de que es un anclaje válido y no solo "#"
            if (href && href.length > 1 && href.startsWith("#")) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault(); // Prevenir el comportamiento de salto por defecto

                    // Calcular la altura de la navbar para el offset
                    // Es importante que la navbar ya esté definida en el DOM y tenga su altura calculada.
                    let navbarHeightOffset = 0;
                    if (navbar) {
                        // Considerar si la navbar podría cambiar de altura (ej. en scroll o diferentes vistas)
                        // En ese caso, obtener la altura actual en el momento del clic es mejor.
                        navbarHeightOffset = navbar.offsetHeight;
                    }

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeightOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Opcional: Si el enlace de anclaje está dentro del menú desplegable,
                    // el script de navbar.js (mainNav.querySelectorAll('ul li a').forEach...)
                    // ya debería encargarse de cerrar el menú.
                    // Si no, y necesitas cerrar el menú desde aquí, tendrías que
                    // referenciar mainNav y navToggle y llamar a una función closeMenu,
                    // lo que podría complicar la modularidad. Es mejor que navbar.js lo maneje.
                }
            }
            // No se necesita el 'else if' para cerrar el menú aquí,
            // ya que navbar.js se encarga de cerrar el menú al hacer clic en cualquier enlace del nav.
        });
    });
});