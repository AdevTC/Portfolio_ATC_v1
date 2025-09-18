// js/script_PRIMERO.js
document.addEventListener('DOMContentLoaded', function () {

    // --- OBTENER REFERENCIAS A ELEMENTOS COMUNES ---
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav'); // ID original de tu <nav class="main-nav">
    const bodyForScrollLock = document.body;

    // --- NUEVO: LÓGICA PARA EVITAR EL FLASH INICIAL DEL MENÚ HAMBURGUESA ---
    if (mainNav) {
        // Añadir la clase para habilitar la transición después de un breve instante.
        // Esto permite que el estado inicial (oculto, sin transición de transform) se renderice primero.
        setTimeout(() => {
            mainNav.classList.add('allow-transition'); // O la clase que hayas definido en tu CSS (ej. 'has-transition')
        }, 50); // Un pequeño delay, 50ms suele ser suficiente. Ajusta si es necesario.
    }
    // --- FIN NUEVA LÓGICA FLASH ---

    // --- NAVBAR Y MENÚ HAMBURGUESA (LÓGICA EXISTENTE) ---
    let menuCloseTimeoutId = null;
    const MENU_CLOSE_DELAY = 300;

    function openMenu() {
        // ... (tu función openMenu sin cambios)
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
            bodyForScrollLock.classList.add('nav-open-noscroll');
        }
    }

    function closeMenu() {
        // ... (tu función closeMenu sin cambios)
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
        // ... (tu función scheduleCloseMenu sin cambios)
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
        if (!('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
            navToggle.addEventListener('mouseenter', openMenu);
            navToggle.addEventListener('mouseleave', scheduleCloseMenu);
            mainNav.addEventListener('mouseenter', () => {
                if (mainNav.classList.contains('nav-open')) {
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
    }
    // --- FIN LÓGICA NAVBAR ---

    // ... (resto de tu código JS: ENLACE ACTIVO, SMOOTH SCROLL, FORMULARIOS, BOTÓN VOLVER ARRIBA, ANIMACIONES, AÑO FOOTER) ...
    // Pega aquí el resto de las funcionalidades que ya tenías y funcionaban.

    // --- LÓGICA PARA ENLACE ACTIVO EN NAVBAR (Original) ---
    const allNavLinks = document.querySelectorAll('.main-nav ul li a.main-nav__link');
    if (allNavLinks.length > 0) {
        let currentPath = window.location.pathname.split("/").pop();
        if (currentPath === "" || currentPath === "index.html") {
            currentPath = "index.html";
        }
        allNavLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref) {
                let linkPath = linkHref.split("/").pop();
                if (linkPath === "" || linkPath === "index.html") {
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

    // --- SMOOTH SCROLL PARA ENLACES DE ANCLAJE Y CERRAR MENÚ MÓVIL (Original, adaptado) ---
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith("#") && href !== "#") {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    if (mainNav && mainNav.classList.contains('nav-open')) {
                        closeMenu();
                    }
                    let navbarHeightOffset = navbar ? navbar.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navbarHeightOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            } else if (this.closest('.main-nav ul li') && mainNav && mainNav.classList.contains('nav-open')) {
                closeMenu();
            }
        });
    });

    // --- SIMULACIÓN DE ENVÍO DE FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    const formMessageDiv = document.getElementById('form-message');
    if (contactForm && formMessageDiv) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            formMessageDiv.className = 'form-message';
            formMessageDiv.textContent = 'Enviando mensaje...';
            formMessageDiv.style.display = 'block';
            const formData = new FormData(contactForm);
            const name = formData.get('userName');
            setTimeout(() => {
                formMessageDiv.textContent = `Gracias por tu mensaje, ${name}! Te contactaré pronto. (Esto es una simulación)`;
                formMessageDiv.classList.add('success');
                contactForm.reset();
            }, 1500);
        });
    }

    // --- MANEJO DEL FORMULARIO DE TESTIMONIO ---
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialFormMessageDiv = document.getElementById('testimonialFormMessage');
    if (testimonialForm && testimonialFormMessageDiv) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault();
            testimonialFormMessageDiv.className = 'form-message';
            testimonialFormMessageDiv.textContent = 'Enviando tu testimonio...';
            testimonialFormMessageDiv.style.display = 'block';
            const formData = new FormData(testimonialForm);
            const name = formData.get('testimonialName');
            setTimeout(() => {
                testimonialFormMessageDiv.textContent = `¡Gracias por tu testimonio, ${name}! Lo revisaré pronto.`;
                testimonialFormMessageDiv.classList.add('success');
                testimonialForm.reset();
            }, 1500);
        });
    }

    // --- BOTÓN "VOLVER ARRIBA" ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- ANIMACIONES AL CARGAR Y HACER SCROLL ---
    const loadAnimatedElements = document.querySelectorAll('.animate-on-load');
    loadAnimatedElements.forEach((el) => {
        let delay = 0;
        if (el.classList.contains('animate-delay-1')) delay = 150;
        else if (el.classList.contains('animate-delay-2')) delay = 300;
        else if (el.classList.contains('animate-delay-3')) delay = 450;
        setTimeout(() => { el.classList.add('is-visible'); }, delay);
    });

    const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');
    if (scrollAnimatedElements.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('is-visible');
                    observerInstance.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        scrollAnimatedElements.forEach(el => { observer.observe(el); });
    } else if (scrollAnimatedElements.length > 0) {
        scrollAnimatedElements.forEach(el => { el.classList.add('is-visible'); });
    }

    // --- ACTUALIZAR AÑO EN FOOTER ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // js/script_PRIMERO.js
    document.addEventListener('DOMContentLoaded', function () {
        // ... (TU CÓDIGO EXISTENTE PARA NAVBAR, SCROLLTOTOP, ANIMACIONES DE SCROLL, FORMULARIOS, AÑO FOOTER, etc., va ANTES de esto o DESPUÉS, pero no mezclado)

        // === LÓGICA OPCIONAL PARA EL FAB BASADO EN CHECKBOX ===
    const fabCheckboxWrapperEl = document.querySelector('.fab-checkbox-wrapper'); // El div que contiene todo
    const fabCheckboxInputEl = document.getElementById('fabCheckboxToggle'); // El input checkbox
    const fabCheckboxButtonEl = document.querySelector('.fab-checkbox-toggle__button'); // El label/botón principal

    // Depuración inicial
    if (!fabCheckboxWrapperEl) console.error("FAB Checkbox: Wrapper .fab-checkbox-wrapper no encontrado.");
    if (!fabCheckboxInputEl) console.error("FAB Checkbox: Input #fabCheckboxToggle no encontrado.");
    if (!fabCheckboxButtonEl) console.error("FAB Checkbox: Botón/Label .fab-checkbox-toggle__button no encontrado.");

    if (fabCheckboxInputEl && fabCheckboxWrapperEl && fabCheckboxButtonEl) {
        console.log("FAB Checkbox: Elementos encontrados, inicializando listeners opcionales.");

        // Actualizar aria-expanded en el label/botón cuando cambia el estado del checkbox
        fabCheckboxInputEl.addEventListener('change', function() {
            fabCheckboxButtonEl.setAttribute('aria-expanded', this.checked.toString());
            console.log("FAB Checkbox: Estado cambiado a:", this.checked);
        });

        // Cerrar el FAB si se hace clic fuera de él (en el document)
        document.addEventListener('click', function(event) {
            // Si el checkbox está marcado (FAB está abierto)
            // Y el clic NO fue dentro del fab-checkbox-wrapper
            if (fabCheckboxInputEl.checked && !fabCheckboxWrapperEl.contains(event.target)) {
                console.log("FAB Checkbox: Clic fuera, cerrando.");
                fabCheckboxInputEl.checked = false; // Desmarcar el checkbox para cerrar el FAB
                // Disparar manualmente el evento change para que se actualice el aria-expanded si es necesario
                // y para que cualquier otra lógica JS que dependa del 'change' del checkbox se ejecute.
                const changeEvent = new Event('change');
                fabCheckboxInputEl.dispatchEvent(changeEvent);
            }
        });

        // Evitar que un clic DENTRO del fab-checkbox-wrapper (pero no en el toggle) cierre el FAB
        // si el listener del document está activo.
        // Esto es importante si los items de acción son <a> que navegan,
        // no quieres que el FAB se cierre inmediatamente por el clic en el document.
        fabCheckboxWrapperEl.addEventListener('click', function(event) {
            event.stopPropagation(); // Detiene la propagación del clic al listener del document
        });

    } else {
        console.error("FAB Checkbox: Faltan elementos esenciales para inicializar el FAB. Revisa IDs y clases en HTML.");
    }
    // === FIN LÓGICA FAB CHECKBOX ===

        // ... (AQUÍ IRÍA EL RESTO DE TU CÓDIGO JS: Enlace Activo, Smooth Scroll, etc. que ya funcionaban)
        // Por ejemplo:
        // --- LÓGICA PARA ENLACE ACTIVO EN NAVBAR (Original) ---
        const navbar = document.getElementById('navbar'); // Necesario si el smooth scroll lo usa
        const mainNav = document.getElementById('mainNav'); // Necesario si el smooth scroll o la navbar lo usan
        const allNavLinks = document.querySelectorAll('.main-nav ul li a.main-nav__link');
        // ... (resto de la lógica de enlace activo) ...
        // ... (resto de la lógica de smooth scroll) ...
        // ... (resto de la lógica de formularios) ...
        // ... (resto de la lógica de scroll to top) ...
        // ... (resto de la lógica de animaciones al cargar y scroll) ...
        // ... (resto de la lógica de año en footer) ...

    }); // Fin del DOMContentLoaded


    // --- ANIMACIÓN DE MÁQUINA DE ESCRIBIR PARA HERO SUBTITLE (MODIFICADA) ---
    const heroSubtitleElement = document.getElementById('heroSubtitle');

    if (heroSubtitleElement) {
        const originalText = heroSubtitleElement.innerHTML;
        heroSubtitleElement.innerHTML = ''; // Limpiar para la animación

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        // No lo añadimos aún, solo al final de cada "escritura"

        let i = 0;
        // === AJUSTE DE VELOCIDAD ===
        const typingSpeed = 35; // Milisegundos por caracter (antes 70, ahora la mitad para doble velocidad)
        let tempText = "";
        let inTag = false;

        function typeWriter() {
            if (i < originalText.length) {
                heroSubtitleElement.appendChild(cursorSpan); // Añadir/Mover cursor al final del texto actual

                const char = originalText.charAt(i);

                if (char === '<') inTag = true;
                tempText += char;
                if (char === '>') inTag = false;

                if (!inTag || (inTag && originalText.substring(i + 1).includes('>'))) {
                    heroSubtitleElement.innerHTML = tempText; // Escribir texto
                    heroSubtitleElement.appendChild(cursorSpan); // Re-adjuntar cursor al final del nuevo texto
                }

                i++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                // === QUITAR CURSOR AL FINAL ===
                if (cursorSpan && cursorSpan.parentNode === heroSubtitleElement) {
                    heroSubtitleElement.removeChild(cursorSpan); // Quitar el cursor
                }
                // Opcional: asegurarse de que el texto final sea exactamente el original
                // (útil si el manejo de tags en el bucle no fue perfecto)
                // heroSubtitleElement.innerHTML = originalText; 
            }
        }

        let initialDelay = 0;
        if (heroSubtitleElement.classList.contains('animate-delay-1')) initialDelay = 150;
        else if (heroSubtitleElement.classList.contains('animate-delay-2')) initialDelay = 300;

        const heroSubtitleComputedStyle = window.getComputedStyle(heroSubtitleElement);
        const animationEntryDelay = parseFloat(heroSubtitleComputedStyle.transitionDelay) * 1000 || 0;

        setTimeout(() => {
            if (heroSubtitleElement) heroSubtitleElement.appendChild(cursorSpan); // Añadir cursor justo antes de empezar a escribir
            typeWriter();
        }, initialDelay + animationEntryDelay + 300);
    }
    // --- FIN ANIMACIÓN MÁQUINA DE ESCRIBIR ---

    // === NUEVO: EFECTO PARALLAX SUTIL PARA EL CONTENIDO DEL PAGE INTRO BANNER ===
    const pageIntroBanner = document.querySelector('.page-intro-banner');

    if (pageIntroBanner) {
        const pageIntroBannerContent = pageIntroBanner.querySelector('.page-intro-banner__content');
        
        if (pageIntroBannerContent) {
            window.addEventListener('scroll', function() {
                // Solo aplicar el efecto si el banner está (al menos parcialmente) en la vista
                const bannerRect = pageIntroBanner.getBoundingClientRect();
                
                // Si el banner ya pasó completamente por arriba, o aún no llega por abajo, no hacer nada
                if (bannerRect.bottom < 0 || bannerRect.top > window.innerHeight) {
                    // Opcional: resetear la posición si se quiere que vuelva al estado original cuando no está en vista
                    // pageIntroBannerContent.style.transform = 'translateY(0px)';
                    return;
                }

                let scrollPosition = window.scrollY;
                // Factor de parallax: cuánto más lento/rápido se mueve el contenido.
                // Un valor pequeño (ej. 0.2-0.5) hace que se mueva más lento que el scroll.
                // Para el efecto de que el contenido se "eleva" más lento que la forma,
                // necesitamos que se mueva hacia arriba (transform negativo) a medida que bajamos.
                let parallaxFactor = 0.2; 
                
                // Calcular el desplazamiento. Solo queremos que se mueva mientras el banner está entrando o saliendo de la vista.
                // El movimiento debe ser relativo al scroll DENTRO del área del banner.
                // `bannerRect.top` es la distancia del borde superior del banner al borde superior de la ventana.
                // Cuando `bannerRect.top` es 0, el banner está justo en el borde superior.
                // Queremos que el efecto sea más pronunciado cuando el banner está más visible.

                // Un cálculo más simple: moverlo una fracción del scroll total, pero solo si está visible.
                // Esto hará que el contenido se mueva hacia arriba a medida que haces scroll hacia abajo.
                let offsetY = scrollPosition * parallaxFactor;

                // Limitar el movimiento para que no se salga demasiado del banner
                const maxOffset = pageIntroBanner.offsetHeight * 0.1; // Que no se mueva más del 10% de la altura del banner
                if (offsetY > maxOffset) {
                    offsetY = maxOffset;
                }
                // Aplicamos un transform negativo para que suba al hacer scroll hacia abajo
                pageIntroBannerContent.style.transform = `translateY(-${offsetY}px)`;

                // Si hubieras elegido la Opción B (parallax de imagen de fondo):
                // pageIntroBanner.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.3}px)`;
            });
        }
    }
    // === FIN EFECTO PARALLAX ===

     // === NUEVO: LÓGICA PARA CAMBIO DE TEMA (MODO OSCURO/CLARO) ===
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('theme'); // Cargar tema guardado

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.setAttribute('aria-pressed', 'true');
            // Opcional: cambiar el icono si no lo haces solo con CSS
            // const moonIcon = themeToggleBtn.querySelector('.fa-moon');
            // const sunIcon = themeToggleBtn.querySelector('.fa-sun');
            // if (moonIcon) moonIcon.style.display = 'none';
            // if (sunIcon) sunIcon.style.display = 'block';
        } else {
            document.body.classList.remove('dark-theme');
            themeToggleBtn.setAttribute('aria-pressed', 'false');
            // const moonIcon = themeToggleBtn.querySelector('.fa-moon');
            // const sunIcon = themeToggleBtn.querySelector('.fa-sun');
            // if (moonIcon) moonIcon.style.display = 'block';
            // if (sunIcon) sunIcon.style.display = 'none';
        }
        localStorage.setItem('theme', theme); // Guardar preferencia
    }

    // Aplicar tema guardado o el preferido por el sistema al cargar
    if (currentTheme) {
        setTheme(currentTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Si el usuario prefiere el modo oscuro en su S.O. y no hay preferencia guardada
        setTheme('dark');
    } else {
        setTheme('light'); // Default a claro si no hay nada
    }


    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            let newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            setTheme(newTheme);
        });

        // Sincronizar con cambios de preferencia del sistema operativo
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? "dark" : "light";
            // Solo cambiar si el usuario no ha establecido una preferencia explícita
            if (!localStorage.getItem('theme-manual-override')) { // Necesitaríamos guardar esta bandera si el usuario hace clic
                 setTheme(newColorScheme);
            }
        });
    }
    // === FIN LÓGICA CAMBIO DE TEMA ===

    

}); // Fin del DOMContentLoaded