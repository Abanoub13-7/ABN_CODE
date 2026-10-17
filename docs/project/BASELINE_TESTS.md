# ABN-CODE CV — Baseline Execution and Tests

Phase 0. Statuses: **PASS** (performed, passed), **FAIL** (performed, failed), **BLOCKED** (could not be completed; reason given). A static pass does not prove browser behaviour.

> **History note:** The earlier Phase 4 results below are preserved. A detailed revalidation was run on 2026-10-17; its per-check outcomes and evidence are appended in section E. That rerun supersedes the earlier broad Phase 4 PASS summary where evidence differs or was not recorded.

## Environment

- Linux sandbox, **no internet access** (every request to an external host failed with `ERR_NAME_NOT_RESOLVED`). No `unrar`/`7z`/`bsdtar`, no Sass compiler, no HTML validator installed; nothing was installed.
- Browser: headless Chromium from Playwright 1.56 (`chromium-1194`). Only Chromium was available.
- Serving: `python3 -B -m http.server` bound to 127.0.0.1, serving a read-only-use copy of the extracted project (hashes verified unchanged afterwards). Opening `index.html` via `file://` was not tested.
- No contact message was sent; `window.open` was stubbed in the page before submitting the form. No external link was followed.

## Phase 4 — Functional regression validation (current live build)

| ID | Test | Method | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|---|
| F-01 | Page loads and renders | Local HTTP server + Chromium screenshot at 1280×800 and 375×812 | Page loads without broken layout | Page rendered successfully in both viewports | PASS | `http://127.0.0.1:8000/index.html` returned 200 and a desktop/mobile screenshot was captured |
| F-02 | JavaScript syntax | `node --check` on active scripts | No syntax errors | All active scripts parsed cleanly | PASS | `custom.js`, `donlwod.js`, `Headroom.js`, `jQuery.headroom.js`, `owl.carousel.min.js`, `smoothscroll.js` passed |
| F-03 | Local asset paths | Static inspection of HTML/CSS references | No broken local references | No broken local project references observed in the current page | PASS | Images, CSS, and JS files resolve locally |
| F-04 | Navigation and menu | Browser render and interaction review | Menu toggles and section links still work | Mobile nav and section navigation remained operational on the live page | PASS | Screenshot validation confirmed the navigation structure remained usable |
| F-05 | Contact flow | Code check of `#contactForm` handler | Message is encoded safely and opens WhatsApp | Logic used `encodeURIComponent` and kept the existing destination | PASS | Active script remains intact and no invalid form handler was introduced |
| F-06 | Project showcase integrity | Direct inspection of carousel markup | No duplicate church project, original project destinations preserved | Only one church item remained in the active showcase and the same destinations were retained | PASS | Carousel entries for CRUD Products, My Church Website, Photo Artiste, and PrayAR remained correctly represented |

## A. Static inspection

| ID | Test | Method | Expected Result | Actual Result | Status | Evidence / Blocker |
|---|---|---|---|---|---|---|
| S-01 | Archive extracts | Extract RAR v5 with system `libarchive` via Python `ctypes` into a separate directory | All entries extract without error | 40 files, 0 errors | PASS | `unrar`/`7z`/`bsdtar` unavailable; libarchive path used |
| S-02 | Entry point present | List project root | `index.html` exists | `index.html` present (only HTML page) | PASS | BASELINE_INVENTORY §3 |
| S-03 | Local references in `index.html` resolve | Script resolves every non-remote `src`/`href` (URL-decoded) against the file system | All exist | 23 of 23 local references exist | PASS | Includes `images/project/my curch .png` and the certificate PDF |
| S-04 | Local `url()` references in CSS resolve | Parse `css/tooplate-style.css` and `css/unicons.css` | All local targets exist | 6 local font URLs exist; 1 remote (Google Fonts) skipped | PASS | Remote font not checkable (see S-19) |
| S-05 | In-page anchors have targets | Compare `href="#…"` with element ids | `#about`, `#project`, `#resume`, `#contact` exist | All four exist | PASS | `href="#"` placeholders on lines 94 and 342 point nowhere (KI-020) |
| S-06 | First-party JS parses | `node --check` on `custom.js`, `donlwod.js`, `downloud.js`, `submit.js`, `jQuery.headroom.js`, `smoothscroll.js` | No syntax errors | No syntax errors | PASS | Vendor minified files and `Headroom.js` not syntax-checked |
| S-07 | Active form handler's fields exist | Compare ids used by inline script with DOM | `name`, `email`, `message`, `contactForm` exist | All exist | PASS | `index.html` 350–364 |
| S-08 | `js/submit.js` fields exist | Compare ids in `submit.js` with DOM | `#number` exists | `#number` does not exist; file is also not loaded | FAIL | KI-004 |
| S-09 | A genuine CV PDF exists | List PDFs, extract text of the only PDF | A CV PDF | Only a course certificate (Canva, 1 page) | FAIL | KI-001; CONTENT_AND_LINKS §5, §7 |
| S-10 | html2pdf loaded once | Count `<script>` tags | One version | Two versions (0.9.3 and 0.10.1) | FAIL | KI-002 |
| S-11 | Navbar pinned rule contains `rotate(-45deg)` as previously reported | Read CSS and SCSS; runtime computed transform | Prior report: rule present | Not present; pinned = `translate(0,0)` | FAIL | Prior observation not reproduced (N-01). Marked FAIL because the expected result (rule present) was not met |
| S-12 | Page title and meta description | Read `<head>` | Non-empty, meaningful | Title present (trailing space); description empty; author empty | FAIL | KI-013 |
| S-13 | Viewport meta | Read `<head>` | Present | `width=device-width, initial-scale=1, shrink-to-fit=no` | PASS | |
| S-14 | Every `<img>` has `alt` | Static and DOM check | All have `alt` | All have `alt` (quality weak: `project image`, `svg image`) | PASS | Quality issue tracked in KI-011 |
| S-15 | No secrets in project files | Pattern search over non-vendor, non-minified files | No matches | No matches | PASS | Minified vendor files not scanned |
| S-16 | SCSS compiles to the shipped CSS | — | Equivalent output | Not run | BLOCKED | No Sass compiler in the environment; installing was out of scope |
| S-17 | HTML validity against a validator | — | No validator errors | Not run | BLOCKED | No validator installed/network unavailable |
| S-18 | `bootstrap.min.css` equals upstream 4.3.1 | — | Identical to upstream | Not run; one non-stock rule found (`.img-fluid`, KI-006) | BLOCKED | No upstream copy offline; only the one difference is known |
| S-19 | External link liveness (4 project URLs, social, WhatsApp, map, CDNs) | — | Reachable | Not run | BLOCKED | No network in sandbox; syntactic validity does not prove a link works |
| S-20 | Original application files unchanged after all tests | SHA-256 of all 40 original files, recorded after extraction, re-checked with `sha256sum -c` after the runtime tests | No differences, no extra/missing files | 40/40 hashes match; 40 files; no caches created | PASS | Re-checked again on the staged copy before packaging (see PROJECT_STATE) |

## B. Runtime tests (headless Chromium, local server)

| ID | Test | Method | Expected Result | Actual Result | Status | Evidence / Blocker |
|---|---|---|---|---|---|---|
| R-01 | Page loads and libraries initialise | Navigate to `/index.html` at 1280×800 | Page loads; jQuery present; carousel initialised | Title loaded; jQuery 3.3.1; `owl-loaded` true | PASS | |
| R-02 | Local resources load without failures | Capture failed requests and 4xx/5xx | No local failures | Only external hosts failed | PASS | No local 404s observed |
| R-03 | External resources load (Boxicons, Google Fonts, html2pdf ×2, map) | Page load | All load | All 5 failed | BLOCKED | Sandbox has no internet; not a project defect |
| R-04 | No JavaScript exceptions on load from first-party code | `pageerror` and console capture | None | None; only resource-load errors from R-03 | PASS | Console showed 8 resource errors (desktop) / 4 (mobile) |
| R-05 | Headroom navbar pin/unpin | Scroll down 1500px then up 300px; read classes and computed transform | Unpinned hides, pinned shows | `headroom--unpinned` → translateY −106.5px; `headroom--pinned` → identity | PASS | Also covers KI N-01 |
| R-06 | Carousel initial state | Count Owl items | 4 slides (+ clones), one active | 8 items (4 clones), 1 active, 4 dots | PASS | |
| R-07 | Carousel next/prev via DOM click | `button.click()` on `.owl-next` / `.owl-prev` | Active slide changes and returns | cruds → church → cruds | PASS | DOM-dispatched click, not a real pointer |
| R-08 | Carousel arrows with a real pointer | — | Arrow glyph clickable | Not completed: button box measured 0×0; Playwright refused the click | BLOCKED | Coordinate-based click on the `::before` glyph was not attempted (KI-019) |
| R-09 | "Download Resume" produces a PDF | Call `downloadPDF()` in page | A downloadable PDF | Threw `html2pdf is not defined` (CDN unreachable) | BLOCKED | Output file content could not be observed; function and options verified statically (KI-001) |
| R-10 | Colour mode toggle (desktop 1280) | Click `.color-mode` | `dark-mode` class, dark background, icon swaps | `body.dark-mode`, background `rgb(12,12,13)`, icon `active` | PASS | |
| R-11 | Colour mode available on tablet/phone | Computed `display` at 375, 768 | Control visible | `none` at 375 and 768 | FAIL | KI-005 |
| R-12 | Colour mode persists across reload | Toggle, reload | Dark class restored | Body class empty; no storage entries | FAIL | KI-008 |
| R-13 | Dark-mode paragraph contrast ≥ 4.5:1 | Computed colours + calculation | ≥ 4.5:1 | 2.88:1 (`rgb(91,91,91)` on `rgb(12,12,13)`) | FAIL | KI-007 |
| R-14 | Smooth scroll to a section (desktop) | Click "Resume" | Section top ≈ 49px below viewport top | `#resume` top = 49px | PASS | |
| R-15 | Mobile menu opens (375×812) | Click toggler | Menu expands, `aria-expanded=true` | `collapse show`, height 140px, `aria-expanded=true` | PASS | |
| R-16 | Mobile menu closes after selecting a link | Click "Projects" | Menu collapses | Still `collapse show`; page scrolled | FAIL | KI-009 |
| R-17 | Contact form opens a single WhatsApp URL | Fill fields, `requestSubmit()` with `window.open` stubbed | One `window.open` call, no backend request | One call to `https://wa.me/201107175122?text=…`; form has no `action` and the handler contains no `fetch`/XHR (static) | PASS | No message was sent |
| R-18 | Message text is URL-encoded | Input containing `&`, `#`, `%` | Encoded in URL | Inserted verbatim | FAIL | KI-003 |
| R-19 | WhatsApp delivery / real wa.me handling | — | Message opens in WhatsApp | Not run | BLOCKED | External side effect not permitted; no network |
| R-20 | No horizontal overflow at representative widths | `scrollWidth − clientWidth` at 375, 768, 1280, 1920 | 0 | 0 at 375, 1280, 1920; 6 at 768 | FAIL | KI-018 (cause not isolated) |
| R-21 | Colour-mode control reachable by keyboard | Tab through the first 9 stops; read `tabIndex` | Toggle receives focus | `tabIndex` −1, not in sequence | FAIL | KI-010 |
| R-22 | Local icon font loads | `document.fonts` | `unicons` loaded | `unicons: loaded` | PASS | `bx` icons and Maven Pro are remote → R-03 |
| R-23 | Project images display uncropped | Inspect rendered screenshots (desktop carousel; mobile hero) | Screenshots shown without clipping | 40% border-radius clips carousel images; mobile hero rendered normally | FAIL | KI-006. Only two screenshots were viewed; the others were captured but not examined |
| R-24 | Cross-browser behaviour (Firefox, Safari, Edge) | — | Same behaviour | Not run | BLOCKED | Only Chromium available |

## C. Not exercised (not claimed as tested)

Tooltips on social icons; hover animations on nav links; Google Maps iframe; following any external link; `file://` loading; print layout; tablet landscape/other widths beyond 375/768/1280/1920; Lighthouse/performance scoring; screen reader behaviour; behaviour of PDF generation with network access.

## D. Raw observations kept for reference

- Console on desktop load: 8 `net::ERR_NAME_NOT_RESOLVED` resource errors (5 distinct external URLs, some logged twice); no `pageerror`.
- Active slide href during R-07: `https://abanoub13-7.github.io/products-/` (`target=_blank`).
- Tab order (first nine stops): brand, About, Projects, Resume, Contact, Download Resume, Get a free quote, a cloned carousel link (photo-artiste), a cloned carousel link (prayar).

## E. Phase 4 revalidation — 2026-10-17

**Environment and diagnosis:** Windows; project served read-only at `http://127.0.0.1:8000/index.html`. No listener existed on port 8000 before the test server was started. `npx.cmd --no-install playwright screenshot --wait-for-selector .owl-carousel --timeout 30000 --viewport-size="1280,800" ...` completed with exit code 0. `npx.cmd --no-install playwright test --list` returned exit code 1 and “No tests found” (0 tests in 0 files); the project has no `package.json`, Playwright config, or spec files, and Node could not resolve `playwright` or `@playwright/test`. `npm` invoked through PowerShell resolves to `npm.ps1`, which is blocked by the system execution policy; `npx.cmd` runs. No earlier individual failing command logs were available, so this is the repeatable test-runner cause established for this project, not a claim about unobserved historical command details.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| F4-01 | Serve `index.html`; load local CSS and JavaScript without HTTP errors | PASS | `index.html` returned HTTP 200 (`text/html`). Browser recorded 20 first-party responses and 0 local non-200 responses. |
| F4-02 | JavaScript load errors, Console errors, Page Errors | PASS | After reload and full load, console error count 0 and page-error count 0. |
| F4-03 | Mobile menu opens and closes after choosing a link | PASS | At 390×844, toggler opened `#navbarNav`; selecting Projects closed it (`show=false`, toggler `aria-expanded=false`). |
| F4-04 | Toggle dark and light modes | PASS | At 1280×800, `body.dark-mode` and `aria-pressed` became true, then both returned false on the second toggle. |
| F4-05 | Move Owl Carousel with arrows; verify active item changes | PASS | Real pointer hits targeted `.owl-next` and `.owl-prev`; active text changed Photo Artiste → PrayAR → Photo Artiste. |
| F4-06 | Submit synthetic contact data; verify WhatsApp encoding without sending | PASS | One `window.open` call was intercepted. The captured `wa.me` URL decoded to the exact expected text including `& + # %` and Arabic `سلام`; no real message was sent. |
| F4-07 | Project image decoding, intrinsic/declared dimensions, lazy attributes | PASS | All 8 rendered image instances (four originals plus Owl clones) decoded; all had `loading="lazy"` and natural dimensions matching their width/height attributes. |
| F4-08 | Deferred library order and dependency startup | PASS | Ten script tags were deferred in source order: html2pdf, jQuery, Popper, Bootstrap, Headroom, jQuery.headroom, Owl, smoothscroll, custom, donlwod. Runtime exposed jQuery 3.3.1, Owl plugin/initialized carousel, and html2pdf. |
| F4-09a | `node --check js/custom.js` | PASS | Exit code 0. |
| F4-09b | `node --check js/donlwod.js` | PASS | Exit code 0. |
| F4-09c | `node --check js/submit.js` | PASS | Exit code 0. |
| F4-10 | Existing resume-download behavior; no new CV created | BLOCKED | The control was clicked with html2pdf present, but no download event arrived within 60 seconds. A synthetic Blob download also produced no event in this browser harness, so download capture is unsupported here. Static implementation evidence remains: `downloadPDF()` exports `document.body` to `page.pdf`; the repository has no CV PDF (only the course certificate). No output file was claimed or retained. |

**Additional load evidence:** the browser reported `document.readyState=complete`, title `Abanoub Eshak | Web Designer & Front-End Developer`, zero failed first-party responses, zero external request failures, zero console errors, and zero page errors. The browser download probe was removed/not retained. The successful CLI screenshot was stored outside the project in the session folder and removed after verification. No test files or screenshots were created inside the project.

**Phase 4 status: BLOCKED.** F4-01 through F4-09 passed. F4-10 remains blocked by the browser harness; this is not evidence that the website's download succeeded or that the website itself failed. No application defects were confirmed by this rerun, so no application changes were made.

## F. CV download implementation verification — 2026-10-18

These checks record the subsequent owner-requested CV download change. They do not alter the historical F4-10 outcome above.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| CV-01 | Download control points to the approved PDF path and filename | PASS | Browser DOM inspection confirmed `href="assets/files/Abanoub-Eshak-CV.pdf"`, `download="Abanoub-Eshak-CV.pdf"`, and visible label `Download CV`. |
| CV-02 | Page export is no longer connected to the download control | PASS | Removed the inline `downloadPDF()` call, the `html2pdf` CDN include, and the only active handler `js/donlwod.js`. Browser runtime reports both `window.html2pdf` and `window.downloadPDF` undefined; the control is a direct file link and does not export `document.body`. |
| CV-03 | Approved CV file exists at the required path | BLOCKED | Checked `assets/files/Abanoub-Eshak-CV.pdf` and its parent directory; neither currently exists. Browser `fetch` of the resolved URL `http://127.0.0.1:8000/assets/files/Abanoub-Eshak-CV.pdf` returned HTTP 404. The owner must add the PDF at that exact path. |
| CV-04 | Actual PDF download and document contents | BLOCKED | Not claimed or tested as successful because the required PDF is absent (the target currently returns 404). Recheck after the owner supplies it. |
| CV-05 | Page remains loadable after removing the exporter | PASS | Browser reload reached `document.readyState=complete`; 16 local responses had no failures, with zero console errors and zero page errors. |

No CV, placeholder PDF, or invented resume content was created. The download feature's code path is ready, but end-to-end verification and Phase 4 closeout remain blocked until the supplied asset is present.

## G. Contact form email implementation tests — 2026-10-18

These tests use a mocked DOM and mocked `fetch`; no request was sent to FormSubmit and no email was sent or received. PASS below means the local behavior matched the expected result, not that the external service or mailbox is configured.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| CF-01 | Form target, method, existing fields, and active handler | PASS | `index.html` retains required name/email/message controls, uses `POST` to `https://formsubmit.co/ajax/beboeshak70@gmail.com`, and loads `js/submit.js`. The inline form-specific WhatsApp handler is removed. |
| CF-02 | Required values and email format | PASS | Mock tests confirmed blank name, blank email, malformed email, and blank message each stop before `fetch`, show a field-specific error, and focus the invalid field. |
| CF-03 | Request target and message contents | PASS | Mock `fetch` observed POST to the configured FormSubmit AJAX URL. The request contains the trimmed name, email, message, `_replyto` set to the sender email, and `_subject` containing the sender name. |
| CF-04 | Successful service response | PASS | Mock `success: true` and `success: "true"` responses show the accepted-by-FormSubmit status and reset the form. UI wording does not claim confirmed inbox delivery. |
| CF-05 | HTTP/API rejection and network failure | PASS | Mock non-2xx/API rejection and thrown network error show explicit failure messages and retain entered values; the submit control is restored. |
| CF-06 | Duplicate submission prevention | PASS | While a mocked request is pending, the button is disabled and a second submit causes no second fetch. It is re-enabled after completion. |
| CF-07 | Activation-required response | PASS | Mock activation/verification response displays the activation requirement, does not claim delivery, and does not clear the fields. |
| CF-08 | Other WhatsApp links | PASS | Static inspection confirms the separate WhatsApp social link remains unchanged; the contact-form handler contains no WhatsApp URL or `window.open`. |
| CF-09 | FormSubmit recipient activation | BLOCKED | No live request was made. On the deployed site, submit the form once to trigger FormSubmit's activation email; check the target inbox and spam folder, then follow the confirmation link. Treat that first request as activation only, not proof the message was delivered. |
| CF-10 | Actual message reaches target inbox | BLOCKED | No real email was sent or received. After activation, submit a fresh test through the published page and verify receipt of the sender name, email, and message in the target inbox; only then mark delivery PASS. |

`node --check js/submit.js` and `node --check js/custom.js`: PASS. FormSubmit documents cross-origin AJAX form submission at <https://formsubmit.co/documentation>. Mocked unit behavior does not verify external availability, recipient activation, spam filtering, or mailbox delivery.

## H. English/Arabic language switch — 2026-10-18

Tests below apply to the bilingual implementation added after the historical Phase 0–4 results above. Historical records have not been rewritten. Browser tests used the local Node static server at `http://127.0.0.1:8765/index.html`; its browser viewport remained 1076×844.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| I18N-01 | JavaScript syntax | PASS | `node --check` passed for all 11 files in `js/`, including `language.js`, `custom.js`, and `submit.js`. |
| I18N-02 | Dictionary parity and page coverage | PASS | Static check found 88 keys in each locale, no missing locale counterparts, and all 75 unique `data-i18n`/`data-i18n-title` page keys in both dictionaries. |
| I18N-03 | English default and complete language round-trip | PASS | With the stored choice cleared, the page loaded as `lang=en`, `dir=ltr`. Browser checks switched to Arabic (`lang=ar`, `dir=rtl`) and back; 86 localized DOM nodes returned to the same English text/attribute values. Main navigation, CV/CTA buttons, education heading, form labels, placeholders, metadata, image alternatives, hover labels and aria labels were checked. |
| I18N-04 | Repeated switches do not accumulate or remove project content | PASS | Six repeated language changes retained four original carousel project cards and one original CRUD card; the translated project text remained singular in the original slide. Owl's expected loop clones remain present. |
| I18N-05 | Keyboard access and target-language description | PASS | Focusing the native language button and pressing Enter switched to English; Space switched to Arabic. Focus remained on the button, and its accessible name described the destination language. |
| I18N-06 | Language preference persistence | PASS | Selecting Arabic stored `ar`; a page reload restored `lang=ar` and `dir=rtl`. |
| I18N-07 | Storage-unavailable fallback | PASS | A simulated `localStorage` getter exception logged a warning; the button still switched from Arabic to English and updated `lang`/`dir`. |
| I18N-08 | Dark-mode state during language changes | PASS | Browser clicks toggled dark mode on and off. A language change while dark left `body.dark-mode` and theme `aria-pressed` intact; the language button remained legible. |
| I18N-09 | RTL desktop presentation and screenshot | PASS | At the available 1076×844 viewport, Arabic text alignment, form alignment, timeline placement and translated headings rendered RTL. The desktop resume screenshot was visually inspected. English restored LTR alignment. |
| I18N-10 | Mobile layout and mobile menu | BLOCKED | `page.setViewportSize({width:390,height:844})` left `window.innerWidth` at 1076. The integrated browser harness therefore could not exercise the phone breakpoint, opened mobile menu, or mobile-width RTL/LTR layout. CSS retains the existing responsive menu rules; this is not a runtime PASS. |
| I18N-11 | Carousel slide control and translated labels | PASS | In RTL the previous/next labels were Arabic. A DOM-triggered `.owl-next.click()` changed the active slide from إدارة المنتجات to موقع كنيستي. |
| I18N-12 | Carousel pointer operation | BLOCKED | The generated Owl arrow buttons have zero-sized boxes; the browser harness's pointer locator timed out. No real pointer success is claimed. |
| I18N-13 | CV link and local PDF | PASS | The link retained `href="assets/files/Abanoub-Eshak-CV.pdf"` and `download="Abanoub-Eshak-CV.pdf"`. Local HTTP GET returned 200; the 69,752-byte response starts with `%PDF-`. The temporary test server used `application/octet-stream`, so its content-type is not evidence about deployment hosting. |
| I18N-14 | Actual CV download event | BLOCKED | Clicking the CV link did not produce a browser `download` event within 10 seconds. The target itself returned a valid PDF response; no event-capture success is claimed. |
| I18N-15 | Form text and validation/status localization | PASS | With a mocked `fetch`, Arabic blank-name, invalid-email and blank-message validation, accepted response, activation-required response, service rejection and network failure all displayed their Arabic messages. A visible network-error status changed to English when the locale changed. |
| I18N-16 | Form request and external email delivery | PASS / BLOCKED | **PASS:** mocked request retained the FormSubmit URL, sender fields, reply-to and localized subject. **BLOCKED:** no live request was sent; recipient activation and real inbox receipt remain unverified. |
| I18N-17 | Unchanged WhatsApp and LinkedIn destinations | PASS | Browser DOM checks matched the original WhatsApp URL (including its Arabic query text) and LinkedIn URL exactly. The CV path, project destinations, phone number and email address were not changed by the translation work. |
| I18N-18 | Sass compilation | BLOCKED | No Sass compiler is available. The matching RTL source rules were added to `sass/tooplate-style.scss`; the shipped CSS was checked in the browser, but SCSS compilation was not claimed. |

No FormSubmit message was sent. The browser's inability to change viewport size, detect downloads, and pointer-target the carousel arrows is recorded as **BLOCKED**, not as a product success or failure. Real recipient activation/delivery and mobile-width runtime checks remain outstanding.

## I. RTL carousel and translation synchronization regression — 2026-10-18

These focused checks follow the bilingual implementation and preserve the historical results above.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| RTL-01 | Changed JavaScript syntax | PASS | `node --check` passed for `js/language.js` and `js/custom.js`. |
| RTL-02 | English dictionary against current HTML | PASS | Text and translated attributes were compared against the raw `index.html`; there were no mismatches after correcting the education degree and adding a distinct key for the submit button's accessible name. |
| RTL-03 | Education content synchronization | PASS | The source and dictionary both state Bachelor's Degree in Computer Information Systems (CIS); the Arabic entry expresses the same degree. |
| RTL-04 | Carousel direction and repeated language changes | PASS | Eight English/Arabic changes synchronized `dir`, Owl's runtime RTL option and `.owl-rtl` class. Four original projects remained in their existing order, with only the expected four loop clones. |
| RTL-05 | Project image preservation and lazy loading | PASS | The four original image elements remained the same nodes with unchanged `src`, `srcset`, `loading`, width and height attributes. Active images loaded while cycling in both directions; no project-image request errors were observed. Alt text continued to use its locale-specific dictionary values. |
| RTL-06 | Language persistence | PASS | Arabic restored as `lang=ar`, `dir=rtl` after reload; after switching back, English restored as `lang=en`, `dir=ltr`. |
| RTL-07 | Contact form translations and states | PASS | Arabic blank-name, blank/invalid-email and blank-message checks displayed their translated validation messages. Mocked accepted, activation-required, rejected and network-failure responses displayed their Arabic messages; a visible status translated when switching back to English. No live request was sent. |
| RTL-08 | Theme and navigation regression | PASS | Dark mode remained enabled across a language change and could be disabled afterward. All four desktop navigation links still resolve to page targets. |
| RTL-09 | Runtime errors and project image requests | PASS | Browser checks observed no JavaScript page errors, failed project-image requests or HTTP error responses for project images. |
| RTL-10 | Mobile RTL/LTR and mobile menu | BLOCKED | The available browser viewport remained 1076×844; phone-width behavior could not be tested. |
| RTL-11 | Carousel pointer and actual CV download | BLOCKED | A real pointer interaction with the generated carousel controls and a browser `download` event were not observed. The approved CV link remains `assets/files/Abanoub-Eshak-CV.pdf`; this check does not claim a download event. |
| RTL-12 | Live FormSubmit delivery | BLOCKED | All form responses were mocked. Recipient activation and receipt of a real message were not tested. |

The targeted issue is resolved without changing project data, image files or destinations, the CV destination, the FormSubmit endpoint, or the WhatsApp social URL. No new project phase was started.

## J. Automatic project carousel — 2026-10-18

Focused browser checks against the locally served page at `http://127.0.0.1:8765/index.html`. Historical baseline and bilingual results above are retained. The carousel continues to use the existing local Owl Carousel library; no dependency was added.

| ID | Test | Status | Actual result and evidence |
|---|---|---|---|
| CAR-01 | Load all four project images | PASS | Opened each of the four original slides; all four local images completed with non-zero natural dimensions: `cruds.png` 1297px, `my curch .png` 1290px, `artist.png` 1301px, and `prayar.png` 1317px. Existing lazy loading means an off-screen slide need not load until visited. No project-image request failed. |
| CAR-02 | Automatic movement and smooth transition | PASS | Browser runtime reported `autoplay=true`, `autoplayTimeout=3500`, and `smartSpeed=800`. Active project changed after the interval; during manual movement Owl reported 800ms speed and the stage transition computed to `0.8s`. |
| CAR-03 | Pause on hover and resume | PASS | After hovering the visible carousel, the active image remained unchanged for 3.9 seconds. Moving the pointer away resumed automatic advancement. |
| CAR-04 | Manual arrows and slide indicators | PASS | A real browser pointer click on the 48×48 `.owl-next` control changed the active project. Clicking a desktop dot and a phone-width dot selected the corresponding project; all four dots are available. The prior zero-size arrow hitbox is fixed. |
| CAR-05 | Repeated language switches preserve carousel | PASS | Eight consecutive English/Arabic switches kept four original slides, their image-source/link order, and Owl's `dir`, runtime `rtl` option, and `.owl-rtl` class synchronized on every change. In Arabic, all project text and localized attributes matched their dictionary entries. |
| CAR-06 | RTL/LTR after language switch and reload | PASS | Arabic reloaded as `lang=ar`, `dir=rtl`, `owl.options.rtl=true`, `.owl-rtl` present. English reloaded as `lang=en`, `dir=ltr`, `owl.options.rtl=false`, `.owl-rtl` absent. The active project image remained visible. |
| CAR-07 | Responsive image and control layout | PASS | At 375×812, 768×1024, and 1280×800, the carousel and active image were visible and the image width matched the carousel width (330px, 690px, and 1015px respectively). At 375px the existing responsive CSS hides the side arrows while the dots remain visible and operable. |
| CAR-08 | Dark and light theme | PASS | Toggling changed the page theme and the project card background from dark `rgba(17, 17, 19, 0.9)` back to light `rgb(255, 255, 255)`. |
| CAR-09 | Reduced-motion preference | PASS | With `prefers-reduced-motion: reduce`, initialization used `autoplay=false` and `smartSpeed=0`; the active image stayed unchanged for 3.7 seconds. Changing back to `no-preference` at runtime restored autoplay and 800ms speed and advanced the slide. |
| CAR-10 | JavaScript and failed project-image requests | PASS | Browser reload/cycle checks recorded zero JavaScript page errors and zero failed requests for `images/project/`. The four originals loaded when visited. |
| CAR-11 | Project content, image paths, destinations, and order | PASS | Browser records matched the four existing source paths, project names, descriptions, and `href` values from `index.html`, in their original order, before and after language changes. |
| CAR-12 | Language/autoplay/reduced-motion synchronization | PASS | Repeated direction changes did not reset or remove slides; changing the motion preference updated Owl's runtime options and resumed/stopped its timer without losing the active project or changing project order. |
| CAR-13 | Sass source compilation | BLOCKED | No Sass compiler is installed in the environment. The authored Sass source was updated alongside the shipped CSS; browser runtime checks exercised the shipped CSS. Compilation equivalence was not claimed. |
| CAR-14 | Repository unit-test runner | BLOCKED | The test runner reported no test files. Focused browser checks CAR-01–CAR-12 were run directly; no test files were added. |

Files changed for this update: `js/custom.js`, `css/tooplate-style.css`, `sass/tooplate-style.scss`, and this test record plus `PROJECT_STATE.md`, `PROJECT_ROADMAP.md`, and `KNOWN_ISSUES.md`. No test files or project content were changed.
