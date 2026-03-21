# Architecture Decision Record - Bright Smile Dental

**Status:** Approved  
**Date:** 2026-03-21  
**Decision Maker:** CTO

## 1. Technical Stack

### Decision: Static Site Generator (SSG) - Pure HTML/CSS/JS

**Rationale:**
- **Performance:** No build step, instant page loads, minimal bundle size
- **Simplicity:** No framework overhead, easy to maintain
- **Deployment:** Direct static hosting on Netlify/Vercel/Cloudflare Pages
- **Cost:** Free tier sufficient, no server costs
- **SEO:** Static HTML = perfect crawlability

**Alternatives Considered:**
| Option | Rejected Because |
|--------|------------------|
| React/Next.js | Overkill for single landing page, adds bundle overhead |
| Gatsby | Build complexity not justified for simple content |
| WordPress | Security concerns, hosting costs, over-engineered |
| Astro | Learning curve, build step adds complexity |

### Tech Stack Summary

```
HTML5 (semantic) + CSS3 (mobile-first) + Vanilla JS + Netlify Forms
```

## 2. Project Structure

```
dentist/
├── index.html              # Main entry point
├── css/
│   ├── base.css           # Reset, variables, typography
│   ├── layout.css         # Grid, containers, sections
│   ├── components.css     # Reusable UI components
│   └── styles.css         # Main entry (imports others)
├── js/
│   └── main.js            # Interactions (menu, form, scroll)
├── images/
│   ├── logo.svg
│   ├── hero/
│   └── icons/
├── robots.txt
├── sitemap.xml
├── ARCHITECTURE.md
└── README.md
```

## 3. Page Sections (7 Total)

| Section | ID | Purpose | Priority |
|---------|----|---------|---------|
| Header | `#header` | Logo, nav, CTA button | P0 |
| Hero | `#hero` | Practice name, tagline, book CTA | P0 |
| Services | `#services` | 6-8 dental services cards | P0 |
| About | `#about` | Dentist bio, credentials | P0 |
| Trust Signals | `#trust` | Insurance, testimonials, stats | P1 |
| Contact | `#contact` | Form, address, hours, map | P0 |
| Footer | `#footer` | Links, social, copyright | P1 |

## 4. Non-Functional Requirements

### Performance Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Lighthouse Performance: ≥ 90

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Color contrast ratio ≥ 4.5:1
- Focus indicators visible

### SEO
- Semantic HTML5 structure
- Meta tags (title, description, OG, Twitter)
- Structured data (LocalBusiness schema)
- sitemap.xml
- robots.txt

### Responsive Breakpoints
```css
/* Mobile-first */
@media (min-width: 480px)  { /* Small phones landscape */ }
@media (min-width: 768px)  { /* Tablets */ }
@media (min-width: 1024px) { /* Laptops */ }
@media (min-width: 1280px) { /* Desktops */ }
```

## 5. Form Strategy

**Decision:** Netlify Forms (serverless, no backend)

**Why:**
- No backend code needed
- Built-in spam protection (honeypot + reCAPTCHA option)
- Email notifications included
- Free tier: 100 submissions/month

**Implementation:**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- form fields -->
</form>
```

## 6. Deployment Pipeline

```
git push → Netlify auto-deploy → HTTPS enabled → Live
```

**Branch Strategy:**
- `main` → production
- `task/*` → feature branches (one per issue)

## 7. Testing Strategy

| Type | Tool | Owner | When |
|------|------|-------|------|
| Manual Browser | Dev tools | Frontend | During dev |
| Accessibility | axe DevTools, WAVE | QA | Before merge |
| Performance | Lighthouse | QA | Before merge |
| Cross-browser | Manual (Chrome, FF, Safari, Edge) | QA | Before merge |
| Mobile | Chrome DevTools + real device | QA | Before merge |

## 8. Milestones

### Milestone 1: Foundation (M1)
**Goal:** Basic structure and styling
**Tasks:**
- HTML structure with all 7 sections
- Mobile-first CSS base styles
- Responsive layout

### Milestone 2: Content & Interactions (M2)
**Goal:** Complete user experience
**Tasks:**
- All content populated
- JavaScript interactions
- Contact form integration

### Milestone 3: Quality & Deploy (M3)
**Goal:** Production-ready
**Tasks:**
- SEO implementation
- Accessibility audit
- Performance optimization
- Deployment to production

## 9. Rollback Notes

**If issues arise:**
1. Git revert to last known good commit
2. Netlify allows instant rollback to previous deploy
3. No database/data migration concerns (static site)

---

**Next Step:** Create implementation tasks with explicit owner assignments.