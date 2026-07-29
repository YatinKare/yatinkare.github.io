const dialog = document.querySelector('#quick-links');
const openButton = document.querySelector('#quick-open');
const filter = document.querySelector('#quick-filter');
const commandLinks = [...document.querySelectorAll('.command-list a')];
let previousFocus = null;

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
  }
  if (event.key === 'Escape' && !dialog.hidden) closeDialog();
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
