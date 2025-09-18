// js/forms/testimonialForm.js
document.addEventListener('DOMContentLoaded', function () {
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialFormMessageDiv = document.getElementById('testimonialFormMessage'); // Usado en testimonios.html

    if (testimonialForm && testimonialFormMessageDiv) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir el envío real del formulario

            // Mostrar mensaje de "Enviando..."
            testimonialFormMessageDiv.className = 'form-message'; // Resetear clases
            testimonialFormMessageDiv.textContent = 'Enviando tu testimonio...';
            testimonialFormMessageDiv.style.display = 'block'; // Asegurarse de que sea visible

            // Simular una demora de red
            setTimeout(() => {
                // Obtener datos del formulario (ejemplo: nombre del testimoniante)
                const formData = new FormData(testimonialForm);
                const name = formData.get('testimonialName'); // Asume que el input del nombre tiene name="testimonialName"

                // Mostrar mensaje de éxito (simulado)
                testimonialFormMessageDiv.textContent = `¡Gracias por tu testimonio, ${name || 'amigo/a'}! Lo revisaré pronto.`;
                testimonialFormMessageDiv.classList.add('success'); // Añadir clase para estilos de éxito
                testimonialForm.reset(); // Limpiar el formulario
            }, 1500); // 1.5 segundos de simulación
        });
    }
});