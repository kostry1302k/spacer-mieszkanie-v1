import type { MaterialSpec, SurfaceKey } from '../../scene/materials';

/** Stan surowy: wylewka, szary tynk cementowo-wapienny, otynkowany sufit, stolarka antracyt. */
export const rawMaterials: Record<SurfaceKey, MaterialSpec> = {
  wall: { texture: 'greyPlaster', tint: 0xf2efea, roughness: 1, normalScale: 0.6 },
  floor: { texture: 'screed', tint: 0xd8d4ce, roughness: 1, normalScale: 0.8 },
  ceiling: { texture: 'ceilingPlaster', tint: 0xe2e0dc, roughness: 1, normalScale: 0.5 },
  threshold: { texture: 'screed', tint: 0xc4c0ba, roughness: 1 },
  concrete: { texture: 'concrete', tint: 0xd0cdc8, roughness: 1 },
  facade: { color: 0xe9e6df, roughness: 0.9 }, // elewacja – tynk cienkowarstwowy
  ground: { color: 0x5f6e3c, roughness: 1 }, // trawa pod budynkiem
  frame: { color: 0x3b3e42, roughness: 0.45 }, // stolarka antracyt
  glass: { color: 0xc9dbe6, roughness: 0.05, opacity: 0.12 },
  doorEntrance: { color: 0x56534f, roughness: 0.45, metalness: 0.3 },
  doorInterior: { color: 0xeeebe6, roughness: 0.6 },
  metal: { color: 0x2a2b2d, roughness: 0.4, metalness: 0.7 },
  radiator: { color: 0xf1f1ee, roughness: 0.35 },
  fixture: { color: 0xf4f3ef, roughness: 0.4 },
  cable: { color: 0x2d2d2d, roughness: 0.6 },
  bulb: { color: 0xfff4e0, roughness: 0.2, emissive: 0xffc98f }, // goła żarówka 2700 K
};
