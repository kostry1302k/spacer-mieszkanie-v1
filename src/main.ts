import * as THREE from 'three';
import { apartment } from './data/apartment';
import { rawFlat } from './data/modes/raw';
import type { Room, Variant } from './data/types';
import { buildApartmentModel, type ApartmentModel } from './geometry/apartmentModel';
import { createRenderer, bindResize } from './scene/renderer';
import { createFlatMaterials } from './scene/materials';
import { createDaylight } from './scene/lighting';
import { MockupViews } from './scene/views';
import { Player } from './controls/player';
import { DesktopControls } from './controls/desktop';
import { TouchControls } from './controls/touch';
import { staticColliders, type Rect } from './controls/collisions';
import { DoorController } from './interaction/doors';
import { RoomLabels } from './ui/roomLabels';
import { RoomList } from './ui/roomList';
import { Minimap } from './ui/minimap';
import { WalkHud } from './ui/hud';
import { createViewPanel, type AppView, type ViewPanelState } from './ui/viewPanel';
import { createFpsMeter, isDebug } from './core/debug';
import { AdaptiveQuality, isTouchDevice as isTouch, qualityProfile } from './core/quality';
import './styles/main.css';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const hudRoot = document.querySelector<HTMLElement>('#hud')!;
const renderer = createRenderer({ canvas, maxPixelRatio: qualityProfile.maxPixelRatio });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9e2ea);
scene.add(createDaylight(apartment, qualityProfile.shadowMapSize));

// Widoki: spacer (kamera na wysokości oczu) i makieta (orbita / z góry).
const walkCamera = new THREE.PerspectiveCamera(70, 1, 0.05, 100);
const views = new MockupViews(apartment, canvas);
const labels = new RoomLabels(document.querySelector('#app')!);
scene.add(labels.group);

const player = new Player();
const doors = new DoorController();
const hud = new WalkHud(hudRoot, isTouch, () => startWalk());
const MINIMAP_SIZES = isTouch ? [120, 240] : [170, 300];
let minimapBig = false;
const minimap = new Minimap(apartment, MINIMAP_SIZES[0]);
minimap.element.title = 'Powiększ / zmniejsz mapę';
minimap.element.addEventListener('click', () => {
  minimapBig = !minimapBig;
  minimap.resize(MINIMAP_SIZES[+minimapBig]);
  minimap.build(variantOf(state));
});
const roomList = new RoomList(apartment, (room) => goToRoom(room));
const desktop = new DesktopControls(canvas, player, {
  onInteract: () => hoveredDoor && doors.toggle(hoveredDoor),
  onLockChange: (locked) => {
    if (state.view !== 'walk') return;
    hud.setActive(locked);
    if (!locked) hud.setPaused();
  },
});
// Na ekranie dotykowym spacer startuje bez blokady kursora i trwa do zmiany widoku.
let touchWalking = false;
const touch = new TouchControls(canvas, player, {
  onTap: (x, y) => {
    if (state.view !== 'walk' || !model) return;
    const ndc = new THREE.Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    const id = doors.pick(walkCamera, [model.root.getObjectByName('walls')!], ndc);
    if (id) doors.toggle(id);
  },
});

function startWalk(): void {
  if (isTouch) {
    touchWalking = true;
    hud.setActive(true);
  } else {
    desktop.lock();
  }
}

const walkActive = () => desktop.locked || touchWalking;

const sidebar = document.createElement('div');
sidebar.className = 'sidebar';
sidebar.append(roomList.element, minimap.element);
hudRoot.appendChild(sidebar);

bindResize(renderer, (w, h) => {
  walkCamera.aspect = w / h;
  // Na pionowym ekranie szerszy kąt w pionie, żeby w poziomie nie widzieć „przez dziurkę od klucza”.
  walkCamera.fov = w < h ? Math.min(90, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(35)) / (w / h)))) : 70;
  walkCamera.updateProjectionMatrix();
  views.resize(w, h);
  labels.renderer.setSize(w, h);
});

const materials = createFlatMaterials(rawFlat);
let model: ApartmentModel | null = null;
let colliders: Rect[] = [];
let hoveredDoor: string | null = null;

const availableViews: AppView[] = ['walk', 'orbit', 'top'];
let state: ViewPanelState = { view: availableViews[0], rebuild: false, ceiling: false, labels: true };

const variantOf = (s: ViewPanelState): Variant => (s.rebuild ? 'rebuild' : 'developer');

function rebuild(): void {
  if (model) {
    scene.remove(model.root);
    model.dispose();
  }
  const variant = variantOf(state);
  model = buildApartmentModel(apartment, { variant, interiorDoors: false }, materials);
  scene.add(model.root);
  doors.setLeaves(model.leaves);
  colliders = staticColliders(apartment, variant);
  labels.build(apartment, variant);
  minimap.build(variant);
  roomList.build(variant);
  player.settle([...colliders, ...doors.colliders()]);
  applyView();
}

function applyView(): void {
  const walk = state.view === 'walk';
  if (model) model.ceilings.visible = walk || (state.ceiling && state.view === 'orbit');
  labels.setVisible(!walk && state.labels);
  views.setMode(walk ? 'off' : state.view === 'top' ? 'top' : 'orbit');
  desktop.enabled = walk;
  touch.enabled = walk;
  sidebar.hidden = !walk;
  if (walk) hud.setActive(walkActive());
  else {
    desktop.unlock();
    touch.reset();
    touchWalking = false;
    hud.hideAll();
  }
}

function goToRoom(room: Room): void {
  void hud.transition(() => {
    player.place(room.spawn.x, room.spawn.y, room.spawn.yaw);
    player.settle([...colliders, ...doors.colliders()]);
  });
}

hudRoot.appendChild(
  createViewPanel(state, availableViews, isTouch, (next) => {
    const variantChanged = next.rebuild !== state.rebuild;
    state = next;
    if (variantChanged) rebuild();
    else applyView();
  }),
);

const start = apartment.rooms.find((r) => r.id === 'hol')!.spawn;
player.place(start.x, start.y, start.yaw);
rebuild();

const adaptive = new AdaptiveQuality(renderer, () => Object.values(materials).forEach((mat) => (mat.needsUpdate = true)));
const tickFps = isDebug ? createFpsMeter() : null;
if (isDebug) {
  // Pomoc do testów w konsoli: app.walk({ forward: 1, strafe: 0, run: false }, 2) symuluje 2 s chodu.
  const walk = (input: { forward: number; strafe: number; run: boolean }, seconds: number) => {
    for (let t = 0; t < seconds; t += 1 / 60) player.update(1 / 60, input, [...colliders, ...doors.colliders()]);
    return [Math.round(player.x * 10) / 10, Math.round(player.y * 10) / 10];
  };
  const pick = () => {
    player.applyToCamera(walkCamera);
    scene.updateMatrixWorld(); // gdy karta jest w tle, pętla renderowania nie biegnie
    walkCamera.updateMatrixWorld();
    return doors.pick(walkCamera, model ? [model.root.getObjectByName('walls')!] : []);
  };
  Object.assign(window, { app: { player, doors, desktop, touch, apartment, walk, pick, adaptive } });
}

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const frameTime = clock.getDelta();
  const dt = Math.min(frameTime, 0.05);
  doors.update(dt);

  let camera: THREE.Camera;
  if (state.view === 'walk') {
    player.update(dt, touch.active ? touch.input : desktop.input, [...colliders, ...doors.colliders()]);
    player.applyToCamera(walkCamera);
    camera = walkCamera;
    const occluders = model ? [model.root.getObjectByName('walls')!] : [];
    hoveredDoor = walkActive() || isDebug ? doors.pick(walkCamera, occluders) : null;
    const action = hoveredDoor && (doors.isOpen(hoveredDoor) ? 'zamknij' : 'otwórz');
    hud.setHint(action && walkActive() ? (isTouch ? `Dotknij drzwi – ${action}` : `E / klik – ${action} drzwi`) : null);
    minimap.draw(player, doors.outlines());
  } else {
    views.update();
    camera = views.camera;
  }

  renderer.render(scene, camera);
  if (labels.group.visible) labels.renderer.render(scene, camera);
  tickFps?.();
  adaptive.tick(frameTime);
});
