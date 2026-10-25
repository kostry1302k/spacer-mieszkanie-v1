import type { ViewMode } from '../scene/views';

export interface MockupPanelState {
  rebuild: boolean;
  ceiling: boolean;
  labels: boolean;
  view: ViewMode;
}

/** Panel makiety (Etap 1): wariant ścianki, sufit, etykiety, widok 3D / z góry. */
export function createMockupPanel(initial: MockupPanelState, onChange: (state: MockupPanelState) => void): HTMLElement {
  const state = { ...initial };
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.innerHTML = `
    <div class="segmented" role="group" aria-label="Widok">
      <button type="button" data-view="orbit">3D</button>
      <button type="button" data-view="top">Z góry</button>
    </div>
    <label><input type="checkbox" data-key="rebuild"> Nowa ścianka (przebudowa)</label>
    <label><input type="checkbox" data-key="ceiling"> Sufit</label>
    <label><input type="checkbox" data-key="labels"> Nazwy i metraże</label>
  `;

  const sync = () => {
    panel.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((b) => b.classList.toggle('active', b.dataset.view === state.view));
    panel.querySelectorAll<HTMLInputElement>('[data-key]').forEach((input) => {
      input.checked = state[input.dataset.key as 'rebuild' | 'ceiling' | 'labels'];
    });
  };

  panel.addEventListener('click', (e) => {
    const view = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-view]')?.dataset.view as ViewMode | undefined;
    if (!view || view === state.view) return;
    state.view = view;
    sync();
    onChange({ ...state });
  });
  panel.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    state[input.dataset.key as 'rebuild' | 'ceiling' | 'labels'] = input.checked;
    onChange({ ...state });
  });

  sync();
  return panel;
}
