// Everything you would edit in the Framer CMS lives here.

export const content = {
  partnerOne: "Tayyaba",
  partnerTwo: "Moiz",
  monogram: "MT",

  eyebrow: "TOGETHER WITH THEIR FAMILIES",
  invitationLine: "request the honour of your presence at the celebration of their marriage",

  weekday: "SATURDAY",
  day: "19",
  monthYear: "JAN 2027",
  timeLine: "at nine o’clock in the evening",

  venueName: "MARIYAM BANQUET",
  venueArea: "Karachi",
  receptionLine: "Rukhsati & Dinner",

  hintEyebrow: "YOU ARE CORDIALLY INVITED",
  hintText: "Tap the envelope to open",
  rsvpLine: "Kindly reply by the first of December",
}

export const music = {
  // Put your own file in /public and use e.g. "/music.mp3"
  src: "https://upload.wikimedia.org/wikipedia/commons/1/12/Canon_(2004)_-_Strolling_Strings_-_United_States_Air_Force_Band.mp3",
  volume: 0.6,
  startOnFirstClick: true,
}

// Same spring the Framer component uses for the open / close transition.
export const motion = { duration: 1.1, bounce: 0.12 }

// The "and more" on top of the Framer original. Set any to false for a 1:1 match.
export const extras = {
  hoverLift: true, // envelope lifts and the seal swells slightly on hover
  textReveal: true, // card lines fade up one after another as the card rises
  goldDust: true, // faint drifting gold specks in the background
}
