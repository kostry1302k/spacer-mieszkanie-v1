import type { Apartment, Variant, Wall } from '../data/types';
import { wallAxis, wallsFor } from '../core/plan';
import type { PlanBox } from './box';

/** Prostopadłościan zadany w osiach ściany: wzdłuż (a), w poprzek (n) i w pionie (z). */
export function alongWall(wall: Wall, a0: number, a1: number, n0: number, n1: number, z0: number, z1: number): PlanBox {
  const [lo, hi] = [Math.min(n0, n1), Math.max(n0, n1)];
  return wallAxis(wall) === 'x'
    ? { x0: a0, x1: a1, y0: lo, y1: hi, z0, z1 }
    : { x0: lo, x1: hi, y0: a0, y1: a1, z0, z1 };
}

/** Grubość ściany w osi poprzecznej. */
export function wallSpan(wall: Wall): [n0: number, n1: number] {
  return wallAxis(wall) === 'x' ? [wall.y0, wall.y1] : [wall.x0, wall.x1];
}

/**
 * Dzieli ściany na pełne bryły: odcinki między otworami oraz nadproża i parapety nad/pod otworami.
 * Lica otworów tworzą się same jako boki sąsiednich brył (ościeża).
 */
export function wallBoxes(ap: Apartment, variant: Variant): PlanBox[] {
  const boxes: PlanBox[] = [];
  for (const wall of wallsFor(ap, variant)) {
    const [a0, a1] = wallAxis(wall) === 'x' ? [wall.x0, wall.x1] : [wall.y0, wall.y1];
    const [n0, n1] = wallSpan(wall);
    const openings = ap.openings.filter((o) => o.wallId === wall.id).sort((p, q) => p.from - q.from);
    let cursor = a0;
    for (const o of openings) {
      if (o.from > cursor) boxes.push(alongWall(wall, cursor, o.from, n0, n1, 0, ap.height));
      if (o.sill > 0) boxes.push(alongWall(wall, o.from, o.to, n0, n1, 0, o.sill));
      if (o.head < ap.height) boxes.push(alongWall(wall, o.from, o.to, n0, n1, o.head, ap.height));
      cursor = o.to;
    }
    if (cursor < a1) boxes.push(alongWall(wall, cursor, a1, n0, n1, 0, ap.height));
  }
  return boxes;
}
