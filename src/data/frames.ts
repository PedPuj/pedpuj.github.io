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
//    film        the stock you shot it on
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

export const series: SeriesInput[] = [
  {
    slug: 'workers',
    title: 'Workers',
    places: 'SEVILLA & ELSEWHERE',
    year: 2025,
    note: 'BLACK AND WHITE. PEOPLE AT WORK.',
    accent: '#3A3733',
    ground: '#F5F2EC',
    counterColor: '#3A3733',
    treatment: 'mount',
    cover: { file: 'cover.jpg', slot: 'Workers cover — apron, wide horizontal, b&w' },
    next: 'china',
    frames: [
      { file: 'workers-01.jpg', slot: 'Butcher behind the counter — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-02.jpg', slot: 'Hands, flour, bakery bench — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025, pair: true },
      { file: 'workers-03.jpg', slot: 'Apron detail, narrow — vertical', orientation: 'v', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-04.jpg', slot: 'Man in overalls in a doorway — vertical', orientation: 'v', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-05.jpg', slot: 'Fish market, early morning — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-06.jpg', slot: 'Barber mid-cut — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025, pair: true },
      { file: 'workers-07.jpg', slot: 'Broom, wet pavement — vertical', orientation: 'v', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-08.jpg', slot: 'Scaffolding, two men talking — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-09.jpg', slot: 'Waiter on a cigarette break — vertical', orientation: 'v', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
      { file: 'workers-10.jpg', slot: 'Empty stall at closing time — horizontal', orientation: 'h', film: 'ILFORD HP5 PLUS 400', place: 'SEVILLA', year: 2025 },
    ],
  },
  {
    slug: 'china',
    title: 'China',
    places: "BEIJING, XI'AN, SHANGHAI, GUILIN",
    year: 2026,
    accent: '#9E2B25',
    ground: '#F5F2EC',
    counterColor: '#9E2B25',
    treatment: 'bare',
    cover: { file: 'cover.jpg', slot: 'China cover — street scene, wide horizontal, colour' },
    next: 'japan',
    frames: [
      { file: 'china-01.jpg', slot: 'Market stall, Xi’an — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: "XI'AN", year: 2026 },
      { file: 'china-02.jpg', slot: 'Shopfront at dusk — horizontal', orientation: 'h', film: 'LUCKY 200', place: 'SHANGHAI', year: 2026, pair: true },
      { file: 'china-03.jpg', slot: 'Man on a bench, narrow — vertical', orientation: 'v', film: 'LUCKY 200', place: 'SHANGHAI', year: 2026 },
      { file: 'china-04.jpg', slot: 'Guilin river, figures small in frame — vertical', orientation: 'v', film: 'KODAK PORTRA 400', place: 'GUILIN', year: 2026 },
      { file: 'china-05.jpg', slot: 'Bicycles and rain — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: 'BEIJING', year: 2026 },
      { file: 'china-06.jpg', slot: 'Noodle shop interior — horizontal', orientation: 'h', film: 'LUCKY 200', place: 'BEIJING', year: 2026 },
      { file: 'china-07.jpg', slot: 'Woman with an umbrella — vertical', orientation: 'v', film: 'KODAK GOLD 200', place: 'SHANGHAI', year: 2026, pair: true },
      { file: 'china-08.jpg', slot: 'Doorway, red paint — vertical', orientation: 'v', film: 'KODAK GOLD 200', place: "XI'AN", year: 2026 },
      { file: 'china-09.jpg', slot: 'Overpass, commuters — horizontal', orientation: 'h', film: 'KODAK PORTRA 400', place: 'SHANGHAI', year: 2026 },
      { file: 'china-10.jpg', slot: 'Old men playing cards — horizontal', orientation: 'h', film: 'LUCKY 200', place: 'GUILIN', year: 2026 },
      { file: 'china-11.jpg', slot: 'Hands counting money — vertical', orientation: 'v', film: 'KODAK PORTRA 400', place: "XI'AN", year: 2026 },
      { file: 'china-12.jpg', slot: 'Empty street, early — horizontal', orientation: 'h', film: 'KODAK GOLD 200', place: 'BEIJING', year: 2026 },
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
    next: 'workers',
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
