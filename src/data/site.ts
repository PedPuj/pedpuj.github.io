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
  email: 'bedrofoto@gmail.com',

  /** Full address of your Instagram profile. */
  instagram: 'https://www.instagram.com/bedrobujol/',

  /** The Instagram handle as it is printed, without the @. */
  instagramHandle: 'bedrobujol',

  /** The camera line. Appears on About and in every photo's metadata. */
  camera: 'CANON EOS 500 · 50MM F/1.4',
} as const;

// ─────────────────────────────────────────────────────────────
//  LA SERVILLETA
//
//  The About page prints a bar napkin, the kind that sits in the
//  metal dispenser next to the olives. Everything printed on it
//  is here, and it reads exactly like a bar's: what the house
//  serves, what it promises, and the town, signed at the foot.
//
//  Keep the lines SHORT. A napkin is narrow, the type is fat,
//  and a long line will shrink the whole thing to fit.
// ─────────────────────────────────────────────────────────────

export const servilleta = {
  /** The line that introduces the list. Los Pipos: "Selecta cocina con las especialidades:" */
  entradilla: 'Selecta fotografía con las especialidades:',

  /** What the house serves. One line per printed line. */
  especialidades: [
    'Viejos, gente de espaldas,',
    'cuadrados dentro de cuadrados',
    'y gente trabajando.',
  ],

  /**
   * The ticked promises, in two columns. They come out in pairs:
   * the first of each pair ticks on the left, the second on the right,
   * exactly as a bar sets them.
   */
  promesas: [
    ['Carrete y Digital', 'Buen Encuadre'],
    ['Revelado Lento', 'Poca Prisa'],
  ],

  /**
   * The cameras, printed small in the empty half, where a bar puts its
   * addresses. The films used to be here too and were taken out: they said
   * nothing and they crowded the one part of a napkin that has to stay empty.
   */
  camaras: [
    'Fujifilm X-T5 - Nikon F3 - Ricoh GR IV',
    'Canon EOS 500 - Canonet QL17',
  ],

  /** The line just outside the box. Los Pipos: "Ambiente muy Grato - Local Climatizado" */
  lema: 'Se Fotografía a Diario - Luz Natural',

  /**
   * What somebody wrote on it in biro. It is written across the napkin when
   * you put the pointer on it — or, on a phone, when you touch it. Keep it to
   * one or two words, the way anyone writes on a napkin in a bar.
   */
  nota: 'escríbeme',

  /**
   * The inside of the fold. Nothing shows this until the napkin is opened,
   * so it is where the things that would crowd the front go.
   */
  interior: {
    entradilla: 'Y también se trabaja con:',
    lineas: [
      'Portra 400 / Gold 200 / Lucky 200 / HP5',
      '16mm · 18.3mm · 27mm · 40mm · 50mm',
    ],
    cierre: 'Gracias por su visita',
  },

  /** The town, signed at the foot with a rule under it. */
  ciudad: 'Sevilla',

  /** The ink the printer had that week: 'verde', 'azul' or 'roja'. */
  tinta: 'verde',
} as const;

/** The two paragraphs on the About page. */
export const aboutText = [
  'Intento hacer cosas con la cámara. Aunque no tenga mucha idea, pruebo a aprender algo. A veces las fotos son un poco intensas, pero en verdá no tengo ni idea de qué fotografiar además de viejos y gente de espaldas.',
  'Vivo en Sevilla y casi siempre quiero usar carrete, pero están mu caro.',
] as const;

/** Describes the photo of you on the About page, for people who can't see it. */
export const aboutPhotoSlot = 'Yo con una Nikon F3 en una mano y una varita de incienso en la otra';
