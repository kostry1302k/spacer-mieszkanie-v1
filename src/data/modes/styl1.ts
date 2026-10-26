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
  // Sofa dosunięta w stronę okna – kończy się przed polem skrzydła drzwi balkonowych (Y ≈ 506).
  { id: 'sofa', type: 'sofa', x: 491.5, y: 425, facing: '-x', params: { w: 160, d: 95, accentA: 'cushionBordo', accentB: 'cushionGreen' } },
  { id: 'coffeeTable', type: 'coffeeTable', x: 397, y: 425, facing: '-x', params: { w: 90, d: 50, h: 38 } },
  { id: 'livingRug', type: 'rug', x: 412, y: 425, facing: '-x', params: { w: 200, d: 150 } },
  { id: 'floorLamp', type: 'floorLampGlobes', x: 300, y: 535, facing: '+x', params: { cd: 22 } },
  { id: 'sofaArt', type: 'artFrame', x: 537.5, y: 425, z: 128, facing: '-x', params: { w: 90, h: 60 } },
  { id: 'livingDownlight', type: 'downlight', x: 350, y: 480, facing: '+y', params: { cd: 22 } },

  // ── Jadalnia: kwadratowy stół 75×75 dosunięty do ściany prawej, 3 krzesła (od kuchni, od salonu, od sofy) ──
  { id: 'diningTable', type: 'diningTable', x: 501.5, y: 265.5, facing: '+y', params: { shape: 'square', w: 75, legs: 'blackMatte' } },
  { id: 'chairN', type: 'diningChair', x: 501.5, y: 210, facing: '+y' },
  { id: 'chairW', type: 'diningChair', x: 446, y: 265.5, facing: '+x' },
  { id: 'chairS', type: 'diningChair', x: 501.5, y: 321, facing: '-y' },
  { id: 'diningPendant', type: 'pendantGlobe', x: 501.5, y: 265.5, facing: '+y', params: { r: 15, drop: 95, ceiling: CEIL, cd: 35 } },

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
  // Szafa do sufitu przy ścianie wejściowej, na lewo od drzwi (X 160–240). Głębokość 50 – za nią mieści się
  // otwarte skrzydło drzwi łazienki (Y ≈ 56); przy ściance od kuchni zablokowałaby przejście do salonu.
  { id: 'hallWardrobe', type: 'wardrobe', x: 200, y: 25, facing: '+y', params: { w: 80, d: 50, h: CEIL, doors: 2 } },
  { id: 'hallDownlight', type: 'downlight', x: 255, y: 92, facing: '+y', params: { cd: 22 } },

  // ── Sypialnia: łóżko 140×200 wezgłowiem do ściany lewej, dosunięte do okna (krawędź Y 505 = zasięg otwartego
  //    skrzydła drzwi balkonowych), obok szafa przy tej samej ścianie; wejście od drzwi zostaje wolne ──
  { id: 'bed', type: 'bed', x: 103, y: 432, facing: '+x', params: { w: 140, l: 200, headH: 105 } },
  { id: 'bedWardrobe', type: 'wardrobe', x: 30, y: 296, facing: '+x', params: { w: 120, d: 60, h: CEIL } },
  { id: 'nightstandS', type: 'drawers', x: 20, y: 527, facing: '+x', params: { w: 45, d: 40, h: 50 } },
  { id: 'bedSpotN', type: 'wallSpot', x: 2, y: 372, z: 118, facing: '+x' },
  { id: 'bedSpotS', type: 'wallSpot', x: 2, y: 492, z: 118, facing: '+x' },
  { id: 'bedShelf', type: 'wallShelf', x: 10, y: 432, z: 150, facing: '+x', params: { w: 120, d: 20 } },
  { id: 'bedRug', type: 'rug', x: 175, y: 432, facing: '+x', params: { w: 200, d: 140, mat: 'rugJute' } },
  { id: 'bedPendant', type: 'pendantRattan', x: 110, y: 432, facing: '+y', params: { r: 26, drop: 70, ceiling: CEIL, cd: 40 } },
  { id: 'bedPlant', type: 'model', x: 20, y: 527, z: 50, facing: '+x', params: { file: 'potted_plant_04.glb', height: 28, w: 20, d: 20, collide: false } },

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
