// Oprawy oświetleniowe; każda oddaje też źródło światła (włączane wieczorem).
import type { Builder, Params, Part } from '../types';
import { cylinder, sphere, span } from '../parts';

const num = (p: Params, key: string, fallback: number) => (typeof p[key] === 'number' ? (p[key] as number) : fallback);
const str = (p: Params, key: string, fallback: string) => (typeof p[key] === 'string' ? (p[key] as string) : fallback);
const color = (p: Params) => num(p, 'color', 0xffcf9e); // ok. 2700–3000 K

/** Lampa wisząca: kula z mlecznego szkła na przewodzie. `y` w danych = wysokość sufitu (270). */
export const pendantGlobe: Builder = (p) => {
  const r = num(p, 'r', 15);
  const drop = num(p, 'drop', 90);
  const ceiling = num(p, 'ceiling', 270);
  const cy = ceiling - drop - r;
  return {
    parts: [cylinder('blackMetal', 6, 6, 2, 0, ceiling - 2, 0), cylinder('cable', 0.3, 0.3, drop, 0, ceiling - drop, 0), cylinder('blackMetal', 3, 3, 4, 0, cy + r - 1, 0), sphere('opal', r, 0, cy, 0, 32)],
    size: { w: 2 * r, d: 2 * r, h: ceiling },
    collide: false,
    lights: [{ x: 0, y: cy, z: 0, intensity: num(p, 'cd', 40), color: color(p) }],
  };
};

/** Lampa wisząca z rattanu (warstwowy klosz). */
export const pendantRattan: Builder = (p) => {
  const r = num(p, 'r', 28);
  const drop = num(p, 'drop', 70);
  const ceiling = num(p, 'ceiling', 270);
  const bottom = ceiling - drop - 48;
  const parts: Part[] = [cylinder('blackMetal', 6, 6, 2, 0, ceiling - 2, 0), cylinder('cable', 0.3, 0.3, drop, 0, ceiling - drop, 0)];
  // Trzy kondygnacje klosza o malejącej średnicy.
  for (const [i, k] of [[0, 1], [1, 0.82], [2, 0.6]] as const) parts.push(cylinder('rattan', r * k, r * k, 16, 0, bottom + i * 16, 0, 32));
  parts.push(sphere('opal', 6, 0, bottom + 18, 0, 16));
  return {
    parts,
    size: { w: 2 * r, d: 2 * r, h: ceiling },
    collide: false,
    lights: [{ x: 0, y: bottom - 5, z: 0, intensity: num(p, 'cd', 45), color: color(p) }],
  };
};

/** Oczko sufitowe (downlight). */
export const downlight: Builder = (p) => {
  const ceiling = num(p, 'ceiling', 270);
  return {
    parts: [cylinder(str(p, 'mat', 'blackMatte'), 5, 5, 0.6, 0, ceiling - 0.6, 0, 24), cylinder(p.alwaysOn ? 'ledAlways' : 'led', 3.5, 3.5, 0.2, 0, ceiling - 0.8, 0, 24)],
    size: { w: 10, d: 10, h: ceiling },
    collide: false,
    lights: [{ x: 0, y: ceiling - 15, z: 0, intensity: num(p, 'cd', 25), color: color(p), alwaysOn: Boolean(p.alwaysOn) }],
  };
};

/** Lampa podłogowa z trzema kulami. */
export const floorLampGlobes: Builder = (p) => {
  const h = num(p, 'h', 160);
  const parts: Part[] = [cylinder('blackMetal', 14, 15, 2, 0, 0, 0, 32), cylinder('blackMetal', 1, 1, h - 10, 0, 2, 0)];
  const globes: [number, number, number][] = [[0, h - 2, 0], [10, h - 40, 4], [-6, h - 75, -5]];
  for (const [x, y, z] of globes) {
    parts.push(span('blackMetal', Math.min(0, x), Math.max(0, x) + 0.6, y - 0.3, y + 0.3, z - 0.3, z + 0.3));
    parts.push(sphere('opal', 9, x, y + 8, z, 24));
  }
  return {
    parts,
    size: { w: 32, d: 32, h: h + 18 },
    collide: true,
    lights: [{ x: 0, y: h - 30, z: 0, intensity: num(p, 'cd', 25), color: color(p) }],
  };
};

/** Kinkiet / lampka nad łóżkiem (mała, bez osobnego światła – tylko świecący klosz). */
export const wallSpot: Builder = (p) => ({
  parts: [span(str(p, 'mat', 'shelfWhite'), -2, 2, -2, 2, -2, 6), cylinder(str(p, 'mat', 'shelfWhite'), 3.5, 3.5, 9, 0, -10, 8), cylinder('opal', 3, 3, 0.3, 0, -10.2, 8)],
  size: { w: 8, d: 12, h: 12 },
  collide: false,
});

/** Tymczasowa oprawa natynkowa (płaski krążek). */
export const ceilingDisc: Builder = (p) => {
  const ceiling = num(p, 'ceiling', 270);
  return {
    parts: [cylinder('opal', 15, 15, 4, 0, ceiling - 4, 0, 32)],
    size: { w: 30, d: 30, h: ceiling },
    collide: false,
    lights: [{ x: 0, y: ceiling - 8, z: 0, intensity: num(p, 'cd', 30), color: color(p) }],
  };
};
