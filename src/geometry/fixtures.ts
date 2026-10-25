import * as THREE from 'three';
import type { Apartment, Fixture, FixtureType, Variant } from '../data/types';
import { inVariant } from '../core/plan';
import type { MaterialSet } from '../scene/materials';
import { boxGeometry, mergeStatic, type PlanBox } from './box';

/** Wymiary lica osprzętu: szerokość × wysokość × grubość (cm). */
const PLATE: Record<Exclude<FixtureType, 'ceilingOutlet'>, [number, number, number]> = {
  socket: [8, 8, 1],
  socketDouble: [15, 8, 1],
  switch: [8, 8, 1],
  intercom: [10, 20, 2],
  panel: [30, 40, 0.6],
  wallOutlet: [6, 6, 1.5],
};

const CABLE = 25; // długość przewodu z wypustu sufitowego

function plateBox(f: Fixture): PlanBox {
  const [w, h, t] = PLATE[f.type as keyof typeof PLATE];
  const z0 = f.z - h / 2;
  const z1 = f.z + h / 2;
  switch (f.facing) {
    case '+y': return { x0: f.x - w / 2, x1: f.x + w / 2, y0: f.y, y1: f.y + t, z0, z1 };
    case '-y': return { x0: f.x - w / 2, x1: f.x + w / 2, y0: f.y - t, y1: f.y, z0, z1 };
    case '+x': return { x0: f.x, x1: f.x + t, y0: f.y - w / 2, y1: f.y + w / 2, z0, z1 };
    case '-x': return { x0: f.x - t, x1: f.x, y0: f.y - w / 2, y1: f.y + w / 2, z0, z1 };
    case 'down': throw new Error(`osprzęt ${f.id}: lico 'down' tylko dla wypustu sufitowego`);
  }
}

/** Grzejniki płytowe i osprzęt elektryczny (orientacyjny) stanu surowego. */
export function buildFixtures(ap: Apartment, variant: Variant, mats: MaterialSet): THREE.Group {
  const group = new THREE.Group();
  group.name = 'fixtures';
  const plates: PlanBox[] = [];
  const cables: PlanBox[] = [];

  for (const f of ap.fixtures.filter((fx) => inVariant(fx, variant))) {
    if (f.type === 'ceilingOutlet') {
      cables.push({ x0: f.x - 0.4, x1: f.x + 0.4, y0: f.y - 0.4, y1: f.y + 0.4, z0: f.z - CABLE, z1: f.z });
      plates.push({ x0: f.x - 2, x1: f.x + 2, y0: f.y - 2, y1: f.y + 2, z0: f.z - CABLE - 6, z1: f.z - CABLE });
    } else {
      plates.push(plateBox(f));
    }
  }

  const radiators = ap.radiators.map((r) => boxGeometry({ x0: r.x0, x1: r.x1, y0: r.y0, y1: r.y1, z0: r.bottom, z1: r.top }));
  const parts: [keyof MaterialSet, THREE.BufferGeometry[]][] = [
    ['fixture', plates.map(boxGeometry)],
    ['cable', cables.map(boxGeometry)],
    ['radiator', radiators],
  ];
  for (const [key, geos] of parts) {
    if (!geos.length) continue;
    const mesh = new THREE.Mesh(mergeStatic(geos), mats[key]);
    mesh.castShadow = key === 'radiator';
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  return group;
}
