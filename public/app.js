/* ═══════════════════════════════════════════════
   app.js — Lógica da página "Aceita namorar?"
   ═══════════════════════════════════════════════ */

// ─── CORAÇÕES DE FUNDO ───────────────────────────
const heartsArr = ['💖','💕','💗','💓','💞','🌸','✨','💝'];
const bgEl = document.getElementById('hearts-bg');

for (let i = 0; i < 28; i++) {
  const h = document.createElement('span');
  h.className = 'bg-heart';
  h.textContent = heartsArr[Math.floor(Math.random() * heartsArr.length)];
  h.style.left            = Math.random() * 100 + 'vw';
  h.style.animationDuration = (6 + Math.random() * 10) + 's';
  h.style.animationDelay    = -(Math.random() * 14) + 's';
  h.style.fontSize          = (.9 + Math.random() * 1.4) + 'rem';
  bgEl.appendChild(h);
}

// ─── BOTÃO NÃO (foge do mouse) ───────────────────
const btnNo  = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
let escaped  = false;

function placeNoButton() {
  if (!escaped) {
    escaped = true;
    btnNo.classList.add('escaping'); // troca para position: fixed
  }

  const w      = window.innerWidth;
  const h      = window.innerHeight;
  const bw     = btnNo.offsetWidth  || 120;
  const bh     = btnNo.offsetHeight || 48;
  const margin = 20;

  let nx, ny, attempts = 0;
  do {
    nx = margin + Math.random() * (w - bw - margin * 2);
    ny = margin + Math.random() * (h - bh - margin * 2);
    attempts++;
  } while (attempts < 30 && isNearYes(nx, ny, bw, bh));

  btnNo.style.left = nx + 'px';
  btnNo.style.top  = ny + 'px';
}

function isNearYes(x, y, bw, bh) {
  const yr  = btnYes.getBoundingClientRect();
  const pad = 60;
  return (
    x       < yr.right  + pad &&
    x + bw  > yr.left   - pad &&
    y       < yr.bottom + pad &&
    y + bh  > yr.top    - pad
  );
}

btnNo.addEventListener('mouseenter', placeNoButton);
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  placeNoButton();
}, { passive: false });

// ─── BOTÃO SIM ───────────────────────────────────
btnYes.addEventListener('click', showYesScreen);

function showYesScreen() {
  document.getElementById('screen-ask').classList.add('hidden');
  document.getElementById('screen-yes').classList.remove('hidden');
  launchConfetti();
  launchFloatingHearts();
}

// ─── CONFETES ────────────────────────────────────
const confettiColors = [
  '#ff6b9d','#ff3d7f','#c084fc',
  '#fbbf24','#34d399','#60a5fa','#f472b6'
];

function spawnConfetti(count) {
  const container = document.getElementById('confetti-container');

  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';

    c.style.left        = Math.random() * 100 + 'vw';
    c.style.background  = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.width       = (6 + Math.random() * 10) + 'px';
    c.style.height      = (6 + Math.random() * 10) + 'px';
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';

    const dur = 2.5 + Math.random() * 3;
    c.style.animationDuration = dur + 's';
    c.style.animationDelay    = (Math.random() * 1.4) + 's';

    container.appendChild(c);
    setTimeout(() => c.remove(), (dur + 1.6) * 1000);
  }
}

function launchConfetti() {
  spawnConfetti(140);
  setTimeout(() => spawnConfetti(80), 1800); // segunda onda
}

// ─── CORAÇÕES SUBINDO ────────────────────────────
const heartEmojis = ['💖','💕','💗','💓','💞','💝','🌸','✨'];

function launchFloatingHearts() {
  let count = 0;

  const interval = setInterval(() => {
    const h = document.createElement('span');
    h.className = 'float-heart';

    h.textContent             = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left              = (5 + Math.random() * 90) + 'vw';
    h.style.bottom            = '5vh';
    h.style.fontSize          = (1.2 + Math.random() * 2.2) + 'rem';
    h.style.animationDuration = (2.5 + Math.random() * 2) + 's';
    h.style.animationDelay    = (Math.random() * .5) + 's';

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5500);

    count++;
    if (count > 30) clearInterval(interval);
  }, 200);
}
