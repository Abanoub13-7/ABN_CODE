# ABN-CODE CV — Project Roadmap

A planning framework. It is **not** authorization to implement any future phase; each phase starts only after the owner reviews the previous one. Across all phases: keep HTML, CSS, JavaScript, Bootstrap, jQuery and Owl Carousel; no migration to React/Next.js/Vue; preserve existing content, project URLs and personal information unless the owner approves changes; never expose secrets.

| Phase | Name | Status |
|---|---|---|
| 0 | Baseline Audit & Project Protection | Complete with documented limitations (see PROJECT_STATE.md) |
| 1 | Professional Interface Redesign | Validated for the required gaps addressed in this session: image rounding, church-project deduplication, course wording cleanup, and no CV claim |
| 2 | Portfolio Project Presentation | PASS — project showcase enhanced in the live project files with clearer labels and consistent gallery styling |
| 3 | Responsive Design and Performance | PASS — reduced duplicate asset loading, deferred scripts, and lazy-loaded/size-stable project images applied without changing the approved design |
| 4 | Functional Regression & Stability Audit | BLOCKED — current CV path and PDF bytes are verified, but the browser download event is not captured; FormSubmit recipient activation and real inbox delivery remain unverified |
| 5 | Final Delivery / Phase Closeout | Not started |

## Phase 0 — Baseline Audit & Project Protection
- **Purpose:** Establish an evidence-based baseline and protect the original files.
- **Boundaries:** Documentation only; no code, design, asset or dependency changes.
- **Dependencies:** The supplied archive `WS-Abanoub-CV-main.rar`.
- **Acceptance criteria:** Inventory, content/links, known-issues, baseline-tests, state and roadmap documents exist; original files byte-identical; BLOCKED checks documented; `ABN-CODE-CV-Phase-0-Audit.zip` created and verified.

## Phase 1 — Professional Interface Redesign
- **Purpose:** Modern, professional visual design of the existing single page (typography, spacing, colour system, navbar, hero, sections, footer, light/dark themes).
- **Boundaries:** Existing stack only; all current content, project destinations and contact destinations preserved; no change to CV-download or form logic (Phase 4); no new content invented. Decisions on KI-006 (image rounding), KI-005/007/008/010/012 (theme, contrast, accessibility of the toggle) fall here.
- **Dependencies:** Owner review of Phase 0; answers to the unresolved questions in PROJECT_STATE.md; Phase 0 documents as the preservation baseline.
- **Acceptance criteria:** Content/links checklist from CONTENT_AND_LINKS.md still satisfied; theme colours pass agreed contrast checks; no new console errors versus the baseline; desktop and mobile review by the owner.

## Phase 2 — Portfolio Project Presentation
- **Purpose:** Present the four carousel projects (and the three Resume entries) clearly: titles, short descriptions, technologies, links, meaningful image alt text.
- **Boundaries:** Only facts the owner supplies or the source already contains; destinations unchanged; no invented descriptions or stacks.
- **Dependencies:** Phase 1 visual system; owner answers on project naming (CRUD Products, My Church Website, Photo Artiste, PrayAR) and the church-project question.
- **Acceptance criteria:** Every project shown with its original destination; images have descriptive alt text (KI-011); carousel (or replacement) is keyboard and pointer usable (KI-019).

## Phase 3 — Responsive Design and Performance
- **Purpose:** Reliable layout across phone/tablet/desktop and lighter page weight.
- **Boundaries:** No framework change; asset changes (e.g., image optimisation, removing unused fonts) need owner approval and must not delete originals without approval.
- **Dependencies:** Phases 1–2; the 768px overflow (KI-018), mobile menu behaviour (KI-009), asset findings (KI-014, KI-015, KI-016).
- **Acceptance criteria:** No horizontal overflow at agreed widths; mobile menu closes after navigation; measured page weight and Lighthouse-style results compared against the Phase 0 baseline (to be captured with network access).

## Phase 4 — CV Download and Contact Functionality
- **Purpose:** Make "Download Resume" deliver the intended CV and make the contact flow robust.
- **Boundaries:** A real CV PDF must come from the owner (none exists today); the contact form uses FormSubmit without a project backend; no real messages sent during tests; no secrets exposed. The separate WhatsApp social link remains unchanged.
- **Dependencies:** Owner decision on the CV deliverable (KI-001); resolve duplicate html2pdf (KI-002), URL encoding (KI-003), orphan handler (KI-004).
- **Acceptance criteria:** Download delivers the intended file (verified with network access); the form validates required fields/email, submits name/email/message to the configured FormSubmit recipient, handles service/network failures, and prevents duplicate submissions; recipient activation and real inbox delivery are verified separately; only one submit handler is active.

### Phase 4 revalidation — 2026-10-17

Regression checks for page loading, JavaScript/console errors, mobile menu close, light/dark switching, pointer-operated carousel arrows and active-slide changes, encoded WhatsApp form submission (captured; no message sent), project-image loading/dimensions/lazy attributes, deferred script order, and the three requested `node --check` commands all passed. The resume button uses the existing page-export function, but actual downloaded output remains **BLOCKED**: the browser harness did not emit a download event for the site action or even for a synthetic Blob download. No application behavior was changed. See `BASELINE_TESTS.md` for per-check evidence and the Playwright CLI diagnosis.

Phase 5 remains **Not started**. Do not begin it as part of this revalidation.

### CV download implementation update — 2026-10-18

The button now links directly to `assets/files/Abanoub-Eshak-CV.pdf` with `download="Abanoub-Eshak-CV.pdf"`; the `html2pdf` include and the page-export handler were removed. Browser inspection confirmed the link attributes, no page-export globals, and a clean load of all 16 local responses (no local failures, console errors, or page errors). The CV file has not yet been supplied and its URL returns HTTP 404, so actual file download remains **BLOCKED**. Phase 4 remains **BLOCKED** until the owner adds the PDF and the download is verified. Phase 5 has not started.

### Contact form email update — 2026-10-18

The contact form now posts by AJAX to FormSubmit for `beboeshak70@gmail.com`; the name, email, and message are included, with a clear subject and reply-to address. Required-field/email validation, in-progress button locking, and visible accepted/error/activation-required statuses are implemented. The form-specific WhatsApp handler was removed; the separate WhatsApp social link was not changed. Mocked request/response and validation tests are recorded in `BASELINE_TESTS.md`.

- **Code checks: PASS.** These establish request construction and UI handling only; no real message was sent.
- **Recipient activation and delivery: BLOCKED.** On the deployed site, the owner must submit once to trigger FormSubmit's activation email, check the target inbox/spam folder, and follow its confirmation link. Treat that first submission as activation only; then submit a fresh test message and verify its receipt before delivery can be marked PASS.
- Phase 4 remains **BLOCKED** for recipient activation/real delivery and for the missing CV PDF/download verification. Phase 5 has not started.

## Phase 5 — Regression Testing and Final Delivery
- **Purpose:** Verify nothing regressed against the Phase 0 baseline and deliver the final package.
- **Boundaries:** No new features; fixes only for regressions.
- **Dependencies:** Phases 1–4 complete; BASELINE_TESTS.md and CONTENT_AND_LINKS.md as the comparison baseline.
- **Acceptance criteria:** All baseline PASS items still pass; previously BLOCKED checks re-run where a network/browser is available (external links, PDF output, other browsers); content/link checklist verified; final archive built, listed and checked.

### English/Arabic language switch update — 2026-10-18

The existing single-page site now has a keyboard-accessible English/Arabic switch with an internal 88-key-per-locale dictionary. It localizes the active page copy, accessibility attributes, document metadata, and all contact-form validation and response states; Arabic sets RTL layout and English restores LTR. The selected language persists in `localStorage`, with an in-memory fallback when storage is unavailable. Project and social destinations, personal contact details, and the approved CV link/file remain unchanged. No dependency or phase was added.

- **PASS:** all 11 JavaScript files pass `node --check`; translation-key parity and page-key coverage pass. Browser verification passed language round-trips, keyboard activation, stable project-card counts after repeated toggles, persisted-language reload, dark-mode state preservation, mocked form validation/response states, desktop RTL styling, and carousel slide change through a DOM click.
- **PASS:** the CV link still points to `assets/files/Abanoub-Eshak-CV.pdf`; a local request returned HTTP 200 and a `%PDF-` signature. The actual browser download event was not observed.
- **BLOCKED:** the integrated browser remained at 1076×844 when asked to resize to 390×844; mobile runtime testing could not be completed. The carousel buttons have zero-sized boxes, so the browser harness could not verify a real pointer click; its DOM-triggered next-slide behavior did work.
- **BLOCKED:** no live FormSubmit request was made. Recipient activation and real inbox delivery remain outstanding. Phase 4 is still blocked by these external confirmations and the unavailable browser download event; Phase 5 remains not started.

### RTL carousel and translation synchronization fix — 2026-10-18

Focused regression work corrected Owl Carousel's stale LTR runtime state after a switch to Arabic and synchronized the education translation (CIS) and contact button accessible label with the current HTML. Eight repeated language changes preserved the four original project/image nodes, order, image attributes, and loop clones; images loaded on active slides, and no page errors or failed project-image requests were observed. Translation-to-source checks, form status/validation mocks, persistence, desktop theme, and navigation checks passed. Mobile runtime, real pointer operation, actual browser download capture, and live FormSubmit delivery remain blocked. This is a targeted fix within existing scope; no phase was started and Phase 5 remains not started.

### Automatic project carousel update — 2026-10-18

The current Owl Carousel was configured for a calm 3.5-second autoplay interval, 800ms transitions, hover pause, slide dots, and reduced-motion support. Arrow hit areas were made operable on desktop; dots remain the manual controls at the existing mobile breakpoint. Language changes keep Owl's runtime RTL/LTR state synchronized.

- **PASS:** focused browser tests CAR-01–CAR-12 in `BASELINE_TESTS.md` cover image loading, automatic and manual navigation, hover pause, language/reload direction, mobile/tablet/desktop layout, themes, motion preferences, runtime errors, and unchanged project records.
- **BLOCKED:** Sass compilation was not available because the environment has no Sass compiler; the repository test runner also found no test files. The shipped stylesheet was browser-tested directly.
- No phase or dependency was added; the Phase 4 external delivery/download blockers and Phase 5 status are unchanged.
