# Testing Documentation

## Overview
This document outlines the testing strategy and coverage for the contact page website.

## Test Coverage Areas

### 1. Mobile Navigation Toggle
- [ ] Menu opens when hamburger icon is clicked
- [ ] Menu closes when close button is clicked
- [ ] Body scroll is disabled when menu is open
- [ ] Body scroll is enabled when menu is closed
- [ ] ARIA attributes update correctly on toggle

### 2. Contact Form Validation
- [ ] First name validation (min/max length, required)
- [ ] Last name validation (min/max length, required)
- [ ] Email validation (format check)
- [ ] Phone number validation (format check)
- [ ] Message field validation (required, min length)

### 3. Form Error Handling
- [ ] Error messages display in correct form groups
- [ ] Error classes are applied correctly (.has-error)
- [ ] Success classes are removed when errors appear
- [ ] Errors clear after successful submission

### 4. Smooth Scrolling
- [ ] Scroll to section anchors works smoothly
- [ ] Header offset is calculated correctly
- [ ] Target elements scroll into view properly

### 5. Header Behavior
- [ ] Header shadow appears on scroll (>10px)
- [ ] Header shadow disappears at top of page
- [ ] .is-scrolled class toggles correctly

## Test Environment
- Browser: Chrome, Firefox, Safari, Edge
- Devices: Desktop, Tablet, Mobile
- Screen sizes: 320px to 4K resolution

## Running Tests
