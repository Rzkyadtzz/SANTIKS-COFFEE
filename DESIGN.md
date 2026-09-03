# iPhone 17 Pro dan iPhone 17 Pro Max

## Mission
Create implementation-ready, token-driven UI guidance for iPhone 17 Pro dan iPhone 17 Pro Max that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: iPhone 17 Pro dan iPhone 17 Pro Max
- URL: https://www.apple.com/id/iphone-17-pro/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=SF Pro Text`, `font.family.stack=SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif`, `font.size.base=17px`, `font.weight.base=600`, `font.lineHeight.base=25px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=13.6px`, `font.size.md=14px`, `font.size.lg=17px`, `font.size.xl=19px`, `font.size.2xl=19.89px`, `font.size.3xl=21px`, `font.size.4xl=24px`
- Color palette: `color.text.primary=#f5f5f7`, `color.text.secondary=#86868b`, `color.text.tertiary=#1d1d1f`, `color.surface.base=#000000`, `color.surface.raised=#0071e3`, `color.surface.strong=#0066cc`
- Spacing scale: `space.1=6px`, `space.2=7px`, `space.3=8px`, `space.4=10px`, `space.5=11px`, `space.6=12px`, `space.7=13.6px`, `space.8=14px`
- Radius/shadow/motion tokens: `radius.xs=10px`, `radius.sm=20px`, `radius.md=28px`, `radius.lg=32px`, `radius.xl=120px`, `radius.2xl=170px`, `radius.step7=980px` | `motion.duration.instant=250ms`, `motion.duration.fast=320ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (301), cards (214), buttons (188), lists (92), navigation (22), inputs (8).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
