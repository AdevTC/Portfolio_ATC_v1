// js/forms/contactForm.js
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    // El div para mensajes podría tener un ID más específico si hay varios formularios en una página,
    // pero para la página de contacto, 'form-message' es probablemente único.
    const formMessageDiv = document.getElementById('form-message'); // Usado en contacto.html

    if (contactForm && formMessageDiv) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevenir el envío real del formulario

            // Mostrar mensaje de "Enviando..."
            formMessageDiv.className = 'form-message'; // Resetear clases (quita .success o .error)
            formMessageDiv.textContent = 'Enviando mensaje...';
            formMessageDiv.style.display = 'block'; // Asegurarse de que sea visible

            // Simular una demora de red
            setTimeout(() => {
                // Obtener datos del formulario (ejemplo: nombre del usuario)
                const formData = new FormData(contactForm);
                const name = formData.get('userName'); // Asume que el input del nombre tiene name="userName"

                // Mostrar mensaje de éxito (simulado)
                formMessageDiv.textContent = `Gracias por tu mensaje, ${name || 'visitante'}! Te contactaré pronto. (Esto es una simulación)`;
                formMessageDiv.classList.add('success'); // Añadir clase para estilos de éxito
                contactForm.reset(); // Limpiar el formulario
            }, 1500); // 1.5 segundos de simulación
        });
    }
});