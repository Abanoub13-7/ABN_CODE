# ABN-CODE CV — Known Issues and Risk Register

Phase 0 audit. The original findings below are preserved as historical baseline; later remediation status is recorded in dated addenda. Severity is intentionally conservative.

Legend — Classification: **Confirmed Defect** (behaviour or source fact established), **Suspected Issue** (plausible, not established), **Improvement Opportunity** (not broken, could be better). "Runtime verified" refers to headless Chromium (Playwright 1.56 bundled `chromium-1194`; exact browser version not recorded) against a local static server in a sandbox **without internet access**, desktop 1280×800 and mobile 375×812 unless stated.

## Summary

| ID | Title | Severity | Classification | Runtime verified |
|---|---|---|---|---|
| KI-001 | "Download Resume" captures the whole page; no genuine CV file exists | Medium | Confirmed Defect | Partly (function call observed; PDF output BLOCKED) |
| KI-002 | Two html2pdf versions loaded from a CDN | Low | Confirmed Defect | Static only |

### Phase 3 remediation notes
- KI-002 was reduced to a single html2pdf instance in the live page (`0.10.1` kept, duplicate `0.9.3` removed) and script loading was deferred to reduce render-blocking behavior.
- Non-critical project images now use lazy loading and explicit pixel dimensions to reduce layout shifts, without changing the approved visual design.
- At the time of this historical Phase 3 note, the contact form built a WhatsApp URL with `encodeURIComponent`; the later 2026-10-18 migration is documented below.

### Phase 4 verification notes
- A live browser validation pass was executed against the current static build over a local HTTP server using Chromium. The page rendered correctly at desktop and mobile viewport sizes, the nav menu and project section remained usable, and no local resource or JavaScript syntax failures were observed.
- No functional regression was confirmed in the approved implementation. The remaining resume/download limitation is a product/document decision, not a regression caused by the current page build.

### Phase 4 revalidation addendum — 2026-10-17

The earlier verification note above is retained as historical context. The detailed rerun passed the requested load, console/page-error, mobile-menu, theme, carousel-pointer, encoded-form, image, script-order, and syntax checks. Actual resume-download output is **BLOCKED**, not PASS: this browser harness emitted no download event for either the page action or a synthetic Blob download. The current implementation still calls html2pdf on `document.body` and sets `page.pdf`; the project contains no CV PDF. No application code was changed. See `BASELINE_TESTS.md` for evidence and command diagnosis.

The rerun also reconfirmed the current status of prior findings: KI-002's duplicate html2pdf include has been reduced to one deferred include; KI-003's WhatsApp text is encoded and round-trips special characters; KI-009's mobile menu closes after link selection. The pointer-based carousel check changed the active item in both directions despite zero-sized arrow button boxes (KI-019). These are current observations; the Phase 0 findings remain historical.

### CV download implementation update — 2026-10-18

KI-001's former page-capture behavior is no longer used by the Download CV control. `index.html` now links directly to `assets/files/Abanoub-Eshak-CV.pdf` with a download filename of `Abanoub-Eshak-CV.pdf`; the `html2pdf` include and its sole active handler (`js/donlwod.js`) were removed. No substitute document was created. Browser inspection confirmed the link attributes and that neither `html2pdf` nor `downloadPDF` is loaded; requesting the target returned HTTP 404 because the file and `assets/files/` directory are absent. Successful file download and PDF contents are **BLOCKED** pending the owner's file. The historical KI-001 and Phase 4 test records below remain unchanged; see the 2026-10-18 tests in `BASELINE_TESTS.md`.

| ID | Title | Severity | Classification | Runtime verified |
|---|---|---|---|---|
| KI-003 | Contact message is not URL-encoded in the WhatsApp URL | Medium | Confirmed Defect | Yes (URL captured, nothing sent) |
| KI-004 | `js/submit.js` is an orphan handler referencing a non-existent `#number` | Low | Confirmed Defect | Static only |
| KI-005 | Colour mode control is hidden below 992px | Medium | Confirmed Defect (intent unknown) | Yes |
| KI-006 | Bootstrap CSS is modified: `.img-fluid` gets `border-radius: 40%` | Medium | Confirmed Defect | Yes (screenshot) |
| KI-007 | Dark mode leaves body text at 2.88:1 contrast | Medium | Confirmed Defect | Yes (computed colours) |
| KI-008 | Colour mode is not persisted | Low | Improvement Opportunity | Yes |
| KI-009 | Mobile menu stays open after choosing a link | Low | Confirmed Defect | Yes |
| KI-010 | Colour mode toggle is not keyboard accessible | Medium | Confirmed Defect | Yes (DOM state) |
| KI-011 | Missing/weak accessible names and alt text | Medium | Confirmed Defect (static); screen-reader impact not tested | Partly |
| KI-012 | Yellow accent colour has low contrast (calculated) | Medium | Confirmed Defect (static arithmetic) | No |
| KI-013 | Empty meta description/author, no favicon or social metadata | Low | Confirmed Defect | Static only |
| KI-014 | Reliance on remote CSS/JS/font/map hosts, no fallback or SRI | Low | Improvement Opportunity | Partly (requests failed offline) |
| KI-015 | Heavy/unused assets (PNG screenshots, five icon-font formats, unused images) | Low | Improvement Opportunity | Partly |
| KI-016 | Dated library versions | Low | Suspected Issue | No |
| KI-017 | Template leftovers, placeholder text and typos in content | Low | Confirmed Defect | Static only |
| KI-018 | 6px horizontal overflow measured at 768px | Low | Suspected Issue | Yes (measured; cause not isolated) |
| KI-019 | Carousel arrow hitbox (resolved); cloned slides add duplicate tab stops | Low | Confirmed observation (partly resolved) | Yes (arrow pointer verified; cloned tab stops remain) |
| KI-020 | Link hygiene: `href="#"` placeholders, empty anchor, `target=_blank` without `rel` | Low | Improvement Opportunity | Static only |
| KI-021 | Unreferenced and duplicate project files | Low | Improvement Opportunity | Static only |

## Prior observation not confirmed

**N-01 — "`.navbar[class*="-pinned"]` applies `transform: rotate(-45deg)"**: **Not reproduced.** In `css/tooplate-style.css` the rule at lines 180–182 is `.navbar[class*="-pinned"] { transform: translate(0, 0); }` and the unpinned rule (177–179) is `translate(0, -150%)`. The only `rotate(-45deg)` in the file is line 250, `.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:last-child` (the hamburger-to-X animation), which targets the toggler icon bars, not the navbar. Runtime: `.navbar` computed transform was `none` at top, `matrix(1,0,0,1,0,-106.5)` when `headroom--unpinned`, and the identity matrix when `headroom--pinned`. The selector `[class*="-pinned"]` does not match `headroom--unpinned`, so the two states do not overlap. The `sass/` source also contains no navbar rotation. No defect is recorded. If the earlier observation came from a different copy of the project or from the mobile menu icon, that should be clarified by the owner.

## Findings

### KI-001 — "Download Resume" captures the whole page; no genuine CV file exists
- **Severity / class:** Medium / Confirmed Defect
- **Location:** `index.html` line 94; `js/donlwod.js` lines 1–13
- **Evidence:** Button is `<a href="#" onclick="downloadPDF()">`. `downloadPDF()` runs `html2pdf().set(opt).from(document.body).save()` with file name `page.pdf`, A4 portrait. `images/courses/` holds only a course certificate (see CONTENT_AND_LINKS §5, §7). The option key `padding` in `opt` is not a documented html2pdf option (unverified, offline).
- **Runtime:** With the CDN unreachable, `typeof html2pdf` was `undefined` and calling `downloadPDF()` threw `html2pdf is not defined`. Actual PDF output with network access was not observed (BLOCKED).
- **Impact:** A visitor clicking "Download Resume" receives (at best) a screenshot-style PDF of the web page, including the fixed navbar and contact section, not a resume; the control also fails entirely if the CDN is blocked.
- **Recommended future action:** Decide the intended deliverable (a real CV PDF supplied by the owner vs. a generated one) in Phase 4.
- **Verification:** With network access, click the button and open the downloaded file; also click with the CDN requests blocked and observe the console. Check `window.html2pdf.version` or script order to see which build is active.

### KI-002 — Two html2pdf versions loaded from a CDN
- **Severity / class:** Low / Confirmed Defect
- **Location:** `index.html` lines 344–345 (0.9.3, then 0.10.1), plain synchronous scripts in `<body>`
- **Evidence:** Both `<script src>` tags present. `grep` count of `html2pdf` in `index.html` is 2 lines.
- **Impact:** Double download of a large bundle; ambiguity over which version defines the global (the later one is expected to win — not verified, BLOCKED offline).
- **Recommended future action:** Keep one version, pinned, loaded on demand.
- **Verification:** In a networked browser, Network tab shows both requests; `html2pdf.version` or bundle inspection shows which is active.

### KI-003 — Contact message is not URL-encoded in the WhatsApp URL
- **Severity / class:** Medium / Confirmed Defect
- **Location:** `index.html` lines 350–364 (active handler)
- **Evidence:** Template string `…text=رسالة جديدة من الموقع:%0Aالاسم: ${name}%0Aالرسالة: ${message} : الايميل الخاص به ${email}` inserts raw values; only the newlines are hand-encoded as `%0A`; no `encodeURIComponent`.
- **Runtime:** With `window.open` stubbed, input message `hello & goodbye #1 100%` produced a URL containing `hello & goodbye #1 100%` verbatim. Real WhatsApp parsing of such a URL was not tested (no network, and no message may be sent in this phase).
- **Impact (expected, not observed end-to-end):** Characters such as `&`, `#`, `%`, `+` in a visitor's message can truncate or corrupt the pre-filled text. Spaces and Arabic text are normally tolerated by browsers.
- **Recommended future action:** Encode values before building the URL (Phase 4).
- **Verification:** In a controlled test, stub `window.open` and compare the URL with `encodeURIComponent` output; then manually test with special characters on a test number.

### KI-004 — `js/submit.js` is an orphan handler referencing a non-existent `#number`
- **Severity / class:** Low / Confirmed Defect (maintainability)
- **Location:** `js/submit.js` lines 2–16; no `<script src="js/submit.js">` in `index.html`
- **Evidence:** It reads `document.getElementById("number").value`; `index.html` has no element with id `number` (verified in DOM: ids are `name`, `email`, `message`, `contactForm`, …). It is not loaded, so only the inline handler runs (one `submit` listener observed in effect: one URL opened per submit).
- **Impact:** None today. If someone loads it, it would throw a `TypeError` and open a second WhatsApp window.
- **Recommended future action:** Remove or archive in a later phase after owner approval.
- **Verification:** Add the script tag in a scratch copy and submit with `window.open` stubbed.

### KI-005 — Colour mode control is hidden below 992px
- **Severity / class:** Medium / Confirmed Defect (whether intentional is unknown; template default)
- **Location:** `css/tooplate-style.css` lines 475–482 (`@media (max-width: 991px) { .color-mode { display: none; } }`)
- **Evidence / runtime:** Computed `display` was `none` at 375px and 768px, `flex` at 1280px and 1920px. At 768px the navbar is already expanded (`navbar-expand-sm`, toggler hidden), so no theme control is reachable on tablets or phones.
- **Impact:** Dark mode is available only on desktop-width screens.
- **Recommended future action:** Phase 1/3 design decision.
- **Verification:** Load at 375px and 768px, look for the control; check computed style.

### KI-006 — Bootstrap CSS is modified: `.img-fluid` has `border-radius: 40%`
- **Severity / class:** Medium / Confirmed Defect (vendor file altered; effect visible)
- **Location:** `css/bootstrap.min.css` — rule `img-fluid{max-width:100%;height:auto;border-radius: 40%;}` (stock Bootstrap 4.3.1 defines only `max-width` and `height`).
- **Evidence:** Source grep; headless screenshot at 1280px shows the first carousel screenshot clipped to a large rounded/elliptical shape, cutting off the screenshot corners. All images using `img-fluid` (hero image and the four carousel images) are affected.
- **Impact:** Portfolio screenshots are visually cropped; a modified vendor file also makes upgrades risky and hides this styling from `tooplate-style.css`.
- **Recommended future action:** Confirm with the owner whether the rounding is intended; handle it in site CSS in Phase 1/2. A full diff of `bootstrap.min.css` against upstream 4.3.1 was not possible offline, so other modifications are not ruled out.
- **Verification:** Compare against an official Bootstrap 4.3.1 `bootstrap.min.css` (hash/diff); inspect `.img-fluid` computed `border-radius` in DevTools.

### KI-007 — Dark mode leaves body text at 2.88:1 contrast
- **Severity / class:** Medium / Confirmed Defect
- **Location:** `css/tooplate-style.css` line 54 (`p { color: #5b5b5b; }`) vs `.dark-mode { background: #0c0c0d; }` (292–294); no `.dark-mode p` rule exists (only headings, nav, small-text, carousel buttons are overridden, lines 295–319).
- **Runtime:** After clicking the toggle, `body` background `rgb(12,12,13)` and `.about-text p` colour `rgb(91,91,91)`; calculated contrast 2.88:1 (WCAG AA body text minimum is 4.5:1). Timeline `small`, timeline text and other elements were not individually measured.
- **Impact:** Paragraph text is hard to read in dark mode.
- **Recommended future action:** Phase 1 theming pass with a contrast check of every text/background pair.
- **Verification:** Toggle dark mode, inspect computed colour of every text class, compute ratios.

### KI-008 — Colour mode is not persisted
- **Severity / class:** Low / Improvement Opportunity
- **Location:** `js/custom.js` lines 6–9
- **Evidence / runtime:** Handler only toggles classes. After enabling dark mode and reloading, `body.className` was empty; `localStorage`/`sessionStorage` empty and no cookie.
- **Impact:** Preference resets on every visit; no `prefers-color-scheme` handling.
- **Verification:** Toggle, reload, inspect `body` class and storage.

### KI-009 — Mobile menu stays open after choosing a link
- **Severity / class:** Low / Confirmed Defect
- **Location:** `js/custom.js` lines 24–30 (smooth-scroll handler calls `preventDefault`, nothing collapses the menu)
- **Runtime:** At 375px, after opening the menu (`collapse show`, height 140px) and clicking "Projects", the page scrolled (scrollY 869) and `#navbarNav` kept `collapse show`.
- **Impact:** The open menu keeps covering the top of the page after navigation.
- **Verification:** Repeat at 375px and check `#navbarNav` classes.

### KI-010 — Colour mode toggle is not keyboard accessible
- **Severity / class:** Medium / Confirmed Defect
- **Location:** `index.html` lines 64–67
- **Evidence / runtime:** The control is a `<div class="color-mode">` with no `tabindex`, `role` or key handler; its `tabIndex` was `-1` and it did not appear in the Tab sequence (first nine stops were brand, four nav links, two hero buttons, then carousel links).
- **Impact:** Keyboard and assistive-technology users cannot switch theme.
- **Verification:** Press Tab through the page; check the toggle never receives focus.

### KI-011 — Missing or weak accessible names and alt text
- **Severity / class:** Medium / Confirmed Defect (source); effect on screen readers not tested
- **Location:** `index.html` — social links 288–292 (icon-font only, no text, no `aria-label`; `title` becomes a tooltip), carousel images 126/134/142/151 (all `alt="project image"`, each the sole content of a link), hero image 102 (`alt="svg image"` for a JPEG logo graphic), carousel arrows (`<button>` whose inner `<span>` is `display:none`, glyph drawn with `::before`).
- **Impact:** Links and buttons may have no meaningful accessible name; images do not identify the projects.
- **Verification:** Run an accessibility tree inspection or screen reader; use an automated checker (none installed in this sandbox).

### KI-012 — Yellow accent colour has low contrast (calculated)
- **Severity / class:** Medium / Confirmed Defect (arithmetic on declared colours)
- **Location:** `css/tooplate-style.css` — `#ffc200` used for hover text (44, 96), hero rotating text (119), and `.contact-form .submit-btn` (white text on `#ffc200`, lines 436–444).
- **Evidence:** `#ffc200` vs `#ffffff` = 1.62:1 (AA requires 4.5:1 for normal text, 3:1 for large). Not measured in the rendered page.
- **Impact:** The form's primary button label and the hero accent text are hard to read for some users.
- **Verification:** Measure rendered foreground/background pairs.

### KI-013 — Empty meta description/author, no favicon or social metadata
- **Severity / class:** Low / Confirmed Defect
- **Location:** `index.html` lines 6–9: `<meta name="description" content="">`, `<meta name="author" content="">`; `<title>Profile Abanoub </title>` (trailing space); viewport meta is present and correct (`width=device-width, initial-scale=1, shrink-to-fit=no`). No `<link rel="icon">` and no Open Graph/Twitter tags.
- **Impact:** Weak search/share previews.
- **Verification:** View-source; use a social-card validator once deployed.

### KI-014 — Reliance on remote hosts with no fallback or SRI
- **Severity / class:** Low / Improvement Opportunity
- **Location:** `index.html` 17, 277, 344–345; `css/tooplate-style.css` 10
- **Evidence / runtime:** Boxicons (unpkg), Google Fonts, html2pdf (cdnjs ×2) and the Google Maps embed all failed in the offline sandbox (`ERR_NAME_NOT_RESOLVED`), which is an environment effect and not a project defect. No SRI attributes. `@import` in CSS is render-blocking.
- **Impact:** If a host is unreachable the site loses phone/mail/social icons (all icon-only, so the social links become invisible — expected, not observed with CSS rendering), the font and the PDF feature. Visitor IPs are exposed to third parties.
- **Verification:** Block each host in DevTools and observe.

### KI-015 — Heavy and unused assets
- **Severity / class:** Low / Improvement Opportunity
- **Evidence:** Referenced images total about 1.33 MB (`artist.png` 537,723; `my curch .png` 522,115; `prayar.png` 165,472; `protfolio.jpeg` 69,338; `cruds.png` 36,293), displayed at about 1015px wide from 1290–1317px sources; Owl duplicates four items as clones (same files, no extra download). Unreferenced: `project-image01–05.png` (about 1.71 MB), one SVG. Five icon-font formats (1.58 MB) are shipped; browsers use one. Full Bootstrap CSS/JS plus Popper are loaded.
- **Impact:** Larger than necessary downloads, especially on mobile.
- **Verification:** Lighthouse/Network panel on the deployed site (not run here).

### KI-016 — Dated library versions
- **Severity / class:** Low / Suspected Issue
- **Evidence:** jQuery 3.3.1, Bootstrap 4.3.1, Popper 1.x (2017), Owl Carousel 2.3.4, headroom.js 0.9.4. As far as I know, jQuery 3.3.1 predates a prototype-pollution fix released in 3.4.0 and Bootstrap 4 is no longer maintained; these advisories were **not** checked here (no network).
- **Verification:** Check each version against the vendors' advisories before any upgrade decision. The brief requires keeping these technologies in later phases, so this is informational.

### KI-017 — Template leftovers, placeholders and typos
- **Severity / class:** Low / Confirmed Defect (content quality)
- **Evidence:** "Things I have designed for digital media agencies" (template phrasing) above a four-image carousel with no captions; section heading "PROJECTS" over experience-style entries while carousel items are also projects; footer "Copyright © 2025 Name . Abanoub Eshak"; placeholder `yuor email`; "Send Button"; "galeries"; "Educations"; "Get a free quote" CTA; large commented-out template blocks (156–162, 210–218, 253–261).
- **Verification:** Read-through; content changes need owner approval.

### KI-018 — 6px horizontal overflow measured at 768px
- **Severity / class:** Low / Suspected Issue
- **Runtime:** At 768×1024 `scrollWidth − clientWidth` was 6px (0 at 375, 1280 and 1920). The cause was not isolated (only Owl's internal stage elements were listed as wider than the viewport, and they are normally clipped by `.owl-stage-outer`).
- **Verification:** Bisect elements at 768px; test 600–991px range.

### KI-019 — Carousel arrows have a 0×0 box; cloned slides add duplicate tab stops
- **Severity / class:** Low / Confirmed observation
- **Evidence / runtime:** `.owl-next` bounding box was 0×0 (inner span hidden by `tooplate-style.css` 370–372; arrow drawn by `::before` at 100px, offset −45px/+45px). A DOM-dispatched click on `.owl-next` / `.owl-prev` worked (active slide changed cruds → church → cruds). A real pointer click on the drawn arrow was **not** verified (Playwright could not target a 0×0 element). Tab order reached a cloned slide link (photo-artiste) before the first real slide.
- **Verification:** Click the arrow glyphs with a real pointer on desktop; tab through the carousel.

### KI-020 — Link hygiene
- **Severity / class:** Low / Improvement Opportunity
- **Evidence:** `href="#"` placeholders (`index.html` 94; 342 is an empty `<a href="#"></a>`); four project links and the footer link use `target="_blank"` without `rel="noopener"` (current browsers apply noopener behaviour to `_blank` by default, so the risk is low); social links have no `target`.
- **Verification:** Static review.

### KI-021 — Unreferenced and duplicate project files
- **Severity / class:** Low / Improvement Opportunity
- **Evidence:** See BASELINE_INVENTORY §10 (orphan `js/submit.js`, commented-only `js/downloud.js`, five unused `project-image*.png`, an unused SVG, `.DS_Store`, `desktop.ini`, a VS Code workspace file, minimal README).
- **Verification:** Owner review. Nothing was deleted.

## Not found (checked)

- No duplicate element ids (runtime DOM check).
- All local file references resolve (static check).
- All six first-party JS files parse (`node --check`).
- No secrets, tokens or credentials found: a case-insensitive pattern search (api key, secret, password, token, firebaseConfig, AIza, private-key headers) over all non-vendor, non-minified files returned no matches; minified vendor files were not scanned.
- `<html lang="en">` present; viewport meta present; one `<nav>`, one `<footer>`, no `<main>` or `<header>` landmark (see KI-011/KI-017 for related points).

## Contact form email migration — 2026-10-18

- **KI-003 (WhatsApp contact-form encoding): remediated for the form.** The form no longer builds or opens a WhatsApp URL; it sends the original name, email, and message fields to FormSubmit. The separate WhatsApp social icon is unchanged.
- **KI-004 (orphan form handler referencing missing `#number`): remediated.** `js/submit.js` is now loaded by `index.html` and handles the email request; it does not read `#number`.
- **FormSubmit activation and real delivery: BLOCKED.** The static site has no backend. The recipient must activate the address from FormSubmit's confirmation email, and a real test message must then be received before inbox delivery is considered verified. No credentials or secret keys are embedded in the project. See `BASELINE_TESTS.md`.

## English/Arabic language switch verification — 2026-10-18

- The active page now supports an internal, persisted English/Arabic translation and RTL/LTR layout. The translation includes form validation/service states and accessible text; no translation service or new dependency is used. All 88 English keys have Arabic counterparts, and every page key is covered.
- The current workspace contains `assets/files/Abanoub-Eshak-CV.pdf` (69,752 bytes); its local HTTP response was 200 and its first bytes are `%PDF-`. This current observation supersedes the earlier asset-absence note for this workspace only; the earlier dated result remains historical. The browser harness still did not provide a download event.
- The current document description and title are translated; the old baseline's metadata findings are preserved. The Google Maps embed's existing URL already renders its interface in Arabic; that URL was not changed.
- RTL desktop styles, the theme-state handoff, carousel slide change, keyboard operation, language persistence, and mocked bilingual form statuses passed. Mobile-width runtime verification remains **BLOCKED** because the browser harness stayed at 1076px despite the requested 390px viewport. Real FormSubmit activation/delivery and the browser download event are also still **BLOCKED**; details are in `BASELINE_TESTS.md`.

## RTL carousel and translation synchronization follow-up — 2026-10-18

- **Resolved:** switching only the document's `dir` left Owl Carousel in LTR mode. The carousel now synchronizes its runtime RTL option and class and refreshes stage positioning when the language changes; repeated browser checks retained and loaded the same original project images.
- **Resolved:** the education dictionary was stale relative to the current HTML (MIS versus CIS). English and Arabic now describe the current Computer Information Systems (CIS) degree. A separate accessible-name key also resolves the English casing mismatch for the contact submit button.
- **PASS:** current English dictionary content/attributes match the corresponding HTML, and repeated RTL/LTR carousel changes produced no project-image request failures or JavaScript errors.
- Remaining environment limitations are unchanged: mobile viewport checks, real carousel pointer operation, actual CV download capture, and live FormSubmit delivery remain **BLOCKED**; they are not caused by this fix.

## Automatic carousel verification — 2026-10-18

- **KI-019 arrow hitbox: Resolved.** The shipped CSS gives desktop Owl arrow buttons 48×48 hitboxes. Browser pointer interaction changed the active slide. At the existing mobile breakpoint, arrows remain hidden by design and the visible dots provide manual navigation; a mobile dot click changed the active project.
- **KI-019 cloned-slide tab stops: Remains.** This update did not alter Owl's looping clones or their keyboard focus behavior; duplicate cloned-slide links may still appear in tab order.
- **Project carousel behavior: PASS.** Four original image paths, project names, descriptions, order, and destinations were verified unchanged. Each lazy image decoded after its slide was visited. Autoplay, hover pause/resume, smooth timing, reduced-motion handling, language-direction synchronization, responsive layout, and light/dark rendering passed focused browser checks (CAR-01–CAR-12 in `BASELINE_TESTS.md`).
- **Sass compilation: BLOCKED.** No Sass compiler is available. The Sass source was updated in parallel with the shipped CSS, but generated-output equivalence was not tested.
