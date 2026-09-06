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
import type { FrameInput, Orientation, SeriesInput } from './frames';

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
  metadata: string;
  /** True when this frame sits side by side with the next one. */
  pair: boolean;
  href: string;
  prev: string | null;
  next: string | null;
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
      metadata: metadataLine(f),
      pair: f.pair === true,
      href: `/frame/${id}/`,
      prev: prevId,
      next: nextId,
    };
  });
}

export interface Series extends Omit<SeriesInput, 'frames' | 'cover'> {
  frames: Frame[];
  frameCount: number;
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
export const heroSlot = 'Homepage hero — one strong frame, full bleed, horizontal';

/** The photograph of the photographer on the About page. */
export const aboutImage = lookup('about', 'portrait.jpg');
