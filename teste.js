/**
 * Loop 26 - Motor Interativo Parallax do Planeta Terra
 */

document.addEventListener('DOMContentLoaded', () => {
    const planetImage = document.querySelector('.planet-image');
    const portfolioSection = document.querySelector('.portfolio');

    if (planetImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;

            // 1. Cálculos para animação fluida (Scroll Parallax + Rotação de Eixo)
            const translateY = scrolled * 0.25;      // Faz o planeta descer mais devagar
            const rotateDeg = scrolled * 0.05;       // Faz o planeta girar sutilmente
            const scale = 1 + (scrolled * 0.0001);   // Zoom quase imperceptível tridimensional

            // Injeta as coordenadas em tempo real no elemento CSS
            planetImage.style.transform = `translateY(${translateY}px) rotate(${rotateDeg}deg) scale(${scale})`;

            // 2. Opacidade inteligente dinâmica vinculada ao Portfólio
            if (portfolioSection) {
                // Obtém a distância do topo do portfólio em relação à janela de visualização (viewport)
                const portfolioTop = portfolioSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (portfolioTop > 0) {
                    // Calcula a opacidade proporcional à aproximação do Portfólio.
                    // No topo da página, portfolioTop é grande, logo a opacidade fica em 1 (força total).
                    let currentOpacity = portfolioTop / windowHeight;

                    // Garante os limites de segurança da opacidade entre 0 e 1
                    if (currentOpacity > 1) currentOpacity = 1;
                    if (currentOpacity < 0) currentOpacity = 0;

                    planetImage.style.opacity = currentOpacity;
                } else {
                    // Garante que se o portfólio já passou ou chegou ao topo da tela, a lua fica 100% invisível
                    planetImage.style.opacity = 0;
                }
            } else {
                // Fallback de segurança: Caso a tag .portfolio não seja encontrada por algum motivo,
                // o sistema usa o cálculo de segurança baseado na rolagem da página.
                const fadeThreshold = 1000;
                planetImage.style.opacity = Math.max(0, 1 - (scrolled / fadeThreshold));
            }
        });
    }
});