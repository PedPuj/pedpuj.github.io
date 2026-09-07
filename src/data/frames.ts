// ─────────────────────────────────────────────────────────────
//  THE EDIT
//
//  Pedro: this file IS the sequence. The order of the lines
//  below is the order the photographs appear on the site.
//  Nothing is sorted automatically — you decide.
//
//  To add a photograph:
//    1. Put the file in  src/images/<series>/
//    2. Add a line to the right list below.
//
//  Each line means:
//    file        the filename, exactly as it is on disk
//    slot        a note to yourself; shown as a grey block
//                until the file actually exists
//    orientation 'h' for landscape, 'v' for portrait
//    gear        camera and lens, if it wasn't the one in site.ts
//    film        the stock you shot it on (leave out for digital)
//    place       where it was taken
//    year        when
//    pair        true = this photo sits SIDE BY SIDE with the
//                next one in the list. Use it sparingly.
// ─────────────────────────────────────────────────────────────

export type Orientation = 'h' | 'v';

export interface FrameInput {
  file: string;
  slot: string;
  orientation: Orientation;
  /** Camera and lens. Leave out and it uses the one in site.ts. */
  gear?: string;
  /** Film stock. Leave out for digital frames. */
  film?: string;
  place?: string;
  year?: number;
  pair?: boolean;
}

export interface SeriesInput {
  slug: string;
  title: string;
  /** First mono line, before the year and frame count are appended. */
  places: string;
  year: number;
  /** Optional second mono line on the series index. */
  note?: string;
  /** null = no accent hue at all (Japan). */
  accent: string | null;
  ground: string;
  counterColor: string;
  treatment: 'bare' | 'mount';
  cover: { file: string; slot: string };
  /** slug of the series the "next series" line points at. */
  next: string;
  frames: FrameInput[];
}

// The order here is the order the series appear on /work, and the first one
// is the site's lead series. Workers was taken out on 7 Sep 2026 until there
// are photographs for it; src/images/workers/ is still there, so bringing it
// back means adding its block below again and pointing Japan's `next` at it.
export const series: SeriesInput[] = [
  {
    slug: 'china',
    title: 'China',
    places: "BEIJING, XI'AN, GUILIN, HANGZHOU, SHANGHAI",
    year: 2026,
    accent: '#9E2B25',
    ground: '#F5F2EC',
    counterColor: '#9E2B25',
    treatment: 'bare',
    cover: { file: 'dscf2433.jpg', slot: 'Forbidden City roofs above the red wall' },
    next: 'japan',
    frames: [
      // ── Beijing ──────────────────────────────────────────────
      { file: 'dscf2327.jpg', slot: 'Man at the balustrade, Kunming Lake', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'BEIJING', year: 2026 },
      { file: 'dscf2292.jpg', slot: 'Seventeen-Arch Bridge in the haze, birds crossing', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026, pair: true },
      { file: 'dscf2217.jpg', slot: 'Man mopping the jetty, seen between red columns', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'dscf2213.jpg', slot: 'Painted eaves and gold dragons', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'img6469.jpg', slot: 'Security guard walking away through heavy snow', orientation: 'v', gear: 'IPHONE 15 PRO MAX', place: 'BEIJING', year: 2026 },
      { file: 'dscf2433.jpg', slot: 'Forbidden City roofs above the red wall', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'dscf2460.jpg', slot: 'Corner pavilion, low sun on the brackets', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026, pair: true },
      { file: 'dscf2474.jpg', slot: 'Two women in hanfu on the cobbles', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'dscf2439.jpg', slot: 'Adjusting a headpiece against the red wall', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'dscf2499.jpg', slot: 'Roofline running to the hill behind', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'dscf2512.jpg', slot: 'Carved balustrade, the new towers in the haze behind', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'BEIJING', year: 2026 },
      { file: 'film-0017.jpg', slot: 'Notes, coins and cigarettes under the incense burner', orientation: 'h', film: 'COLOUR NEGATIVE', place: 'BEIJING', year: 2026 },

      // ── Xi'an ────────────────────────────────────────────────
      { file: 'dscf2745.jpg', slot: 'One warrior still standing in the pit', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: "XI'AN", year: 2026 },
      { file: 'dscf2809.jpg', slot: 'Man waving from a red cargo trike, thermos in hand', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'dscf2825.jpg', slot: 'Trinket stall under the brick arch', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026, pair: true },
      { file: 'dscf2822.jpg', slot: 'Prayer ribbons, all of them red', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'dscf2837.jpg', slot: 'Two stalls, two cooks, Muslim Quarter', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'dscf2838.jpg', slot: 'Pomegranates and a man who has seen the camera', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'film-0069.jpg', slot: 'The street through a rickshaw window', orientation: 'v', film: 'COLOUR NEGATIVE', place: "XI'AN", year: 2026 },
      { file: 'dscf2841.jpg', slot: 'Steam off the buns, two women working', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'dscf2843.jpg', slot: 'Juice stall, phone, a moment of nothing', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: "XI'AN", year: 2026 },
      { file: 'film-0046.jpg', slot: 'Two women in hanfu, from behind', orientation: 'v', film: 'COLOUR NEGATIVE', place: "XI'AN", year: 2026 },
      { file: 'dscf2937.jpg', slot: 'Lanterns going out of focus down the street', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: "XI'AN", year: 2026 },

      // ── Guilin ───────────────────────────────────────────────
      { file: 'dscf3123.jpg', slot: 'Karst peaks in cloud, two boats on the river', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'GUILIN', year: 2026 },
      { file: 'dscf3250.jpg', slot: 'Cigarette, red star cap, waiting by the boat', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026 },
      { file: 'dscf3252.jpg', slot: 'Threshing by hand into a wooden box', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026 },
      { file: 'dscf3254.jpg', slot: 'Rapeseed flowers on the dashboard', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026, pair: true },
      { file: 'dscf3261.jpg', slot: 'Red slippers on a millstone', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026 },
      { file: 'dscf3267.jpg', slot: 'Fish traps and birdcages on a wall', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026 },
      { file: 'dscf3165.jpg', slot: 'Shoulder pole past a rack of shirts, night', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'GUILIN', year: 2026 },

      // ── Hangzhou ─────────────────────────────────────────────
      { file: 'dscf3355.jpg', slot: 'One boat on the lake, the city behind it', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'HANGZHOU', year: 2026, pair: true },
      { file: 'dscf3370.jpg', slot: 'Rowing boat, two passengers, flat light', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'HANGZHOU', year: 2026 },
      { file: 'dscf3416.jpg', slot: 'Boatman taking a call in the garden', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'HANGZHOU', year: 2026 },
      { file: 'film-0015.jpg', slot: 'Empty corridor, wishes tied to the lattice', orientation: 'h', film: 'COLOUR NEGATIVE', place: 'HANGZHOU', year: 2026 },
      { file: 'dscf3522.jpg', slot: 'Parasols stacked on a moored boat', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'HANGZHOU', year: 2026 },

      // ── Shanghai ─────────────────────────────────────────────
      { file: 'dscf3637.jpg', slot: 'A ceiling of red lanterns', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'SHANGHAI', year: 2026 },
      { file: 'dscf3640.jpg', slot: 'Monk sitting in the last of the light', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'SHANGHAI', year: 2026 },
    ],
  },
  {
    slug: 'japan',
    title: 'Japan',
    places: 'TOKYO, OSAKA, KYOTO',
    year: 2025,
    accent: null,
    ground: '#FBFAF7',
    counterColor: '#8C877E',
    treatment: 'bare',
    cover: { file: 'cover.jpg', slot: 'Japan cover — quiet street, wide horizontal' },
    next: 'china',
    frames: [
      { file: 'japan-01.jpg', slot: 'Commuters, Osaka — horizontal, Gold 200', orientation: 'h', film: 'KODAK GOLD 200', place: 'OSAKA', year: 2025 },
      { file: 'japan-02.jpg', slot: 'Vending machines at night — vertical', orientation: 'v', film: 'KODAK PORTRA 400', place: 'TOKYO', year: 2025, pair: true },
      { file: 'japan-03.jpg', slot: 'Salaryman asleep on a train — vertical', orientation: 'v', film: 'KODAK PORTRA 400', place: 'TOKYO', year: 2025 },
      { file: 'japan-04.jpg', slot: 'Kyoto backstreet, wires — horizontal', orientation: 'h', film: 'KODAK GOLD 200', place: 'KYOTO', year: 2025 },
      { file: 'japan-05.jpg', slot: 'Woman sweeping a shop front — vertical', orientation: 'v', film: 'KODAK GOLD 200', place: 'KYOTO', year: 2025 },
      { file: 'japan-06.jpg', slot: 'Crossing in the rain — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: 'TOKYO', year: 2025 },
      { file: 'japan-07.jpg', slot: 'Kissaten counter, two customers — horizontal', orientation: 'h', film: 'KODAK GOLD 200', place: 'OSAKA', year: 2025, pair: true },
      { file: 'japan-08.jpg', slot: 'Hand on a handrail — vertical', orientation: 'v', film: 'KODAK GOLD 200', place: 'OSAKA', year: 2025 },
      { file: 'japan-09.jpg', slot: 'Shrine steps, no people — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: 'KYOTO', year: 2025 },
      { file: 'japan-10.jpg', slot: 'Last train platform — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: 'TOKYO', year: 2025 },
    ],
  },
];

/**
 * Loose — everything that didn't make a series.
 * This one IS ordered newest first: put new photographs at the TOP.
 */
export const loose: FrameInput[] = [
  { file: 'loose-01.jpg', slot: 'Dog in a doorway', orientation: 'h', film: 'KODAK GOLD 200', place: 'SEVILLA', year: 2026 },
  { file: 'loose-02.jpg', slot: 'Bus window reflection', orientation: 'h', film: 'KODAK GOLD 200', place: 'SEVILLA', year: 2026 },
  { file: 'loose-03.jpg', slot: 'Two chairs, no people', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2026 },
  { file: 'loose-04.jpg', slot: 'Laundry on a balcony', orientation: 'v', film: 'KODAK PORTRA 400', place: 'SEVILLA', year: 2025 },
  { file: 'loose-05.jpg', slot: 'Man reading a paper', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
  { file: 'loose-06.jpg', slot: 'Wet street, headlights', orientation: 'h', film: 'KODAK PORTRA 400', place: 'TOKYO', year: 2025 },
  { file: 'loose-07.jpg', slot: 'Hands, cigarette', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
  { file: 'loose-08.jpg', slot: 'Shop cat', orientation: 'h', film: 'LUCKY 200', place: 'SHANGHAI', year: 2026 },
  { file: 'loose-09.jpg', slot: 'Queue at a bakery', orientation: 'h', film: 'KODAK GOLD 200', place: 'SEVILLA', year: 2025 },
  { file: 'loose-10.jpg', slot: 'Bench, back of a head', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
  { file: 'loose-11.jpg', slot: 'Scooter and shadow', orientation: 'h', film: 'KODAK GOLD 200', place: 'OSAKA', year: 2025 },
  { file: 'loose-12.jpg', slot: 'Umbrella, blurred', orientation: 'h', film: 'KODAK PORTRA 400', place: 'KYOTO', year: 2025 },
  { file: 'loose-13.jpg', slot: 'Fruit crates', orientation: 'h', film: 'LUCKY 200', place: "XI'AN", year: 2026 },
  { file: 'loose-14.jpg', slot: 'Barber shop mirror', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
  { file: 'loose-15.jpg', slot: 'Empty plaza, midday', orientation: 'h', film: 'KODAK GOLD 200', place: 'SEVILLA', year: 2025 },
];
