/**
 * ============================================================================
 * FORM HANDLER - Lead capture and contact forms
 * ============================================================================
 */

const FormHandler = (() => {
    const leadForm = document.getElementById('leadForm');
    const emailInput = document.getElementById('emailInput');
    const formSuccess = document.getElementById('formSuccess');
    
    /**
     * Validate email format
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    /**
     * Show error message
     */
    const showError = (input, message) => {
        input.classList.add('error');
        
        // Remove existing error message if any
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--color-error)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--spacing-xs)';
        
        input.parentElement.appendChild(errorDiv);
    };
    
    /**
     * Clear error message
     */
    const clearError = (input) => {
        input.classList.remove('error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    };
    
    /**
     * Show loading state
     */
    const setLoading = (form, isLoading) => {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.dataset.originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || 'Enviar';
        }
    };
    
    /**
     * Show success message
     */
    const showSuccess = () => {
        if (!leadForm || !formSuccess) return;
        
        leadForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        formSuccess.style.flexDirection = 'column';
        formSuccess.style.alignItems = 'center';
        formSuccess.style.gap = 'var(--spacing-md)';
        formSuccess.style.padding = 'var(--spacing-2xl)';
        formSuccess.style.textAlign = 'center';
        
        // Reset form after delay
        setTimeout(() => {
            formSuccess.style.display = 'none';
            leadForm.style.display = 'block';
            leadForm.reset();
        }, 5000);
    };
    
    /**
     * Get URL parameters for tracking
     */
    const getUTMParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || ''
        };
    };
    
    /**
     * Handle lead form submission
     */
    const handleLeadFormSubmit = async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Clear previous errors
        clearError(emailInput);
        
        // Validate email
        if (!email) {
            showError(emailInput, 'Por favor ingresa tu correo electrónico');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError(emailInput, 'Por favor ingresa un correo electrónico válido');
            return;
        }
        
        // Prepare data
        const leadData = {
            email: email,
            source: 'landing_cta',
            property_id: sessionStorage.getItem('selectedPropertyId') || null,
            ...getUTMParams()
        };
        
        // Set loading state
        setLoading(leadForm, true);
        
        try {
            const response = await API.submitLead(leadData);
            
            if (response.success) {
                showSuccess();
                
                // Track conversion if analytics enabled
                if (CONFIG.FEATURES.ANALYTICS && window.gtag) {
                    gtag('event', 'lead_submission', {
                        'event_category': 'engagement',
                        'event_label': 'cta_form'
                    });
                }
            } else {
                showError(emailInput, response.error || CONFIG.FORMS.LEAD_FORM.ERROR_MESSAGE);
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
            showError(emailInput, CONFIG.FORMS.LEAD_FORM.ERROR_MESSAGE);
        } finally {
            setLoading(leadForm, false);
        }
    };
    
    /**
     * Initialize form handler
     */
    const init = () => {
        if (!leadForm) return;
        
        // Lead form submission
        leadForm.addEventListener('submit', handleLeadFormSubmit);
        
        // Clear errors on input
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                clearError(emailInput);
            });
        }
    };
    
    // Public API
    return {
        init
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', FormHandler.init);
} else {
    FormHandler.init();
}