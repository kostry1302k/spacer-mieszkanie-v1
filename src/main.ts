import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { createRenderer, bindResize } from './scene/renderer';
import { createFpsMeter, isDebug } from './core/debug';
import './styles/main.css';

const isTouch = matchMedia('(pointer: coarse)').matches;

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const renderer = createRenderer({ canvas, maxPixelRatio: isTouch ? 1.5 : 2 });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfd8e0);

const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 100);
camera.position.set(4, 3, 5);
bindResize(renderer, camera);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.5, 0);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.05;

// Scena testowa Etapu 0 – zostanie zastąpiona modelem mieszkania w Etapie 1.
scene.add(new THREE.HemisphereLight(0xf4f1ea, 0x8a8072, 1.2));

const sun = new THREE.DirectionalLight(0xfff1dc, 2.5);
sun.position.set(3, 6, 4);
sun.castShadow = true;
sun.shadow.mapSize.setScalar(isTouch ? 1024 : 2048);
scene.add(sun);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x9a9289, roughness: 0.9 }),
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const cube = new THREE.Mesh(
  new RoundedBoxGeometry(1, 1, 1, 4, 0.06),
  new THREE.MeshStandardMaterial({ color: 0x6b4a33, roughness: 0.55 }),
);
cube.position.y = 0.5;
cube.castShadow = true;
scene.add(cube);

const tickFps = isDebug ? createFpsMeter() : null;
const clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  cube.rotation.y += clock.getDelta() * 0.4;
  controls.update();
  renderer.render(scene, camera);
  tickFps?.();
});
