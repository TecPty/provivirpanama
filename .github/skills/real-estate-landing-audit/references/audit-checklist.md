# Comprehensive Audit Checklist

Use this as a systematic checklist when performing audits. Check off items as you review.

## Hero Section Audit

### Copy & Messaging
- [ ] Headline clearly communicates primary value proposition
- [ ] Subheadline addresses qualification criteria
- [ ] Spanish copy is natural and culturally appropriate
- [ ] CTA button text is action-oriented and specific
- [ ] Secondary CTA provides alternative path
- [ ] Pain points are addressed (financial accessibility)
- [ ] Trust builders are present (years in business, homes sold)

### Video & Media
- [ ] Video has appropriate fallback for low bandwidth
- [ ] Poster image is optimized and meaningful
- [ ] Video doesn't autoplay audio (accessibility)
- [ ] Reduced motion preferences are respected
- [ ] Mobile video is appropriately sized/cropped
- [ ] Loading state provides clear indication
- [ ] Video enhances rather than distracts from message

### Accessibility
- [ ] Focus order is logical
- [ ] Skip link present for keyboard users
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Text remains readable with video background
- [ ] CTAs have sufficient touch target size (44x44px minimum)

---

## Projects Section Audit

### Information Architecture
- [ ] Projects are presented in priority order
- [ ] Each card has consistent structure
- [ ] Location is prominently displayed
- [ ] Price range is clear and formatted correctly
- [ ] Key benefits are scannable (bullets)
- [ ] Financing requirements are transparent
- [ ] Availability status is current

### Interaction & UX
- [ ] Cards have hover/focus states
- [ ] "View details" expands or navigates correctly
- [ ] CTA button is contextually specific ("Apply to Villas del Este")
- [ ] Modal/expansion behavior is accessible
- [ ] Images load lazily
- [ ] Loading skeleton is present
- [ ] Mobile card layout is thumb-friendly

### Content Quality
- [ ] Images are high-quality and representative
- [ ] Alt text describes property meaningfully
- [ ] No marketing jargon without explanation
- [ ] Square footage/bedroom counts are consistent
- [ ] Amenities list is comprehensive but concise

---

## Financial Partners Section Audit

### Trust Building
- [ ] Bank logos are recognizable and current
- [ ] Order reflects actual partnership strength/popularity
- [ ] Size/prominence matches brand recognition
- [ ] Microcopy explains partnership value
- [ ] Section heading emphasizes credibility
- [ ] Links to partner sites open in new tab

### Visual Design
- [ ] Logos are consistent in visual weight
- [ ] Adequate spacing prevents crowding
- [ ] Background provides sufficient contrast
- [ ] Layout adapts well to mobile (2x2 vs horizontal)
- [ ] No distortion or pixelation

### Messaging
- [ ] Copy emphasizes "we work with" not "we are"
- [ ] Benefit to user is clear ("multiple financing options")
- [ ] Positioned before or after projects strategically
- [ ] Builds confidence without slowing momentum

---

## Sales Team Section Audit

### Carousel Functionality
- [ ] Swipe gestures work smoothly on mobile
- [ ] Pagination indicators are visible
- [ ] Auto-advance is optional/pausable
- [ ] Keyboard navigation works (arrow keys)
- [ ] Focus trap doesn't prevent exit
- [ ] Respects prefers-reduced-motion

### Content Presentation
- [ ] Advisor photos are professional and consistent
- [ ] Names and titles are clearly legible
- [ ] Contact method is present (WhatsApp, phone)
- [ ] Years of experience or credentials shown
- [ ] Specialty areas mentioned if relevant
- [ ] CTA to contact specific advisor works

### Accessibility
- [ ] ARIA labels for carousel controls
- [ ] Slide announcement for screen readers
- [ ] Focus management during navigation
- [ ] Color not sole indicator of active slide
- [ ] Sufficient contrast for controls

---

## Mission & Vision Section Audit

### Content Strategy
- [ ] Values translated into user benefits
- [ ] Avoids generic corporate speak
- [ ] Addresses affordability mission clearly
- [ ] Social responsibility is authentic, not performative
- [ ] Copy is concise and scannable

### Visual Design
- [ ] Icons enhance rather than decorate
- [ ] Consistent icon style and size
- [ ] Text blocks aren't too dense
- [ ] Adequate white space
- [ ] Mobile layout stacks appropriately

### Positioning
- [ ] Placed after trust-building elements
- [ ] Doesn't interrupt conversion flow
- [ ] Can be skipped without confusion
- [ ] Links to "About Us" if more detail exists

---

## Contact Form Audit (CRITICAL)

### Field Design
- [ ] Labels are outside fields, not placeholders
- [ ] Required fields clearly marked
- [ ] Sensitive fields have explanatory microcopy
- [ ] Salary field explains purpose ("to pre-qualify you")
- [ ] Input types match data (tel, email, number)
- [ ] Autocomplete attributes set correctly
- [ ] Field width suggests expected input length

### Validation
- [ ] Inline validation on blur
- [ ] Clear, helpful error messages
- [ ] Errors appear near relevant field
- [ ] Success states confirm correct input
- [ ] Format hints provided ("(507) XXX-XXXX")
- [ ] Doesn't clear valid fields on error
- [ ] Submit disabled until all required fields valid

### User Experience
- [ ] Logical field order (name → contact → financial)
- [ ] Tab order matches visual order
- [ ] Multi-step form considered for mobile
- [ ] Progress indicator if multi-step
- [ ] "Save and continue later" option considered
- [ ] Privacy policy link present and clear
- [ ] Submit button text is specific ("Get Pre-Qualified")

### Technical
- [ ] Honeypot field for spam prevention
- [ ] Rate limiting on server side
- [ ] CSRF protection implemented
- [ ] Submission latency < 2 seconds
- [ ] Loading state during submission
- [ ] Success confirmation is unmistakable
- [ ] Error recovery is graceful
- [ ] Data sent via HTTPS POST
- [ ] No sensitive data in URL params

### Conversion Optimization
- [ ] CTA button stands out visually
- [ ] Trust badge near submit button
- [ ] Character count for message field
- [ ] "Project of interest" pre-filled if from card CTA
- [ ] Mobile keyboard appears correctly per field type
- [ ] No unnecessary fields
- [ ] Optional fields clearly marked as such

---

## Footer Audit

### Content & Structure
- [ ] Contact information complete and current
- [ ] Physical address with map link/embed
- [ ] Phone numbers formatted consistently
- [ ] Email address is clickable (mailto:)
- [ ] Social media links open in new tabs
- [ ] Hours of operation listed
- [ ] Legal links present (privacy, terms, equal housing)

### Accessibility
- [ ] Links have sufficient contrast
- [ ] Icon links have text alternatives
- [ ] Logical focus order
- [ ] Social icons labeled for screen readers

### Performance
- [ ] Map iframe loads lazily or on interaction
- [ ] Social icons are SVG or optimized images
- [ ] External resources don't block render

---

## Mobile-Specific Audit

### Layout & Spacing
- [ ] Touch targets ≥ 44x44px
- [ ] Adequate spacing between tappable elements
- [ ] Text size ≥ 16px to prevent zoom
- [ ] Horizontal scrolling never required
- [ ] Sticky headers don't obscure content excessively

### Navigation
- [ ] Hamburger menu works smoothly
- [ ] Menu links large enough for thumbs
- [ ] Close button easily accessible
- [ ] Scrolling disabled when menu open
- [ ] Focus trapped in open menu

### Forms
- [ ] Correct keyboard appears per field type
- [ ] Submit button visible without scrolling
- [ ] Autofocus doesn't cause unexpected scroll
- [ ] Labels don't truncate
- [ ] Error messages fully visible

### Performance
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms
- [ ] Images appropriately sized for viewport
- [ ] JavaScript non-blocking or deferred

---

## Accessibility Audit (WCAG 2.1 AA)

### Perceivable
- [ ] All images have alt text
- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Color contrast ratio ≥ 3:1 for UI components
- [ ] Color not sole means of conveying information
- [ ] Video captions available if speech present
- [ ] Audio descriptions for video content
- [ ] Content adapts to 200% zoom without horizontal scroll
- [ ] Text spacing can be adjusted

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard trap
- [ ] Focus visible at all times
- [ ] Sufficient time to read and interact
- [ ] Pause/stop/hide for auto-updating content
- [ ] No content flashes more than 3 times per second
- [ ] Skip navigation link present
- [ ] Page title descriptive and unique
- [ ] Focus order logical
- [ ] Link purpose clear from text or context

### Understandable
- [ ] Language of page identified
- [ ] Language changes marked in code
- [ ] Consistent navigation across site
- [ ] Consistent identification of components
- [ ] Form input errors identified
- [ ] Labels or instructions provided
- [ ] Error suggestions offered
- [ ] Error prevention for legal/financial data

### Robust
- [ ] Valid HTML (no major errors)
- [ ] ARIA used correctly
- [ ] Name, role, value available for all UI components
- [ ] Status messages announced to assistive tech

---

## Performance Audit

### Core Web Vitals
- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] FID < 100ms (First Input Delay)
- [ ] CLS < 0.1 (Cumulative Layout Shift)

### Optimization Checklist
- [ ] Images in modern formats (WebP, AVIF)
- [ ] Images appropriately sized and compressed
- [ ] Critical CSS inlined
- [ ] Non-critical CSS deferred
- [ ] JavaScript minified and compressed
- [ ] Unused JavaScript removed
- [ ] Third-party scripts loaded asynchronously
- [ ] Fonts optimized (subsets, font-display: swap)
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] Gzip/Brotli compression enabled
- [ ] Browser caching configured
- [ ] CDN for static assets
- [ ] Database queries optimized
- [ ] API response time < 500ms

---

## Security Audit

- [ ] HTTPS enforced site-wide
- [ ] Security headers present (CSP, X-Frame-Options, etc.)
- [ ] Form submissions protected against CSRF
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization, output encoding)
- [ ] Rate limiting on API endpoints
- [ ] Sensitive data not in client-side code
- [ ] Dependencies up to date (no known vulnerabilities)
- [ ] Environment variables secured
- [ ] Database credentials not in version control

---

## SEO Audit (Secondary)

- [ ] Title tag descriptive and < 60 chars
- [ ] Meta description compelling and < 160 chars
- [ ] Heading hierarchy proper (h1 → h2 → h3)
- [ ] Only one h1 per page
- [ ] URLs descriptive (if multi-page)
- [ ] Robots.txt present and correct
- [ ] Sitemap.xml present
- [ ] Structured data for real estate listings
- [ ] Open Graph tags for social sharing
- [ ] Canonical URL specified
- [ ] Mobile-friendly (passes Google test)
- [ ] Page speed optimized

---

## Analytics & Tracking Audit

- [ ] Google Analytics or alternative installed
- [ ] Form events tracked (start, field interactions, submit)
- [ ] CTA clicks tracked
- [ ] Project card interactions tracked
- [ ] Video play/pause tracked
- [ ] Error events tracked
- [ ] Page scroll depth tracked
- [ ] Session recordings configured (Hotjar, etc.)
- [ ] Conversion funnel defined
- [ ] Event names follow naming convention
- [ ] PII not sent to analytics
- [ ] Cookie consent implemented (if required)

---

## Legal & Compliance Audit

- [ ] Privacy policy linked and accessible
- [ ] Terms of service present
- [ ] Equal Housing Opportunity statement/logo
- [ ] Cookie consent banner (if EU/CA traffic)
- [ ] Unsubscribe mechanism for email lists
- [ ] Data retention policy documented
- [ ] GDPR compliance (if applicable)
- [ ] CCPA compliance (if applicable)
- [ ] Accessibility statement present
- [ ] Contact information for legal inquiries
