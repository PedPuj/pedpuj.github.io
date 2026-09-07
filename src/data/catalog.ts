// ─────────────────────────────────────────────────────────────
//  Turns the hand-authored lists in frames.ts into the objects
//  the pages actually render: ids, neighbours, metadata lines
//  and — where the file exists on disk — the real image.
//
//  Pedro: you never need to touch this file.
// ─────────────────────────────────────────────────────────────

import type { ImageMetadata } from 'astro';
import { site } from './site';
import { series as seriesInput, loose as looseInput } from './frames';
import type { ChapterInput, FrameInput, Orientation, SeriesInput } from './frames';

/** Every image under src/images, resolved at build time. */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../images/**/*.{jpeg,jpg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF,tif,tiff,TIF,TIFF}',
  { eager: true },
);

function lookup(folder: string, file: string): ImageMetadata | null {
  const entry = files[`../images/${folder}/${file}`];
  return entry ? entry.default : null;
}

const pad = (n: number) => String(n).padStart(3, '0');

function metadataLine(f: FrameInput): string {
  const where = [f.place, f.year].filter(Boolean).join(', ');
  return [f.gear ?? site.camera, f.film, where]
    .filter(Boolean)
    .join(' · ')
    .toUpperCase();
}

export interface Frame {
  id: string;
  /** 1-based position in its own sequence. */
  index: number;
  /** Series slug, or 'loose'. */
  collection: string;
  image: ImageMetadata | null;
  slot: string;
  /** The filename this frame is looking for, for when it isn't there. */
  file: string;
  orientation: Orientation;
  /** Where it was taken, as written in frames.ts. Null when not given. */
  place: string | null;
  metadata: string;
  /** True when this frame sits side by side with the next one. */
  pair: boolean;
  href: string;
  prev: string | null;
  next: string | null;
}

/**
 * How wide a frame is for its height. The real proportions where the file
 * exists, and the declared orientation until it does — so a frame that has
 * not arrived yet still reserves a box of roughly the right shape.
 *
 * Lives here because three things now need the same answer: the photograph
 * itself, a pair working out how to share a line, and the series page
 * working out how wide to draw a chapter's rule.
 */
export function ratioOf(frame: Frame): number {
  if (frame.image) return frame.image.width / frame.image.height;
  return frame.orientation === 'v' ? 2 / 3 : 3 / 2;
}

/** True when a frame is taller than it is wide. */
export function isUpright(frame: Frame): boolean {
  return ratioOf(frame) < 1;
}

function build(collection: string, inputs: FrameInput[]): Frame[] {
  return inputs.map((f, i) => {
    const id = `${collection}-${pad(i + 1)}`;
    const prevId = i > 0 ? `${collection}-${pad(i)}` : null;
    const nextId = i < inputs.length - 1 ? `${collection}-${pad(i + 2)}` : null;
    return {
      id,
      index: i + 1,
      collection,
      image: lookup(collection, f.file),
      slot: f.slot,
      file: f.file,
      orientation: f.orientation,
      place: f.place ?? null,
      metadata: metadataLine(f),
      pair: f.pair === true,
      href: `/frame/${id}/`,
      prev: prevId,
      next: nextId,
    };
  });
}

/** One leg of a journey: a run of consecutive frames sharing a place. */
export interface Chapter extends ChapterInput {
  /** 1-based position in the series. */
  index: number;
  /** The `place` string that gathered these frames. */
  place: string;
  frames: Frame[];
  /** First and last frame numbers, e.g. 1 and 12. */
  from: number;
  to: number;
  /** "001 — 012 · 12 FRAMES" */
  rangeLine: string;
}

/**
 * Walks the edit in order and starts a new chapter every time the place
 * changes to one the series has named. Frames before the first named place,
 * or with no place at all, stay outside any chapter — the sequence simply
 * runs on, which is what a series without `chapters` does everywhere.
 */
function chaptersOf(
  frames: Frame[],
  named: Record<string, ChapterInput> | undefined,
): Chapter[] {
  if (!named) return [];
  const out: Chapter[] = [];
  for (const frame of frames) {
    const place = frame.place;
    const entry = place ? named[place] : undefined;
    if (!entry || !place) continue;
    const current = out[out.length - 1];
    if (current && current.place === place) {
      current.frames.push(frame);
      continue;
    }
    out.push({
      ...entry,
      index: out.length + 1,
      place,
      frames: [frame],
      from: frame.index,
      to: frame.index,
      rangeLine: '',
    });
  }
  for (const chapter of out) {
    chapter.from = chapter.frames[0].index;
    chapter.to = chapter.frames[chapter.frames.length - 1].index;
    const n = chapter.frames.length;
    chapter.rangeLine = `${pad(chapter.from)} — ${pad(chapter.to)} · ${n} ${n === 1 ? 'FRAME' : 'FRAMES'}`;
  }
  return out;
}

export interface Series extends Omit<SeriesInput, 'frames' | 'cover' | 'chapters'> {
  frames: Frame[];
  frameCount: number;
  /** Empty when the series is one continuous run. */
  chapters: Chapter[];
  cover: { image: ImageMetadata | null; slot: string };
  /** e.g. "BEIJING, XI'AN, SHANGHAI, GUILIN — 2026 — 38 FRAMES" */
  monoLine: string;
  href: string;
}

export const allSeries: Series[] = seriesInput.map((s) => {
  const frames = build(s.slug, s.frames);
  return {
    ...s,
    frames,
    frameCount: frames.length,
    chapters: chaptersOf(frames, s.chapters),
    cover: { image: lookup(s.slug, s.cover.file), slot: s.cover.slot },
    monoLine: `${s.places} — ${s.year} — ${frames.length} ${frames.length === 1 ? 'FRAME' : 'FRAMES'}`,
    href: `/work/${s.slug}/`,
  };
});

export const looseFrames: Frame[] = build('loose', looseInput);

export const allFrames: Frame[] = [
  ...allSeries.flatMap((s) => s.frames),
  ...looseFrames,
];

export function getSeries(slug: string): Series | undefined {
  return allSeries.find((s) => s.slug === slug);
}

/** The series a frame belongs to, or undefined for a loose frame. */
export function seriesOf(frame: Frame): Series | undefined {
  return getSeries(frame.collection);
}

/** "NEXT SERIES — JAPAN · 31 FRAMES →" */
export function nextSeriesLine(s: Series): { text: string; href: string } | null {
  const target = getSeries(s.next);
  if (!target || target.slug === s.slug) return null;
  return {
    text: `NEXT SERIES — ${target.title.toUpperCase()} · ${target.frameCount} FRAMES →`,
    href: target.href,
  };
}

/** "014 / 38" */
export function counterText(index: number, total: number): string {
  return `${pad(index)} / ${total}`;
}

/** The single full-bleed photograph on the homepage. */
export const heroImage = lookup('home', 'hero.jpg');
export const heroSlot = 'Roofline running to the hill behind, Beijing';

/** The photograph of the photographer on the About page. */
export const aboutImage = lookup('about', 'portrait.jpg');
