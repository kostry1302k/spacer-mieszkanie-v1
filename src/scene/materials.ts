import * as THREE from 'three';

/** Rodzaje powierzchni; tryb (surowy, styl 1, styl 2) przypisuje każdej materiał. */
export type SurfaceKey =
  | 'wall'
  | 'floor'
  | 'ceiling'
  | 'threshold'
  | 'concrete'
  | 'frame'
  | 'glass'
  | 'doorEntrance'
  | 'doorInterior'
  | 'metal'
  | 'radiator'
  | 'fixture'
  | 'cable';

export interface FlatSpec {
  color: number;
  roughness: number;
  metalness?: number;
  opacity?: number;
}

export type MaterialSet = Record<SurfaceKey, THREE.Material>;

export function createFlatMaterials(specs: Record<SurfaceKey, FlatSpec>): MaterialSet {
  const entries = Object.entries(specs).map(([key, s]) => {
    const transparent = s.opacity !== undefined && s.opacity < 1;
    const mat = new THREE.MeshStandardMaterial({
      color: s.color,
      roughness: s.roughness,
      metalness: s.metalness ?? 0,
      transparent,
      opacity: s.opacity ?? 1,
      depthWrite: !transparent,
      side: transparent ? THREE.DoubleSide : THREE.FrontSide,
    });
    mat.name = key;
    return [key, mat];
  });
  return Object.fromEntries(entries) as MaterialSet;
}
