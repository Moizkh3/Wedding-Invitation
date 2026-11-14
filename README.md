# Velvet Vow — React

React rebuild of the "Velvet Vow" Framer wedding invitation: the envelope, the lace card,
the open/close spring, the fit-to-viewport scaling and the music toggle. No animation
library; the Framer spring is sampled into a CSS `linear()` easing.

## Run

    npm install
    npm run dev

## Edit

- `src/invitation.config.js` — all names, dates, venue, RSVP line, music file, and the
  three extras (`hoverLift`, `textReveal`, `goldDust`). Set the extras to `false` for a
  1:1 match with the Framer file.
- `public/fonts/` — drop `WiliamSignature.woff2` here for the script font.
- `src/styles.css` — colours (same token names as the Framer colour styles) and type.

## Structure

    src/App.jsx                         page: section, holder, caption, music button
    src/components/InvitationEnvelope   envelope + card, closed/open states
    src/components/envelopeArt          the SVG artwork, layer by layer
    src/components/MusicToggle          looping music, starts on first tap
    src/components/GoldDust             background specks (extra)
    src/hooks/useFitScale               scales the 600 × 924 invitation to the viewport
    src/lib/spring                      Framer spring -> CSS linear() easing
