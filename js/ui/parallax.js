// js/ui/parallax.js
document.addEventListener('DOMContentLoaded', function () {
    // === NUEVO: EFECTO PARALLAX PARA EL VIDEO DE FONDO DEL PAGE INTRO BANNER ===
    const pageIntroBanners = document.querySelectorAll('.page-intro-banner'); // Seleccionar todos por si hay varios (aunque aquí es uno por página)

    if (pageIntroBanners.length > 0) {
        window.addEventListener('scroll', function() {
            pageIntroBanners.forEach(banner => {
                const videoBg = banner.querySelector('.page-intro-banner__video-bg');
                // También podríamos mover el .page-intro-banner__video-container si el video es 100% de su contenedor
                
                if (videoBg) {
                    const bannerRect = banner.getBoundingClientRect();
                    
                    // Aplicar parallax solo si el banner está (al menos parcialmente) en la vista
                    if (bannerRect.bottom >= 0 && bannerRect.top <= window.innerHeight) {
                        // scrollY es cuánto ha scrolleado la página desde arriba
                        // bannerRect.top es la distancia del banner al top del viewport
                        // Queremos que el video se mueva "hacia arriba" más lento que el scroll del banner
                        
                        // Cuando el banner entra desde abajo, bannerRect.top disminuye.
                        // Cuando el banner sale por arriba, bannerRect.top se vuelve negativo.
                        
                        // Mover el video hacia arriba a una fracción de la velocidad a la que el banner sube por la pantalla.
                        // Un factor de 0.5 significa que el video se mueve a la mitad de la velocidad del scroll.
                        // Si el factor es positivo, el video se moverá hacia abajo (efecto de que se queda atrás).
                        // Si el factor es negativo, el video se moverá hacia arriba (efecto de que se adelanta o se mueve con la página pero más lento).
                        
                        // Para que el video parezca "más lento" al subir (o quedarse fijo),
                        // su `translateY` debe aumentar a medida que `bannerRect.top` disminuye (se vuelve más negativo).
                        
                        // El cálculo simple es:
                        let parallaxFactor = 0.3; // Entre 0.1 (muy sutil) y 0.5 (más notable)
                        let offsetY = bannerRect.top * parallaxFactor; 
                        // bannerRect.top es 0 cuando el tope del banner está en el tope de la ventana.
                        // Si es positivo, el banner está más abajo. Si es negativo, ya pasó.

                        // Queremos que el video se desplace MENOS que el banner.
                        // Si el banner se ha movido X píxeles hacia arriba, el video solo Y píxeles.
                        // El efecto de 'background-attachment: fixed' es que el fondo no se mueve en absoluto
                        // con respecto al viewport.
                        // Para simular eso, el video debería moverse en dirección opuesta al scroll del contenedor
                        // para mantenerse "fijo" respecto al viewport.

                        // Esta es la fórmula clásica para parallax donde el fondo se mueve más lento:
                        // El desplazamiento del video será una fracción del desplazamiento de la ventana.
                        // Pero como el video está dentro de un contenedor que ya se mueve,
                        // lo que se hace es mover el video DENTRO de su contenedor en dirección opuesta
                        // a una fracción del scroll.

                        // Vamos a intentar un enfoque más directo para el video:
                        // Ajustar la posición del video para que parezca fijo o más lento.
                        // Cuando el scrollY es 0, el video está centrado.
                        // A medida que scrollY aumenta, movemos el video hacia arriba a menor velocidad.
                        let videoOffsetY = window.scrollY * 0.5; // El video se mueve hacia arriba a la mitad de la velocidad del scroll de la página
                                                              // Esto hace que parezca que el contenido se desliza sobre él.
                        
                        // Aplicamos el transform al video directamente, además de su centrado inicial
                        videoBg.style.transform = `translate(-50%, calc(-50% + ${videoOffsetY}px))`;
                        
                        // Si el efecto deseado es que el video se mueva más lento QUE SU CONTENEDOR,
                        // el `offsetY` se calcularía en base a la posición del contenedor.
                        // Por ahora, `window.scrollY * 0.5` dará un efecto de pseudo-fijo.

                    }
                }
            });
        });
    }
});