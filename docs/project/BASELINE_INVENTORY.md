# ABN-CODE CV — Baseline Inventory

Phase 0 — Baseline Audit & Project Protection. Documentation only; no application file was modified.

## 1. Source and method

- Source: `WS-Abanoub-CV-main.rar` (RAR v5, 3,970,951 bytes), treated as the sole canonical source and left untouched.
- Extraction: `unrar`, `7z` and `bsdtar` are not installed in the audit environment. The archive was extracted with the system `libarchive` library (via Python `ctypes`) into a separate working directory. Result: 40 files extracted, 0 errors.
- Original-file integrity reference: SHA-256 of all 40 files recorded immediately after extraction (see BASELINE_TESTS.md, test S-20).

## 2. Project root and structure

Archive top folder / project root: `WS-Abanoub-CV-main/`. Static site, single page. No `package.json`, no build tool, no lockfile, no test files, no CI config, no `.env` or credential files were found.

```
WS-Abanoub-CV-main/
├── index.html                 (only HTML page; 382 lines, 18,185 bytes)
├── README.md                  (21 bytes: "# profile-abanoub")
├── ABOUT THIS TEMPLATE.txt    (Tooplate licence notice)
├── WS-Abanoub-CV-main.code-workspace  (VS Code workspace, 60 bytes)
├── desktop.ini                (Windows folder metadata)
├── css/    5 files, 229,507 bytes
├── js/    11 files, 240,313 bytes
├── font/   6 files, 1,588,401 bytes (incl. .DS_Store)
├── images/ 12 files, 3,272,332 bytes
└── sass/   1 file, 9,860 bytes
```

Total: 40 files, 5,359,166 bytes (original archive content, before documentation was added).

Origin: the page header credits the Tooplate template "2115 Marvel" (`https://www.tooplate.com/view/2115-marvel`). `ABOUT THIS TEMPLATE.txt` permits editing and use but forbids redistributing the template file itself.

## 3. HTML pages

| Path | Purpose | Notes |
|---|---|---|
| `index.html` | Single-page portfolio/CV: navbar, About, Projects carousel, Resume (projects + education), Contact, footer | Only HTML file. `lang="en"`. Title: `Profile Abanoub ` (trailing space in source). |

Sections (ids): `#about`, `#project`, `#resume`, `#contact`. Footer has no id.

## 4. Stylesheets

| Path | Purpose | Referenced in index.html | Version / notes |
|---|---|---|---|
| `css/bootstrap.min.css` | Bootstrap CSS | Yes (line 11) | Header says v4.3.1. **Contains a non-stock rule**: `.img-fluid{max-width:100%;height:auto;border-radius: 40%;}` (stock Bootstrap 4.3.1 has no `border-radius` there). See KNOWN_ISSUES KI-006. Whole-file comparison to upstream not possible offline. |
| `css/unicons.css` | Unicons icon font classes (`.uil-*`) | Yes (line 12) | Loads `../font/unicons.*?42479262` |
| `css/owl.carousel.min.css` | Owl Carousel core CSS | Yes (line 13) | v2.3.4 |
| `css/owl.theme.default.min.css` | Owl default theme | Yes (line 14) | v2.3.4 line (header not re-verified) |
| `css/tooplate-style.css` | Site/theme styles (571 lines), loaded last | Yes (line 21) | `@import` of Google Fonts "Maven Pro" at line 10 |
| `sass/tooplate-style.scss` | SCSS source for `tooplate-style.css` | No | Not referenced by the page. Equivalence with the compiled CSS not verified (no Sass compiler available). |

## 5. JavaScript

Loading order in `index.html` (all synchronous, end of `<body>`):

1. `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js` (line 344, remote)
2. `https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js` (line 345, remote)
3. Inline `<script>` (lines 348–365): contact-form submit handler (opens WhatsApp)
4. `js/jquery-3.3.1.min.js` — jQuery 3.3.1
5. `js/popper.min.js` — Popper (2017 build, v1.x line)
6. `js/bootstrap.min.js` — Bootstrap 4.3.1
7. `js/Headroom.js` — headroom.js v0.9.4
8. `js/jQuery.headroom.js` — headroom jQuery plugin
9. `js/owl.carousel.min.js` — Owl Carousel 2.3.4
10. `js/smoothscroll.js` — DWUser SmoothScroll helper
11. `js/custom.js` — site code: colour mode, headroom init, carousel init, smooth scroll, tooltips
12. `js/donlwod.js` — defines `downloadPDF()`

| Path | Referenced | Purpose |
|---|---|---|
| `js/custom.js` | Yes | Site behaviour (see above) |
| `js/donlwod.js` | Yes (line 376) | `downloadPDF()` using `html2pdf()` on `document.body`, file name `page.pdf` |
| `js/downloud.js` | Only inside an HTML comment (line 375) | Entire file is commented out; older variant of the download code |
| `js/submit.js` | **No** (no `<script>` tag found anywhere) | WhatsApp form handler variant that reads `#number`; no such element exists in `index.html` |
| `js/smoothscroll.js` | Yes | Anchor smooth-scroll helper (its interplay with `custom.js` smooth scroll not runtime-isolated) |
| `js/Headroom.js`, `js/jQuery.headroom.js` | Yes | Navbar pin/unpin |
| `js/jquery-3.3.1.min.js`, `js/popper.min.js`, `js/bootstrap.min.js`, `js/owl.carousel.min.js` | Yes | Vendor libraries |

## 6. Fonts and icons

| Asset | Referenced | Notes |
|---|---|---|
| `font/unicons.{eot,svg,ttf,woff,woff2}` | Yes, via `css/unicons.css` | Five formats shipped (1,583,255 bytes combined); at runtime Chromium loaded `unicons` (status `loaded`) |
| `font/.DS_Store` | No | macOS metadata (6,148 bytes) |
| Google Fonts "Maven Pro" | Remote, via `@import` in `css/tooplate-style.css` | Not shipped locally |
| Boxicons 2.1.4 | Remote, `https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css` | Used for `bx`/`bxl` icons (phone, mail, social links) |

## 7. Images and documents

| Path | Size (bytes) | Dimensions | Referenced |
|---|---|---|---|
| `images/undraw/protfolio.jpeg` | 69,338 | 1408×768 | Yes (hero image) |
| `images/undraw/undraw_software_engineer_lvl5.svg` | 13,560 | n/a | No |
| `images/project/cruds.png` | 36,293 | 1297×643 | Yes (carousel) |
| `images/project/my curch .png` | 522,115 | 1290×768 | Yes (carousel; note space before `.png`) |
| `images/project/artist.png` | 537,723 | 1301×720 | Yes (carousel) |
| `images/project/prayar.png` | 165,472 | 1317×647 | Yes (carousel) |
| `images/project/project-image05.png` | 444,787 | 1504×1018 | Only inside an HTML comment |
| `images/project/project-image01.png` … `04.png` | 198,354 / 386,781 / 138,118 / 543,057 | 1504×1018 | No reference found (template leftovers; suspected unused) |
| `images/courses/Abanoub Eshak galy.pdf` | 216,734 | 1 page | Yes (link "Certificate of Completion") |

## 8. External services and remote dependencies

| Service | Used for | Where |
|---|---|---|
| cdnjs.cloudflare.com | html2pdf.js 0.9.3 and 0.10.1 | `index.html` 344–345 |
| unpkg.com | Boxicons CSS 2.1.4 | `index.html` 17 |
| fonts.googleapis.com | Maven Pro font | `css/tooplate-style.css` 10 |
| www.google.com/maps/embed | Contact-section map iframe | `index.html` 277 |
| wa.me | WhatsApp link and form destination | `index.html` 291, 361 |
| GitHub Pages / Vercel | Portfolio project destinations | `index.html` 125–150 |
| Facebook, Instagram, LinkedIn, GitHub | Social links | `index.html` 288–292 |

No backend, API endpoint, Firebase config or credentials exist in the supplied files. None of the remote resources use Subresource Integrity attributes.

## 9. References between files (confirmed)

- `index.html` → 5 CSS, 10 JS (+2 remote), 5 images, 1 PDF; all 23 local references resolve (BASELINE_TESTS S-03).
- `css/unicons.css` → `font/unicons.*` (all resolve).
- `css/tooplate-style.css` → Google Fonts (remote) and the `unicons` font family.
- `js/donlwod.js` → global `html2pdf` (remote library) and `document.body`.
- Inline script → element ids `contactForm`, `name`, `email`, `message` (all exist).

## 10. Duplicates, unreferenced and suspicious files

Confirmed unreferenced (no `<script>`/`<link>`/`<img>`/`<a>` reference in live markup): `js/submit.js`, `js/downloud.js` (only in a comment), `images/project/project-image01–05.png` (05 only in a comment), `images/undraw/undraw_software_engineer_lvl5.svg`, `sass/tooplate-style.scss`, `font/.DS_Store`, `desktop.ini`, `WS-Abanoub-CV-main.code-workspace`, `README.md`, `ABOUT THIS TEMPLATE.txt`.

None of these were removed. "Unreferenced" means no reference was found in the supplied page; it does not prove the file is unneeded.

Duplicates/near-duplicates: two html2pdf versions loaded; two PDF-download script files (`donlwod.js` active, `downloud.js` commented); two contact-form handlers (inline active, `submit.js` inactive); the carousel markup contains each project once (Owl adds 4 clones at runtime).

Naming oddities (not changed): `donlwod.js`, `downloud.js`, `protfolio.jpeg`, `my curch .png`.

## 11. Existing build, dev and test instructions

- `README.md` contains only the title line. No documented run, build or test procedure.
- No test files, test configuration or package manager configuration exist.
- Appropriate local serving for this static site: any static HTTP server rooted at `WS-Abanoub-CV-main/` (this audit used Python's `http.server`); opening `index.html` directly from disk was not tested.
