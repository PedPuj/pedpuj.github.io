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

export interface ChapterInput {
  /** How the place is written out under the big characters, e.g. "Xi'an". */
  name: string;
  /** The same name in the local script. Leave it out and none is drawn. */
  local?: string;
  /** The paper colour while this chapter is on screen. Keep it very close
      to the series `ground` — this should be felt, not noticed. */
  ground?: string;
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
  /**
   * A journey, told in chapters. Every key must match a `place` written on
   * the frames below, exactly — that is how a frame knows which chapter it
   * belongs to. The chapters come out in the order the frames run, not the
   * order they are written here.
   *
   * Leave this out completely and the series stays one continuous run,
   * exactly as it was.
   */
  chapters?: Record<string, ChapterInput>;
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
    chapters: {
      BEIJING: { name: 'Beijing', local: '北京', ground: '#F2F0EA' },
      "XI'AN": { name: "Xi'an", local: '西安', ground: '#F6F1E7' },
      GUILIN: { name: 'Guilin', local: '桂林', ground: '#F1F3EE' },
      HANGZHOU: { name: 'Hangzhou', local: '杭州', ground: '#F2F2EF' },
      SHANGHAI: { name: 'Shanghai', local: '上海', ground: '#F5EFE8' },
    },
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
    places: 'TOKYO, HAKONE, KYOTO, OSAKA',
    year: 2025,
    accent: null,
    ground: '#FBFAF7',
    counterColor: '#8C877E',
    treatment: 'bare',
    // The trip ends where it began, so Tokyo is a chapter twice. The two
    // frames at Odawara are the train between Hakone and Kyoto: they belong
    // to no city, so the page runs straight through them.
    chapters: {
      TOKYO: { name: 'Tokyo', local: '東京', ground: '#F9F9F7' },
      HAKONE: { name: 'Hakone', local: '箱根', ground: '#F8F9F4' },
      KYOTO: { name: 'Kyoto', local: '京都', ground: '#FBF8F2' },
      OSAKA: { name: 'Osaka', local: '大阪', ground: '#FAF7F4' },
    },
    cover: { file: 'dscf9263.jpg', slot: 'Skytree standing over the rooftops, blue sky' },
    next: 'china',
    frames: [
      // ── Tokyo ───────────────────────────────────────────────
      { file: 'dscf9263.jpg', slot: 'Skytree standing over the rooftops, blue sky', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf9396.jpg', slot: 'Shinjuku towers behind the station lamps', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf9385.jpg', slot: 'Shinjuku building from below, signs up the corner', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf9425.jpg', slot: 'Docomo tower framed by dark trees', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf9731.jpg', slot: 'Train smearing past the platform doors', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9686.jpg', slot: 'Escalator crowd dissolving into blur', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9761.jpg', slot: 'Commuter reading at the train door', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9826.jpg', slot: 'Pagoda roofs through the leaves, Asakusa', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9962.jpg', slot: 'Silver tanuki in a red shrine box, Asakusa', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9797.jpg', slot: 'Schoolboy looking back down the arcade', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025, pair: true },
      { file: 'dscf9965.jpg', slot: 'Two men pulling a rickshaw', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9915.jpg', slot: 'Kissaten with a green awning and a bicycle', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9804.jpg', slot: 'Yellow crates stacked down the back lane', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025, pair: true },
      { file: 'dscf9789.jpg', slot: 'Man at a machine in the workshop', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9936.jpg', slot: 'Shop walls of stacked bowls', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9946.jpg', slot: 'Pale green hydrangea', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9973.jpg', slot: 'Tokyo Banana counter, the smile', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9978.jpg', slot: 'Passers-by blurring past a station shop', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf9983.jpg', slot: 'Feet and a suitcase crossing the stone floor', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },

      // ── Hakone ──────────────────────────────────────────────
      { file: 'dscf0116.jpg', slot: 'Conductor rushing past the mountain train window', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'HAKONE', year: 2025 },
      { file: 'dscf0121.jpg', slot: 'Conductor through the train window, stickers on the glass', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'HAKONE', year: 2025, pair: true },
      { file: 'dscf0123.jpg', slot: 'Two conductors at the switchback', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'HAKONE', year: 2025 },
      { file: 'dscf0098.jpg', slot: 'Pink vending machine in the woods', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'HAKONE', year: 2025 },
      { file: 'dscf0160.jpg', slot: 'Owakudani, steam over the sulphur slope', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'HAKONE', year: 2025 },

      // ── Odawara, between ────────────────────────────────────
      { file: 'dscf0340.jpg', slot: 'Transfer signs down the station corridor', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'ODAWARA', year: 2025 },
      { file: 'dscf0342.jpg', slot: 'Shinkansen guard leaning from his window', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'ODAWARA', year: 2025 },

      // ── Kyoto ───────────────────────────────────────────────
      { file: 'dscf0349.jpg', slot: 'Yellow nursery bus at a crossing', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0364.jpg', slot: 'Postman at his scooter', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0372.jpg', slot: 'Woman passing a temple gate', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0393.jpg', slot: 'Maiko walking away, orange obi', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025, pair: true },
      { file: 'dscf0412.jpg', slot: 'Geiko hurrying past, a blur in black and white', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0399.jpg', slot: 'Man sitting with the street cats', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0392.jpg', slot: 'Takoyaki cook at his trays', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0394.jpg', slot: 'Kitchen pass, faces behind the slats', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0445.jpg', slot: 'Police box lit red at night', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0447.jpg', slot: 'Children in helmets walking to school', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025, pair: true },
      { file: 'dscf0492.jpg', slot: 'Old man stopping on the corner', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0503.jpg', slot: 'Tram driver in cap and mask', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0531.jpg', slot: 'Old man hanging laundry in the bamboo', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },
      { file: 'dscf0579.jpg', slot: 'Strings of paper cranes', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'KYOTO', year: 2025 },
      { file: 'dscf0648.jpg', slot: 'Red train seen through the carriage window', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'KYOTO', year: 2025 },

      // ── Osaka ───────────────────────────────────────────────
      { file: 'dscf0832.jpg', slot: 'Statue of Liberty on a rooftop, wires below', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'OSAKA', year: 2025, pair: true },
      { file: 'dscf0833.jpg', slot: 'Black winged figure painted on a wall', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'OSAKA', year: 2025 },
      { file: 'dscf0911.jpg', slot: 'Red Ferris wheel on the roof, Umeda', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'OSAKA', year: 2025 },
      { file: 'dscf0928.jpg', slot: 'Neon through a gap in the building, night', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'OSAKA', year: 2025 },

      // ── Tokyo, again ────────────────────────────────────────
      { file: 'dscf0963.jpg', slot: 'Schoolboys walking up the lane', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 16MM F/1.4', place: 'TOKYO', year: 2025 },
      { file: 'dscf1020.jpg', slot: 'Crow on the letter C, National Stadium', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 50MM F/2', place: 'TOKYO', year: 2025 },
      { file: 'dscf1041.jpg', slot: 'Worker resting on the scaffolding', orientation: 'h', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf1142.jpg', slot: 'Tradesman\'s van, every tool in its place', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
      { file: 'dscf1045.jpg', slot: 'Skytree disappearing into fog', orientation: 'v', gear: 'FUJIFILM X-T5 · XF 27MM F/2.8', place: 'TOKYO', year: 2025 },
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
