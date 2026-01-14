/**
 * ============================================================================
 * HERO SLIDER - Provivir Panama
 * Slider automático de imágenes en la sección hero
 * ============================================================================
 */

(function() {
    'use strict';

    window.initHeroSlider = function() {
        const slider = document.querySelector('.hero__slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.hero__slide');
        const dots = document.querySelectorAll('.hero__dot');
        
        let currentSlide = 0;
        const slideInterval = 2000; // 2 segundos: 1.5s visible + 0.5s fade
        const fadeOutDuration = 500; // Iniciar fade a 1500ms (2000 - 500)
        let autoplayInterval;

        /**
         * Mostrar slide específico
         */
        function showSlide(index) {
            // Validar índice
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            // Remover clase active de todos
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.classList.remove('fade-out'); // Remover fade-out
            });
            dots.forEach(dot => dot.classList.remove('active'));

            // Agregar clase active al slide y dot actual
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            if (CONFIG.ENVIRONMENT === 'development') {
                console.log(`Hero slider: Mostrando slide ${currentSlide + 1}/${slides.length}`);
            }
        }

        /**
         * Siguiente slide
         */
        function nextSlide() {
            // Agregar fade-out al slide actual
            slides[currentSlide].classList.add('fade-out');
            // Calcular el siguiente índice
            const nextIndex = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1;
            // Cambiar al siguiente slide durante el fade (a mitad del tiempo de fade)
            setTimeout(() => showSlide(nextIndex), fadeOutDuration - 250);
        }

        /**
         * Slide anterior
         */
        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        /**
         * Iniciar autoplay
         */
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, slideInterval);
        }

        /**
         * Detener autoplay
         */
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        /**
         * Reiniciar autoplay
         */
        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                restartAutoplay(); // Reiniciar el timer al hacer clic manual
            });
        });

        // Pausar en hover (opcional)
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Soporte para gestos táctiles (swipe)
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de píxeles para considerar swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - siguiente
                nextSlide();
                restartAutoplay();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - anterior
                prevSlide();
                restartAutoplay();
            }
        }

        // Iniciar el slider
        startAutoplay();

        if (CONFIG.ENVIRONMENT === 'development') {
            console.log(`Hero slider inicializado con ${slides.length} slides`);
        }

        // Limpiar al salir de la página
        window.addEventListener('beforeunload', stopAutoplay);
    };
})();
