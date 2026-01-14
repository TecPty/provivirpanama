/**
 * Property Image Carousel with Modal
 * Handles image carousel functionality and modal display
 */
const PropertyImageCarousel = (() => {
    let currentPropertyId = null;
    let currentImageIndex = 0;
    let propertyImages = {};

    const init = () => {
        // Store images from properties for modal use
        const properties = getMockProperties();
        properties.forEach(prop => {
            propertyImages[prop.id] = prop.images || [];
        });

        // Attach click handlers to property image containers
        document.addEventListener('click', handleImageClick);
        document.addEventListener('click', handleCarouselControls);
    };

    const handleImageClick = (e) => {
        const imageContainer = e.target.closest('.property-card__image-container');
        if (imageContainer) {
            const card = imageContainer.closest('.property-card');
            const propertyId = card.querySelector('.property-card__contact-btn').dataset.propertyId;
            openModal(propertyId);
        }
    };

    const handleCarouselControls = (e) => {
        if (e.target.classList.contains('carousel__prev')) {
            prevImage();
        } else if (e.target.classList.contains('carousel__next')) {
            nextImage();
        } else if (e.target.classList.contains('carousel__dot')) {
            currentImageIndex = parseInt(e.target.dataset.index);
            updateCarouselDisplay();
        }
    };

    const openModal = (propertyId) => {
        currentPropertyId = propertyId;
        currentImageIndex = 0;

        if (!propertyImages[propertyId] || propertyImages[propertyId].length === 0) {
            console.warn('No images found for property', propertyId);
            return;
        }

        const modal = createModal(propertyId);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal handlers
        modal.querySelector('.carousel__close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        updateCarouselDisplay();
    };

    const createModal = (propertyId) => {
        const images = propertyImages[propertyId];
        const modal = document.createElement('div');
        modal.className = 'carousel-modal';

        let dotsHTML = '';
        if (images.length > 1) {
            dotsHTML = images.map((_, index) => `
                <button class="carousel__dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Image ${index + 1}"></button>
            `).join('');
        }

        modal.innerHTML = `
            <div class="carousel-modal__content">
                <button class="carousel__close" aria-label="Close carousel">&times;</button>
                
                <div class="carousel-modal__image-wrapper">
                    <img class="carousel-modal__image" src="${images[0]}" alt="Property image">
                </div>

                ${images.length > 1 ? `
                    <button class="carousel__prev" aria-label="Previous image">&#10094;</button>
                    <button class="carousel__next" aria-label="Next image">&#10095;</button>
                    
                    <div class="carousel__dots">
                        ${dotsHTML}
                    </div>
                ` : ''}
            </div>
        `;

        return modal;
    };

    const prevImage = () => {
        const images = propertyImages[currentPropertyId];
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateCarouselDisplay();
    };

    const nextImage = () => {
        const images = propertyImages[currentPropertyId];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateCarouselDisplay();
    };

    const updateCarouselDisplay = () => {
        const images = propertyImages[currentPropertyId];
        const modal = document.querySelector('.carousel-modal');
        
        if (!modal) return;

        // Update image
        const imgElement = modal.querySelector('.carousel-modal__image');
        imgElement.src = images[currentImageIndex];
        imgElement.alt = `Property image ${currentImageIndex + 1}`;

        // Update dots
        const dots = modal.querySelectorAll('.carousel__dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });

        // Update image counter (optional)
        const counter = modal.querySelector('.carousel__counter');
        if (counter) {
            counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        }
    };

    const handleKeyboard = (e) => {
        if (!document.querySelector('.carousel-modal')) return;

        switch(e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeModal();
                break;
        }
    };

    const closeModal = () => {
        const modal = document.querySelector('.carousel-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyboard);
        }
    };

    return {
        init: init
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', PropertyImageCarousel.init);
} else {
    PropertyImageCarousel.init();
}
