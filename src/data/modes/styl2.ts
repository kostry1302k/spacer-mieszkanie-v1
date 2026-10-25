import type { MaterialSpec, SurfaceKey } from '../../scene/materials';
import { COMMON } from './common';

/**
 * Styl 2 – jasny, ciepły minimalizm (opis w CLAUDE.md).
 * Etap 5: tylko ściany, podłogi i drzwi; meble i oprawy dojdą w Etapie 7.
 */
export const styl2Materials: Record<SurfaceKey, MaterialSpec> = {
  ...COMMON,
  wall: { texture: 'paint', tint: 0xe9e2d6, roughness: 0.95, normalScale: 0.3 }, // krem / greige
  wallBathroom: { texture: 'marbleTiles', tint: 0xe4ddd2, roughness: 0.35, normalScale: 0.5 }, // płytki w stylu marmuru
  floor: { texture: 'oakHerringbone', tint: 0xf2e9df, roughness: 0.6 }, // jasny dąb w jodełkę
  floorBathroom: { texture: 'marbleTiles', tint: 0xcfc7bb, roughness: 0.45, normalScale: 0.5 },
  ceiling: { texture: 'paint', tint: 0xf6f4ef, roughness: 0.95, normalScale: 0.2 },
  threshold: { texture: 'oakHerringbone', tint: 0xd9c8b3, roughness: 0.6 },
  doorInterior: { color: 0xe7e2da, roughness: 0.5 }, // drzwi bezprzylgowe, jasny greige
  bulb: { color: 0xfff8ee, roughness: 0.3, emissive: 0xffd2a0 }, // oprawa tymczasowa, 3000 K
};
