// js/ui/animations.js
document.addEventListener('DOMContentLoaded', function () {

    // --- ANIMACIONES AL CARGAR LA PÁGINA ---
    const loadAnimatedElements = document.querySelectorAll('.animate-on-load');

    loadAnimatedElements.forEach((el) => {
        // Determinar el delay basado en clases CSS.
        // Esto es más flexible que usar el índice, ya que puedes controlar el delay desde el HTML.
        let delay = 0;
        if (el.classList.contains('animate-delay-1')) {
            delay = 150; // ms
        } else if (el.classList.contains('animate-delay-2')) {
            delay = 300; // ms
        } else if (el.classList.contains('animate-delay-3')) {
            delay = 450; // ms
        }
        // Puedes añadir más clases de delay (animate-delay-4, etc.) si es necesario.

        setTimeout(() => {
            el.classList.add('is-visible');
        }, delay);
    });

    // --- ANIMACIONES AL HACER SCROLL (CON INTERSECTION OBSERVER) ---
    const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');

    if (scrollAnimatedElements.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // Relativo al viewport
            rootMargin: '0px',
            threshold: 0.1 // Animar cuando al menos el 10% del elemento esté visible
        };

        const animationObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // No es necesario aplicar delays aquí si ya están definidos en las clases .animate-delay-X
                    // y la transición CSS ya los considera. Si el delay es solo para la entrada inicial
                    // al cargar, entonces la lógica anterior para .animate-on-load es suficiente.
                    // Si quieres delays específicos para la animación por scroll, puedes leerlos de data-attributes.
                    // Ejemplo: const scrollDelay = parseInt(el.dataset.scrollDelay) || 0;
                    // setTimeout(() => { el.classList.add('is-visible'); }, scrollDelay);
                    
                    el.classList.add('is-visible');
                    observerInstance.unobserve(el); // Animar solo una vez
                }
            });
        }, observerOptions);

        scrollAnimatedElements.forEach(el => {
            animationObserver.observe(el);
        });

    } else if (scrollAnimatedElements.length > 0) {
        // Fallback para navegadores antiguos sin IntersectionObserver: mostrar todos los elementos.
        // Opcionalmente, podrías implementar una lógica de scroll más simple aquí,
        // pero suele ser mejor solo mostrarlos para evitar complejidad o problemas de rendimiento.
        scrollAnimatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
        console.warn("IntersectionObserver no soportado. Las animaciones de scroll se mostrarán directamente.");
    }
});