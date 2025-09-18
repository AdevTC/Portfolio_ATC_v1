// js/ui/fab.js
document.addEventListener('DOMContentLoaded', function () {
    const fabCheckboxWrapperEl = document.querySelector('.fab-checkbox-wrapper');
    const fabCheckboxInputEl = document.getElementById('fabCheckboxToggle');
    const fabCheckboxButtonEl = document.querySelector('.fab-checkbox-toggle__button'); // Este es el <label>

    // Verificación de la existencia de los elementos para evitar errores si no están en todas las páginas.
    if (fabCheckboxInputEl && fabCheckboxWrapperEl && fabCheckboxButtonEl) {

        // Actualizar aria-expanded en el label/botón cuando cambia el estado del checkbox
        fabCheckboxInputEl.addEventListener('change', function() {
            fabCheckboxButtonEl.setAttribute('aria-expanded', this.checked.toString());
        });

        // Cerrar el FAB si se hace clic fuera de él (en el document)
        document.addEventListener('click', function(event) {
            // Si el checkbox está marcado (FAB está abierto)
            // Y el clic NO fue dentro del fab-checkbox-wrapper
            if (fabCheckboxInputEl.checked && !fabCheckboxWrapperEl.contains(event.target)) {
                fabCheckboxInputEl.checked = false; // Desmarcar el checkbox para cerrar el FAB

                // Disparar manualmente el evento change para que se actualice el aria-expanded
                // y para que cualquier otra lógica que dependa del 'change' del checkbox se ejecute.
                const changeEvent = new Event('change');
                fabCheckboxInputEl.dispatchEvent(changeEvent);
            }
        });

        // Evitar que un clic DENTRO del fab-checkbox-wrapper (pero no en el toggle principal)
        // cierre el FAB inmediatamente debido al listener del document.
        // Esto es útil si los items de acción son enlaces <a> que navegan.
        fabCheckboxWrapperEl.addEventListener('click', function(event) {
            // Si el clic fue en un item de acción Y el FAB está abierto,
            // podríamos querer cerrarlo después de la acción o navegación.
            // Por ahora, solo detenemos la propagación para evitar el cierre inmediato.
            if (event.target.closest('.fab-checkbox-action__item')) {
                // Si quieres que el FAB se cierre al hacer clic en una acción:
                if (fabCheckboxInputEl.checked) {
                     // Pequeño delay para permitir la acción del enlace antes de cerrar, si es navegación
                    setTimeout(() => {
                        fabCheckboxInputEl.checked = false;
                        const changeEvent = new Event('change');
                        fabCheckboxInputEl.dispatchEvent(changeEvent);
                    }, 100); // Ajusta el delay si es necesario
                }
            }
            event.stopPropagation(); // Detiene la propagación del clic al listener del document
        });

    } else {
        // Opcional: Muestra un mensaje en consola si faltan elementos del FAB.
        // Esto puede ser útil durante el desarrollo si olvidas incluir el HTML del FAB en alguna página.
        // console.warn("FAB Checkbox: Faltan elementos esenciales para inicializar el FAB. Revisa IDs y clases en HTML.");
    }
});