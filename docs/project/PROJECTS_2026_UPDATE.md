# 2026 projects update (corrected)

Target: the Projects timeline in `#resume` (left column, heading key `resume.projects`, above the Educations column), alongside Church Management Website, October Higher Institute Website and Beauty Salon Website. The upper `#project` Owl Carousel gallery is unchanged.

- Added PrayAR, Juice Menu, Bride List (2026) using the existing `.timeline-wrapper` / `.timeline-info` pattern (title, small stack line, description, existing `<ul>` bullets, link). No new CSS.
- Keys: `experience.{prayar,juice,bride}{Title,Description,Feature1-3,Link}`, `experience.webAppTech` (en + ar).
- `resume.projects` -> "Featured Projects" / "أبرز مشاريعي" (from the earlier heading request; revert the two strings if you want the old "PROJECTS" / "المشروعات").
- `education.courseHours` -> 90 hours (en + ar). The linked certificate PDF already says 90.
- Links reuse the URLs already in the gallery.

## Evidence limits
Project source code is not in the repo and the live sites could not be opened. Features come from the existing screenshots. The stack line says only "Responsive web app, Vercel" (the sites are on *.vercel.app); frameworks, APIs and data persistence are unverified and not claimed.
