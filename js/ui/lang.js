// js/ui/languageFab.js (o js/ui/lang.js adaptado)
document.addEventListener('DOMContentLoaded', function() {
    const languageFabWrapper = document.querySelector('.language-fab-wrapper');
    const languageFabToggleInput = document.getElementById('languageFabToggle');
    const languageFabToggleButton = document.querySelector('.language-fab-toggle__button');
    const languageFabActionsContainer = document.querySelector('.language-fab-actions');

    if (!languageFabWrapper || !languageFabToggleInput || !languageFabToggleButton || !languageFabActionsContainer) {
        console.warn("Language FAB: Faltan elementos esenciales. Revisa IDs y clases en el HTML.");
        return;
    }

    function closeLanguageFab() {
        if (languageFabToggleInput.checked) {
            languageFabToggleInput.checked = false;
            const event = new Event('change', { bubbles: true });
            languageFabToggleInput.dispatchEvent(event);
        }
    }

    languageFabToggleInput.addEventListener('change', function() {
        languageFabToggleButton.setAttribute('aria-expanded', this.checked.toString());
    });

    document.addEventListener('click', function(event) {
        if (languageFabToggleInput.checked && !languageFabWrapper.contains(event.target)) {
            closeLanguageFab();
        }
    });

    languageFabActionsContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    languageFabToggleButton.addEventListener('click', function(event){
        event.stopPropagation();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && languageFabToggleInput.checked) {
            closeLanguageFab();
        }
    });

    // --- LÓGICA MEJORADA PARA IDIOMA ACTUAL Y CLASE ACTIVA ---
    const languageFabActionLinks = document.querySelectorAll('.language-fab-action__item');
    const currentPathname = window.location.pathname; // Ejemplo: /es/index.html o /en/sobre.html

    // Función para extraer el código de idioma de la URL actual
    function getCurrentLanguageFromPath(pathname) {
        const segments = pathname.split('/').filter(segment => segment.length > 0);
        // El primer segmento debería ser el código de idioma (es, en, fr, de, it, pt)
        if (segments.length > 0) {
            const langCode = segments[0];
            const knownLangs = ['es', 'en', 'fr', 'de', 'it', 'pt'];
            if (knownLangs.includes(langCode)) {
                return langCode;
            }
        }
        return 'es'; // Idioma por defecto si no se puede determinar (aunque no debería pasar con la nueva estructura)
    }

    const currentLang = getCurrentLanguageFromPath(currentPathname);
    if (document.documentElement.lang !== currentLang) {
        document.documentElement.lang = currentLang;
    }
    console.log("Idioma actual detectado:", currentLang); // Para depuración

    // Guardar preferencia de idioma en localStorage al hacer clic en un enlace de idioma
    languageFabActionLinks.forEach(link => {
        link.addEventListener('click', function() {
            const href = this.getAttribute('href');
            let targetLang = currentLang; // Por si el href es relativo como "index.html"

            // Extraer el código de idioma del href del enlace
            // Los href ahora serán como "../en/index.html" o "index.html" (si es el mismo idioma)
            if (href) {
                const pathParts = href.split('/').filter(part => part.length > 0 && part !== '..');
                // Si el primer segmento después de ".." (si existe) es un código de idioma
                if (pathParts.length > 0 && ['es', 'en', 'fr', 'de', 'it', 'pt'].includes(pathParts[0])) {
                    targetLang = pathParts[0];
                } else if (!href.includes('..')) {
                    // Si es un enlace relativo sin ".." (ej. "index.html", "sobre.html")
                    // significa que es para el idioma actual.
                    targetLang = currentLang;
                }
                // Podrías necesitar ajustar esta lógica si la estructura de href es más compleja.
            }
            
            console.log("Cambiando a idioma (desde href):", targetLang); // Para depuración
            if (targetLang) {
                localStorage.setItem('preferredLanguage', targetLang);
            }
        });
    });

    // Resaltar la bandera activa al cargar la página
    languageFabActionLinks.forEach(link => {
        const linkHref = link.getAttribute('href'); // ej: "index.html", "../en/index.html"
        let linkRepresentsLang = '';

        // Determinar a qué idioma representa este botón basado en su href
        if (linkHref.startsWith('../')) { // Enlace a otra carpeta de idioma
            const segments = linkHref.split('/'); // ["..", "en", "index.html"]
            if (segments.length >= 2) {
                linkRepresentsLang = segments[1]; // "en"
            }
        } else if (!linkHref.includes('/')) { // Enlace dentro de la misma carpeta de idioma, ej: "index.html", "sobre.html"
            linkRepresentsLang = currentLang;
        }
        // Puede que necesites un data-attribute si esta lógica se complica mucho
        // Ejemplo: <a href="index.html" data-lang-target="es" ...> para el botón de español en /es/
        // O más simple, si cada botón siempre tiene un data-lang como antes:
        // const buttonLang = link.querySelector('img')?.alt.toLowerCase().substring(0,2) || link.title.toLowerCase().substring(0,2);
        // Pero vamos a intentar con el href, asumiendo que los botones tienen una estructura predecible.

        // Alternativa más simple: usar el title o el alt de la imagen como indicador del idioma del botón
        let buttonLangId = '';
        const imgAlt = link.querySelector('img')?.getAttribute('alt');
        const linkTitle = link.getAttribute('title');

        if (imgAlt) {
            if (imgAlt.toLowerCase().includes('español')) buttonLangId = 'es';
            else if (imgAlt.toLowerCase().includes('english')) buttonLangId = 'en';
            else if (imgAlt.toLowerCase().includes('français')) buttonLangId = 'fr';
            else if (imgAlt.toLowerCase().includes('deutsch')) buttonLangId = 'de';
            else if (imgAlt.toLowerCase().includes('italiano')) buttonLangId = 'it';
            else if (imgAlt.toLowerCase().includes('português')) buttonLangId = 'pt';
        } else if (linkTitle) { // Fallback al title del <a>
             if (linkTitle.toLowerCase().includes('español')) buttonLangId = 'es';
            else if (linkTitle.toLowerCase().includes('english')) buttonLangId = 'en';
            else if (linkTitle.toLowerCase().includes('français')) buttonLangId = 'fr';
            else if (linkTitle.toLowerCase().includes('deutsch')) buttonLangId = 'de';
            else if (linkTitle.toLowerCase().includes('italiano')) buttonLangId = 'it';
            else if (linkTitle.toLowerCase().includes('português')) buttonLangId = 'pt';
        }


        if (buttonLangId === currentLang) {
            link.classList.add('active-lang-flag');
            console.log("Bandera activa aplicada a:", buttonLangId, "con href:", linkHref); // Para depuración
        } else {
            link.classList.remove('active-lang-flag');
        }
    });
    console.log("Fin de la lógica de resaltado de bandera."); // Para depuración

});