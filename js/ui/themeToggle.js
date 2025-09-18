// js/ui/themeToggle.js
document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Función para aplicar el tema y guardar la preferencia
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('aria-pressed', 'true');
                themeToggleBtn.setAttribute('title', 'Cambiar a tema claro');
            }
        } else {
            document.body.classList.remove('dark-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('aria-pressed', 'false');
                themeToggleBtn.setAttribute('title', 'Cambiar a tema oscuro');
            }
        }
        // Guardar la preferencia del usuario en localStorage
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn("LocalStorage no está disponible. No se guardará la preferencia de tema.");
        }
    }

    // Función para inicializar el tema
    function initializeTheme() {
        let currentTheme = 'light'; // Default
        try {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                currentTheme = storedTheme;
            } else if (prefersDarkScheme.matches) {
                currentTheme = 'dark';
            }
        } catch (e) {
            // Si localStorage no está disponible, usar preferencia del sistema si es posible
            if (prefersDarkScheme.matches) {
                currentTheme = 'dark';
            }
            console.warn("LocalStorage no está disponible. Se usará el tema por defecto o del sistema.");
        }
        setTheme(currentTheme);
    }

    // Inicializar el tema al cargar la página
    initializeTheme();

    // Event listener para el botón de cambio de tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            let newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            setTheme(newTheme);
            // Opcional: Guardar una bandera que indique que el usuario hizo una selección manual
            try {
                localStorage.setItem('theme-manual-override', 'true');
            } catch (e) { /* No hacer nada si localStorage falla */ }
        });
    }

    // Event listener para cambios en la preferencia del sistema operativo
    // Esto es útil si el usuario cambia la configuración de su S.O. mientras la página está abierta.
    prefersDarkScheme.addEventListener('change', (event) => {
        let manualOverride = false;
        try {
            manualOverride = localStorage.getItem('theme-manual-override') === 'true';
        } catch (e) { /* No hacer nada */ }

        // Solo cambiar si el usuario NO ha establecido una preferencia explícita previamente.
        if (!manualOverride) {
            const newColorScheme = event.matches ? "dark" : "light";
            setTheme(newColorScheme);
        }
    });
});