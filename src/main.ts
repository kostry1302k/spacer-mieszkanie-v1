import * as THREE from 'three';
import { apartment } from './data/apartment';
import { rawFlat } from './data/modes/raw';
import { buildApartmentModel, type ApartmentModel } from './geometry/apartmentModel';
import { createRenderer, bindResize } from './scene/renderer';
import { createFlatMaterials } from './scene/materials';
import { createDaylight } from './scene/lighting';
import { MockupViews } from './scene/views';
import { RoomLabels } from './ui/roomLabels';
import { createMockupPanel, type MockupPanelState } from './ui/mockupPanel';
import { createFpsMeter, isDebug } from './core/debug';
import './styles/main.css';

const isTouch = matchMedia('(pointer: coarse)').matches;

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const hud = document.querySelector<HTMLElement>('#hud')!;
const renderer = createRenderer({ canvas, maxPixelRatio: isTouch ? 1.5 : 2 });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9e2ea);
scene.add(createDaylight(apartment, isTouch ? 1024 : 2048));

const views = new MockupViews(apartment, canvas);
const labels = new RoomLabels(document.querySelector('#app')!);
scene.add(labels.group);
bindResize(renderer, (w, h) => {
  views.resize(w, h);
  labels.renderer.setSize(w, h);
});

const materials = createFlatMaterials(rawFlat);
let model: ApartmentModel | null = null;

let state: MockupPanelState = { rebuild: false, ceiling: false, labels: true, view: 'orbit' };

function rebuild(): void {
  model?.dispose();
  if (model) scene.remove(model.root);
  const variant = state.rebuild ? 'rebuild' : 'developer';
  model = buildApartmentModel(apartment, { variant, interiorDoors: false }, materials);
  scene.add(model.root);
  labels.build(apartment, variant);
  applyState();
}

function applyState(): void {
  if (model) model.ceilings.visible = state.ceiling && state.view === 'orbit';
  labels.setVisible(state.labels);
  views.setMode(state.view);
}

hud.appendChild(
  createMockupPanel(state, (next) => {
    const variantChanged = next.rebuild !== state.rebuild;
    state = next;
    if (variantChanged) rebuild();
    else applyState();
  }),
);
rebuild();

const tickFps = isDebug ? createFpsMeter() : null;

renderer.setAnimationLoop(() => {
  views.update();
  renderer.render(scene, views.camera);
  labels.renderer.render(scene, views.camera);
  tickFps?.();
});
