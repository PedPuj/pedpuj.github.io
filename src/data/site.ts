// ─────────────────────────────────────────────────────────────
//  SITE DETAILS
//  Pedro: these are the only "about me" bits that live in code.
//  Change the text between the quote marks and nothing else.
// ─────────────────────────────────────────────────────────────

export const site = {
  wordmark: 'Bedro',
  title: 'Bedro',
  description:
    'Street, documentary and analogue photography. Mostly film, mostly Sevilla.',

  /** The mono line in the bottom-left corner of the homepage. */
  homeMonoLine: 'BEIJING, CHINA — 50MM',

  /** Shown on the About page, and used for the Email link. */
  email: 'hello@bedro.com',

  /** Full address of your Instagram profile. */
  instagram: 'https://www.instagram.com/',

  /** The camera line. Appears on About and in every photo's metadata. */
  camera: 'CANON EOS 500 · 50MM F/1.4',

  /** The films line on the About page. */
  films: 'PORTRA 400 / GOLD 200 / LUCKY 200 / HP5',
} as const;

/** The two paragraphs on the About page. */
export const aboutText = [
  "I just try to have fun with the camera and learn a bunch of stuff. I look like I'm serious, but really I don't know what to photograph apart from old people, like everyone else.",
  'Based in Sevilla. Mostly film, mostly street. I shoot in series because a single photograph rarely says enough on its own, and because I like the way a sequence forces me to make decisions.',
] as const;

/** Describes the photo of you on the About page, until the real one is added. */
export const aboutPhotoSlot = 'Portrait of the photographer — vertical, waist up';
