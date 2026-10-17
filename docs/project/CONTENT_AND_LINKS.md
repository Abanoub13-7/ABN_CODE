# ABN-CODE CV — Content and Link Preservation Audit

Phase 0. Source: `index.html` (only page) and `js/*.js` as supplied. Destinations are recorded exactly as written in the source; nothing was normalised, corrected or tested against the live internet (the audit sandbox has no network access, so no external link was followed). Contact details are recorded only as far as needed to preserve existing behaviour.

## 1. Navigation and page sections

| Item | Source | Destination (exact) | Type |
|---|---|---|---|
| Brand "ABN-CODE" (with `uil-user` icon) | line 37 | `index.html` | Relative link (same page) |
| About | line 49 | `#about` | Anchor |
| Projects | line 52 | `#project` | Anchor |
| Resume | line 55 | `#resume` | Anchor |
| Contact | line 58 | `#contact` | Anchor |
| "Color mode" toggle | lines 64–67 | `<div class="color-mode">` (no href; click handler in `js/custom.js`) | Script-driven control |
| Hamburger toggler (below 576px) | lines 39–44 | `data-target="#navbarNav"` | Bootstrap collapse |

Nav links and the "Get a free quote" button are intercepted by `js/custom.js` (jQuery animated scroll to the target minus 49px).

## 2. Personal introduction (About, `#about`)

- Small text: "Welcome to my portfolio website!"
- Heading (`h1`): "Hey folks, I'm" followed by three CSS-rotated items: "Abanoub ", "Web Designer", "frontend ".
- Paragraph: "Building a successful product is a challenge. I am highly energetic in user experience design, interfaces and web development."
- Buttons: "Download Resume" (`href="#"` + `onclick="downloadPDF()"`) and "Get a free quote" (`href="#contact"`, class `custom-btn-link`).
- Image: `images/undraw/protfolio.jpeg`, alt text `svg image` (the file is a JPEG showing an "ABN CODE — Front-End Developer" logo graphic, per visual inspection of a rendered screenshot).

## 3. Portfolio projects displayed (carousel, `#project`)

Section heading: "Things I have designed for digital media agencies" (template-style wording; kept as-is). The carousel currently presents **four** portfolio items with project titles and concise descriptions beneath the imagery, while keeping the original destinations and the single church-project entry. All four open with `target="_blank"` and `rel="noopener noreferrer"` in the active page markup, and no duplicate church project is retained in the showcase list.

| # | Image (local) | Image alt | Destination (exact) | Link type |
|---|---|---|---|---|
| 1 | `images/project/cruds.png` | `project image` | `https://abanoub13-7.github.io/products-/` | External URL (GitHub Pages) |
| 2 | `images/project/my curch .png` | `project image` | `https://abanoub13-7.github.io/My-Curch-Website/` | External URL (GitHub Pages) |
| 3 | `images/project/artist.png` | `project image` | `https://abanoub13-7.github.io/photo-artiste/` | External URL (GitHub Pages) |
| 4 | `images/project/prayar.png` | `project image` | `https://prayar-123.vercel.app/` | External URL (Vercel) |

Verification of the suggested project list: the four projects named in the audit brief (CRUD Products, My Church Website, Photo Artiste, PrayAR) correspond to these four items by image file name and URL. The names themselves do not appear as text in the carousel; they are inferred from file/URL names and the brief. A fifth item (`project-image05.png`, link `#`) exists only inside an HTML comment (lines 156–162) and is not displayed. Whether any destination is live was **not** verified (no network).

## 4. Experience / project descriptions (`#resume`, left column, heading "PROJECTS")

| Year label | Title | Technologies label | Description (summarised; full original text in `index.html` lines 183–205) |
|---|---|---|---|
| 2025 | Church Management Website | HTML, CSS, JavaScript, Firebase | Website for a local church: news, parish information, population census, service schedules; interactive modules for event photo galleries, confession appointment booking and trip registrations |
| 2025 | October Higher Institute Website | HTML, CSS, JavaScript | Dynamic website for October Higher Institute for Engineering and Technology: institute details, inquiries, contact forms, student registration, photo galleries, feedback system with ratings |
| 2024 | Beauty Salon Website | HTML, CSS, JavaScript | Responsive website for a large beauty salon: service cards, interactive booking system, shopping cart, inquiry features |

These three entries carry no links. A commented-out template entry ("Junior Designer / Crafted Co.", lines 210–218) is not displayed. Whether the "Church Management Website" entry is the same project as carousel item 2 ("My Church Website") is not stated in the source.

## 5. Education, courses and certificates (`#resume`, right column, heading "Educations")

| Year | Institution / course | Detail | Link |
|---|---|---|---|
| 2025 | October Higher Institute for Engineering and Technology (Egypt) | Bachelor's Degree in Management Information Systems (MIS); "Very Good (86%)"; Graduation Project "The Role of Artificial Intelligence in Enhancing Employee Performance" (Excellent) | none |
| 2024 | Front-End Development Course (pea.learning) | "Achieved first place with strong skills in HTML, CSS, and JavaScript…" | "Certificate of Completion" → `images/courses/Abanoub Eshak galy.pdf` (local file path, `target="_blank"`, `rel="nofollow"`) |

A commented-out template entry ("Artwork Design / New Art School", lines 253–261) is not displayed.

Certificate file check (text extraction with `pdftotext`/`pdfinfo`): a 1-page Canva-produced certificate, "Certificate of Completion", presented to the site owner for completing "Web Development", "25 hours of training", dated Aug. 5, 2025, signed by a General Manager. The extracted text does **not** mention "pea.learning", "Front-End Development" or "first place"; those wording claims on the page therefore could not be confirmed from the PDF (unverified observation, not a defect finding). The PDF metadata date (Aug 3, 2025) and the printed date (Aug. 5, 2025) differ by two days.

## 6. Contact information and social profiles (`#contact`)

| Item | Source | Destination / value (exact) | Type |
|---|---|---|---|
| Email | line 284 | `mailto:beboeshak70@gmail.com` | Email link |
| Phone (display text) | line 283 | Plain text, not a link; digits in local (Egypt) format; same number as the WhatsApp destination below | Plain text (no `tel:` link) |
| Facebook icon | line 288 | `https://www.facebook.com/share/16rhAEtTmP/` | External URL |
| Instagram icon | line 289 | `https://www.instagram.com/abanoub_eshak13?igsh=MW1tazNxbWRmZHRxdw==` | External URL |
| LinkedIn icon | line 290 | `https://www.linkedin.com/in/abanoub-eshak-5aa268344?utm_source=share_via&utm_content=profile&utm_medium=member_android` | External URL |
| WhatsApp icon | line 291 | `https://wa.me/201107175122?text=مرحبا،%20عايز%20اتواصل%20معاكم` | WhatsApp destination (pre-filled Arabic text, partly percent-encoded) |
| GitHub icon | line 292 | `https://github.com/Abanoub13-7` | External URL |
| Footer credit | line 336 | `https://github.com/Abanoub13-7` (`target="_blank"`, `rel="nofollow"`) | External URL |
| Map | line 277 | Google Maps embed iframe (`https://www.google.com/maps/embed?pb=…`, 400×300) | Remote iframe |

Social icon links have no visible text, no `target` and no `rel`; the `title` attribute is converted by Bootstrap tooltip at runtime (`data-toggle="tooltip"`).

Footer text: "Copyright © 2025 Name . Abanoub Eshak" and "Designed by Abanoub Eshak".

## 7. Downloads and downloadable resources

| Control | Actual behaviour (source) | Real CV file? |
|---|---|---|
| "Download Resume" button | Calls `downloadPDF()` from `js/donlwod.js`: `html2pdf()` converts **`document.body`** (the whole page) to an A4 portrait PDF named `page.pdf`. It does not link to a stored CV file. | **No genuine CV PDF exists** in the project. |
| "Certificate of Completion" link | Opens `images/courses/Abanoub Eshak galy.pdf` | This is a course certificate, not a CV. |

Runtime result of the PDF generation itself: BLOCKED (see BASELINE_TESTS R-09).

## 8. Forms and submission behaviour

Contact form `#contactForm` (`method="POST"`, action `https://formsubmit.co/ajax/beboeshak70@gmail.com`): fields `name` (text, required), `email` (email, required), and `message` (textarea, required). `js/submit.js` validates the fields, sends them to FormSubmit by AJAX with a sender-specific subject and reply-to address, and reports accepted, failed, and activation-required states. There is no project backend and no `mailto:` submission. Mocked tests do not establish live service configuration or inbox delivery; FormSubmit recipient activation and a real received test email remain **BLOCKED**.

Historical baseline: before the 2026-10-18 email migration, the inline handler opened a WhatsApp URL and the orphan `js/submit.js` referenced a missing `#number`; the original test record is preserved in `BASELINE_TESTS.md`. The separate WhatsApp social icon continues to link to `https://wa.me/201107175122?text=مرحبا،%20عايز%20اتواصل%20معاكم`.

## 9. Visible features and interactions

- Fixed navbar with headroom behaviour (hides on scroll down, returns on scroll up).
- Rotating hero text (CSS animation).
- Owl Carousel: 1 item per view, loop, margin 10, arrows (nav) enabled; dots present; no autoplay configured.
- Colour mode toggle (adds/removes `dark-mode` on `<body>`; icon swaps moon/sun).
- Smooth scroll for nav links and the quote button.
- Tooltips on social icons.
- Embedded Google map.

## 10. Preservation checklist for later phases

All of the following must be preserved unless the owner decides otherwise: the four carousel destinations, the social/WhatsApp/email/GitHub destinations above, the education and project text, the certificate link, and the "Download Resume" intent (currently a direct link to the owner-supplied CV path). The contact form uses FormSubmit as documented in §8; the separate WhatsApp social link remains intact.
