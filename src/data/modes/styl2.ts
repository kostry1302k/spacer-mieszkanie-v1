import type { MaterialSpec, SurfaceKey } from '../../scene/materials';
import type { FurnitureItem } from '../types';
import { COMMON } from './common';

/** Styl 2 – jasny, ciepły minimalizm z kontrastową kuchnią (opis w CLAUDE.md). */
export const styl2Materials: Record<SurfaceKey, MaterialSpec> = {
  ...COMMON,
  wall: { texture: 'paint', tint: 0xe9e2d6, roughness: 0.95, normalScale: 0.3 }, // krem / greige
  wallBathroom: { texture: 'marbleTiles', tint: 0xd8d6d2, roughness: 0.35, normalScale: 0.5 }, // płytki w stylu marmuru
  floor: { texture: 'oakHerringbone', tint: 0xf2e9df, roughness: 0.6 }, // jasny dąb w jodełkę
  floorBathroom: { texture: 'marbleTiles', tint: 0xc6c3be, roughness: 0.45, normalScale: 0.5 },
  ceiling: { texture: 'paint', tint: 0xf6f4ef, roughness: 0.95, normalScale: 0.2 },
  threshold: { texture: 'oakHerringbone', tint: 0xd9c8b3, roughness: 0.6 },
  doorInterior: { color: 0xe7e2da, roughness: 0.5 }, // drzwi bezprzylgowe, jasny greige
  bulb: { color: 0xfff8ee, roughness: 0.3 },
};

/** Paleta mebli stylu 2 (nadpisuje FURNITURE_BASE). */
export const styl2FurnitureMaterials: Record<string, MaterialSpec> = {
  upholstery: { texture: 'fabric', tint: 0xf4dfc4, roughness: 1, normalScale: 0.7 }, // beżowa sofa
  duvet: { texture: 'fabric', tint: 0xb9b1a7, roughness: 1, normalScale: 0.4 },
  throw: { texture: 'fabric', tint: 0x4d423b, roughness: 1 },
  rug: { texture: 'carpet', tint: 0xf1ebe1, roughness: 1 },
  art: { color: 0xd9c8b4, roughness: 0.9 },
  curtainLinen: { color: 0xeee8de, roughness: 1, opacity: 0.92, doubleSided: true },
};

const CEIL = 270;

/**
 * Wyposażenie stylu 2. Układ jak w stylu 1 (sprawdzone przejścia i pola drzwi), inne bryły i materiały:
 * jasny dąb, beż, czarne akcenty; w kuchni orzech na dole i czarne fronty u góry.
 */
export const styl2Furniture: FurnitureItem[] = [
  // ── Salon ──
  { id: 'tvLamellas', type: 'lamellaPanel', x: 276.5, y: 420, facing: '+x', params: { w: 200, h: 260, led: true, mat: 'oakLight' } },
  { id: 'tv', type: 'tv', x: 280.5, y: 420, z: 115, facing: '+x', params: { w: 123, h: 71 } },
  { id: 'tvCabinet', type: 'tvCabinet', x: 297.5, y: 420, facing: '+x', params: { w: 180, d: 38, h: 34, lift: 26, mat: 'oakLight', ledUnder: true } },
  { id: 'sofa', type: 'sofa', x: 491.5, y: 393.5, facing: '-x', params: { w: 185, d: 95, accentA: 'cushionOat', accentB: 'cushionBlack' } },
  { id: 'coffeeTable', type: 'coffeeTable', x: 397, y: 410, facing: '-x', params: { w: 64, h: 36, shape: 'round' } },
  { id: 'livingRug', type: 'rug', x: 412, y: 410, facing: '-x', params: { w: 200, d: 150 } },
  { id: 'floorLamp', type: 'floorLampShade', x: 515, y: 520, facing: '-x', params: { cd: 24 } },
  { id: 'sofaArt', type: 'artFrame', x: 537.5, y: 393.5, z: 115, facing: '-x', params: { w: 70, h: 90 } },
  { id: 'livingPlant', type: 'model', x: 512, y: 242, facing: '-x', params: { file: 'potted_plant_02.glb', height: 95, w: 50, d: 50 } },
  { id: 'livingDownlight', type: 'downlight', x: 350, y: 480, facing: '+y', params: { cd: 22, mat: 'shelfWhite' } },

  // ── Jadalnia ──
  { id: 'diningTable', type: 'diningTable', x: 400, y: 272, facing: '+y', params: { r: 38, mat: 'oakLight' } },
  { id: 'chairE', type: 'diningChair', x: 454, y: 272, facing: '-x', params: { mat: 'blackMatte', seat: 'upholstery' } },
  { id: 'chairS', type: 'diningChair', x: 400, y: 326, facing: '-y', params: { mat: 'blackMatte', seat: 'upholstery' } },
  { id: 'chandelier', type: 'chandelierGlobes', x: 400, y: 272, facing: '+y', params: { drop: 85, reach: 30, ceiling: CEIL, cd: 40 } },

  // ── Kuchnia: dolne fronty orzech, górne czarne (jedna szafka z ryflowanym szkłem), ciemny kamień, reling ──
  { id: 'fridge', type: 'fridgeColumn', x: 388, y: 30, facing: '+y', params: { front: 'walnut' } },
  { id: 'hobCabinet', type: 'baseCabinet', x: 448.5, y: 30, facing: '+y', params: { w: 61, appliance: 'hob' } },
  { id: 'hood', type: 'hood', x: 448.5, y: 22.5, z: 158, facing: '+y', params: { w: 60, d: 45 } },
  { id: 'hobWallCabinet', type: 'wallCabinet', x: 448.5, y: 17.5, z: 172, facing: '+y', params: { w: 61, h: 70, front: 'blackFront', underLight: false } },
  { id: 'hobSplash', type: 'wallPanel', x: 448.5, y: 0.5, z: 90, facing: '+y', params: { w: 61, h: 68 } },
  { id: 'sinkCabinet', type: 'baseCabinet', x: 509, y: 92.5, facing: '-x', params: { w: 65, appliance: 'sink' } },
  { id: 'drawerCabinet', type: 'baseCabinet', x: 509, y: 155, facing: '-x', params: { w: 60 } },
  { id: 'wallCabinetA', type: 'wallCabinet', x: 521.5, y: 92.5, z: 150, facing: '-x', params: { w: 65, h: 70, front: 'blackFront' } },
  { id: 'wallCabinetB', type: 'wallCabinet', x: 521.5, y: 155, z: 150, facing: '-x', params: { w: 60, h: 70, glass: true } },
  { id: 'sinkSplash', type: 'wallPanel', x: 538.5, y: 122.5, z: 90, facing: '-x', params: { w: 125, h: 60 } },
  { id: 'kitchenRail', type: 'rail', x: 537, y: 122.5, z: 135, facing: '-x', params: { w: 100 } },
  { id: 'kitchenDownlight', type: 'downlight', x: 440, y: 105, facing: '+y', params: { cd: 25 } },

  // ── Hol ──
  { id: 'hallConsole', type: 'consoleTable', x: 335, y: 145, facing: '-x', params: { w: 80, d: 30, mat: 'oakLight' } },
  { id: 'hallMirror', type: 'mirrorRect', x: 349, y: 145, z: 95, facing: '-x', params: { w: 60, h: 100 } },
  { id: 'hallDownlight', type: 'downlight', x: 255, y: 92, facing: '+y', params: { cd: 22, mat: 'shelfWhite' } },

  // ── Sypialnia: boazeria za tapicerowanym łóżkiem, ciemne szafki nocne ──
  { id: 'bedPanel', type: 'wallPanel', x: 0.5, y: 380, facing: '+x', params: { w: 270, h: CEIL, t: 1, mat: 'panelDark' } },
  { id: 'bed', type: 'bed', x: 103, y: 380, facing: '+x', params: { w: 160, l: 200, headH: 110, frame: 'bedFabric', upholstered: true, pillow: 'cushionOat' } },
  { id: 'nightstandN', type: 'drawers', x: 21, y: 271, facing: '+x', params: { w: 45, d: 40, h: 50, mat: 'blackMatte' } },
  { id: 'nightstandS', type: 'drawers', x: 21, y: 489, facing: '+x', params: { w: 45, d: 40, h: 50, mat: 'blackMatte' } },
  { id: 'bedSpotN', type: 'wallSpot', x: 3, y: 271, z: 118, facing: '+x', params: { mat: 'blackMetal' } },
  { id: 'bedSpotS', type: 'wallSpot', x: 3, y: 489, z: 118, facing: '+x', params: { mat: 'blackMetal' } },
  { id: 'bedRug', type: 'rug', x: 175, y: 380, facing: '+x', params: { w: 200, d: 140 } },
  { id: 'bedDownlight', type: 'downlight', x: 132, y: 405, facing: '+y', params: { cd: 32, mat: 'shelfWhite' } },
  { id: 'bedPlant', type: 'model', x: 21, y: 489, z: 50, facing: '+x', params: { file: 'potted_plant_04.glb', height: 28, w: 20, d: 20, collide: false } },

  // ── Zasłony: lniane firany i zasłony taupe ──
  { id: 'curtainBedL', type: 'curtain', x: 36, y: 559, facing: '-y', params: { w: 56, mat: 'curtainLinen', ceiling: CEIL } },
  { id: 'curtainBedR', type: 'curtain', x: 236, y: 559, facing: '-y', params: { w: 50, mat: 'curtainTaupe', ceiling: CEIL } },
  { id: 'curtainLivL', type: 'curtain', x: 303, y: 559, facing: '-y', params: { w: 50, mat: 'curtainTaupe', ceiling: CEIL } },
  { id: 'curtainLivR', type: 'curtain', x: 502, y: 559, facing: '-y', params: { w: 60, mat: 'curtainLinen', ceiling: CEIL } },

  // ── Łazienka: orzech + jasny kamień, biała ceramika, czarna armatura, podświetlane lustro ──
  { id: 'washer', type: 'washer', x: 62, y: 27.5, facing: '+y' },
  { id: 'vanity', type: 'vanity', x: 121, y: 23, facing: '+y', params: { w: 58, d: 46, top: 'stoneLight', basin: 'ceramicWhite', vessel: false } },
  { id: 'bathMirror', type: 'mirrorBacklit', x: 121, y: 1.5, z: 110, facing: '+y', params: { w: 50, h: 75 } },
  { id: 'wc', type: 'wcWallHung', x: 27, y: 100, facing: '+x', params: { mat: 'ceramicWhite' } },
  { id: 'shower', type: 'showerGlass', x: 35, y: 142, facing: '-y', params: { len: 70, h: 200, depth: 80, side: 'right' } },
  { id: 'towelRail', type: 'towelRadiator', x: 146, y: 182, z: 40, facing: '-x', params: { w: 50, h: 100 } },
  { id: 'bathPlant', type: 'model', x: 45, y: 25, z: 85, facing: '+y', params: { file: 'potted_plant_04.glb', height: 25, w: 20, d: 20, collide: false } },
  { id: 'bathDownlight', type: 'downlight', x: 75, y: 111, facing: '+y', params: { cd: 30, alwaysOn: true, mat: 'shelfWhite' } },
];
