/**
 * ============================================================================
 * FORM HANDLER - Lead capture and contact forms
 * ============================================================================
 */

const FormHandler = (() => {
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');
    const formFeedback = document.getElementById('formFeedback');
    
    /**
     * Mapping of project slugs to database property IDs
     */
    const PROJECT_SLUG_TO_ID = {
        'villas-del-este-modelo-roble': 1,
        'villas-del-este-modelo-cerezo': 2,
        'ciudad-del-este-modelo-cordoba': 3,
        'ciudad-del-este-modelo-granada': 4,
        'area-este': null,
        'area-oeste': null
    };

    const PROJECT_LABELS = {
        'area-este': 'Área Este',
        'area-oeste': 'Área Oeste',
        'villas-del-este-modelo-roble': 'Villas del Este - Modelo Roble',
        'villas-del-este-modelo-cerezo': 'Villas del Este - Modelo Cerezo',
        'ciudad-del-este-modelo-cordoba': 'Ciudad del Este - Modelo Córdoba',
        'ciudad-del-este-modelo-granada': 'Ciudad del Este - Modelo Granada'
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
        const phoneRegex = /^(\+507)?[\s-]?\d{4}[\s-]?\d{4}$/;
        return phoneRegex.test(phone);
    };
    
    /**
     * Show error message
     */
    const showError = (input, message) => {
        input.classList.add('error');
        if (input.parentElement && input.parentElement.classList.contains('input-with-prefix')) {
            input.parentElement.classList.add('error');
        }
        
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
        if (input.parentElement && input.parentElement.classList.contains('input-with-prefix')) {
            input.parentElement.classList.remove('error');
        }
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
     * Show feedback message (error or success)
     */
    const showFeedback = (message, type = 'error') => {
        if (!formFeedback) return;

        formFeedback.textContent = message;
        formFeedback.className = `form-feedback form-feedback--${type}`;
        
        // Hide after 5 seconds
        setTimeout(() => {
            formFeedback.className = 'form-feedback';
        }, 5000);
    };
    
    /**
     * Show success message
     */
    const showSuccess = () => {
        if (!leadForm || !formSuccess) return;
        
        leadForm.style.display = 'none';
        formSuccess.classList.remove('hidden');
        formSuccess.style.display = 'flex';
        // El mensaje de éxito ahora es permanente para dar mayor confianza.
    };
    
    /**
     * Get URL parameters for tracking
     */
    const getUTMParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || '',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || '',
            utm_id: params.get('utm_id') || '',
            gclid: params.get('gclid') || '',
            fbclid: params.get('fbclid') || '',
            ttclid: params.get('ttclid') || '',
            msclkid: params.get('msclkid') || '',
            landing_page: window.location.href,
            referrer: document.referrer || ''
        };
    };
    
    /**
     * Validate form data
     */
    const validateForm = (formData) => {
        let isValid = true;
        const inputs = leadForm.querySelectorAll('input, select, textarea');
        const projectFieldset = leadForm.querySelector('.radio-group');
        
        // Clear all errors first
        inputs.forEach(input => clearError(input));
        if (projectFieldset) {
            clearError(projectFieldset);
        }
        
        // Validate full name
        const fullName = formData.get('fullName');
        const fullNameInput = leadForm.querySelector('#fullName');
        if (!fullName || fullName.trim().length < 3) {
            showError(fullNameInput, 'Necesitamos tu nombre completo para saber con quién hablamos');
            isValid = false;
        }
        
        // Validate email
        const email = formData.get('email');
        const emailInput = leadForm.querySelector('#email');
        if (!email) {
            showError(emailInput, 'No olvides dejarnos tu correo');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Parece que tu correo tiene un error, revísalo por favor');
            isValid = false;
        }
        
        // Validate phone
        const phone = formData.get('phone');
        const phoneInput = leadForm.querySelector('#phone');
        if (!phone) {
            showError(phoneInput, 'Necesitamos tu teléfono para poder contactarte');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError(phoneInput, 'Verifica el formato, ej: 6123-4567');
            isValid = false;
        }
        
        // Validate salary
        const salary = formData.get('salary');
        const salaryInput = leadForm.querySelector('#salary');
        if (!salary || Number(salary) <= 0) {
            showError(salaryInput, 'Ingresa tu salario mensual para evaluar tu perfil');
            isValid = false;
        }

        // Validate project location
        const projectLocation = formData.get('project');
        if (!projectLocation) {
            if (projectFieldset) {
                showError(projectFieldset, 'Selecciona la ubicación del proyecto que prefieres');
            }
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
        const projectLabel = PROJECT_LABELS[projectSlug] || projectSlug || 'No especificado';
        const salaryValue = formData.get('salary') ? String(formData.get('salary')).trim() : '';
        const generatedMessage = `Lead web - Ubicación de proyecto: ${projectLabel}. Salario mensual: USD ${salaryValue || 'No especificado'}.`;
        
        // Prepare data - Only send fields that backend expects
        const utmParams = getUTMParams();

        const leadData = {
            name: formData.get('fullName').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim(),
            message: generatedMessage,
            property_id: propertyId,
            salary: salaryValue || null,
            employment: null,
            advisor: null,
            project: projectSlug || '',
            website: formData.get('website') || '',
            utm_source: utmParams.utm_source,
            utm_medium: utmParams.utm_medium,
            utm_campaign: utmParams.utm_campaign,
            utm_term: utmParams.utm_term,
            utm_content: utmParams.utm_content,
            utm_id: utmParams.utm_id,
            gclid: utmParams.gclid,
            fbclid: utmParams.fbclid,
            ttclid: utmParams.ttclid,
            msclkid: utmParams.msclkid,
            landing_page: utmParams.landing_page,
            referrer: utmParams.referrer
        };
        
        // Set loading state
        setLoading(leadForm, true);
        
        // ✅ Removed IS_VERCEL check - API now available in all environments
        
        try {
            const response = await API.submitLead(leadData);
            
            if (response.success) {
                showSuccess();

                if (window.dataLayer && Array.isArray(window.dataLayer)) {
                    window.dataLayer.push({
                        event: 'lead_submission',
                        event_category: 'engagement',
                        event_label: 'contact_form',
                        lead_project_slug: leadData.project,
                        lead_property_id: leadData.property_id,
                        utm_source: leadData.utm_source,
                        utm_medium: leadData.utm_medium,
                        utm_campaign: leadData.utm_campaign,
                        utm_term: leadData.utm_term,
                        utm_content: leadData.utm_content,
                        utm_id: leadData.utm_id,
                        gclid: leadData.gclid,
                        fbclid: leadData.fbclid,
                        ttclid: leadData.ttclid,
                        msclkid: leadData.msclkid,
                        value: 1,
                        currency: 'USD'
                    });

                    window.dataLayer.push({
                        event: 'generate_lead',
                        lead_project_slug: leadData.project,
                        lead_property_id: leadData.property_id,
                        value: 1,
                        currency: 'USD'
                    });
                }
                
                // Track conversion if analytics enabled
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'lead_submission', {
                        'event_category': 'engagement',
                        'event_label': 'contact_form',
                        'value': leadData.property_id
                    });
                }
            } else {
                showFeedback(response.error || 'Hubo un error al enviar el formulario. Por favor intenta de nuevo.', 'error');
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
            showFeedback('Hubo un error de conexión. Por favor revisa tu internet y vuelve a intentarlo.', 'error');
        } finally {
            setLoading(leadForm, false);
        }
    };
    
    /**
     * Handle advisor button clicks
     */
    const handleAdvisorSelection = () => {
        const advisorButtons = document.querySelectorAll('[data-advisor]');
        const advisorSelect = document.getElementById('advisor');
        
        if (!advisorSelect) return;
        
        advisorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const advisorName = button.dataset.advisor;
                if (advisorName) {
                    // Pre-select the advisor in the form
                    advisorSelect.value = advisorName;
                    
                    // Add a visual feedback (optional)
                    advisorSelect.classList.add('pre-selected');
                    setTimeout(() => {
                        advisorSelect.classList.remove('pre-selected');
                    }, 1000);
                }
            });
        });
    };
    
    /**
     * Initialize form handler
     */
    const init = () => {
        if (!leadForm) return;
        
        // Lead form submission
        leadForm.addEventListener('submit', handleLeadFormSubmit);
        
        // Handle advisor selection from team section
        handleAdvisorSelection();
        
        // Clear errors on input and add real-time validation on blur
        const inputs = leadForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearError(input);
            });
            
            input.addEventListener('change', () => {
                clearError(input);
            });

            // Real-time validation on blur
            input.addEventListener('blur', (e) => {
                const val = e.target.value;
                if (!val) return; // Skip if empty (let submit validation handle "required")

                if (e.target.id === 'email' && !isValidEmail(val)) {
                    showError(e.target, 'Parece que tu correo tiene un error, revísalo por favor');
                } else if (e.target.id === 'phone' && !isValidPhone(val)) {
                    showError(e.target, 'Verifica el formato, ej: +507 XXXX-XXXX');
                } else if (e.target.id === 'salary' && Number(val) <= 0) {
                    showError(e.target, 'Ingresa un salario mensual válido');
                }
            });
        });
        
        const projectRadios = leadForm.querySelectorAll('input[name="project"]');
        const projectFieldset = leadForm.querySelector('.radio-group');
        if (projectFieldset) {
            projectRadios.forEach((radio) => {
                radio.addEventListener('change', () => {
                    clearError(projectFieldset);
                });
            });
        }

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
