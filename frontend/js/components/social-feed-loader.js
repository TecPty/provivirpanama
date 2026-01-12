/**
 * Social Feed Loader
 * Carga dinámicamente posts de redes sociales desde la API
 */

class SocialFeedLoader {
    constructor() {
        this.track = document.getElementById('socialFeedTrack');
        this.prevBtn = document.querySelector('.social-feed__nav-btn--prev');
        this.nextBtn = document.querySelector('.social-feed__nav-btn--next');
        this.currentIndex = 0;
        this.posts = [];
        this.autoplayInterval = null;
        
        if (this.track) {
            this.init();
        }
    }
    
    async init() {
        try {
            await this.loadPosts();
            this.setupNavigation();
            this.startAutoplay();
        } catch (error) {
            console.error('Error initializing social feed:', error);
            this.showError();
        }
    }
    
    async loadPosts() {
        try {
            const response = await API.getSocialPosts({ limit: 6 });
            
            if (response.success && response.data.length > 0) {
                this.posts = response.data;
                this.renderPosts();
            } else {
                this.showEmpty();
            }
        } catch (error) {
            console.error('Error loading social posts:', error);
            throw error;
        }
    }
    
    renderPosts() {
        this.track.innerHTML = '';
        
        this.posts.forEach(post => {
            const card = this.createPostCard(post);
            this.track.appendChild(card);
        });
        
        this.updateCarousel();
    }
    
    createPostCard(post) {
        const card = document.createElement('div');
        const platformClass = post.platform === 'tiktok' ? 'social-card--tiktok' : 'social-card--instagram';
        card.className = `social-card ${platformClass}`;
        
        // Badge si es trending
        const badge = post.is_trending ? `
            <span class="social-card__badge ${post.platform === 'tiktok' ? 'social-card__badge--tiktok' : ''}">
                TRENDING
            </span>
        ` : '';
        
        // Media (imagen o video)
        const isVideo = post.media_type === 'video' || post.platform === 'tiktok';
        const mediaClass = isVideo ? 'social-card__media--video' : '';
        const playButton = isVideo ? `
            <div class="social-card__play">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        ` : '';
        
        const mediaUrl = post.video_url || post.image_url;
        
        card.innerHTML = `
            ${badge}
            <div class="social-card__media ${mediaClass}" ${isVideo ? `onclick="window.open('${post.post_url}', '_blank')"` : ''}>
                <img src="${post.image_url}" alt="${post.platform} Post" loading="lazy">
                ${playButton}
            </div>
            <div class="social-card__content">
                <div class="social-card__header">
                    <img src="./assets/images/logo/logo-icon-provivir.png" alt="Provivir" class="social-card__avatar">
                    <span class="social-card__username">@provivirpanama</span>
                </div>
                <p class="social-card__text">${this.escapeHtml(post.caption)}</p>
                <div class="social-card__stats">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        ${this.formatNumber(post.likes_count)}
                    </span>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        ${this.formatNumber(post.comments_count)}
                    </span>
                </div>
                <a href="${post.post_url}" target="_blank" class="social-card__cta">
                    VER AHORA
                </a>
            </div>
        `;
        
        return card;
    }
    
    setupNavigation() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate(-1));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigate(1));
        }
        
        // Touch support
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                this.navigate(diff > 0 ? 1 : -1);
            }
        });
    }
    
    navigate(direction) {
        const slidesPerView = this.getSlidesPerView();
        const maxIndex = Math.max(0, this.posts.length - slidesPerView);
        
        this.currentIndex += direction;
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));
        
        this.updateCarousel();
        this.resetAutoplay();
    }
    
    updateCarousel() {
        const slideWidth = this.track.children[0]?.offsetWidth || 0;
        const gap = 24; // gap entre cards
        const offset = -(this.currentIndex * (slideWidth + gap));
        
        this.track.style.transform = `translateX(${offset}px)`;
    }
    
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            const slidesPerView = this.getSlidesPerView();
            const maxIndex = Math.max(0, this.posts.length - slidesPerView);
            
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            
            this.updateCarousel();
        }, 5000);
    }
    
    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }
    
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showEmpty() {
        this.track.innerHTML = '<div class="loading">No hay publicaciones disponibles</div>';
    }
    
    showError() {
        this.track.innerHTML = '<div class="loading">Error al cargar publicaciones</div>';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SocialFeedLoader();
});

// Reajustar al cambiar tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const loader = new SocialFeedLoader();
        if (loader.track) {
            loader.updateCarousel();
        }
    }, 250);
});
