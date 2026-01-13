/**
 * ============================================================================
 * API MODULE - Provivir Panama
 * Handles all API requests to the backend
 * ============================================================================
 */

const API = {
    /**
     * Fetch properties from API
     */
    async getProperties(filters = {}) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.PROPERTIES}${queryParams ? '?' + queryParams : ''}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw error;
        }
    },

    /**
     * Submit lead form
     */
    async submitLead(formData) {
        try {
            const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.LEADS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting lead:', error);
            throw error;
        }
    },

    /**
     * Get testimonials
     */
    async getTestimonials() {
        try {
            const response = await fetch(`${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.TESTIMONIALS}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            throw error;
        }
    },

    /**
     * Get social posts
     */
    async getSocialPosts(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${CONFIG.API.BASE_URL}${CONFIG.API.ENDPOINTS.SOCIAL_POSTS}${queryString ? '?' + queryString : ''}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error fetching social posts:', error);
            throw error;
        }
    }
};
