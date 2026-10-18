# Dark Premium redesign — notes

Scope: visual redesign only. Content, links, translations, form endpoint and the CV path are unchanged.

## What changed
- `css/tooplate-style.css` — fully rewritten around CSS custom properties (tokens at the top of the file). Dark is the default theme; the existing colour-mode button now switches to a light theme.
- `index.html` — `<body class="dark-mode">` and the colour-mode button start in the "on" state; navbar collapses below 992px (`navbar-expand-lg`); Bootstrap physical-direction utilities (`mr-*`, `ml-*`) replaced by logical CSS; `.reveal` hooks for scroll reveals; visually hidden `<label>`s for the three form fields (reusing existing `form.*` translation keys); Google Fonts `<link>` (Inter + Cairo, `display=swap`, system-font fallback) replaces the old `@import` of Maven Pro; a tiny inline script arms scroll reveals only when IntersectionObserver exists and reduced motion is off; a `<noscript>` rule shows projects as a grid.
- `js/custom.js` — carousel: `margin` 24 and `items: 2` from 992px up (1 below); smooth scroll no longer uses the fixed `-49` offset and is instant under reduced motion; added scroll reveal and active-nav-link (scroll-spy). The theme, language, Headroom, tooltip and carousel-RTL logic is untouched.

## Not touched
- `sass/tooplate-style.scss` was already out of sync with `css/tooplate-style.css` before this work and is not part of any build in the project (no package.json). It still describes the old design.
- Bootstrap, Owl Carousel, Unicons, Headroom, `js/language.js`, `js/submit.js` and all images are unmodified.

## Known limits
- Contact icons (Boxicons) and the map still load from external hosts (unpkg, Google) as before.
- Real form delivery (FormSubmit) was not exercised; only the client-side validation and a mocked response were tested.

## QA refinement pass — 2026-10-18

Authoritative sources (traced from index.html): `css/tooplate-style.css`, `js/custom.js`, `js/language.js`, `js/submit.js`. `sass/tooplate-style.scss` is a legacy, uncompiled file and was only annotated.

Changes
- **Scroll reveal:** removed the CSS 3 s failsafe that force-revealed every `.reveal` element whether or not it had been scrolled to (below-the-fold reveals never animated). Replaced by a JS failsafe in the `<head>` script: if `custom.js` has not set `window.__revealReady` within 4 s, `.reveal-on` is removed so content cannot stay hidden.
- **Contrast (calculated, WCAG 1.4.11):** form-field borders and inactive carousel dots were ~1.3–1.8:1. New `--field-border` token (dark `#6B7A99`, light `#76839F`) gives >= 3.3:1. All text pairs were already >= 4.5:1 in both themes (lowest: muted on bg-2, 5.63 dark / 4.72 light).
- **Projects:** each card now has a visible "View project" link (same URL, same accessible name as before); the image link is kept for pointer users but removed from the tab order and accessibility tree to avoid duplicate links. New i18n key `project.view` (EN/AR).
- **Contact form:** invalid fields get `aria-invalid` (cleared on input) and `aria-describedby` pointing at the status region; the form gets `aria-busy` while sending. Endpoint, field names and payload unchanged.
- **Header:** stays pinned while the mobile menu is open (Headroom previously slid the open menu off-screen on scroll).
- **Copy:** typo fixes only ("galeries" -> "galleries", missing space after a comma).

Not verified (environment limits): external hosts (Google Fonts, Boxicons CDN, Google Maps, project URLs, FormSubmit) were unreachable; live form delivery and FormSubmit activation remain unverified.
