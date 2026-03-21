/**
 * Main JavaScript for Bright Smile Dental Landing Page
 * - Mobile navigation toggle
 * - Form validation
 * - Current year in footer
 */

(function() {
  'use strict';

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-active');
      });
    });
  }

  // ============================================
  // Current Year in Footer
  // ============================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ============================================
  // Form Validation
  // ============================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    // Validation configuration
    const validators = {
      firstName: {
        validate: (value) => {
          if (!value.trim()) return 'First name is required';
          if (value.trim().length < 2) return 'First name must be at least 2 characters';
          if (value.trim().length > 50) return 'First name must be less than 50 characters';
          return '';
        }
      },
      lastName: {
        validate: (value) => {
          if (!value.trim()) return 'Last name is required';
          if (value.trim().length < 2) return 'Last name must be at least 2 characters';
          if (value.trim().length > 50) return 'Last name must be less than 50 characters';
          return '';
        }
      },
      email: {
        validate: (value) => {
          if (!value.trim()) return 'Email is required';
          // Use browser's email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return 'Please enter a valid email address';
          return '';
        }
      },
      phone: {
        validate: (value) => {
          if (!value.trim()) return ''; // Optional field
          // Allow various phone formats
          const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            return 'Please enter a valid phone number';
          }
          return '';
        }
      },
      message: {
        validate: (value) => {
          if (!value.trim()) return 'Message is required';
          if (value.trim().length < 10) return 'Message must be at least 10 characters';
          if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
          return '';
        }
      }
    };

    /**
     * Show error message for a field
     * @param {HTMLElement} field - The input field
     * @param {string} message - Error message to display
     */
    function showError(field, message) {
      const formGroup = field.closest('.form-group');
      const errorElement = document.getElementById(`${field.id}-error`);
      
      if (formGroup) {
        formGroup.classList.remove('has-success');
        formGroup.classList.add('has-error');
      }
      
      if (errorElement) {
        errorElement.textContent = message;
      }
      
      field.setAttribute('aria-invalid', 'true');
    }

    /**
     * Clear error message for a field
     * @param {HTMLElement} field - The input field
     */
    function clearError(field) {
      const formGroup = field.closest('.form-group');
      const errorElement = document.getElementById(`${field.id}-error`);
      
      if (formGroup) {
        formGroup.classList.remove('has-error');
      }
      
      if (errorElement) {
        errorElement.textContent = '';
      }
      
      field.removeAttribute('aria-invalid');
    }

    /**
     * Show success state for a field
     * @param {HTMLElement} field - The input field
     */
    function showSuccess(field) {
      const formGroup = field.closest('.form-group');
      
      if (formGroup) {
        formGroup.classList.remove('has-error');
        formGroup.classList.add('has-success');
      }
      
      clearError(field);
    }

    /**
     * Validate a single field
     * @param {HTMLElement} field - The input field to validate
     * @returns {boolean} - Whether the field is valid
     */
    function validateField(field) {
      const fieldName = field.name;
      const validator = validators[fieldName];
      
      if (!validator) return true;
      
      const errorMessage = validator.validate(field.value);
      
      if (errorMessage) {
        showError(field, errorMessage);
        return false;
      } else if (field.value.trim()) {
        showSuccess(field);
        return true;
      } else {
        clearError(field);
        return !field.required;
      }
    }

    /**
     * Validate the entire form
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm() {
      let isValid = true;
      const fields = contactForm.querySelectorAll('input, textarea, select');
      
      fields.forEach(field => {
        if (field.type === 'hidden' || field.type === 'checkbox') return;
        
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      return isValid;
    }

    // Real-time validation on blur
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      if (field.type === 'hidden' || field.type === 'checkbox') return;
      
      field.addEventListener('blur', function() {
        if (this.value.trim() || this.required) {
          validateField(this);
        }
      });
      
      // Clear error on input
      field.addEventListener('input', function() {
        if (this.closest('.form-group')?.classList.contains('has-error')) {
          clearError(this);
        }
      });
    });

    // Form submission
    contactForm.addEventListener('submit', function(event) {
      // Validate all fields
      const isValid = validateForm();
      
      if (!isValid) {
        event.preventDefault();
        
        // Focus first invalid field
        const firstError = contactForm.querySelector('.has-error input, .has-error textarea, .has-error select');
        if (firstError) {
          firstError.focus();
        }
        
        return;
      }
      
      // If valid, let Netlify handle the submission
      // The form will submit to Netlify and redirect to /thank-you
    });

    // Set minimum date for preferred date field (today)
    const preferredDate = document.getElementById('preferredDate');
    if (preferredDate) {
      const today = new Date().toISOString().split('T')[0];
      preferredDate.setAttribute('min', today);
    }
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();