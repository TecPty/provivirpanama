/**
 * ============================================================================
 * CONFIGURATION FILE - Provivir Panama
 * ============================================================================
 */

// Detect environment automatically
const ENVIRONMENT = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname.includes('.local')
    ? 'development'
    : 'production';

// Build BASE_URL
const getAPIBaseURL = () => {
    // PHP API (same origin)
    return '/api';
};

// Base path for assets (important for local setups)
const getBasePath = () => {
    if (ENVIRONMENT === 'development') {
        return '/provivirpanama';
    }
    return '';
};

const CONFIG = {
    // Environment (development | production)
    ENVIRONMENT: ENVIRONMENT,
    IS_VERCEL: false,
    BASE_PATH: getBasePath(),

    // API Configuration
    API: {
        BASE_URL: getAPIBaseURL(),
        ENDPOINTS: {
            PROPERTIES: '/properties',
            TESTIMONIALS: '/testimonials',
            LEADS: '/leads',
            CONTACT: '/contact.php',
            HEALTH: '/health.php',
            SOCIAL_POSTS: '/social-posts'
        },
        TIMEOUT: 10000, // 10 seconds
        RETRY_ATTEMPTS: 3
    },

    // CMS Configuration (future integration)
    CMS: {
        ENABLED: false,
        BASE_URL: '/cms',
        API_KEY: ''
    },

    // Features Toggle
    FEATURES: {
        LAZY_LOADING: true,
        SCROLL_ANIMATIONS: true,
        ANALYTICS: true,
        FORM_VALIDATION: true,
        MOBILE_MENU: true
    },

    // UI Settings
    UI: {
        ANIMATION_DURATION: 300,
        MOBILE_BREAKPOINT: 768,
        TABLET_BREAKPOINT: 1024,
        PROPERTIES_PER_PAGE: 6,
        TESTIMONIALS_PER_PAGE: 3
    },

    // Form Settings
    FORMS: {
        LEAD_FORM: {
            REQUIRED_FIELDS: ['email'],
            SUCCESS_MESSAGE: 'Thanks! We will contact you soon.',
            ERROR_MESSAGE: 'An error occurred. Please try again.'
        },
        CONTACT_FORM: {
            REQUIRED_FIELDS: ['name', 'email', 'phone', 'message'],
            SUCCESS_MESSAGE: 'Message sent successfully.',
            ERROR_MESSAGE: 'Error sending message.'
        }
    },

    // Analytics
    ANALYTICS: {
        GOOGLE_ANALYTICS_ID: '',
        FACEBOOK_PIXEL_ID: '',
        TRACK_EVENTS: true
    },

    // SEO & Meta
    SEO: {
        SITE_NAME: 'Provivir Panama',
        DEFAULT_TITLE: 'Provivir - Tu Nuevo Hogar Esta Mas Cerca',
        DEFAULT_DESCRIPTION: 'Soluciones de vivienda asequible con subsidios gubernamentales',
        DEFAULT_IMAGE: '/assets/images/og-image.jpg',
        TWITTER_HANDLE: '@provivirpanama'
    },

    // Contact Information
    CONTACT: {
        PHONE: '390-9094',
        PHONE_SECONDARY: '6371-2652',
        EMAIL: 'ventas2@provivirpanama.com',
        ADDRESS: 'Iglesia del Carmen, PH Beta 120, Via Espana y Alquilino de la Guardia Diagonal a Canal Bank. Estacion del Metro',
        WHATSAPP: '+50763712652',
        GOOGLE_MAPS: 'https://g.co/kgs/jXG9nqx',
        SOCIAL: {
            YOUTUBE: 'https://www.youtube.com/c/ProvivirPanama',
            FACEBOOK: 'https://www.facebook.com/provivirpanama/',
            INSTAGRAM: 'https://www.instagram.com/provivir/',
            TIKTOK: 'https://www.tiktok.com/@provivirpanama',
            TWITTER: 'https://x.com/provivirpanama'
        }
    }
};

// Freeze configuration to prevent modifications
Object.freeze(CONFIG);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
