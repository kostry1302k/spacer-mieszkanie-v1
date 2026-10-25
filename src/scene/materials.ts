import * as THREE from 'three';
import { TEXTURES, type TextureKey, type TextureRes, type TextureSet } from '../data/materials';

/** Rodzaje powierzchni; tryb (surowy, styl 1, styl 2) przypisuje każdej materiał. */
export type SurfaceKey =
  | 'wall'
  | 'wallBathroom'
  | 'floor'
  | 'floorBathroom'
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
  /** Kolor świecenia (żarówka, klosz, LED); świeci, gdy lampy są włączone. */
  emissive?: number;
  /** Jasność świecenia po włączeniu lamp (domyślnie 3). */
  glow?: number;
  /** Świeci także w dzień (łazienka bez okna). */
  alwaysOn?: boolean;
  doubleSided?: boolean;
}

export interface TexturedSpec {
  texture: TextureKey;
  /** Mnożnik koloru tekstury (1 = bez zmian). */
  tint?: number;
  roughness?: number;
  normalScale?: number;
  doubleSided?: boolean;
}

export type MaterialSpec = FlatSpec | TexturedSpec;
/** Materiały trybu: powierzchnie architektury (SurfaceKey) i paleta mebli (dowolne nazwy). */
export type MaterialSet = Record<string, THREE.MeshStandardMaterial>;

export interface MaterialOptions {
  maxResolution: TextureRes;
  anisotropy: number;
  manager: THREE.LoadingManager;
  /** Wspólna pamięć tekstur (adres → tekstura), żeby kolejne tryby używały tych samych plików. */
  textures: Map<string, THREE.Texture>;
}

function loadTexture(url: string, color: boolean, repeat: number, opts: MaterialOptions): THREE.Texture {
  const key = `${url}|${repeat}`;
  const cached = opts.textures.get(key);
  if (cached) return cached;
  const tex = new THREE.TextureLoader(opts.manager).load(url);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.setScalar(1 / repeat);
  tex.anisotropy = opts.anisotropy;
  tex.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  opts.textures.set(key, tex);
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
    side: spec.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
  });
}

function createFlat(s: FlatSpec): THREE.MeshStandardMaterial {
  const transparent = s.opacity !== undefined && s.opacity < 1;
  const mat = new THREE.MeshStandardMaterial({
    color: s.color,
    roughness: s.roughness,
    metalness: s.metalness ?? 0,
    transparent,
    opacity: s.opacity ?? 1,
    depthWrite: !transparent,
    side: transparent || s.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
    emissive: s.emissive ?? 0x000000,
    emissiveIntensity: 0,
  });
  if (s.emissive !== undefined) mat.userData = { glow: s.glow ?? 3, alwaysOn: Boolean(s.alwaysOn) };
  return mat;
}

export function createMaterials(specs: Record<string, MaterialSpec>, opts: MaterialOptions): MaterialSet {
  const entries = Object.entries(specs).map(([key, spec]) => {
    const mat = 'texture' in spec ? createTextured(spec, opts) : createFlat(spec);
    mat.name = key;
    return [key, mat];
  });
  return Object.fromEntries(entries) as MaterialSet;
}

/** Tekstury używane przez zestaw materiałów. */
export function texturesOf(set: MaterialSet): Set<THREE.Texture> {
  const used = new Set<THREE.Texture>();
  for (const mat of Object.values(set)) {
    for (const tex of [mat.map, mat.normalMap, mat.roughnessMap]) if (tex) used.add(tex);
  }
  return used;
}
