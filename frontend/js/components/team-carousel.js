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

        // Offset para empezar en el medio (en las tarjetas originales)
        let currentIndex = totalCards; // Empieza en la primera tarjeta original
        let autoplayInterval;
        const autoplayDelay = 3000; // 3 segundos entre cada cambio

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
                
                if (i === 0) { // Primer asesor activo por defecto
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

            // Aplicar transición ANTES de cambiar las clases
            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                track.style.transition = 'none';
            }

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

            // Forzar reflow para que el navegador aplique los cambios de clase
            // antes de calcular posiciones (importante para obtener anchos correctos)
            void track.offsetHeight;

            // Usar getBoundingClientRect para obtener posiciones reales
            const container = track.parentElement;
            const containerRect = container.getBoundingClientRect();
            const currentSlide = slides[currentIndex];
            
            if (!currentSlide) return;
            
            const slideRect = currentSlide.getBoundingClientRect();
            
            // Calcular cuánto debemos mover para centrar la tarjeta actual
            const containerCenter = containerRect.left + containerRect.width / 2;
            const slideCenter = slideRect.left + slideRect.width / 2;
            
            // Obtener offset actual (si existe)
            const transformValue = track.style.transform || 'translateX(0px)';
            const currentOffset = parseFloat(transformValue.replace(/translateX\(/g, '').replace(/px\)/g, '')) || 0;
            
            // Offset necesario para centrar
            const offset = currentOffset + (containerCenter - slideCenter);
            
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
            // Cuando mostramos el primer clon al final, saltamos de vuelta
            if (currentIndex >= totalCards * 2) {
                setTimeout(() => {
                    // Forzar reflow antes del salto
                    track.offsetHeight;
                    currentIndex = totalCards;
                    updateCarousel(false);
                    
                    // Restaurar transición en el siguiente frame
                    requestAnimationFrame(() => {
                        track.style.transition = '';
                    });
                }, 520); // 500ms CSS transition + 20ms buffer
            }
        }

        /**
         * Anterior tarjeta
         */
        function prevSlide() {
            currentIndex--;
            updateCarousel(true);
            
            // Detectar si hemos llegado al inicio de los clones
            // Cuando mostramos el último clon al inicio, saltamos de vuelta
            if (currentIndex < totalCards) {
                setTimeout(() => {
                    // Forzar reflow antes del salto
                    track.offsetHeight;
                    currentIndex = totalCards * 2 - 1;
                    updateCarousel(false);
                    
                    // Restaurar transición en el siguiente frame
                    requestAnimationFrame(() => {
                        track.style.transition = '';
                    });
                }, 520); // 500ms CSS transition + 20ms buffer
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

        console.log(`✅ Carrusel infinito de asesoras inicializado:`);
        console.log(`   - ${totalCards} asesoras originales`);
        console.log(`   - ${slides.length} slides totales (con clones)`);
        console.log(`   - Autoplay: ${autoplayDelay/1000}s entre slides`);
        console.log(`   - Iniciando en: ${originalSlides[0]?.querySelector('.team-card__name')?.textContent || 'Primera asesora'}`);
    };

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initTeamCarousel);
    } else {
        window.initTeamCarousel();
    }

})();


