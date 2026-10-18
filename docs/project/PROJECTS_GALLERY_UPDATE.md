# Projects gallery update — 2026-10-18

## Scope
Projects carousel (`#project` in `index.html`) now shows seven projects, once each, in this order: Products/CRUD, My Church, Photo Artiste, PrayAR, Bride List, Juice Menu, Devoo SaaS. Existing Bootstrap, jQuery, Owl Carousel, language switch, theme toggle, contact form and CV link were not changed.

## Image mapping (each image was viewed; filename matched content in all 7 cases)
| Project | New file | Source | Size |
|---|---|---|---|
| Products/CRUD | images/project/crud-products.jpg | products.jpg | 1080x2136 |
| My Church | images/project/my-church.jpg | my church.jpg | 1080x3392 |
| Photo Artiste | images/project/photo-artiste.jpg | photo Artist.jpg | 1080x2796 |
| PrayAR | images/project/prayar.jpg | prayer.jpg | 1079x2124 |
| Bride List | images/project/bride-list.jpg | Bride List.jpg | 1080x3196 |
| Juice Menu | images/project/juice-menu.jpg | juice menu.jpg | 1080x3190 |
| Devoo SaaS | images/project/devoo-saas.jpg | devoo saas.jpg | 1080x2952 |

Removed (replaced, no other references): cruds.png, "my curch .png", artist.png, prayar.png. `project-image01-05.png` are unreferenced template leftovers and were left untouched; the commented-out `project-image05` block inside the carousel was removed.

## Changes
- `index.html`: seven cards; image links keep `target="_blank" rel="noopener noreferrer"`, explicit width/height, `loading="lazy"`.
- `js/language.js`: existing dictionary extended; keys `project.{crud,church,artist,prayar,bride,juice,devoo}{Link,Alt,Name,Description}` in en and ar. Descriptions of the four existing projects were rewritten from what their new screenshots show.
- `css/tooplate-style.css`: image frame is 4:5 (max-height 520px), `object-fit: cover` anchored at the top; hover/focus slowly scrolls through the full screenshot (disabled under `prefers-reduced-motion`); CTA pinned to the card bottom. `sass/tooplate-style.scss` was not updated (it already lacked the `.project-info` rules).

## Content notes
- Descriptions are based only on the screenshots; the live sites could not be opened (no network). The old My Church description (parish info, schedules, event registration) did not match its screenshot, which shows a mobile dashboard, so it was replaced. The Devoo SaaS screenshot shows a storefront landing page; no SaaS/back-office features are claimed.
- The section heading ("designed for digital media agencies") is unchanged and unverified.

## Tests (headless Chromium, local server, no internet)
See the delivery report. External hosts (Google Fonts, Boxicons, Maps) and the four live project URLs were not reachable.
