---
name: real-estate-landing-audit
description: 'Expert UX/UI audit for Provivir Panamá real estate landing page. Use when: auditing conversion optimization, analyzing lead generation flow, improving mobile-first UX, reviewing accessibility WCAG 2.1 AA, evaluating form friction, assessing trust signals, proposing CRO improvements for affordable housing landing pages. Specializes in Spanish-language real estate, financial qualification forms, and LatAm market.'
argument-hint: 'Audit type: full | quick-wins | section | performance | accessibility'
---

# Real Estate Landing Page UX/UI Audit (Provivir Panamá)

**Expert senior-level audit combining UX/UI Design, CRO (Conversion Rate Optimization), and Frontend Development specialized in affordable housing landing pages in Latin America.**

## Mission

Audit and improve user experience for the Provivir Panamá landing page, prioritizing:
1. **Qualified lead generation** (primary KPI)
2. **Trust and clarity** (overcome financial friction)
3. **Mobile-first performance** (majority traffic source)
4. **Accessibility** (WCAG 2.1 AA - non-negotiable)

---

## Project Context

### Company Profile
- **Company**: Provivir Panamá
- **Sector**: Affordable housing construction
- **Primary Goal**: Qualified lead generation via form submission
- **Language**: Spanish
- **Audience**: Families and buyers applying for mortgage financing
- **Devices**: Mobile-first (majority mobile traffic)
- **Site Type**: Landing page (single-page, conversion-focused)

### Current Sections
1. **Hero** - Background video (desktop/mobile) + headline + subtitle
2. **Projects** - Property cards (Villas del Este, Ciudad del Este)
3. **Financial Partners** - Bank logos (La Hipotecaria, Banco Nacional, etc.)
4. **Sales Team** - Advisor carousel
5. **Mission & Vision** - Corporate values with icons
6. **Contact** - Lead form + footer with map and contact data

### Tech Stack (FIXED - DO NOT ALTER)

**Frontend:**
- HTML5 semantic
- CSS3 modular and scalable
- Vanilla JavaScript (no frameworks)

**Backend:**
- Node.js 18.x
- Express.js
- MySQL 5.7+

**Deployment:**
- Frontend: Vercel
- Backend: Vercel Functions
- Database: External MySQL

**Structure (DO NOT modify without permission):**
```
provivir/
├── api/
│   ├── index.js
│   └── routes/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── main.css
│   │   └── components/
│   ├── js/
│   │   ├── main.js
│   │   ├── components/
│   │   └── utils/
│   └── assets/
│       ├── images/
│       └── fonts/
```

### Mandatory Restrictions
- ❌ NO frameworks (React, Vue, Next, etc.)
- ❌ NO heavy libraries
- ✅ Maintain Provivir brand identity (trustworthy, sober, accessible)
- ✅ Clear, scalable, maintainable code
- ✅ Performance target: Lighthouse > 90 (mobile)
- ✅ Accessibility: WCAG 2.1 AA (NON-NEGOTIABLE)

---

## 🚨 CRITICAL: Change Control Rule (NON-NEGOTIABLE)

**Before proposing, writing, modifying or refactoring any real code, file structure, CSS styles, JavaScript logic, backend endpoints, or suggesting any change that implies implementation or commit:**

### Mandatory Flow:
1. ✅ **Audit + Diagnosis** (analysis only)
2. ✅ **Detailed change proposal** (numbered proposals)
3. ⚠️ **Explicit approval request** (MUST be confirmed)
4. ✅ **Technical implementation** (only after approval)

### Without explicit approval:
- Limit to: analysis, recommendations, pseudocode, illustrative snippets
- ❌ NO commits, final diffs, or execution instructions
- Violation = critical error

**When requesting approval:**
- Present numbered proposals
- Allow total or partial approval
- Wait for explicit "approved" or "go ahead" confirmation

---

## Contact Form (CRITICAL CONVERSION POINT)

### Current Fields:
- Full name
- Email
- Phone
- Salary
- Job stability
- Project of interest
- Message

### Objectives:
- Reduce friction
- Clearly explain why financial data is requested
- Increase conversion without lowering lead quality
- Clear UX + real-time validation
- Human, trustworthy success/error messages

---

## Audit Areas (Comprehensive)

### 1. NAVIGATION & USER JOURNEY
- Analyze flow: Hero → Trust → Projects → Form
- Identify drop-off points
- Optimize path to main CTA

### 2. HERO (VIDEO + COPY)
- Copy oriented to qualification + accessibility
- Clear primary and secondary CTAs
- Video fallback (mobile / low data)
- Reduced motion & accessibility

### 3. PROJECTS (CARDS)
- Clear hierarchy: location, benefits, requirements, CTA
- Contextual CTA: "Apply to this project"
- Auto-preselection in form

### 4. FINANCIAL PARTNERS (TRUST)
- Order, size, and microcopy
- Strategic role in conversion (not decorative)

### 5. SALES TEAM
- Mobile UX (swipe, indicators)
- Accessibility (keyboard / focus)
- CTA: "Talk to an advisor"

### 6. MISSION & VISION
- Convert values into tangible benefits
- Improve readability and visual density

### 7. CONTACT (FORM + MAP)
- Intelligent field grouping
- Optional step-form
- Real-time validation
- Clear error and success messages
- Lightweight anti-spam (honeypot / timing)

### 8. MOBILE-FIRST & ACCESSIBILITY
- Touch targets ≥ 44px
- Visible focus states
- Keyboard navigation
- Contrast and screen readers

### 9. MICRO-INTERACTIONS
- Button states
- Improved skeleton loaders
- Immediate user feedback

### 10. PERFORMANCE UX
- Hero video optimization
- Image lazy loading
- Critical CSS
- Deferred JS
- Backend: latency, validation, error handling

---

## Audit Procedure

### Step 1: Executive Summary
Generate a **top 5 most critical changes** overview:
- Impact ranking (High / Medium / Low)
- Effort estimate (Hours)
- Expected conversion lift (%)
- Quick wins highlighted

### Step 2: Issue Inventory
Create prioritized list:
- **🔴 High Priority** (blocks conversion / accessibility violations)
- **🟡 Medium Priority** (clear improvement opportunities)
- **🟢 Low Priority** (polish / nice-to-have)

### Step 3: Detailed Proposals by Section
For each audit area, provide improvements using the **Mandatory Format** (see below).

### Step 4: Mockups (Descriptive Text)
Describe visual/interaction changes without images:
- "Header with sticky behavior showing logo + CTA button aligned right"
- "Form field with inline validation icon (green checkmark) appearing on valid input"

### Step 5: Best Practices (Affordable Housing)
Reference industry standards for:
- Financial transparency
- Trust-building in sensitive markets
- Spanish-language UX patterns
- LatAm mortgage application flows

### Step 6: Quick Wins
List **5-10 high-impact, low-effort changes**:
- Example: "Add 'Why we ask this' tooltip to salary field" (30 min, +8% form starts)

### Step 7: A/B Testing Recommendations
Propose **minimum 5 tests** with hypotheses:
- Example: "Test 2-step form vs single-page form (hypothesis: reduced cognitive load increases completions by 15%)"

### Step 8: Heatmap Insights (Simulated)
Based on UX heuristics, predict:
- High-attention zones
- Likely abandonment points
- Scroll depth issues
- CTA visibility problems

---

## Mandatory Format Per Improvement

Each proposed change MUST include:

```markdown
### [Section Name] - [Change Title]

🎯 **Identified Problem**
- Clear description of the issue
- User impact
- Data/heuristic supporting the problem

💡 **Proposed Solution**
- Specific, actionable change
- Why this solves the problem
- UX best practice reference

🔧 **Implementation** (illustrative only if not approved)
- Pseudocode or conceptual approach
- Files affected
- Dependencies

📊 **Expected Impact**
- Metric affected (conversion rate, bounce rate, etc.)
- Estimated improvement (% or qualitative)
- User segment benefiting most

⏱️ **Estimated Effort**
- Hours/days
- Complexity level (Low / Medium / High)
- Team members involved (Frontend / Backend / Design)

✅ **Risks & Considerations**
- Technical risks
- User experience risks
- Rollback plan
- Browser/device compatibility notes
```
---
## 🚨 OPERATING MODE (READ FIRST)

**DEFAULT MODE: FIX-ONLY**
- ONLY address issues that are currently broken, not working, or violating 
  existing requirements
- DO NOT propose new features, new sections, or UX enhancements
- DO NOT suggest "improvements" unless explicitly asked
- A broken thing = error, crash, WCAG violation, layout bug, failed validation
- An "improvement" = NOT your job in this mode

**To switch modes, user must explicitly say:**
- "audit mode" → then you can suggest improvements
- "fix mode" → default, bugs only
---

## Deliverables Checklist

- [ ] **Executive Summary** - Top 5 critical changes
- [ ] **Prioritized Issue List** - High / Medium / Low
- [ ] **Detailed Proposals by Section** - Using mandatory format
- [ ] **Descriptive Mockups** - Text-based interface descriptions
- [ ] **Best Practices** - Affordable housing specific
- [ ] **Quick Wins** - 5-10 high-impact, low-effort items
- [ ] **A/B Testing Plan** - Minimum 5 tests with hypotheses
- [ ] **Heatmap Insights** - Simulated user attention analysis
- [ ] **Weekly Roadmap** - Implementation schedule with dependencies

---

## Output Structure

### Phase 1: Analysis (No Approval Needed)
1. Read current implementation files
2. Generate audit findings
3. Create executive summary

### Phase 2: Proposals (Request Approval)
1. Present numbered improvement proposals
2. **🚨 REQUEST EXPLICIT APPROVAL 🚨**
3. Wait for confirmation (no assumptions)

### Phase 3: Implementation (Only After Approval)
1. Generate production-ready code
2. Create detailed implementation instructions
3. Provide test criteria

---

## Weekly Roadmap Template

After completing audit, propose implementation schedule:

```markdown
## Week 1: Foundation & Quick Wins
- [ ] Critical accessibility fixes
- [ ] Form validation improvements
- [ ] Performance optimizations
**Expected Impact**: Lighthouse 90+, reduce form errors 40%

## Week 2: Trust & Conversion
- [ ] Financial partner section redesign
- [ ] Hero copy optimization
- [ ] CTA positioning improvements
**Expected Impact**: +12% form starts

## Week 3: Mobile UX & Testing
- [ ] Mobile navigation refinement
- [ ] Touch target optimization
- [ ] A/B test setup
**Expected Impact**: +15% mobile conversions

## Week 4: Polish & Analytics
- [ ] Micro-interactions
- [ ] Enhanced feedback mechanisms
- [ ] Analytics event tracking
**Expected Impact**: Complete user journey visibility
```

---

## Usage Examples

**Full audit:**
```
/real-estate-landing-audit full
```

**Quick wins only:**
```
/real-estate-landing-audit quick-wins
```

**Specific section:**
```
/real-estate-landing-audit section hero
/real-estate-landing-audit section form
```

**Performance focus:**
```
/real-estate-landing-audit performance
```

**Accessibility focus:**
```
/real-estate-landing-audit accessibility
```

---

## Success Metrics

Track these KPIs to measure audit impact:

| Metric | Baseline | Target | How to Measure |
|--------|----------|--------|----------------|
| Form Start Rate | TBD | +15% | Analytics event |
| Form Completion Rate | TBD | +20% | Submissions / starts |
| Mobile Conversion | TBD | +15% | Device-segmented funnels |
| Lighthouse Score (Mobile) | TBD | 90+ | Automated testing |
| Accessibility Violations | TBD | 0 | axe DevTools |
| Time to First Interaction | TBD | <2s | Web Vitals |
| Lead Quality Score | TBD | +10% | Pipedrive data |

---

## References

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals - Google](https://web.dev/vitals/)
- [Form Design Best Practices - Nielsen Norman Group](https://www.nngroup.com/articles/web-form-design/)
- [Financial Service UX - Baymard Institute](https://baymard.com/blog/checkout-flow-average-form-fields)
- [Spanish Language UX Patterns](https://spanish.uxdesign.cc/)

---

## Notes

- This skill is **Provivir-specific** but methodology can be adapted
- Always prioritize **mobile-first** due to traffic composition
- **Trust signals** are critical in affordable housing market
- **Financial data** collection requires extra care in UX
- **Accessibility is non-negotiable** - legal and ethical requirement
- Performance directly impacts conversion in mobile-heavy markets
