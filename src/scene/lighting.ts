import * as THREE from 'three';
import type { Apartment } from '../data/types';
import { m } from '../core/units';

/**
 * Oświetlenie tymczasowe (Etap 1): niebo + słońce z południa (+Y w rzucie = +z w scenie).
 * Pozycja słońca dla Warszawy w październiku, ok. 13:00 – wysokość ok. 27°.
 */
export function createDaylight(ap: Apartment, shadowMapSize: number): THREE.Group {
  const group = new THREE.Group();
  group.name = 'daylight';

  group.add(new THREE.HemisphereLight(0xe6edf5, 0xb3a898, 2.2));

  const { x0, x1, y0, y1 } = ap.interior;
  const center = new THREE.Vector3(m((x0 + x1) / 2), 0, m((y0 + y1) / 2));
  const elevation = THREE.MathUtils.degToRad(27);
  const azimuthFromSouth = THREE.MathUtils.degToRad(15); // lekko na zachód
  const dir = new THREE.Vector3(
    Math.cos(elevation) * Math.sin(azimuthFromSouth),
    Math.sin(elevation),
    Math.cos(elevation) * Math.cos(azimuthFromSouth),
  );

  const sun = new THREE.DirectionalLight(0xfff0dc, 3);
  sun.position.copy(center).addScaledVector(dir, 15);
  sun.target.position.copy(center);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(shadowMapSize);
  const cam = sun.shadow.camera;
  cam.left = -6;
  cam.right = 6;
  cam.top = 6;
  cam.bottom = -6;
  cam.near = 1;
  cam.far = 30;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  group.add(sun, sun.target);

  return group;
}
