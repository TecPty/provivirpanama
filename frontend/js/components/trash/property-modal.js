/**
 * Property Image Modal Component
 * Displays a full-screen modal with property images and navigation
 */

class PropertyImageModal {
    constructor() {
        this.currentPropertyId = null;
        this.currentImageIndex = 0;
        this.propertyData = {};
        this.modal = null;
        this.init();
    }

    init() {
        // Create modal HTML
        this.createModal();
        this.attachEventListeners();
    }

    createModal() {
        const modalHTML = `
            <div id="propertyModal" class="property-modal">
                <div class="modal-content">
                    <button class="modal-close" id="modalClose">&times;</button>
                    
                    <div class="modal-image-container" id="imageContainer">
                        <img id="mainImage" src="" alt="Property image" />
                        <button class="modal-nav-button prev" id="prevBtn">&#10094;</button>
                        <button class="modal-nav-button next" id="nextBtn">&#10095;</button>
                    </div>
                    
                    <div class="modal-thumbnails" id="thumbnailsContainer">
                        <!-- Thumbnails will be inserted here -->
                    </div>
                    
                    <div class="modal-footer">
                        <h3 class="modal-title" id="modalTitle"></h3>
                        <span class="modal-counter">
                            <span id="imageCounter">1</span> / <span id="imageTotal">1</span>
                        </span>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document if not already present
        if (!document.getElementById('propertyModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modal = document.getElementById('propertyModal');
        }
    }

    attachEventListeners() {
        const modal = document.getElementById('propertyModal');
        const closeBtn = document.getElementById('modalClose');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        closeBtn.addEventListener('click', () => this.close());
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') this.previousImage();
            if (e.key === 'ArrowRight') this.nextImage();
            if (e.key === 'Escape') this.close();
        });
    }

    openFromCard(propertyId, properties, imageIndex = 0) {
        // Find property data
        const property = properties.find(p => p.id === propertyId);
        if (!property || !property.images) return;

        this.currentPropertyId = propertyId;
        this.currentImageIndex = imageIndex;
        this.propertyData[propertyId] = property;

        this.render();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    render() {
        const property = this.propertyData[this.currentPropertyId];
        if (!property) return;

        const mainImage = document.getElementById('mainImage');
        const thumbnailsContainer = document.getElementById('thumbnailsContainer');
        const modalTitle = document.getElementById('modalTitle');
        const imageCounter = document.getElementById('imageCounter');
        const imageTotal = document.getElementById('imageTotal');

        // Update main image
        mainImage.src = property.images[this.currentImageIndex];
        mainImage.alt = `${property.title} - Image ${this.currentImageIndex + 1}`;

        // Update title
        modalTitle.textContent = property.title;

        // Update counter
        imageCounter.textContent = this.currentImageIndex + 1;
        imageTotal.textContent = property.images.length;

        // Clear and regenerate thumbnails
        thumbnailsContainer.innerHTML = '';
        property.images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `modal-thumbnail ${index === this.currentImageIndex ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}" />`;
            thumbnail.addEventListener('click', () => this.goToImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Update button states
        document.getElementById('prevBtn').disabled = this.currentImageIndex === 0;
        document.getElementById('nextBtn').disabled = this.currentImageIndex === property.images.length - 1;
    }

    nextImage() {
        const property = this.propertyData[this.currentPropertyId];
        if (this.currentImageIndex < property.images.length - 1) {
            this.currentImageIndex++;
            this.render();
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.render();
        }
    }

    goToImage(index) {
        const property = this.propertyData[this.currentPropertyId];
        if (index >= 0 && index < property.images.length) {
            this.currentImageIndex = index;
            this.render();
        }
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentImageId = null;
        this.currentImageIndex = 0;
    }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.propertyImageModal = new PropertyImageModal();
});
