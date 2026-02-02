/**
 * ============================================================================
 * FORM HANDLER - Lead capture and contact forms
 * ============================================================================
 */

const FormHandler = (() => {
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');
    
    /**
     * Mapping of project slugs to database property IDs
     */
    const PROJECT_SLUG_TO_ID = {
        'altos-guayacanes': 8,      // Altos de los Guayacanes
        'ciudad-del-este': 1,       // Ciudad del Este
        'colinas-este': 5,          // Colinas del Este
        'villas-este': 3,           // Villas del Este
        'villas-oeste': 4            // Villas del Oeste
    };
    
    /**
     * Validate email format
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    /**
     * Validate phone format
     */
    const isValidPhone = (phone) => {
        const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
        return phoneRegex.test(phone);
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
            submitButton.innerHTML = '<span>Enviando...</span>';
            submitButton.style.opacity = '0.7';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.originalText || 'Enviar';
            submitButton.style.opacity = '1';
        }
    };
    
    /**
     * Show success message
     */
    const showSuccess = () => {
        if (!leadForm || !formSuccess) return;
        
        leadForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        
        // Reset form after delay
        setTimeout(() => {
            formSuccess.style.display = 'none';
            leadForm.style.display = 'flex';
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
     * Validate form data
     */
    const validateForm = (formData) => {
        let isValid = true;
        const inputs = leadForm.querySelectorAll('input, select, textarea');
        
        // Clear all errors first
        inputs.forEach(input => clearError(input));
        
        // Validate full name
        const fullName = formData.get('fullName');
        const fullNameInput = leadForm.querySelector('#fullName');
        if (!fullName || fullName.trim().length < 3) {
            showError(fullNameInput, 'Por favor ingresa tu nombre completo');
            isValid = false;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailInput = leadForm.querySelector('#email');
        if (!email) {
            showError(emailInput, 'Por favor ingresa tu correo electrónico');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Por favor ingresa un correo electrónico válido');
            isValid = false;
        }
        
        // Validate phone
        const phone = formData.get('phone');
        const phoneInput = leadForm.querySelector('#phone');
        if (!phone) {
            showError(phoneInput, 'Por favor ingresa tu teléfono');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError(phoneInput, 'Por favor ingresa un teléfono válido');
            isValid = false;
        }
        
        // Validate project
        const project = formData.get('project');
        const projectInput = leadForm.querySelector('#project');
        if (!project) {
            showError(projectInput, 'Por favor selecciona un proyecto');
            isValid = false;
        }
        
        // Validate message
        const message = formData.get('message');
        const messageInput = leadForm.querySelector('#message');
        if (!message || message.trim().length < 10) {
            showError(messageInput, 'Por favor ingresa un mensaje de al menos 10 caracteres');
            isValid = false;
        }
        
        // Validate terms
        const terms = formData.get('terms');
        const termsInput = leadForm.querySelector('input[name="terms"]');
          if (!terms) {
            showError(termsInput, 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        return isValid;
    };
    
    /**
     * Handle lead form submission
     */
    const handleLeadFormSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(leadForm);
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Get project slug from form
        const projectSlug = formData.get('project');
        const propertyId = projectSlug ? PROJECT_SLUG_TO_ID[projectSlug] || null : null;
        
        // Prepare data - Only send fields that backend expects
        const leadData = {
            name: formData.get('fullName').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            message: formData.get('message').trim(),
            property_id: propertyId
        };
        
        // Set loading state
        setLoading(leadForm, true);
        
        // ✅ Removed IS_VERCEL check - API now available in all environments
        
        try {
            const response = await API.submitLead(leadData);
            
            if (response.success) {
                showSuccess();
                
                // Track conversion if analytics enabled
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'lead_submission', {
                        'event_category': 'engagement',
                        'event_label': 'contact_form',
                        'value': leadData.property_id
                    });
                }
            } else {
                alert(response.error || 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
            alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
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
        const inputs = leadForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearError(input);
            });
            
            input.addEventListener('change', () => {
                clearError(input);
            });
        });
        
        console.log('Form handler initialized');
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
