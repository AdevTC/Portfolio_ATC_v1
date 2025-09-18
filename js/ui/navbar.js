// js/ui/navbar.js
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar'); // Usado también por smoothScroll
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav'); // ID original de tu <nav class="main-nav">
    const bodyForScrollLock = document.body;

    // --- LÓGICA PARA EVITAR EL FLASH INICIAL DEL MENÚ HAMBURGUESA ---
    if (mainNav) {
        // Añadir la clase para habilitar la transición después de un breve instante.
        setTimeout(() => {
            mainNav.classList.add('allow-transition');
        }, 50); // Pequeño delay, 50ms suele ser suficiente.
    }

    // --- NAVBAR Y MENÚ HAMBURGUESA ---
    let menuCloseTimeoutId = null;
    const MENU_CLOSE_DELAY = 300; // ms, tiempo para que el cursor salga antes de cerrar

    function openMenu() {
        if (menuCloseTimeoutId) {
            clearTimeout(menuCloseTimeoutId);
            menuCloseTimeoutId = null;
        }
        if (mainNav && !mainNav.classList.contains('nav-open')) {
            mainNav.classList.add('nav-open');
            if (navToggle) {
                navToggle.classList.add('nav-open');
                navToggle.setAttribute('aria-expanded', 'true');
            }
            bodyForScrollLock.classList.add('nav-open-noscroll'); // Evita scroll del body
        }
    }

    function closeMenu() {
        if (mainNav && mainNav.classList.contains('nav-open')) {
            mainNav.classList.remove('nav-open');
            if (navToggle) {
                navToggle.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            bodyForScrollLock.classList.remove('nav-open-noscroll');
        }
    }

    function scheduleCloseMenu() {
        if (menuCloseTimeoutId) clearTimeout(menuCloseTimeoutId);
        menuCloseTimeoutId = setTimeout(closeMenu, MENU_CLOSE_DELAY);
    }

    if (navToggle && mainNav) {
        // Click en el botón hamburguesa
        navToggle.addEventListener('click', function () {
            if (mainNav.classList.contains('nav-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Comportamiento de Hover (para PC)
        // Detectar si es un dispositivo táctil para deshabilitar hover en menú
        const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

        if (!isTouchDevice) {
            navToggle.addEventListener('mouseenter', openMenu);
            navToggle.addEventListener('mouseleave', scheduleCloseMenu);

            mainNav.addEventListener('mouseenter', () => {
                if (mainNav.classList.contains('nav-open')) { // Solo si el menú ya está abierto por el toggle
                    if (menuCloseTimeoutId) {
                        clearTimeout(menuCloseTimeoutId);
                        menuCloseTimeoutId = null;
                    }
                }
            });
            mainNav.addEventListener('mouseleave', () => {
                if (mainNav.classList.contains('nav-open')) {
                    scheduleCloseMenu();
                }
            });
        }

        // Cerrar menú si se hace clic en un enlace del menú (para anclajes o navegación normal en móvil)
        const allNavLinksMobile = mainNav.querySelectorAll('ul li a');
        allNavLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav-open')) {
                    closeMenu();
                }
            });
        });
    }


    // --- LÓGICA PARA ENLACE ACTIVO EN NAVBAR ---
    const allNavLinks = document.querySelectorAll('.main-nav ul li a.main-nav__link'); // Asegúrate que esta clase exista en tus <a>
    if (allNavLinks.length > 0) {
        let currentPath = window.location.pathname.split("/").pop();
        if (currentPath === "" || currentPath.toLowerCase() === "index.html") { // Normalizar a index.html
            currentPath = "index.html";
        }

        allNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref) {
                let linkPath = linkHref.split("/").pop();
                if (linkPath === "" || linkPath.toLowerCase() === "index.html") { // Normalizar a index.html
                    linkPath = "index.html";
                }

                if (linkPath === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
});