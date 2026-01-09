/**
 * ============================================================================
 * CONFIGURATION FILE - Provivir Panama
 * ============================================================================
 */

const CONFIG = {
    // Environment (development | production)
    ENVIRONMENT: 'development', // Cambiar a 'production' antes del deploy
    
    // API Configuration
    API: {
        BASE_URL: '/api', // Cambiar según tu servidor
        ENDPOINTS: {
            PROPERTIES: '/properties.php',
            TESTIMONIALS: '/testimonials.php',
            LEADS: '/leads.php',
            CONTACT: '/contact.php'
        },
        TIMEOUT: 10000, // 10 segundos
        RETRY_ATTEMPTS: 3
    },

    // CMS Configuration (para integración futura con Strapi u otro)
    CMS: {
        ENABLED: true,
        BASE_URL: '/cms', // URL de tu CMS headless
        API_KEY: '', // Tu API key del CMS
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
        TESTIMONIALS_PER_PAGE: 3,
    },

    // Form Settings
    FORMS: {
        LEAD_FORM: {
            REQUIRED_FIELDS: ['email'],
            SUCCESS_MESSAGE: '¡Gracias! Un asesor se contactará pronto.',
            ERROR_MESSAGE: 'Ocurrió un error. Por favor intenta de nuevo.'
        },
        CONTACT_FORM: {
            REQUIRED_FIELDS: ['name', 'email', 'phone', 'message'],
            SUCCESS_MESSAGE: 'Mensaje enviado exitosamente.',
            ERROR_MESSAGE: 'Error al enviar el mensaje.'
        }
    },

    // Analytics
    ANALYTICS: {
        GOOGLE_ANALYTICS_ID: '', // Tu GA4 ID
        FACEBOOK_PIXEL_ID: '', // Tu Facebook Pixel ID
        TRACK_EVENTS: true
    },

    // SEO & Meta
    SEO: {
        SITE_NAME: 'Provivir Panamá',
        DEFAULT_TITLE: 'Provivir - Tu Nuevo Hogar Está Más Cerca',
        DEFAULT_DESCRIPTION: 'Soluciones de vivienda asequibles con subsidios gubernamentales',
        DEFAULT_IMAGE: '/assets/images/og-image.jpg',
        TWITTER_HANDLE: '@provivirpanama'
    },

    // Contact Information (DATOS REALES del sitio)
    CONTACT: {
        PHONE: '390-9094',
        PHONE_SECONDARY: '6371-2652',
        EMAIL: 'ventas2@provivirpanama.com',
        ADDRESS: 'Iglesia del Carmen, PH Beta 120, Vía España y Alquilino de la Guardia Diagonal a Canal Bank. Estación del Metro',
        WHATSAPP: '+50763712652',
        GOOGLE_MAPS: 'https://g.co/kgs/jXG9nqx',
        SOCIAL: {
            YOUTUBE: 'https://www.youtube.com/c/ProvivirPanamá',
            FACEBOOK: 'https://facebook.com/provivirpanama',
            INSTAGRAM: 'https://instagram.com/provivirpanama'
        }
    }
};

// Freeze configuration to prevent modifications
Object.freeze(CONFIG);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}