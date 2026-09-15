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

  /** The cameras on the About page, one per line, each with its lenses. */
  cameras: [
    'FUJIFILM X-T5 · 16MM F/1.4 / 27MM F/2.8 / 50MM F/2',
    'NIKON F3 · 50MM F/1.8',
    'CANON EOS 500 · 50MM F/1.4',
    'RICOH GR IV HDF · 18.3MM F/2.8',
    'CANON CANONET QL17 · 40MM F/1.7',
  ],

  /** The films line on the About page. */
  films: 'PORTRA 400 / GOLD 200 / LUCKY 200 / HP5',
} as const;

/** The two paragraphs on the About page. */
export const aboutText = [
  'Intento hacer cosas con la cámara. Aunque no tenga mucha idea, pruebo a aprender algo. A veces las fotos son un poco intensas, pero en verdá no tengo ni idea de qué fotografiar además de viejos y gente de espaldas.',
  'Vivo en Sevilla y casi siempre quiero usar carrete, pero están mu caro.',
] as const;

/** Describes the photo of you on the About page, for people who can't see it. */
export const aboutPhotoSlot = 'Yo con una Nikon F3 en una mano y una varita de incienso en la otra';
