/**
 * Main JavaScript for Bright Smile Dental Landing Page
 * - Mobile navigation toggle with scroll lock
 * - Smooth scroll with header offset
 * - Form validation
 * - Sticky header scroll behavior
 * - Current year in footer
 */

(function() {
  'use strict';

  // ============================================
  // Mobile Navigation Toggle
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.header');
  let isMenuOpen = false;

  /**
   * Toggle mobile menu open/closed
   */
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('is-active');
    
    // Toggle body scroll lock
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Update hamburger animation
    if (isMenuOpen) {
      navToggle.querySelector('.hamburger').setAttribute('aria-label', 'Close menu');
    } else {
      navToggle.querySelector('.hamburger').setAttribute('aria-label', 'Open menu');
    }
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-active');
    document.body.style.overflow = '';
    navToggle.querySelector('.hamburger').setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && navMenu) {
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        navToggle.focus(); // Return focus to toggle button
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
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
  const HEADER_HEIGHT = 80; // Sticky header height in pixels

  /**
   * Smooth scroll to an element with header offset
   * @param {string} targetId - The ID of the target element (with #)
   */
  function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update URL hash without jump
    if (history.pushState) {
      history.pushState(null, null, targetId);
    }
  }

  // Handle anchor link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#main') {
        // For skip link or empty hash, just scroll to top
        if (targetId === '#main') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        smoothScrollTo(targetId);
      }
    });
  });

  // Handle initial hash on page load
  if (window.location.hash) {
    // Wait for page to fully load
    setTimeout(() => {
      smoothScrollTo(window.location.hash);
    }, 100);
  }

  // ============================================
  // Sticky Header Scroll Behavior
  // ============================================
  let lastScrollY = window.scrollY;
  let ticking = false;

  /**
   * Update header state based on scroll position
   */
  function updateHeaderOnScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // Add shadow when scrolled past header
    if (currentScrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    // Optional: Hide header on scroll down, show on scroll up
    // This adds 'is-hidden' class when scrolling down past threshold
    if (currentScrollY > 100 && scrollDelta > 0 && !isMenuOpen) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  /**
   * Throttle scroll event using requestAnimationFrame
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderOnScroll);
      ticking = true;
    }
  }

  if (header) {
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initialize header state
    updateHeaderOnScroll();
  }

})();