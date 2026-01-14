/**
 * ============================================================================
 * HERO ANIMATION - Logo Drop & Image Slide Sync
 * Sincroniza la caída del logo con la animación de entrada de las imágenes
 * 60 FPS usando requestAnimationFrame
 * ============================================================================
 */

(function() {
    'use strict';

    window.initHeroAnimation = function() {
        const heroSection = document.querySelector('.hero');
        const logoContainer = document.querySelector('.hero__logo');
        const slider = document.querySelector('.hero__slider');
        const slides = document.querySelectorAll('.hero__slide');
        const dots = document.querySelectorAll('.hero__dot');

        if (!heroSection || !logoContainer || !slider || slides.length === 0) {
            console.warn('Hero animation: Elementos requeridos no encontrados');
            return;
        }

        // Configuración de animación
        const CONFIG = {
            slideDuration: 2000,        // 2 segundos: 1.5s visible + 0.5s fade
            imageSlideInDuration: 1500, // Duración de entrada de imagen (ms)
            logoDropDelay: 800,         // Delay antes de que caiga el logo (ms)
            logoDropDuration: 600,      // Duración de caída del logo (ms)
            imageVelocity: 0.4,         // Velocidad relativa (0-1)
            fps: 60
        };

        let currentSlide = 0;
        let isAnimating = false;
        let animationFrameId = null;
        let autoplayInterval = null;
        let startTime = 0;

        /**
         * Interpolar valores (easing)
         */
        const easing = {
            // Entrada suave desde la derecha
            slideIn: (t) => {
                return 1 - Math.pow(1 - t, 3); // easeOut cubic
            },
            // Caída del logo con rebote
            dropLogo: (t) => {
                if (t < 0.7) {
                    return t / 0.7; // Aceleración
                }
                // Rebote suave al final
                const bounce = (t - 0.7) / 0.3;
                return 1 - Math.sin(bounce * Math.PI) * 0.1;
            },
            // Linear para velocidad constante
            linear: (t) => t
        };

        /**
         * Resetear posiciones visuales
         */
        function resetPositions() {
            slides.forEach(slide => {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
            });

            if (logoContainer) {
                logoContainer.style.transform = 'translateY(-150px)';
                logoContainer.style.opacity = '0';
            }
        }

        /**
         * Animar un slide completo
         */
        function animateSlide(slideIndex) {
            resetPositions();
            const activeSlide = slides[slideIndex];
            const startTimeAnim = performance.now();

            isAnimating = true;

            function frame(currentTime) {
                const elapsed = currentTime - startTimeAnim;
                const progress = Math.min(elapsed / CONFIG.slideDuration, 1);

                // Animar entrada de imagen (primeros 1500ms)
                if (elapsed < CONFIG.imageSlideInDuration) {
                    const imageProgress = elapsed / CONFIG.imageSlideInDuration;
                    const easeProgress = easing.slideIn(imageProgress);
                    const translateX = 100 * (1 - easeProgress);

                    activeSlide.style.transform = `translateX(${translateX}%)`;
                    activeSlide.style.opacity = '1';
                } else {
                    activeSlide.style.transform = 'translateX(0)';
                    activeSlide.style.opacity = '1';
                }

                // Animar caída del logo (después de 800ms)
                if (elapsed >= CONFIG.logoDropDelay) {
                    const logoElapsed = elapsed - CONFIG.logoDropDelay;
                    if (logoElapsed < CONFIG.logoDropDuration) {
                        const logoProgress = logoElapsed / CONFIG.logoDropDuration;
                        const logoDrop = easing.dropLogo(logoProgress);
                        const dropDistance = 200 * (1 - logoDrop);

                        logoContainer.style.transform = `translateY(-${dropDistance}px)`;
                        logoContainer.style.opacity = `${logoDrop}`;
                    } else {
                        logoContainer.style.transform = 'translateY(0)';
                        logoContainer.style.opacity = '1';
                    }
                }

                // Continuar animación si no ha terminado
                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(frame);
                } else {
                    isAnimating = false;
                }
            }

            animationFrameId = requestAnimationFrame(frame);
        }

        /**
         * Mostrar slide con índice
         */
        function showSlide(index) {
            if (isAnimating) return;

            // Validar índice
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            // Obtener el logo para este slide
            const activeSlide = slides[currentSlide];
            const logoFileName = activeSlide.dataset.logo || 'ciudad-del-este-logo.png';
            const logoImg = logoContainer.querySelector('img');
            
            // Cambiar el logo
            if (logoImg) {
                logoImg.src = `./assets/images/logos/${logoFileName}`;
            }

            // Actualizar dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });

            // Animar el slide
            animateSlide(currentSlide);

            if (typeof CONFIG !== 'undefined' && CONFIG.ENVIRONMENT === 'development') {
                console.log(`Hero: Slide ${currentSlide + 1}/${slides.length} - Logo: ${logoFileName}`);
            }
        }

        /**
         * Siguiente slide
         */
        function nextSlide() {
            if (!isAnimating) {
                showSlide(currentSlide + 1);
            }
        }

        /**
         * Slide anterior
         */
        function prevSlide() {
            if (!isAnimating) {
                showSlide(currentSlide - 1);
            }
        }

        /**
         * Iniciar autoplay
         */
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, CONFIG.slideDuration);
        }

        /**
         * Detener autoplay
         */
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        /**
         * Reiniciar autoplay
         */
        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Inicializar primer slide
        showSlide(0);

        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                showSlide(index);
                restartAutoplay();
            });
        });

        // Controles de navegación (si existen)
        const prevBtn = heroSection.querySelector('.hero__nav-prev');
        const nextBtn = heroSection.querySelector('.hero__nav-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevSlide();
                restartAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextSlide();
                restartAutoplay();
            });
        }

        // Pausar en hover
        heroSection.addEventListener('mouseenter', stopAutoplay);
        heroSection.addEventListener('mouseleave', startAutoplay);

        // Soporte para gestos táctiles (swipe)
        let touchStartX = 0;
        let touchEndX = 0;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left → next
                } else {
                    prevSlide(); // Swipe right → prev
                }
                restartAutoplay();
            }
        }

        // Cleanup en caso necesario
        window.addEventListener('beforeunload', () => {
            stopAutoplay();
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });

        // Iniciar autoplay
        startAutoplay();

        console.log('✅ Hero animation initialized (60 FPS sync)');

        // Exponer control público
        return {
            nextSlide,
            prevSlide,
            showSlide,
            stop: stopAutoplay,
            start: startAutoplay
        };
    };

    // Auto-inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.initHeroAnimation();
        });
    } else {
        window.initHeroAnimation();
    }
})();
