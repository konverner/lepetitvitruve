// Hover/tap highlighting of the SVG diagram's parts, with the part name shown below the drawing.
// Decorative only: fails silently if a page has no [data-diagram] or no [data-part] hooks.
const containers = document.querySelectorAll<HTMLElement>('[data-diagram]');

function readLabels(container: HTMLElement): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(container.dataset.partLabels ?? '{}');
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, string>) : {};
  } catch {
    return {};
  }
}

const partOf = (target: EventTarget | null) =>
  target instanceof Element ? target.closest('[data-part]') : null;

for (const container of containers) {
  const partEls = container.querySelectorAll<Element>('[data-part]');
  if (partEls.length === 0) continue;

  const labels = readLabels(container);
  const labelEl = container.querySelector<HTMLElement>('[data-diagram-label]');
  const hint = container.dataset.hint ?? '';

  container.classList.add('is-interactive');
  for (const el of partEls) el.setAttribute('tabindex', '0');

  const setActive = (id: string | null) => {
    container.classList.toggle('has-active', id !== null);
    for (const el of partEls) {
      el.classList.toggle('active', id !== null && el.getAttribute('data-part') === id);
    }
    if (labelEl) {
      const name = id !== null ? labels[id] : undefined;
      labelEl.textContent = name ?? hint;
      labelEl.classList.toggle('is-hint', name === undefined);
    }
  };

  const activateFromEvent = (event: Event) => {
    const part = partOf(event.target);
    if (part) setActive(part.getAttribute('data-part'));
  };

  container.addEventListener('pointerover', activateFromEvent);
  container.addEventListener('pointerout', (event) => {
    // Touch fires pointerout right after the tap; keep the tapped part selected.
    if (event.pointerType !== 'mouse') return;
    if (!partOf(event.relatedTarget)) setActive(null);
  });
  container.addEventListener('pointerdown', (event) => {
    if (!partOf(event.target)) setActive(null);
  });
  container.addEventListener('focusin', activateFromEvent);
  container.addEventListener('focusout', (event) => {
    if (!partOf(event.relatedTarget)) setActive(null);
  });
}
