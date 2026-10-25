import type { TimeOfDay } from '../scene/lighting';

export type AppView = 'walk' | 'orbit' | 'top';

export interface ViewPanelState {
  view: AppView;
  time: TimeOfDay;
  rebuild: boolean;
  ceiling: boolean;
  labels: boolean;
}

type ToggleKey = 'rebuild' | 'ceiling' | 'labels';

const VIEW_LABELS: Record<AppView, string> = { walk: 'Spacer', orbit: 'Makieta', top: 'Z góry' };

/**
 * Panel widoku: spacer / makieta 3D / rzut z góry, wariant ścianki oraz opcje makiety.
 * Na telefonie zwinięty pod przyciskiem „Menu”, żeby nie zasłaniał joysticka.
 */
export function createViewPanel(
  initial: ViewPanelState,
  views: AppView[],
  collapsed: boolean,
  onChange: (state: ViewPanelState) => void,
): HTMLElement {
  const state = { ...initial };
  const panel = document.createElement('details');
  panel.className = 'panel';
  panel.open = !collapsed;
  panel.innerHTML = `
    <summary>Menu</summary>
    <div class="segmented" role="group" aria-label="Widok">
      ${views.map((v) => `<button type="button" data-view="${v}">${VIEW_LABELS[v]}</button>`).join('')}
    </div>
    <div class="segmented" role="group" aria-label="Pora dnia">
      <button type="button" data-time="day">☀ Dzień</button>
      <button type="button" data-time="evening">☾ Wieczór</button>
    </div>
    <label><input type="checkbox" data-key="rebuild"> Nowa ścianka (przebudowa)</label>
    <label class="mockup-only"><input type="checkbox" data-key="ceiling"> Sufit</label>
    <label class="mockup-only"><input type="checkbox" data-key="labels"> Nazwy i metraże</label>
  `;

  const sync = () => {
    panel.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === state.view));
    panel.querySelectorAll<HTMLButtonElement>('[data-time]').forEach((b) => b.classList.toggle('active', b.dataset.time === state.time));
    panel.querySelectorAll<HTMLInputElement>('[data-key]').forEach((input) => (input.checked = state[input.dataset.key as ToggleKey]));
    panel.querySelectorAll<HTMLElement>('.mockup-only').forEach((el) => (el.hidden = state.view === 'walk'));
  };

  panel.addEventListener('click', (e) => {
    const timeButton = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-time]');
    const time = timeButton?.dataset.time as TimeOfDay | undefined;
    if (time && time !== state.time) {
      state.time = time;
      sync();
      timeButton!.blur();
      onChange({ ...state });
      return;
    }
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-view]');
    const view = button?.dataset.view as AppView | undefined;
    if (!view || view === state.view) return;
    state.view = view;
    sync();
    button!.blur(); // żeby spacja/strzałki nie „klikały” przycisku podczas spaceru
    onChange({ ...state });
  });
  panel.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    state[input.dataset.key as ToggleKey] = input.checked;
    input.blur();
    sync();
    onChange({ ...state });
  });

  sync();
  return panel;
}
