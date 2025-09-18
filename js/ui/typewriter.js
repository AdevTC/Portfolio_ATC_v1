// js/ui/typewriter.js
document.addEventListener('DOMContentLoaded', function () {
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
});