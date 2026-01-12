/**
 * ============================================================================
 * API SERVICE - Provivir Panama
 * Handles all API communication with backend
 * ============================================================================
 */

const API = (() => {
    const baseURL = CONFIG.API.BASE_URL;
    const timeout = CONFIG.API.TIMEOUT;

    /**
     * Generic fetch wrapper with error handling and timeout
     */
    const fetchWithTimeout = async (url, options = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            
            throw error;
        }
    };

    /**
     * GET request
     */
    const get = async (endpoint, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const url = `${baseURL}${endpoint}${queryString ? '?' + queryString : ''}`;
        
        return await fetchWithTimeout(url, {
            method: 'GET'
        });
    };

    /**
     * POST request
     */
    const post = async (endpoint, data = {}) => {
        const url = `${baseURL}${endpoint}`;
        
        return await fetchWithTimeout(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    };

    /**
     * Fetch all properties
     */
    const getProperties = async (filters = {}) => {
        try {
            return await get(CONFIG.API.ENDPOINTS.PROPERTIES, filters);
        } catch (error) {
            console.error('Error fetching properties:', error);
            return { success: false, error: error.message, data: [] };
        }
    };

    /**
     * Fetch single property by ID
     */
    const getProperty = async (id) => {
        try {
            return await get(`${CONFIG.API.ENDPOINTS.PROPERTIES}/${id}`);
        } catch (error) {
            console.error('Error fetching property:', error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Fetch all testimonials
     */
    const getTestimonials = async () => {
        try {
            return await get(CONFIG.API.ENDPOINTS.TESTIMONIALS);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            return { success: false, error: error.message, data: [] };
        }
    };

    /**
     * Submit lead form
     */
    const submitLead = async (leadData) => {
        try {
            return await post(CONFIG.API.ENDPOINTS.LEADS, leadData);
        } catch (error) {
            console.error('Error submitting lead:', error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Submit contact form
     */
    const submitContact = async (contactData) => {
        try {
            return await post(CONFIG.API.ENDPOINTS.CONTACT, contactData);
        } catch (error) {
            console.error('Error submitting contact:', error);
            return { success: false, error: error.message };
        }
    };

    // Public API
    return {
        get,
        post,
        getProperties,
        getProperty,
        getTestimonials,
        submitLead,
        submitContact
    };
})();

// Make API available globally
window.API = API;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}