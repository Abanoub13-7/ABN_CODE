# ABN-CODE CV — Project State

- **Project name:** ABN-CODE CV
- **Current phase:** Phase 4 — Functional Regression & Stability Audit
- **Current step:** Final verification of the CV download and email contact flow; the current CV file is present and its PDF response is verified, while recipient activation and real inbox delivery remain pending.
- **Phase 0 status:** COMPLETE WITH DOCUMENTED LIMITATIONS. The original audit records are preserved as the baseline.
- **Phase 1 status:** PASS — verified for the required gap checks: rounded project imagery, single church-project presentation in the carousel, unsupported course claims removed, and no fake CV claim introduced.
- **Phase 2 status:** PASS — the live project showcase update is in place and validated.
- **Phase 3 status:** PASS — duplicate library loading removed, deferred script execution added, and lazy image loading + reserved image dimensions applied without altering the approved design.
- **Phase 4 status:** BLOCKED — the current CV path and PDF bytes are verified, but the browser harness did not report a download event; FormSubmit recipient activation and real inbox delivery also remain unverified. See the dated addenda below.

## Step completion

| Step | Deliverable | Status |
|---|---|---|
| 01 | `docs/project/BASELINE_INVENTORY.md` | Complete |
| 02 | `docs/project/CONTENT_AND_LINKS.md` | Complete |
| 03 | `docs/project/KNOWN_ISSUES.md` | Complete (21 findings + 1 prior observation not reproduced) |
| 04 | `docs/project/BASELINE_TESTS.md` | Complete (44 checks: see counts below) |
| 05 | `docs/project/PROJECT_STATE.md`, `PROJECT_ROADMAP.md` | Complete |

No equivalent project documentation existed before (only a one-line `README.md`), so no existing document was updated and no competing duplicates were created.

## Phase 4 revalidation addendum — 2026-10-17

The earlier high-level Phase 4 PASS entry above is retained as historical context. It did not include completed evidence for every requested interaction; this addendum records the current rerun and supersedes that broad status.

- **Status: BLOCKED.** Tests F4-01–F4-09 passed; F4-10 (actual resume-file download) is blocked by the browser harness. No application change was made and no new application defect was confirmed.
- The site was served read-only at `http://127.0.0.1:8000/index.html`. It returned HTTP 200; 20 first-party resource responses were observed with no non-200 responses. The runtime reported no console errors or page errors.
- At 390×844, the menu opened and closed after choosing Projects (`#navbarNav.show=false`, `aria-expanded=false`). At 1280×800, the theme toggled to dark and back to light with matching `aria-pressed` values.
- Real pointer clicks on the visible carousel arrow glyphs changed the active slide Photo Artiste → PrayAR → Photo Artiste. The arrow buttons have zero-sized DOM boxes, but the pointer hit the `.owl-next` and `.owl-prev` controls and the active item changed.
- A synthetic form submission opened exactly one captured `wa.me` URL. `&`, `+`, `#`, `%`, and Arabic text round-tripped through its encoded `text` query value; no external message was sent.
- All eight rendered carousel image instances (four project images plus Owl clones) decoded successfully. Each had `loading="lazy"` and natural dimensions matching its declared dimensions.
- All ten external/local script tags were deferred and ran in document order; jQuery 3.3.1 and Owl Carousel were available and Owl initialized. `node --check` passed independently for `js/custom.js`, `js/donlwod.js`, and `js/submit.js`.
- Playwright CLI diagnosis: `npx.cmd --no-install playwright screenshot ...` completed with exit code 0. The repeatable `playwright test --list` invocation returned exit code 1 with “No tests found” (0 files); the project has no `package.json`, Playwright config, spec files, or resolvable `playwright` / `@playwright/test` Node modules. PowerShell also blocks the `npm.ps1` shim under the current execution policy; invoking `npx.cmd` works. The prior individual command logs are not present, so their exact failures cannot be mapped more specifically.
- The resume link was clicked with the real html2pdf global present, but no download event was observed within 60 seconds. A synthetic Blob download also produced no download event in this browser harness, so this is a harness limitation, not proof of an application failure. The existing function still targets `document.body` and names its output `page.pdf`; the repository has no CV PDF (only the course certificate). No separate CV was created.
- No project screenshot or test-spec file was created. The one CLI screenshot was written outside the project under the session folder and removed after verification. No application files were changed.

The individual statuses and evidence are recorded in `BASELINE_TESTS.md`; earlier baseline results remain preserved there.

## CV download update — 2026-10-18

- Replaced the `Download Resume` JavaScript/page-export action with a direct download link to `assets/files/Abanoub-Eshak-CV.pdf`, using the requested download filename `Abanoub-Eshak-CV.pdf` and the label `Download CV`. Browser verification found the link, the exact href/download attributes, no `html2pdf`/`downloadPDF` globals, and 16 local responses with no failures, console errors, or page errors.
- Removed the now-unused `html2pdf` CDN include and its only active caller, `js/donlwod.js`. No CV content or PDF was created.
- **Download verification: BLOCKED.** Browser inspection confirmed the exact link and filename, with no `html2pdf` or `downloadPDF` global loaded. A request for the target returned HTTP 404 because neither the PDF nor its `assets/files/` directory exists. Successful download and PDF contents must remain unclaimed until the owner supplies the file.
- Phase 4 remains **BLOCKED** pending the supplied PDF and an actual download check. No new phase was started.

## Contact form email update — 2026-10-18

- Replaced the form's inline WhatsApp URL/window handler with the official FormSubmit AJAX endpoint for `beboeshak70@gmail.com`. The existing name, email, and message fields remain; the request includes a sender-specific subject and reply-to value.
- Added required-field and email checks, a visible status region, request-in-progress feedback, disabled-submit protection, and explicit service/network failure handling. The contact-specific orphan WhatsApp handler in `js/submit.js` was replaced and the script is now loaded by `index.html`. Other WhatsApp links remain unchanged.
- **Implementation checks: PASS** for local mocked tests of validation, request payload, accepted/rejected responses, network failure, and duplicate-submit prevention. These tests do not contact FormSubmit or prove email delivery.
- **FormSubmit recipient activation: BLOCKED** until the owner submits the form once on the deployed site, checks the target inbox/spam folder for FormSubmit's activation email, and follows its confirmation link. Treat that first submission as activation only. **Real email delivery: BLOCKED** until a fresh post-activation test message is received. Do not regard the form as delivery-ready until both steps pass.
- Phase 4 remains **BLOCKED** for recipient activation/real delivery and the separate missing-CV download check. See `BASELINE_TESTS.md` and `PROJECT_ROADMAP.md`.

## Audit scope and files inspected

All 40 original files were inventoried. Read in full: `index.html`, `css/tooplate-style.css`, `js/custom.js`, `js/donlwod.js`, `js/downloud.js`, `js/submit.js`, `js/jQuery.headroom.js`, `README.md`, `ABOUT THIS TEMPLATE.txt`, the workspace file, `desktop.ini`. Inspected by header, search or metadata only: vendor libraries (`bootstrap.min.*`, `jquery-3.3.1.min.js`, `popper.min.js`, `owl.carousel.min.*`, `Headroom.js`, `smoothscroll.js`), `css/unicons.css`, `sass/tooplate-style.scss` (rotation search and header only), fonts, images (dimensions/sizes; four project screenshots checked for alpha), and the certificate PDF (metadata and text).

## Completed checks

Totals from BASELINE_TESTS.md: 44 checks (S-01…S-20, R-01…R-24): 22 PASS, 13 FAIL, 9 BLOCKED.

- **PASS:** S-01–S-07, S-13–S-15, S-20; R-01, R-02, R-04–R-07, R-10, R-14, R-15, R-17, R-22
- **FAIL:** S-08–S-12; R-11–R-13, R-16, R-18, R-20, R-21, R-23
- **BLOCKED:** S-16–S-19; R-03, R-08, R-09, R-19, R-24

## Phase 0 confirmed defects (historical; details in KNOWN_ISSUES.md)

KI-001 (download is a page capture, no CV PDF), KI-002 (two html2pdf versions), KI-003 (unencoded WhatsApp text), KI-004 (orphan `submit.js`), KI-005 (colour mode hidden < 992px), KI-006 (modified `.img-fluid` radius in Bootstrap CSS), KI-007 (dark-mode contrast), KI-009 (mobile menu stays open), KI-010 (toggle not keyboard accessible), KI-011 (accessible names/alt), KI-012 (accent contrast, calculated), KI-013 (metadata), KI-017 (content leftovers/typos). Suspected: KI-016, KI-018. Improvements: KI-008, KI-014, KI-015, KI-020, KI-021; KI-019 is a confirmed observation.

The 2026-10-17 rerun verified that KI-002, KI-003, and KI-009 were resolved in the then-current implementation. Its KI-001 page-export limitation was superseded by the 2026-10-18 direct-file-link change above.

## Unresolved questions for the owner

1. Is the 40% rounding on images (KI-006) intentional?
2. The approved CV path is `assets/files/Abanoub-Eshak-CV.pdf`; the owner must supply the file there before download verification.
3. Is the carousel project "My Church Website" the same project as "Church Management Website" in the Resume section?
4. Which wording in the "Front-End Development Course / first place" entry can be supported (the certificate says "Web Development, 25 hours")?
5. The earlier observation that the pinned navbar uses `rotate(-45deg)` was not reproduced in the supplied copy (N-01): was it seen in a different copy or on the mobile menu icon?
6. Do the four project URLs still work? (not verifiable offline)

## Phase 0 environmental blockers (historical)

- No internet access in the sandbox → external hosts unreachable (Boxicons, Google Fonts, html2pdf, Google Maps, project URLs): R-03, R-09, R-19 (also a prohibited side effect), S-18, S-19.
- No Sass compiler → S-16. No HTML validator → S-17.
- Only Chromium available → R-24.
- Carousel arrows are 0×0 boxes, so Playwright's pointer click could not target them → R-08.
- `unrar`/`7z`/`bsdtar` not installed → archive extracted with system `libarchive` (worked; no loss).

## Change control confirmation

No application behaviour or design was intentionally changed. HTML, CSS, SCSS, JavaScript, images, fonts, PDF, vendor libraries and configuration are byte-identical to the original archive (40/40 SHA-256 matches, re-checked after all tests and again on the staged copy before packaging). The only additions are six files under `docs/project/`. The original `.rar` was not modified.

## Next step (not started)

Phase 5 remains not started. Phase 4 still requires FormSubmit recipient activation and verified real inbox delivery; recheck the CV download in a browser that exposes completed download events. No Phase 5 work has started.

## English/Arabic language switch — 2026-10-18

- Added an accessible navbar button that switches the full page between English and Arabic without reloading. English is the first-visit default; the chosen language is saved as `abnCodeLanguage` in `localStorage` and restored on reload. A blocked/unavailable storage API is reported with a warning and does not prevent toggling.
- The internal JavaScript dictionary covers the active page's headings, navigation, biography, project descriptions and names, experience, education, contact details, form labels and dynamic form statuses, tooltips, image alternatives, and relevant accessibility labels. It also translates the document title and meta description. Project/service names and factual details, URLs, phone, email, WhatsApp, and filenames are retained.
- Arabic sets `lang="ar"` and `dir="rtl"` and mirrors text alignment, timeline placement, carousel arrows, and social tooltip placement. The light/dark control's state is untouched by a language change. `sass/tooplate-style.scss` received the matching RTL rules; no dependency was added.
- **PASS:** all 11 project JavaScript files passed `node --check`; both 88-key locale dictionaries have matching keys and cover all 75 unique page translation keys.
- **PASS:** browser checks confirmed English→Arabic→English, exact English restoration, all core page/form labels translated, stable original project-card counts after repeated switching, keyboard activation by Enter and Space, and language restoration after reload.
- **PASS:** mocked form tests covered name/email/message validation, sending payload, accepted response, activation-required response, API rejection, network failure, and updating an already-visible status after changing language. No request was sent to FormSubmit.
- **PASS:** dark mode remained active while switching languages and returned to light mode normally. A simulated `localStorage` exception logged a warning while the language button still switched.
- **PASS:** desktop browser checks at its fixed 1076×844 viewport confirmed RTL alignment, the timeline layout, RTL carousel labels and slide changes through a DOM click. The CV link retains the exact approved href and download filename; its local response is HTTP 200, 69,752 bytes, and begins with `%PDF-`. The separate WhatsApp and LinkedIn URLs were checked unchanged.
- **BLOCKED:** the browser harness's `setViewportSize(390×844)` did not change `window.innerWidth` from 1076, so phone-width runtime checks for the menu and layout could not be completed. A desktop screenshot was reviewed; this does not substitute for mobile verification.
- **BLOCKED:** the browser harness did not emit a download event after clicking the CV link, despite the 200 response and valid PDF signature. A real browser download event remains unverified.
- **BLOCKED:** recipient activation and actual email delivery still require a deployed FormSubmit activation and a separately received test message. Phase 5 remains not started.

## RTL carousel and translation synchronization fix — 2026-10-18

- The Arabic carousel regression was caused by changing the document direction without updating Owl Carousel's runtime `rtl` setting and `.owl-rtl` class. The stage kept using LTR slide positioning, moving the active slide out of the visible carousel area.
- `js/custom.js` now initializes Owl with the restored document direction and synchronizes its RTL setting/class and stage layout on language changes. The original project slides and their image nodes are retained.
- Comparison against the current `index.html` found the education degree still translated as Management Information Systems (MIS), although the approved HTML says Computer Information Systems (CIS). Both locale values now match that content. The contact button's accessible label also has a separate translation key so its English casing matches the source HTML.
- **PASS:** both changed JavaScript files pass `node --check`; current HTML text and translatable attributes have no mismatches against the English dictionary.
- **PASS:** repeated language changes retained all four original projects and image nodes, their source/loading/dimension attributes, their order, and the expected Owl loop clones. Active project images loaded in both directions; no JavaScript errors or project-image request failures were observed.
- **PASS:** Arabic and English preferences restored after reload; the theme state survived a language change; menu destinations, form validation and mocked FormSubmit status messages remained functional.
- **BLOCKED:** phone-width runtime checks, a real carousel pointer click, the browser's CV download event, and live FormSubmit recipient activation/delivery remain unverified. No new phase has been started.

## Automatic project carousel update — 2026-10-18

- The existing Owl Carousel now advances automatically every 3.5 seconds with an 800ms transition, pauses on hover, and exposes four slide indicators. Reduced-motion preference disables autoplay and sets transition speed to zero; a live preference change updates the running carousel.
- English/Arabic switching still synchronizes Owl's actual RTL state with the page. Repeated switches and reloads preserved all four projects, their original order, image sources, descriptions, and destinations.
- `css/tooplate-style.css` and its Sass source `sass/tooplate-style.scss` now provide 48×48 desktop arrow hit targets. The existing small-screen rule hides the side arrows; the visible slide dots remain operable on a 375px viewport.
- **PASS:** browser checks for all four images on slide display, autoplay/hover pause/resume, smooth transition timing, real arrow and dot interaction, eight language switches, RTL/LTR reload, three viewport sizes, dark/light appearance, reduced-motion initialization/runtime change, JavaScript page errors, project image requests, and unchanged project records. Evidence is recorded under CAR-01–CAR-12 in `BASELINE_TESTS.md`.
- **BLOCKED:** Sass compilation could not be run because no Sass compiler is available; only the shipped CSS was exercised in the browser.
- **BLOCKED:** the repository test runner found no test files; targeted browser checks were run directly.
- **Files changed:** `js/custom.js`, `css/tooplate-style.css`, `sass/tooplate-style.scss`, and the four project records (`BASELINE_TESTS.md`, `PROJECT_STATE.md`, `PROJECT_ROADMAP.md`, `KNOWN_ISSUES.md`). `index.html`, project image files, and language data were not changed.
- The existing Phase 4 external CV-download/FormSubmit blockers and Phase 5 status are unchanged. No project phase was started.
