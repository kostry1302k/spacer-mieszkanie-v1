import type { FlatSpec, SurfaceKey } from '../../scene/materials';

/** Stan surowy – materiały płaskie (Etap 1). W Etapie 4 zastąpią je tekstury PBR. */
export const rawFlat: Record<SurfaceKey, FlatSpec> = {
  wall: { color: 0xb8b5af, roughness: 0.95 }, // szary tynk
  floor: { color: 0x8e8983, roughness: 0.9 }, // wylewka
  ceiling: { color: 0xc6c3bd, roughness: 0.95 },
  threshold: { color: 0x85807a, roughness: 0.9 },
  concrete: { color: 0x9d9a95, roughness: 0.85 },
  frame: { color: 0x3b3e42, roughness: 0.5 }, // stolarka antracyt
  glass: { color: 0xbfd6e2, roughness: 0.05, opacity: 0.18 },
  doorEntrance: { color: 0x56534f, roughness: 0.45, metalness: 0.3 },
  doorInterior: { color: 0xeeebe6, roughness: 0.6 },
  metal: { color: 0x2a2b2d, roughness: 0.4, metalness: 0.7 },
  radiator: { color: 0xf1f1ee, roughness: 0.35 },
  fixture: { color: 0xf4f3ef, roughness: 0.4 },
  cable: { color: 0x2d2d2d, roughness: 0.6 },
};
