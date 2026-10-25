// Meble pokojowe: sofa, stoliki, szafka RTV, lamele, telewizor, stół i krzesła, łóżko, szafki, półki, dywany, obrazy.
import type { Builder, Params, Part } from '../types';
import { box, cylinder, span } from '../parts';

const num = (p: Params, key: string, fallback: number) => (typeof p[key] === 'number' ? (p[key] as number) : fallback);
const str = (p: Params, key: string, fallback: string) => (typeof p[key] === 'string' ? (p[key] as string) : fallback);

/** Sofa: rama na nóżkach, poduchy siedziska i oparcia, podłokietniki, poduszki dekoracyjne. */
export const sofa: Builder = (p) => {
  const w = num(p, 'w', 210);
  const d = num(p, 'd', 95);
  const fabric = str(p, 'fabric', 'upholstery');
  const arm = 20;
  const legH = 10;
  const parts: Part[] = [];
  const back = -d / 2;
  for (const x of [-w / 2 + 6, w / 2 - 6]) for (const z of [back + 6, d / 2 - 6]) parts.push(cylinder('blackMetal', 1.5, 1.5, legH, x, 0, z));
  parts.push(span(fabric, -w / 2, w / 2, legH, legH + 22, back, d / 2, 4)); // rama
  parts.push(span(fabric, -w / 2, -w / 2 + arm, legH, 62, back, d / 2, 6)); // podłokietniki
  parts.push(span(fabric, w / 2 - arm, w / 2, legH, 62, back, d / 2, 6));
  parts.push(span(fabric, -w / 2 + arm, w / 2 - arm, legH + 10, 85, back, back + 18, 6)); // oparcie
  const seats = Math.max(2, Math.round((w - 2 * arm) / 70));
  const seatW = (w - 2 * arm) / seats;
  for (let i = 0; i < seats; i++) {
    const x0 = -w / 2 + arm + i * seatW;
    parts.push(span(fabric, x0 + 0.5, x0 + seatW - 0.5, legH + 22, legH + 36, back + 18, d / 2 - 1, 6)); // siedzisko
    parts.push(span(fabric, x0 + 1, x0 + seatW - 1, legH + 36, 80, back + 18, back + 36, 8)); // poducha oparcia
  }
  // Poduszki dekoracyjne (akcenty kolorystyczne).
  parts.push(box(str(p, 'accentA', fabric), 45, 42, 14, -w / 2 + arm + 28, legH + 58, back + 42, 6));
  parts.push(box(str(p, 'accentB', fabric), 42, 40, 13, w / 2 - arm - 30, legH + 57, back + 41, 6));
  return { parts, size: { w, d, h: 85 }, collide: true };
};

/** Stolik kawowy prostokątny albo okrągły. */
export const coffeeTable: Builder = (p) => {
  const w = num(p, 'w', 100);
  const d = num(p, 'd', 60);
  const h = num(p, 'h', 38);
  const mat = str(p, 'mat', 'blackMatte');
  const round = p.shape === 'round';
  const parts: Part[] = round
    ? [cylinder(mat, w / 2, w / 2, 4, 0, h - 4, 0, 48), cylinder(mat, w / 2.6, w / 2.4, h - 4, 0, 0, 0, 48)]
    : [span(mat, -w / 2, w / 2, h - 5, h, -d / 2, d / 2, 1), span(mat, -w / 2 + 4, w / 2 - 4, 0, h - 5, -d / 2 + 4, d / 2 - 4, 1)];
  return { parts, size: { w, d: round ? w : d, h }, collide: true };
};

/** Mały okrągły stolik boczny na jednej nodze. */
export const sideTable: Builder = (p) => {
  const r = num(p, 'r', 22);
  const h = num(p, 'h', 52);
  const mat = str(p, 'mat', 'blackMatte');
  return {
    parts: [cylinder(mat, r, r, 2.5, 0, h - 2.5, 0, 40), cylinder(mat, 2, 2, h - 2.5, 0, 0, 0), cylinder(mat, 14, 15, 1.5, 0, 0, 0, 32)],
    size: { w: 2 * r, d: 2 * r, h },
    collide: true,
  };
};

/** Niska szafka RTV z frontami lamelowymi, wisząca albo na cokole. */
export const tvCabinet: Builder = (p) => {
  const w = num(p, 'w', 180);
  const d = num(p, 'd', 42);
  const h = num(p, 'h', 45);
  const lift = num(p, 'lift', 18);
  const body = str(p, 'mat', 'walnut');
  const parts: Part[] = [span(body, -w / 2, w / 2, lift, lift + h, -d / 2, d / 2 - 2, 0.5)];
  // Fronty z pionowymi lamelami.
  const slat = 3;
  for (let x = -w / 2 + 2; x < w / 2 - 2; x += slat + 1.2) parts.push(span(body, x, x + slat, lift + 2, lift + h - 2, d / 2 - 2, d / 2, 0));
  parts.push(span('blackMatte', -w / 2 + 3, w / 2 - 3, lift + h - 0.2, lift + h + 0.3, -d / 2 + 3, d / 2 - 3)); // fuga blatu
  return { parts, size: { w, d, h: lift + h }, collide: true };
};

/** Panel z lameli na ścianę (opcjonalnie podświetlenie LED u góry). */
export const lamellaPanel: Builder = (p) => {
  const w = num(p, 'w', 200);
  const h = num(p, 'h', 260);
  const slat = num(p, 'slat', 4);
  const gap = num(p, 'gap', 2);
  const mat = str(p, 'mat', 'walnut');
  const parts: Part[] = [span('blackMatte', -w / 2, w / 2, 0, h, -2, -1)]; // filc pod lamelami
  for (let x = -w / 2; x + slat <= w / 2 + 0.01; x += slat + gap) parts.push(span(mat, x, x + slat, 0, h, -1, 1.2));
  if (p.led) parts.push(span('led', -w / 2, w / 2, h + 0.2, h + 1, -1, 1)); // taśma LED nad panelem
  // Bez osobnego źródła światła – sama świecąca taśma (oszczędność na telefonach).
  return { parts, size: { w, d: 4, h }, collide: false };
};

/** Telewizor na ścianie (cienki panel). */
export const tv: Builder = (p) => {
  const w = num(p, 'w', 123);
  const h = num(p, 'h', 71);
  return {
    parts: [span('blackMatte', -w / 2, w / 2, 0, h, -3, -0.5, 0.4), span('tvScreen', -w / 2 + 0.8, w / 2 - 0.8, 0.8, h - 0.8, -0.5, 0)],
    size: { w, d: 4, h },
    collide: false,
  };
};

/** Stół okrągły na jednej nodze. */
export const diningTable: Builder = (p) => {
  const r = num(p, 'r', 45);
  const h = num(p, 'h', 75);
  const top = str(p, 'mat', 'walnut');
  return {
    parts: [cylinder(top, r, r, 3, 0, h - 3, 0, 56), cylinder('blackMatte', 5, 5, h - 3, 0, 0, 0), cylinder('blackMatte', 24, 26, 2, 0, 0, 0, 40)],
    size: { w: 2 * r, d: 2 * r, h },
    collide: true,
  };
};

/** Krzesło: drewniana rama, siedzisko plecione, oparcie z listwą. Front = strona siedzenia. */
export const diningChair: Builder = (p) => {
  const frame = str(p, 'mat', 'walnut');
  const seat = str(p, 'seat', 'rattan');
  const w = 44;
  const d = 48;
  const parts: Part[] = [];
  for (const x of [-w / 2 + 2.5, w / 2 - 2.5]) {
    parts.push(span(frame, x - 1.8, x + 1.8, 0, 45, d / 2 - 5, d / 2 - 1.4)); // przednie nogi
    parts.push(span(frame, x - 1.8, x + 1.8, 0, 82, -d / 2 + 1.4, -d / 2 + 5)); // tylne nogi z oparciem
  }
  parts.push(span(frame, -w / 2, w / 2, 41, 45, -d / 2 + 1, d / 2 - 1, 0.8));
  parts.push(span(seat, -w / 2 + 3, w / 2 - 3, 45, 46.5, -d / 2 + 4, d / 2 - 3, 0.6));
  parts.push(span(frame, -w / 2 + 1, w / 2 - 1, 64, 80, -d / 2 + 1.5, -d / 2 + 3.5, 1));
  return { parts, size: { w, d, h: 82 }, collide: true };
};

/** Łóżko z wysokim wezgłowiem, materacem, kołdrą, kocem i poduszkami. Front = nogi łóżka. */
export const bed: Builder = (p) => {
  const w = num(p, 'w', 160);
  const l = num(p, 'l', 200);
  const headH = num(p, 'headH', 100);
  const frame = str(p, 'frame', 'walnut');
  const d = l + 6; // wezgłowie
  const back = -d / 2;
  const parts: Part[] = [
    span(frame, -w / 2 - 3, w / 2 + 3, 0, headH, back, back + 6, 1), // wezgłowie
    span(frame, -w / 2 - 3, w / 2 + 3, 6, 32, back + 6, d / 2, 1), // rama
    span('linenWhite', -w / 2 + 1, w / 2 - 1, 32, 52, back + 7, d / 2 - 2, 5), // materac
    span(str(p, 'duvet', 'duvet'), -w / 2, w / 2, 48, 58, back + 45, d / 2, 6), // kołdra
    span(str(p, 'throw', 'throw'), -w / 2 - 1, w / 2 + 1, 56, 59, d / 2 - 55, d / 2 - 20, 1.5), // koc
  ];
  for (const x of [-w / 4, w / 4]) {
    parts.push(box('linenWhite', w / 2 - 8, 16, 46, x, 60, back + 32, 7)); // poduszki
    parts.push(box(str(p, 'pillow', 'duvet'), w / 2 - 14, 30, 12, x, 70, back + 20, 5)); // poduszki dekoracyjne
  }
  return { parts, size: { w: w + 6, d, h: headH }, collide: true };
};

/** Szafka nocna / komoda z szufladami. */
export const drawers: Builder = (p) => {
  const w = num(p, 'w', 45);
  const d = num(p, 'd', 40);
  const h = num(p, 'h', 50);
  const n = num(p, 'n', 2);
  const mat = str(p, 'mat', 'walnut');
  const parts: Part[] = [span(mat, -w / 2, w / 2, 2, h, -d / 2, d / 2 - 0.4, 0.5), span('blackMatte', -w / 2 + 2, w / 2 - 2, 0, 2, -d / 2 + 2, d / 2 - 4)];
  for (let i = 1; i < n; i++) {
    const y = 2 + ((h - 2) * i) / n;
    parts.push(span('blackMatte', -w / 2 + 1, w / 2 - 1, y - 0.3, y + 0.3, d / 2 - 0.5, d / 2)); // fuga szuflad
  }
  return { parts, size: { w, d, h }, collide: true };
};

/** Półka ścienna z dodatkami (ramki, książki). */
export const wallShelf: Builder = (p) => {
  const w = num(p, 'w', 120);
  const d = num(p, 'd', 20);
  const mat = str(p, 'mat', 'shelfWhite');
  const parts: Part[] = [span(mat, -w / 2, w / 2, 0, 3, -d / 2, d / 2, 0.5)];
  if (p.decor !== false) {
    parts.push(span('blackMatte', -w / 2 + 12, -w / 2 + 42, 3, 43, -d / 2 + 2, -d / 2 + 4)); // ramka
    parts.push(span('art', -w / 2 + 15, -w / 2 + 39, 6, 40, -d / 2 + 4, -d / 2 + 4.3));
    for (let i = 0; i < 6; i++) parts.push(span(i % 2 ? 'linenWhite' : 'throw', w / 2 - 40 + i * 4, w / 2 - 37 + i * 4, 3, 24 + (i % 3) * 2, -d / 2 + 3, d / 2 - 3));
  }
  return { parts, size: { w, d, h: 45 }, collide: false };
};

/** Obraz w czarnej ramie. */
export const artFrame: Builder = (p) => {
  const w = num(p, 'w', 80);
  const h = num(p, 'h', 60);
  return {
    parts: [span('blackMatte', -w / 2, w / 2, 0, h, -1.5, 1.5), span(str(p, 'art', 'art'), -w / 2 + 2.5, w / 2 - 2.5, 2.5, h - 2.5, 1.5, 1.8)],
    size: { w, d: 3, h },
    collide: false,
  };
};

/** Dywan (płaski, z zaokrąglonymi brzegami). */
export const rug: Builder = (p) => {
  const w = num(p, 'w', 160);
  const d = num(p, 'd', 230);
  return { parts: [span(str(p, 'mat', 'rug'), -w / 2, w / 2, 0, 1.2, -d / 2, d / 2, 0.5)], size: { w, d, h: 1.2 }, collide: false };
};

/** Konsola przy ścianie (hol). */
export const consoleTable: Builder = (p) => {
  const w = num(p, 'w', 80);
  const d = num(p, 'd', 30);
  const h = num(p, 'h', 80);
  const mat = str(p, 'mat', 'walnut');
  return {
    parts: [span(mat, -w / 2, w / 2, h - 18, h, -d / 2, d / 2, 0.5), span('blackMetal', -w / 2 + 3, -w / 2 + 5, 0, h - 18, -d / 2 + 3, -d / 2 + 5), span('blackMetal', w / 2 - 5, w / 2 - 3, 0, h - 18, -d / 2 + 3, -d / 2 + 5), span('blackMetal', -w / 2 + 3, -w / 2 + 5, 0, h - 18, d / 2 - 5, d / 2 - 3), span('blackMetal', w / 2 - 5, w / 2 - 3, 0, h - 18, d / 2 - 5, d / 2 - 3)],
    size: { w, d, h },
    collide: true,
  };
};

/** Lustro prostokątne w cienkiej czarnej ramie. */
export const mirrorRect: Builder = (p) => {
  const w = num(p, 'w', 60);
  const h = num(p, 'h', 100);
  return {
    parts: [span('blackMetal', -w / 2, w / 2, 0, h, -1.2, 0, 0.3), span('mirror', -w / 2 + 1.2, w / 2 - 1.2, 1.2, h - 1.2, 0, 0.3)],
    size: { w, d: 2, h },
    collide: false,
  };
};
