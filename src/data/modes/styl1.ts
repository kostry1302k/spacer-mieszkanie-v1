import type { MaterialSpec, SurfaceKey } from '../../scene/materials';
import type { FurnitureItem } from '../types';
import { COMMON } from './common';

/** Styl 1 – ciemny, ciepły „moody walnut” (opis w CLAUDE.md). */
export const styl1Materials: Record<SurfaceKey, MaterialSpec> = {
  ...COMMON,
  wall: { texture: 'paint', tint: 0x8f8377, roughness: 0.95, normalScale: 0.35 }, // taupe / ciepły szarobrąz
  wallBathroom: { texture: 'concreteTiles', tint: 0x75777a, roughness: 0.75, normalScale: 0.6 }, // płyty w stylu betonu
  floor: { texture: 'smokedOak', tint: 0x7d6c5e, roughness: 0.75 }, // dąb dymiony
  floorBathroom: { texture: 'concreteTiles', tint: 0x626366, roughness: 0.8, normalScale: 0.6 },
  ceiling: { texture: 'paint', tint: 0xf1ede6, roughness: 0.95, normalScale: 0.2 },
  threshold: { texture: 'smokedOak', tint: 0x6f6053, roughness: 0.7 },
  doorInterior: { color: 0x4a3b31, roughness: 0.55 }, // orzech
  bulb: { color: 0xfff6e8, roughness: 0.3 }, // nieużywane – lampy są meblami
};

/** Paleta mebli stylu 1 (nadpisuje FURNITURE_BASE). */
export const styl1FurnitureMaterials: Record<string, MaterialSpec> = {
  upholstery: { texture: 'fabric', tint: 0x9a8d7e, roughness: 1, normalScale: 0.8 }, // velvet taupe
  art: { color: 0xb59c82, roughness: 0.9 },
  curtainLinen: { color: 0xd5ccbe, roughness: 1, doubleSided: true },
};

const CEIL = 270;

/**
 * Wyposażenie stylu 1 (wariant po przebudowie). Współrzędne w cm jak w wymiary.md; `facing` = kierunek frontu.
 * Ograniczenia: skrzydła drzwi balkonowych (X 69,5–159,5 i 379,5–469,5, do Y ok. 490) i drzwi wewnętrznych
 * muszą mieć wolne pole, przejścia ≥ 60 cm.
 */
export const styl1Furniture: FurnitureItem[] = [
  // ── Salon: ściana TV na nowej ściance (lico X 274,5), sofa pod ścianą prawą ──
  { id: 'tvLamellas', type: 'lamellaPanel', x: 276.5, y: 420, facing: '+x', params: { w: 200, h: 260, led: true } },
  { id: 'tv', type: 'tv', x: 280.5, y: 420, z: 112, facing: '+x', params: { w: 123, h: 71 } },
  { id: 'tvCabinet', type: 'tvCabinet', x: 297.5, y: 420, facing: '+x', params: { w: 180, d: 38, h: 42, lift: 16 } },
  { id: 'sofa', type: 'sofa', x: 491.5, y: 393.5, facing: '-x', params: { w: 185, d: 95, accentA: 'cushionBordo', accentB: 'cushionGreen' } },
  { id: 'coffeeTable', type: 'coffeeTable', x: 397, y: 410, facing: '-x', params: { w: 90, d: 50, h: 38 } },
  { id: 'livingRug', type: 'rug', x: 412, y: 410, facing: '-x', params: { w: 200, d: 150 } },
  { id: 'floorLamp', type: 'floorLampGlobes', x: 515, y: 520, facing: '-x', params: { cd: 22 } },
  { id: 'sofaArt', type: 'artFrame', x: 537.5, y: 393.5, z: 128, facing: '-x', params: { w: 90, h: 60 } },
  { id: 'livingPlant', type: 'model', x: 512, y: 242, facing: '-x', params: { file: 'potted_plant_02.glb', height: 95, w: 50, d: 50 } },
  { id: 'livingDownlight', type: 'downlight', x: 350, y: 480, facing: '+y', params: { cd: 22 } },

  // ── Jadalnia: okrągły stół dla 2 osób między aneksem a sofą (od północy wolne przejście do kuchni) ──
  { id: 'diningTable', type: 'diningTable', x: 400, y: 272, facing: '+y', params: { r: 38 } },
  { id: 'chairE', type: 'diningChair', x: 454, y: 272, facing: '-x' },
  { id: 'chairS', type: 'diningChair', x: 400, y: 326, facing: '-y' },
  { id: 'diningPendant', type: 'pendantGlobe', x: 400, y: 272, facing: '+y', params: { r: 15, drop: 95, ceiling: CEIL, cd: 35 } },

  // ── Kuchnia: L wokół szachtu – lodówka i płyta przy ścianie wejściowej, zlew przy prawej ──
  { id: 'fridge', type: 'fridgeColumn', x: 388, y: 30, facing: '+y' },
  { id: 'hobCabinet', type: 'baseCabinet', x: 448.5, y: 30, facing: '+y', params: { w: 61, appliance: 'hob' } },
  { id: 'hood', type: 'hood', x: 448.5, y: 22.5, z: 158, facing: '+y', params: { w: 60, d: 45 } },
  { id: 'hobWallCabinet', type: 'wallCabinet', x: 448.5, y: 17.5, z: 172, facing: '+y', params: { w: 61, h: 70, underLight: false } },
  { id: 'hobSplash', type: 'wallPanel', x: 448.5, y: 0.5, z: 90, facing: '+y', params: { w: 61, h: 68 } },
  { id: 'sinkCabinet', type: 'baseCabinet', x: 509, y: 92.5, facing: '-x', params: { w: 65, appliance: 'sink' } },
  { id: 'drawerCabinet', type: 'baseCabinet', x: 509, y: 155, facing: '-x', params: { w: 60 } },
  { id: 'wallCabinetA', type: 'wallCabinet', x: 521.5, y: 92.5, z: 150, facing: '-x', params: { w: 65, h: 70 } },
  { id: 'wallCabinetB', type: 'wallCabinet', x: 521.5, y: 155, z: 150, facing: '-x', params: { w: 60, h: 70 } },
  { id: 'sinkSplash', type: 'wallPanel', x: 538.5, y: 122.5, z: 90, facing: '-x', params: { w: 125, h: 60 } },
  { id: 'kitchenDownlight', type: 'downlight', x: 440, y: 105, facing: '+y', params: { cd: 25 } },

  // ── Hol ──
  { id: 'hallConsole', type: 'consoleTable', x: 335, y: 145, facing: '-x', params: { w: 80, d: 30 } },
  { id: 'hallMirror', type: 'mirrorRect', x: 349, y: 145, z: 95, facing: '-x', params: { w: 60, h: 100 } },
  { id: 'hallDownlight', type: 'downlight', x: 255, y: 92, facing: '+y', params: { cd: 22 } },

  // ── Sypialnia: łóżko wezgłowiem do ściany lewej ──
  { id: 'bed', type: 'bed', x: 103, y: 380, facing: '+x', params: { w: 160, l: 200, headH: 105 } },
  { id: 'nightstandN', type: 'drawers', x: 20, y: 271, facing: '+x', params: { w: 45, d: 40, h: 50 } },
  { id: 'nightstandS', type: 'drawers', x: 20, y: 489, facing: '+x', params: { w: 45, d: 40, h: 50 } },
  { id: 'bedSpotN', type: 'wallSpot', x: 2, y: 271, z: 118, facing: '+x' },
  { id: 'bedSpotS', type: 'wallSpot', x: 2, y: 489, z: 118, facing: '+x' },
  { id: 'bedShelf', type: 'wallShelf', x: 10, y: 380, z: 150, facing: '+x', params: { w: 140, d: 20 } },
  { id: 'bedRug', type: 'rug', x: 175, y: 380, facing: '+x', params: { w: 200, d: 140, mat: 'rugJute' } },
  { id: 'bedPendant', type: 'pendantRattan', x: 110, y: 380, facing: '+y', params: { r: 26, drop: 70, ceiling: CEIL, cd: 40 } },
  { id: 'bedPlant', type: 'model', x: 20, y: 489, z: 50, facing: '+x', params: { file: 'potted_plant_04.glb', height: 28, w: 20, d: 20, collide: false } },

  // ── Zasłony przy drzwiach balkonowych (zebrane po bokach, karnisz pod sufitem) ──
  { id: 'curtainBedL', type: 'curtain', x: 36, y: 559, facing: '-y', params: { w: 56, mat: 'curtainLinen', ceiling: CEIL } },
  { id: 'curtainBedR', type: 'curtain', x: 236, y: 559, facing: '-y', params: { w: 50, mat: 'curtainDark', ceiling: CEIL } },
  { id: 'curtainLivL', type: 'curtain', x: 303, y: 559, facing: '-y', params: { w: 50, mat: 'curtainDark', ceiling: CEIL } },
  { id: 'curtainLivR', type: 'curtain', x: 502, y: 559, facing: '-y', params: { w: 60, mat: 'curtainLinen', ceiling: CEIL } },

  // ── Łazienka: pralka i szafka z umywalką nablatową pod lustrem na lamelach, WC przy ścianie lewej, walk-in w narożniku ──
  { id: 'washer', type: 'washer', x: 62, y: 27.5, facing: '+y' },
  { id: 'bathLamellas', type: 'lamellaPanel', x: 121, y: 2, facing: '+y', params: { w: 58, h: 270 } },
  { id: 'vanity', type: 'vanity', x: 121, y: 27, facing: '+y', params: { w: 58, d: 46, basin: 'ceramicBlack' } },
  { id: 'bathMirror', type: 'mirrorRound', x: 121, y: 5.5, z: 115, facing: '+y', params: { r: 26 } },
  { id: 'wc', type: 'wcWallHung', x: 27, y: 100, facing: '+x', params: { mat: 'ceramicBlack' } },
  { id: 'shower', type: 'showerGlass', x: 35, y: 142, facing: '-y', params: { len: 70, h: 200, depth: 80, side: 'right' } },
  { id: 'towelRail', type: 'towelRadiator', x: 146, y: 182, z: 40, facing: '-x', params: { w: 50, h: 100 } },
  { id: 'bathPlant', type: 'model', x: 45, y: 25, z: 85, facing: '+y', params: { file: 'potted_plant_04.glb', height: 25, w: 20, d: 20, collide: false } },
  { id: 'bathDownlight', type: 'downlight', x: 75, y: 111, facing: '+y', params: { cd: 30, alwaysOn: true } },
];
