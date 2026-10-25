// Katalog tekstur PBR (CC0) pobranych przez `npm run assets` – pliki w public/assets/textures/<id>/<res>/.
// `size` to rzeczywisty rozmiar jednego kafla tekstury w metrach (UV w scenie: 1 jednostka = 1 m).

export type TextureRes = '1k' | '2k';

export interface TextureSet {
  id: string;
  size: number;
  resolutions: TextureRes[];
}

export const TEXTURES = {
  screed: { id: 'concrete_floor_worn_001', size: 3, resolutions: ['1k', '2k'] },
  greyPlaster: { id: 'Concrete024', size: 2, resolutions: ['1k'] },
  ceilingPlaster: { id: 'Concrete034', size: 2.5, resolutions: ['1k'] },
  concrete: { id: 'Concrete020', size: 2, resolutions: ['1k'] },
} satisfies Record<string, TextureSet>;

export type TextureKey = keyof typeof TEXTURES;

/** HDRI nieba i otoczenia (public/assets/hdri/<id>_<res>.hdr). */
export const SKY_HDRI = { id: 'noon_grass', resolutions: ['1k', '2k'] as TextureRes[] };
