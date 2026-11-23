# Changelog

All notable changes to the Dr. Smiles Uganda website concept.

## 2026-11-23: Phase 1 continuation

### Business information
- Corrected the dentist's name to **Dr. John Vianney Sserumaga** everywhere: hero introduction, About
  section, page description (metadata), README, the client overview PDF and the portfolio card.
- About now describes Dr. Sserumaga as a cosmetic dentist based in Bukoto, Kampala (source: the Dr Sserumaga
  John Vianney Facebook page and Confessions256, 29 April 2021).
- Replaced the "Years in practice" placeholder with an "In the news" link to the Confessions256 article about
  free dental check-ups for The Real Dance Crew. Qualifications and registration remain marked "To confirm".
- Services: replaced the "More treatments" placeholder with treatments listed for Pasha Dental Surgery, Bukoto
  (fillings, root canal treatment, crowns and bridges, veneers, whitening, braces, dentures, implants, mouth and
  night guards, fissure sealants). Source: pashaug.com and its clinic profile.
- Contact: added the clinic address (Kirabo Complex, 2nd floor, offices 222/223, Bukoto–Kisaasi Road, Kampala)
  with a Google Maps link, clinic hours (Mon–Fri 8 am–8 pm, Sat 8 am–4 pm, Sun 10 am–3 pm), the clinic
  reception line and the email listed on Dr. Sserumaga's Facebook page. Address and hours are no longer
  placeholders.
- Patient stories: added the verified Facebook rating (98% recommend, 28 reviews, November 2026) with links to
  the Facebook reviews and Instagram stories. One placeholder remains for a quoted review.
- Footer: added email, Facebook and location; removed the unverified "@drsmilesUG on X" line.

### Smile tips (Smile school) redesign
- Removed the Instagram-based tips entirely: no post thumbnails and no links out to Instagram posts.
  Deleted the six `assets/img/edu-*.webp` images.
- Removed the "Four everyday habits" block (its advice now lives inside the topics).
- New interactive section with six illustrated topics: Keeping your teeth white, Everyday oral hygiene, Foods
  and drinks that affect your teeth, Habits that damage your teeth, Healthy gums, Common dental mistakes.
- Selecting a topic opens a carousel of four tips. Each tip card has a 2D illustration, a heading, a practical
  tip and a short explanation (24 tips in total).
- Interaction: native horizontal swipe with snap on touch screens, previous and next buttons, dot navigation,
  "Tip X of 4" progress, an "All topics" back button and a close button, arrow-key and Escape support.
  Focus moves to the topic heading on open and back to the chosen topic on close.
- 26 inline SVG illustrations in the brand palette (one sprite, no image downloads).
- Respects reduced-motion settings; works without JavaScript by listing every topic's tips.

### Fixes
- The rating card stacks on very narrow phones so the page never scrolls sideways.
- Removed leftover styles and scripts for the old tips layout.

## 2026-11-22: Phase 1 concept
- First one-page concept: hero, About, services, why choose, gallery, patient stories, tips and contact,
  responsive layouts, scroll and cursor animations, and placeholders for unconfirmed details.
