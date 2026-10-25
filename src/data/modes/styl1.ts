import type { MaterialSpec, SurfaceKey } from '../../scene/materials';
import { COMMON } from './common';

/**
 * Styl 1 – ciemny, ciepły „moody walnut” (opis w CLAUDE.md).
 * Etap 5: tylko ściany, podłogi i drzwi; meble i oprawy dojdą w Etapie 6.
 */
export const styl1Materials: Record<SurfaceKey, MaterialSpec> = {
  ...COMMON,
  wall: { texture: 'paint', tint: 0x8f8377, roughness: 0.95, normalScale: 0.35 }, // taupe / ciepły szarobrąz
  wallBathroom: { texture: 'concreteTiles', tint: 0x75777a, roughness: 0.75, normalScale: 0.6 }, // płyty w stylu betonu
  floor: { texture: 'smokedOak', tint: 0x7d6c5e, roughness: 0.75 }, // dąb dymiony
  floorBathroom: { texture: 'concreteTiles', tint: 0x626366, roughness: 0.8, normalScale: 0.6 },
  ceiling: { texture: 'paint', tint: 0xf1ede6, roughness: 0.95, normalScale: 0.2 },
  threshold: { texture: 'smokedOak', tint: 0x6f6053, roughness: 0.7 },
  doorInterior: { color: 0x4a3b31, roughness: 0.55 }, // orzech
  bulb: { color: 0xfff6e8, roughness: 0.3, emissive: 0xffc98f }, // oprawa tymczasowa, 2700 K
};
