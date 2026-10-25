import * as THREE from 'three';
import { TEXTURES, type TextureKey, type TextureRes, type TextureSet } from '../data/materials';

/** Rodzaje powierzchni; tryb (surowy, styl 1, styl 2) przypisuje każdej materiał. */
export type SurfaceKey =
  | 'wall'
  | 'floor'
  | 'ceiling'
  | 'threshold'
  | 'concrete'
  | 'facade'
  | 'ground'
  | 'frame'
  | 'glass'
  | 'doorEntrance'
  | 'doorInterior'
  | 'metal'
  | 'radiator'
  | 'fixture'
  | 'cable'
  | 'bulb';

export interface FlatSpec {
  color: number;
  roughness: number;
  metalness?: number;
  opacity?: number;
  /** Kolor świecenia (np. żarówka); jasność ustawia pora dnia. */
  emissive?: number;
}

export interface TexturedSpec {
  texture: TextureKey;
  /** Mnożnik koloru tekstury (1 = bez zmian). */
  tint?: number;
  roughness?: number;
  normalScale?: number;
}

export type MaterialSpec = FlatSpec | TexturedSpec;
export type MaterialSet = Record<SurfaceKey, THREE.MeshStandardMaterial>;

export interface MaterialOptions {
  maxResolution: TextureRes;
  anisotropy: number;
  manager: THREE.LoadingManager;
}

const textureCache = new Map<string, THREE.Texture>();

function loadTexture(url: string, color: boolean, repeat: number, opts: MaterialOptions): THREE.Texture {
  const key = `${url}|${repeat}`;
  const cached = textureCache.get(key);
  if (cached) return cached;
  const tex = new THREE.TextureLoader(opts.manager).load(url);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.setScalar(1 / repeat);
  tex.anisotropy = opts.anisotropy;
  tex.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  textureCache.set(key, tex);
  return tex;
}

function createTextured(spec: TexturedSpec, opts: MaterialOptions): THREE.MeshStandardMaterial {
  const set: TextureSet = TEXTURES[spec.texture];
  const res: TextureRes = set.resolutions.includes(opts.maxResolution) ? opts.maxResolution : '1k';
  const base = `${import.meta.env.BASE_URL}assets/textures/${set.id}/${res}`;
  const normalScale = spec.normalScale ?? 1;
  return new THREE.MeshStandardMaterial({
    map: loadTexture(`${base}/color.jpg`, true, set.size, opts),
    normalMap: loadTexture(`${base}/normal.jpg`, false, set.size, opts),
    normalScale: new THREE.Vector2(normalScale, normalScale),
    roughnessMap: loadTexture(`${base}/roughness.jpg`, false, set.size, opts),
    roughness: spec.roughness ?? 1,
    color: spec.tint ?? 0xffffff,
  });
}

function createFlat(s: FlatSpec): THREE.MeshStandardMaterial {
  const transparent = s.opacity !== undefined && s.opacity < 1;
  return new THREE.MeshStandardMaterial({
    color: s.color,
    roughness: s.roughness,
    metalness: s.metalness ?? 0,
    transparent,
    opacity: s.opacity ?? 1,
    depthWrite: !transparent,
    side: transparent ? THREE.DoubleSide : THREE.FrontSide,
    emissive: s.emissive ?? 0x000000,
    emissiveIntensity: 0,
  });
}

export function createMaterials(specs: Record<SurfaceKey, MaterialSpec>, opts: MaterialOptions): MaterialSet {
  const entries = Object.entries(specs).map(([key, spec]) => {
    const mat = 'texture' in spec ? createTextured(spec, opts) : createFlat(spec);
    mat.name = key;
    return [key, mat];
  });
  return Object.fromEntries(entries) as MaterialSet;
}
