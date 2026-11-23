# Changelog

All notable changes to the Dr. Smiles Uganda website concept.

## 2026-11-23: Review round 3

### Removed from the site (on request)
- The "Qualifications & registration" placeholder in About. The facts row now has two cards: "In the news"
  and "Watch the interview".
- Every mention of Pasha Dental Surgery. The map card now reads "Find us in Bukoto" with the Kirabo Complex
  address, and both Google Maps buttons open the clinic's map pin by coordinates rather than the Pasha
  listing. The treatment menu now says "Available at the clinic in Kirabo Complex, Bukoto". The Pasha
  reception number is removed from the hours card.

### Services
- The full treatment menu is hidden until "See all treatments" is pressed. The button then expands the menu
  (the groups ease in one after another), scrolls to it and changes to "Hide treatments". A second
  "Hide treatments" button inside the menu closes it and returns to the services. Without JavaScript the
  menu stays visible.

### About
- Swapped the two outreach photos: the smiling patient with Dr. Smiles is now the large image (new 1100px
  version for sharp screens), and the outdoor treatment photo is the small tilted inset.

### Client overview PDF
- Removed three questions from "To finish your website": qualifications, the link to Pasha Dental Surgery,
  and which treatments he provides. The web address (drsmilesug.com), WhatsApp and phone numbers, reviews,
  photo permissions, logo file and the tip read-through remain.

## 2026-11-23: Review round 2

### Hero (desktop only)
- More space under the headline (about half a line plus 1.5rem) so the green smile no longer overlaps the
  intro text. Before, the smile reached past the start of the intro text even without hovering.
- The hover "grin" is gentler (scales to 115% instead of 145%). Phone and tablet layouts are unchanged.

### Services
- New desktop layout: a sticky intro column (title, short description, "Book a visit" and "See all treatments")
  beside a two-column grid of service cards. Cards are white with larger icons, bigger body text
  (about 16px, 1.65 line height) and a lift and green accent on hover.
- Replaced the short "Also available at the clinic" chip list with a full treatment menu in eight groups:
  check-ups and prevention, fillings and root canals, cosmetic dentistry, replacing missing teeth,
  straighter teeth, oral surgery, protective guards and children's dentistry. Items follow the Pasha Dental
  Surgery service list and clinic profile.

### Contact
- The map card now has "Get directions" and "View on Google Maps" buttons that open the clinic's exact Google
  Maps listing (Pasha Dental Surgery, plus code 9H3X+94P, Bukoto Kisasi Rd). The illustrated map is also
  clickable and shows a "Kirabo Complex" label.
- Clinic hours re-checked against the Google Maps listing: Monday to Friday 8 am to 8 pm, Saturday 8 am to
  4 pm, Sunday 10 am to 3 pm. They match what is shown.

### About
- Replaced the side photo (an unrelated selfie) with a photo from the same charity outreach as the main image:
  Dr. Smiles and a smiling patient in the dental chair. Source: the Dr. Smiles charity project post on
  Instagram, 21 October 2026. Removed the old `dr-smiles-portrait-360.webp`.

### Unchanged on purpose
- Patient reviews stay as placeholders for now.

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
