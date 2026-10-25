import type { MaterialSpec, SurfaceKey } from '../../scene/materials';

/** Powierzchnie wspólne dla wszystkich trybów (stolarka i elementy od dewelopera, otoczenie). */
export const COMMON = {
  concrete: { texture: 'concrete', tint: 0xd0cdc8, roughness: 1 }, // płyta balkonu
  facade: { color: 0xe9e6df, roughness: 0.9 }, // elewacja – tynk cienkowarstwowy
  ground: { color: 0x5f6e3c, roughness: 1 }, // trawa pod budynkiem
  frame: { color: 0x3b3e42, roughness: 0.45 }, // stolarka okienna antracyt
  glass: { color: 0xc9dbe6, roughness: 0.05, opacity: 0.12 },
  doorEntrance: { color: 0x56534f, roughness: 0.45, metalness: 0.3 },
  metal: { color: 0x2a2b2d, roughness: 0.4, metalness: 0.7 },
  radiator: { color: 0xf1f1ee, roughness: 0.35 },
  fixture: { color: 0xf4f3ef, roughness: 0.4 },
  cable: { color: 0x2d2d2d, roughness: 0.6 },
} satisfies Partial<Record<SurfaceKey, MaterialSpec>>;
