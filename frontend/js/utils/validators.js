/**
 * ============================================================================
 * VALIDATORS - Form validation utilities
 * ============================================================================
 */

const Validators = (() => {
    
    /**
     * Validate email format
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    /**
     * Validate phone number (Panama format)
     */
    const isValidPhone = (phone) => {
        // Panama phone format: +507 1234-5678 or 12345678
        const phoneRegex = /^(\+507)?[\s-]?\d{4}[\s-]?\d{4}$/;
        return phoneRegex.test(phone);
    };
    
    /**
     * Validate name (letters, spaces, accents only)
     */
    const isValidName = (name) => {
        const nameRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]{2,50}$/;
        return nameRegex.test(name);
    };
    
    /**
     * Validate required field
     */
    const isRequired = (value) => {
        return value && value.trim().length > 0;
    };
    
    /**
     * Validate minimum length
     */
    const minLength = (value, min) => {
        return value && value.trim().length >= min;
    };
    
    /**
     * Validate maximum length
     */
    const maxLength = (value, max) => {
        return value && value.trim().length <= max;
    };
    
    /**
     * Validate numeric value
     */
    const isNumeric = (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    
    /**
     * Validate positive number
     */
    const isPositive = (value) => {
        return isNumeric(value) && parseFloat(value) > 0;
    };
    
    /**
     * Sanitize HTML input (basic XSS prevention)
     */
    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };
    
    /**
     * Validate form fields
     */
    const validateForm = (formData, rules) => {
        const errors = {};
        
        for (const [field, value] of Object.entries(formData)) {
            const fieldRules = rules[field];
            
            if (!fieldRules) continue;
            
            // Required validation
            if (fieldRules.required && !isRequired(value)) {
                errors[field] = `${field} es requerido`;
                continue;
            }
            
            // Skip other validations if field is empty and not required
            if (!value && !fieldRules.required) continue;
            
            // Email validation
            if (fieldRules.email && !isValidEmail(value)) {
                errors[field] = 'Correo electrónico inválido';
            }
            
            // Phone validation
            if (fieldRules.phone && !isValidPhone(value)) {
                errors[field] = 'Número de teléfono inválido';
            }
            
            // Name validation
            if (fieldRules.name && !isValidName(value)) {
                errors[field] = 'Nombre inválido';
            }
            
            // Min length validation
            if (fieldRules.minLength && !minLength(value, fieldRules.minLength)) {
                errors[field] = `Mínimo ${fieldRules.minLength} caracteres`;
            }
            
            // Max length validation
            if (fieldRules.maxLength && !maxLength(value, fieldRules.maxLength)) {
                errors[field] = `Máximo ${fieldRules.maxLength} caracteres`;
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };
    
    // Public API
    return {
        isValidEmail,
        isValidPhone,
        isValidName,
        isRequired,
        minLength,
        maxLength,
        isNumeric,
        isPositive,
        sanitizeHTML,
        validateForm
    };
})();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validators;
}