/**
 * ============================================================================
 * TEAM CAROUSEL - Provivir Panama
 * Carrusel para mostrar el equipo de asesoras
 * ============================================================================
 */

(function() {
    'use strict';

    window.initTeamCarousel = function() {
        const carousel = document.querySelector('.team__carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.team__carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.team-card'));
        const prevButton = carousel.querySelector('.team__carousel-btn--prev');
        const nextButton = carousel.querySelector('.team__carousel-btn--next');
        const dotsContainer = carousel.querySelector('.team__carousel-dots');

        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 segundos

        /**
         * Determinar cuántas tarjetas mostrar según el ancho de pantalla
         */
        function getSlidesPerView() {
            const width = window.innerWidth;
            if (width >= 1024) return 3; // Desktop: 3 tarjetas
            if (width >= 768) return 2;  // Tablet: 2 tarjetas
            return 1; // Mobile: 1 tarjeta
        }

        /**
         * Crear indicadores (dots)
         */
        function createDots() {
            if (!dotsContainer) return;
            
            const totalDots = Math.ceil(slides.length / slidesPerView);
            dotsContainer.innerHTML = '';

            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('team__carousel-dot');
                dot.setAttribute('aria-label', `Ir a grupo ${i + 1}`);
                
                if (i === 0) {
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        /**
         * Actualizar posición del carrusel
         */
        function updateCarousel() {
            const slideWidth = slides[0].offsetWidth;
            const gap = 24; // Gap entre tarjetas (ajustar según CSS)
            const offset = -(currentIndex * slidesPerView * (slideWidth + gap));

            track.style.transform = `translateX(${offset}px)`;

            // Actualizar dots
            const dots = dotsContainer.querySelectorAll('.team__carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Actualizar estado de botones
            updateButtons();
        }

        /**
         * Actualizar estado de botones (deshabilitar en extremos)
         */
        function updateButtons() {
            const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
            
            if (prevButton) {
                prevButton.disabled = currentIndex === 0;
            }
            
            if (nextButton) {
                nextButton.disabled = currentIndex >= maxIndex;
            }
        }

        /**
         * Ir a slide específico
         */
        function goToSlide(index) {
            const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
            resetAutoplay();
        }

        /**
         * Siguiente grupo de tarjetas
         */
        function nextSlide() {
            const maxIndex = Math.ceil(slides.length / slidesPerView) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else {
                // Volver al inicio
                currentIndex = 0;
                updateCarousel();
            }
        }

        /**
         * Anterior grupo de tarjetas
         */
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        /**
         * Autoplay
         */
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                nextSlide();
            }, autoplayDelay);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        /**
         * Manejar cambios de tamaño de pantalla
         */
        function handleResize() {
            const newSlidesPerView = getSlidesPerView();
            
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                currentIndex = 0;
                createDots();
                updateCarousel();
            }
        }

        /**
         * Event Listeners
         */
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetAutoplay();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetAutoplay();
            });
        }

        // Pausar autoplay al hacer hover
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Soporte para touch/swipe en móviles
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetAutoplay();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Resize listener
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 250);
        });

        // Inicializar
        createDots();
        updateCarousel();
        startAutoplay();

        console.log(`Team carousel inicializado con ${slides.length} asesoras`);
    };

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initTeamCarousel);
    } else {
        window.initTeamCarousel();
    }

})();
