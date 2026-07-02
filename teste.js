/**
 * Loop 26 - Motor Interativo Parallax: Layout por CSS e Efeitos por JS
 */

document.addEventListener('DOMContentLoaded', () => {
    const planetImage = document.querySelector('.planet-image');
    const intelligenceSection = document.querySelector('.intelligence');

    if (!planetImage) return;

    const terraSrc = "ChatGPT_Image_2_de_jul._de_2026__14_03_58-removebg-preview.png";
    const bitcoinSrc = "bit.png"; 

    // Pré-carregamento da imagem
    const imgCache = new Image();
    imgCache.src = bitcoinSrc;

    const isMobile = window.innerWidth <= 768;
    let ticking = false;
    let atualIsBitcoin = false;
    let emTransicao = false; 

    function updateParallax() {
        const scrolled = window.scrollY;

        // 1. ANIMAÇÃO DO SCROLL (Apenas mover e girar)
        const translateY = scrolled * (isMobile ? 0.2 : 0.45); 
        const rotateDeg = scrolled * (isMobile ? 0.05 : 0.08); 
        const rotateX = isMobile ? 0 : Math.min(scrolled * 0.03, 15); 
        let baseScale = isMobile ? 1 : (1 + (scrolled * 0.0003));
        
        // O transform agora aplica apenas os efeitos físicos, o alinhamento está fixo via CSS margin
        planetImage.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) rotate(${rotateDeg}deg) scale(${baseScale})`;

        // 2. DETECÇÃO DA SEÇÃO INTELLIGENCE E TROCA DE FOTO
        if (intelligenceSection) {
            const intelligenceTop = intelligenceSection.getBoundingClientRect().top;

            if (intelligenceTop <= window.innerHeight * 0.5) {
                
                // Transição para o Bitcoin
                if (!atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    planetImage.style.transition = 'filter 0.1s ease-out';
                    planetImage.style.filter = 'brightness(4) blur(3px) drop-shadow(0 0 30px #fff)'; 

                    setTimeout(() => {
                        planetImage.src = bitcoinSrc;
                        planetImage.alt = "Bitcoin";
                        atualIsBitcoin = true;

                        planetImage.style.filter = isMobile 
                            ? 'brightness(1.2) drop-shadow(0 0 20px rgba(247, 147, 26, 0.8))' 
                            : 'brightness(1.5) blur(0px) drop-shadow(0 0 40px rgba(247, 147, 26, 0.9))';
                        
                        setTimeout(() => {
                            planetImage.style.transition = 'none';
                            emTransicao = false;
                        }, 100);
                    }, 100);
                }

                if (atualIsBitcoin && !emTransicao) {
                    const brightness = 1 + (scrolled * 0.0008);
                    const glowRadius = isMobile ? 20 : Math.min(scrolled * 0.08, 40);
                    planetImage.style.filter = `brightness(${brightness}) drop-shadow(0 0 ${glowRadius}px rgba(247, 147, 26, 0.85))`;
                }

            } else {
                // Transição de volta para a Terra
                if (atualIsBitcoin && !emTransicao) {
                    emTransicao = true;
                    planetImage.style.transition = 'filter 0.1s ease-out';
                    planetImage.style.filter = 'brightness(4) blur(3px) drop-shadow(0 0 30px #fff)';

                    setTimeout(() => {
                        planetImage.src = terraSrc;
                        planetImage.alt = "Planeta Terra";
                        atualIsBitcoin = false;

                        planetImage.style.filter = isMobile 
                            ? 'brightness(1.1) drop-shadow(0 0 20px rgba(0, 149, 255, 0.7))' 
                            : 'brightness(1.2) blur(0px) drop-shadow(0 0 40px rgba(0, 149, 255, 0.7))';
                        
                        setTimeout(() => {
                            planetImage.style.transition = 'none';
                            emTransicao = false;
                        }, 100);
                    }, 100);
                }

                if (!atualIsBitcoin && !emTransicao) {
                    const brightness = 1 + (scrolled * 0.0008);
                    const hueRotate = scrolled * 0.05;
                    const glowRadius = isMobile ? 20 : Math.min(scrolled * 0.08, 40);
                    planetImage.style.filter = `brightness(${brightness}) hue-rotate(${hueRotate}deg) drop-shadow(0 0 ${glowRadius}px rgba(0, 149, 255, 0.65))`;
                }
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('load', updateParallax);
});