/** Elementy HUD spaceru: celownik, podpowiedź, ekran startowy/pauzy i przyciemnienie przy przejściu. */
export class WalkHud {
  private readonly crosshair = div('crosshair');
  private readonly hint = div('hint');
  private readonly overlay = div('overlay');
  private readonly fade = div('fade');

  constructor(container: HTMLElement, onStart: () => void) {
    this.overlay.innerHTML = `
      <div class="overlay-card">
        <h1>Spacer po mieszkaniu</h1>
        <p class="overlay-status">Stan surowy · M12, Skypoint 57</p>
        <ul class="keys">
          <li><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> lub strzałki – chodzenie</li>
          <li>Mysz – rozglądanie się</li>
          <li><kbd>Shift</kbd> – szybszy krok</li>
          <li><kbd>E</kbd> lub klik – otwieranie drzwi</li>
          <li><kbd>Esc</kbd> – pauza i menu</li>
        </ul>
        <button type="button" class="primary">Kliknij, aby zacząć</button>
      </div>`;
    this.overlay.querySelector('button')!.addEventListener('click', onStart);
    container.append(this.crosshair, this.hint, this.overlay, this.fade);
    this.setActive(false);
  }

  /** Spacer włączony (kursor zablokowany) – celownik zamiast ekranu startowego. */
  setActive(active: boolean): void {
    this.crosshair.hidden = !active;
    this.overlay.hidden = active;
    if (!active) this.setHint(null);
  }

  setPaused(): void {
    this.overlay.querySelector('button')!.textContent = 'Kliknij, aby kontynuować';
  }

  hideAll(): void {
    this.crosshair.hidden = true;
    this.overlay.hidden = true;
    this.setHint(null);
  }

  setHint(text: string | null): void {
    this.hint.hidden = !text;
    if (text) this.hint.textContent = text;
  }

  /** Krótkie przyciemnienie ekranu na czas przeniesienia gracza. */
  async transition(action: () => void): Promise<void> {
    this.fade.classList.add('on');
    await new Promise((r) => setTimeout(r, 180));
    action();
    this.fade.classList.remove('on');
  }
}

function div(className: string): HTMLDivElement {
  const el = document.createElement('div');
  el.className = className;
  return el;
}
