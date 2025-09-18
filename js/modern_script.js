// js/modern_script.js
document.addEventListener('DOMContentLoaded', function() {

    // --- NAVBAR MODERNA (Menú Hamburguesa) ---
    const navToggle = document.getElementById('navToggle'); // ID del botón
    const mainNav = document.getElementById('mainNav');     // ID del <nav>
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('nav-open'); // Alterna la clase en el <nav>
            navToggle.classList.toggle('nav-open'); // Alterna la clase en el botón para la 'X'
            body.classList.toggle('nav-open-noscroll'); // Evita scroll del body cuando el menú está abierto

            // Actualizar aria-expanded
            const isExpanded = mainNav.classList.contains('nav-open');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Cerrar menú si se hace clic en un enlace (para SPAs o anclajes)
        mainNav.querySelectorAll('.main-nav-modern__link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-open')) {
                    mainNav.classList.remove('nav-open');
                    navToggle.classList.remove('nav-open');
                    body.classList.remove('nav-open-noscroll');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --- BOTÓN "VOLVER ARRIBA" ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) { // Mostrar después de 400px de scroll
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- ANIMACIONES AL CARGAR Y HACER SCROLL ---
    // Animación al cargar la página para elementos .animate-on-load
    const loadAnimatedElements = document.querySelectorAll('.animate-on-load');
    loadAnimatedElements.forEach((el, index) => {
        // Un pequeño delay escalonado para los elementos iniciales
        const delay = el.classList.contains('animate-delay-1') ? 150 :
                      el.classList.contains('animate-delay-2') ? 300 :
                      el.classList.contains('animate-delay-3') ? 450 : 0;
        
        setTimeout(() => {
            el.classList.add('is-visible');
        }, delay);
    });

    // Animación al hacer scroll para elementos .animate-on-scroll
    const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');
    if (scrollAnimatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Aplicar delay si existe
                    const delayClass = Array.from(el.classList).find(cls => cls.startsWith('animate-delay-'));
                    const delay = delayClass ? parseInt(delayClass.split('-')[2]) * 100 : 0; // Asume delay-1 = 100ms, delay-2 = 200ms, etc.
                                                                                          // O usa los valores de antes si eran mejores.
                                                                                          // Los delays de CSS son más simples para esto.
                    // el.style.transitionDelay = `${delay}ms`; // Se puede manejar mejor con clases de delay en CSS.
                    el.classList.add('is-visible');
                    observerInstance.unobserve(el); // Animar solo una vez
                }
            });
        }, { threshold: 0.1 }); // Animar cuando el 10% del elemento es visible

        scrollAnimatedElements.forEach(el => {
            observer.observe(el);
        });
    } else if (scrollAnimatedElements.length > 0) { // Fallback
        scrollAnimatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
    
    // --- SMOOTH SCROLL PARA ENLACES DE ANCLAJE (si los usas, como el .hero__scroll-indicator) ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith("#")) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    
                    let navbarHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Cerrar menú móvil si está abierto y se hace clic en un anclaje
                    if (mainNav && mainNav.classList.contains('nav-open')) {
                        mainNav.classList.remove('nav-open');
                        navToggle.classList.remove('nav-open');
                        body.classList.remove('nav-open-noscroll');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });
    
    // --- ACTUALIZAR AÑO EN FOOTER (se mantiene igual) ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // Fin DOMContentLoaded