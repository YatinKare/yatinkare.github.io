const dialog = document.querySelector('#quick-links');
const openButton = document.querySelector('#quick-open');
const filter = document.querySelector('#quick-filter');
const commandLinks = [...document.querySelectorAll('.command-list a')];
const shortcutLabel = openButton.querySelector('kbd');
const isAppleDevice = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
let previousFocus = null;

shortcutLabel.textContent = isAppleDevice ? '⌘ K' : 'Ctrl K';

function getFocusableElements() {
  return [...dialog.querySelectorAll('input:not([disabled]), a[href]:not([hidden]), button:not([disabled]):not([tabindex="-1"])')]
    .filter((element) => element.getClientRects().length > 0);
}

function openDialog() {
  previousFocus = document.activeElement;
  dialog.hidden = false;
  document.body.classList.add('dialog-open');
  filter.value = '';
  commandLinks.forEach((link) => { link.hidden = false; });
  requestAnimationFrame(() => filter.focus());
}

function closeDialog() {
  dialog.hidden = true;
  document.body.classList.remove('dialog-open');
  if (previousFocus) previousFocus.focus();
}

openButton.addEventListener('click', openDialog);
dialog.querySelector('[data-close]').addEventListener('click', closeDialog);

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    dialog.hidden ? openDialog() : closeDialog();
    return;
  }

  if (event.key === 'Escape' && !dialog.hidden) {
    closeDialog();
    return;
  }

  if (event.key === 'Tab' && !dialog.hidden) {
    const focusable = getFocusableElements();
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (!dialog.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    }
  }
});

filter.addEventListener('input', () => {
  const query = filter.value.trim().toLowerCase();
  commandLinks.forEach((link) => {
    link.hidden = !link.dataset.search.includes(query);
  });
});

filter.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const firstVisible = commandLinks.find((link) => !link.hidden);
  if (firstVisible) firstVisible.click();
});

document.querySelector('.copy-email').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const email = button.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    button.textContent = 'Email copied';
  } catch {
    window.location.href = `mailto:${email}`;
    return;
  }
  window.setTimeout(() => { button.textContent = 'Copy my email'; }, 1800);
});
