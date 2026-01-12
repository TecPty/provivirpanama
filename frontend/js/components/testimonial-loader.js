/**
 * ============================================================================
 * TESTIMONIAL LOADER - Dynamically loads testimonials
 * ============================================================================
 */

const TestimonialLoader = (() => {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    let testimonials = [];

    /**
     * Create testimonial card HTML
     */
    const createTestimonialCard = (testimonial) => {
        const { id, name, location, project, testimonial: quote, image, rating = 5 } = testimonial;

        return `
            <article class="testimonial-card fade-in">
                <p class="testimonial-card__quote">${quote}</p>
                
                <div class="testimonial-card__author">
                    <img 
                        src="${image}" 
                        alt="${name}" 
                        class="testimonial-card__avatar"
                    >
                    <div class="testimonial-card__info">
                        <div class="testimonial-card__name">${name}</div>
                        <div class="testimonial-card__location">${location}</div>
                    </div>
                </div>
                
                <div class="testimonial-card__rating">
                    ${Array(rating).fill('⭐').join('')}
                </div>
            </article>
        `;
    };

    /**
     * Render testimonials
     */
    const renderTestimonials = (testimonialsToRender) => {
        if (!testimonialsGrid) return;

        if (testimonialsToRender.length === 0) {
            testimonialsGrid.innerHTML = `
                <div class="loading" style="grid-column: 1 / -1;">
                    No hay testimonios disponibles
                </div>
            `;
            return;
        }

        const html = testimonialsToRender.map(createTestimonialCard).join('');
        testimonialsGrid.innerHTML = html;
    };

    /**
     * Load testimonials
     */
    const loadTestimonials = async () => {
        try {
            const response = await API.getTestimonials();
            
            if (response.success && response.data) {
                testimonials = response.data;
                renderTestimonials(testimonials);
            } else {
                testimonials = getMockTestimonials();
                renderTestimonials(testimonials);
            }
        } catch (error) {
            console.error('Error loading testimonials:', error);
            testimonials = getMockTestimonials();
            renderTestimonials(testimonials);
        }
    };

    /**
     * Mock testimonials
     */
    const getMockTestimonials = () => {
        return [
            {
                id: 1,
                name: 'Eugen Martinez',
                location: 'Green Meadows Resident',
                project: 'Green Meadows',
                testimonial: 'Nunca pensé que podríamos permitirnos una casa en esta área. Provivir hizo el proceso de financiamiento increíblemente claro y fácil.',
                image: Placeholders.createAvatarImage('Eugen Martinez'),
                rating: 5
            },
            {
                id: 2,
                name: 'James Wilson',
                location: 'Sunrise Valley Resident',
                project: 'Sunrise Valley',
                testimonial: 'El aspecto comunitario es lo que más nos vendió. Nuestros hijos ahora tienen lugar seguro para jugar.',
                image: Placeholders.createAvatarImage('James Wilson'),
                rating: 5
            },
            {
                id: 3,
                name: 'Elena Rodriguez',
                location: 'Urban Heights Resident',
                project: 'Urban Heights',
                testimonial: 'Equipo profesional y gran calidad de construcción. Recomiendo Provivir a cualquiera que busque su primera propiedad.',
                image: Placeholders.createAvatarImage('Elena Rodriguez'),
                rating: 5
            }
        ];
    };

    /**
     * Initialize
     */
    const init = () => {
        if (!testimonialsGrid) return;
        loadTestimonials();
    };

    return {
        init,
        loadTestimonials,
        renderTestimonials
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', TestimonialLoader.init);
} else {
    TestimonialLoader.init();
}