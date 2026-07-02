/**
 * Loop 26 - Motor Interativo Parallax do Planeta Terra
 */

document.addEventListener('DOMContentLoaded', () => {
    const planetImage = document.querySelector('.planet-image');

    if (planetImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            // 1. Cálculos para animação fluida (Scroll Parallax + Rotação de Eixo)
            const translateY = scrolled * 0.25;      // Faz o planeta descer mais devagar
            const rotateDeg = scrolled * 0.05;       // Faz o planeta girar sutilmente
            const scale = 1 + (scrolled * 0.0001);   // Zoom quase imperceptível tridimensional

            // Injeta as coordenadas em tempo real no elemento CSS
            planetImage.style.transform = `translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`;

            // 2. Opacidade inteligente (Evita que o planeta choque com as seções de leitura no meio da página)
            const fadeThreshold = 1400;
            const currentOpacity = Math.max(0.12, 1 - (scrolled / fadeThreshold));
            
            planetImage.style.opacity = currentOpacity;
        });
    }
});