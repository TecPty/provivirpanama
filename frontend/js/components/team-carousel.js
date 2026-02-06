/**
 * ============================================================================
 * TEAM CAROUSEL - Provivir Panama
 * Carrusel infinito para mostrar el equipo de asesoras
 * ============================================================================
 */

(function() {
    'use strict';

    window.initTeamCarousel = function() {
        const carousel = document.querySelector('.team__carousel');
        if (!carousel) return;

        const track = carousel.querySelector('.team__carousel-track');
        let slides = Array.from(carousel.querySelectorAll('.team-card'));
        const prevButton = carousel.querySelector('.team__carousel-btn--prev');
        const nextButton = carousel.querySelector('.team__carousel-btn--next');
        const dotsContainer = carousel.querySelector('.team__carousel-dots');
        const thumbsContainer = carousel.querySelector('.team__thumbs');

        if (!track || slides.length === 0) return;

        const originalSlides = slides.slice();
        const totalCards = originalSlides.length;
        const CARD_CENTER_WIDTH = 340;
        const CARD_SIDE_WIDTH = 260;
        const GAP = 24;

        // Clonar tarjetas para carrusel infinito
        // Clonamos al inicio y al final para permitir scroll infinito
        const clonedStart = slides.map(slide => slide.cloneNode(true));
        const clonedEnd = slides.map(slide => slide.cloneNode(true));

        // Insertar clones
        clonedStart.forEach(clone => track.insertBefore(clone, track.firstChild));
        clonedEnd.forEach(clone => track.appendChild(clone));

        // Actualizar referencia de slides
        slides = Array.from(track.querySelectorAll('.team-card'));

        // Offset para empezar en el medio (en los clones del inicio)
        let currentIndex = totalCards;
        let autoplayInterval;
        const autoplayDelay = 2000; // 2 segundos

        /**
         * Crear indicadores (dots)
         */
        function createDots() {
            if (!dotsContainer) return;
            
            dotsContainer.innerHTML = '';

            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('button');
                dot.classList.add('team__carousel-dot');
                dot.setAttribute('aria-label', `Ir a asesor ${i + 1}`);
                
                if (i === 1) { // índice 1 es el segundo (Kenia)
                    dot.classList.add('active');
                }

                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        /**
         * Crear thumbnails laterales
         */
        function createThumbs() {
            if (!thumbsContainer) return;

            thumbsContainer.innerHTML = '';

            originalSlides.forEach((slide, index) => {
                const img = slide.querySelector('img');
                const nameEl = slide.querySelector('.team-card__name');
                const name = nameEl ? nameEl.textContent.trim() : `Asesor ${index + 1}`;

                const thumbBtn = document.createElement('button');
                thumbBtn.type = 'button';
                thumbBtn.className = 'team__thumb';
                thumbBtn.setAttribute('aria-label', `Ver asesor ${name}`);
                thumbBtn.dataset.index = String(index);

                if (img) {
                    const thumbImg = img.cloneNode(true);
                    thumbImg.alt = name;
                    thumbImg.loading = 'lazy';
                    thumbImg.decoding = 'async';
                    thumbBtn.appendChild(thumbImg);
                }

                thumbBtn.addEventListener('click', () => goToSlide(index));
                thumbsContainer.appendChild(thumbBtn);
            });
        }

        /**
         * Actualizar carrusel: asignar clases y centrar
         */
        function updateCarousel(animate = true) {
            // Índice dentro del rango original (0 - totalCards-1)
            const realIndex = ((currentIndex % totalCards) + totalCards) % totalCards;

            // Actualizar clases de las tarjetas
            slides.forEach((slide, index) => {
                slide.classList.remove('side', 'center');
                
                // Verificar qué posición tiene en el carrusel (relativa a currentIndex)
                const offset = index - currentIndex;
                
                if (offset === 0) {
                    slide.classList.add('center');
                } else {
                    slide.classList.add('side');
                }
            });

            // Actualizar dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.team__carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === realIndex);
                });
            }

            if (thumbsContainer) {
                const thumbs = thumbsContainer.querySelectorAll('.team__thumb');
                thumbs.forEach((thumb, index) => {
                    thumb.classList.toggle('team__thumb--active', index === realIndex);
                });
            }

            // Calcular offset de posición de forma correcta
            // Todas las tarjetas tienen ancho diferente:
            // - Laterales: 260px
            // - Central: 340px
            let positionLeft = 0;
            
            // Sumar todas las tarjetas ANTES de la actual
            for (let i = 0; i < currentIndex; i++) {
                // Cada tarjeta tiene 260px + gap
                positionLeft += CARD_SIDE_WIDTH + GAP;
            }
            
            // Ahora calcular cuánto mover hacia la izquierda para centrar
            // Posición del centro de la tarjeta actual
            const containerWidth = track.parentElement.offsetWidth;
            const cardCurrentWidth = CARD_CENTER_WIDTH;
            const cardCenterPosition = positionLeft + cardCurrentWidth / 2;
            
            // Offset final: centrar la tarjeta en el contenedor
            const offset = (containerWidth / 2) - cardCenterPosition;

            // Aplicar transición
            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(${offset}px)`;
        }

        /**
         * Ir a una tarjeta específica
         */
        function goToSlide(index) {
            currentIndex = totalCards + index;
            updateCarousel(true);
            resetAutoplay();
        }

        /**
         * Siguiente tarjeta
         */
        function nextSlide() {
            currentIndex++;
            updateCarousel(true);
            
            // Detectar si hemos llegado al final de los clones
            if (currentIndex >= totalCards * 2) {
                setTimeout(() => {
                    currentIndex = totalCards;
                    updateCarousel(false);
                }, 500);
            }
        }

        /**
         * Anterior tarjeta
         */
        function prevSlide() {
            currentIndex--;
            updateCarousel(true);
            
            // Detectar si hemos llegado al inicio de los clones
            if (currentIndex <= 0) {
                setTimeout(() => {
                    currentIndex = totalCards;
                    updateCarousel(false);
                }, 500);
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

        // Resize listener para recalcular posiciones
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => updateCarousel(false), 250);
        });

        // Inicializar
        createThumbs();
        createDots();
        updateCarousel(false);
        startAutoplay();

        console.log(`Team carousel inicializado con ${totalCards} asesoras (+ clones para infinito)`);
    };

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initTeamCarousel);
    } else {
        window.initTeamCarousel();
    }

})();


