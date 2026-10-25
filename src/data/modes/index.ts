import type { MaterialSpec, SurfaceKey } from '../../scene/materials';
import type { Variant } from '../types';
import { rawMaterials } from './raw';
import { styl1Materials } from './styl1';
import { styl2Materials } from './styl2';

export type ModeId = 'raw' | 'styl1' | 'styl2';

export interface ModeDefinition {
  id: ModeId;
  name: string;
  /** Krótka etykieta przycisku. */
  label: string;
  materials: Record<SurfaceKey, MaterialSpec>;
  /** Wariant układu narzucony przez tryb; null = użytkownik przełącza „nową ściankę”. */
  variant: Variant | null;
  interiorDoors: boolean;
  /** Oświetlenie sufitowe: goła żarówka na kablu albo (tymczasowo) płaska oprawa. */
  ceilingFixture: 'bulb' | 'disc';
}

export const MODES: Record<ModeId, ModeDefinition> = {
  raw: { id: 'raw', name: 'Stan surowy', label: 'Surowy', materials: rawMaterials, variant: null, interiorDoors: false, ceilingFixture: 'bulb' },
  styl1: { id: 'styl1', name: 'Styl 1 – ciemny orzech', label: 'Styl 1', materials: styl1Materials, variant: 'rebuild', interiorDoors: true, ceilingFixture: 'disc' },
  styl2: { id: 'styl2', name: 'Styl 2 – jasny minimalizm', label: 'Styl 2', materials: styl2Materials, variant: 'rebuild', interiorDoors: true, ceilingFixture: 'disc' },
};
