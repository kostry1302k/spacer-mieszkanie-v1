import * as THREE from 'three';
import type { Apartment, Variant } from '../data/types';
import type { MaterialSet } from '../scene/materials';
import { boxGeometry, mergeStatic } from './box';
import { wallBoxes } from './walls';
import { ceilingGeometries, floorGeometries, thresholdGeometries } from './floors';
import { buildOpenings, type DoorLeaf } from './openings';
import { buildBalcony } from './balcony';
import { buildFixtures } from './fixtures';

export interface ApartmentModelOptions {
  variant: Variant;
  /** Drzwi wewnętrzne są tylko w wykończeniach; w stanie surowym same ościeża. */
  interiorDoors: boolean;
}

export interface ApartmentModel {
  root: THREE.Group;
  ceilings: THREE.Object3D;
  leaves: DoorLeaf[];
  dispose(): void;
}

function mesh(geos: THREE.BufferGeometry[], mat: THREE.Material, name: string, cast: boolean): THREE.Mesh {
  const result = new THREE.Mesh(mergeStatic(geos), mat);
  result.name = name;
  result.castShadow = cast;
  result.receiveShadow = true;
  return result;
}

/** Buduje całą bryłę mieszkania z danych dla wybranego wariantu i zestawu materiałów. */
export function buildApartmentModel(ap: Apartment, opts: ApartmentModelOptions, mats: MaterialSet): ApartmentModel {
  const root = new THREE.Group();
  root.name = 'apartment';

  root.add(mesh(wallBoxes(ap, opts.variant).map(boxGeometry), mats.wall, 'walls', true));
  root.add(mesh(floorGeometries(ap, opts.variant), mats.floor, 'floors', false));
  root.add(mesh(thresholdGeometries(ap, opts.variant), mats.threshold, 'thresholds', false));
  const ceilings = mesh(ceilingGeometries(ap, opts.variant), mats.ceiling, 'ceilings', true);
  root.add(ceilings);

  const openings = buildOpenings(ap, opts, mats);
  root.add(openings.group);
  root.add(buildBalcony(ap, mats));
  root.add(buildFixtures(ap, opts.variant, mats));

  return {
    root,
    ceilings,
    leaves: openings.leaves,
    dispose() {
      root.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
    },
  };
}
