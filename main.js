// ============================================
// ARC REACTOR — State Machine
// OFF  →  POWERED (reactor glows + spins)
//          → name + nav titles fade in
// Clicking a nav item → opens modal
// ============================================

let state = 'OFF'; // OFF | POWERED

const reactor      = document.getElementById('reactor');
const wrapper      = document.getElementById('reactor-wrapper');
const hint         = document.getElementById('click-hint');
const nameStrip    = document.getElementById('name-strip');
const navTitles    = document.getElementById('nav-titles');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

// ---- REACTOR CLICK ----
window.handleReactorClick = function () {
  if (state === 'OFF') powerOn();
};

// ---- POWER ON SEQUENCE ----
function powerOn() {
  state = 'POWERED';

  // 1 — Glow the reactor immediately
  reactor.classList.add('powered');

  // 2 — Fade out the hint
  hint.style.opacity = '0';
  hint.style.transition = 'opacity 0.4s';

  // 3 — After short delay: show name strip
  setTimeout(() => {
    nameStrip.style.display = 'block';
    // Force reflow then animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nameStrip.classList.add('show');
      });
    });
  }, 500);

  // 4 — Then show nav items
  setTimeout(() => {
    navTitles.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navTitles.classList.add('show');
      });
    });
  }, 900);

  // 5 — Shrink reactor slightly upward
  setTimeout(() => {
    wrapper.classList.add('powered-layout');
  }, 400);
}

// ---- OPEN SECTION MODAL ----
window.openSection = function (key) {
  const section = SECTIONS[key];
  if (!section) return;
  modalContent.innerHTML = `<h2>${section.title}</h2>${section.html}`;
  modalOverlay.classList.add('open');
  // Re-trigger skill bar fill animation
  requestAnimationFrame(() => {
    document.querySelectorAll('.skill-fill').forEach(el => {
      const targetW = el.style.width;
      el.style.transition = 'none';
      el.style.width = '0';
      requestAnimationFrame(() => {
        el.style.transition = 'width 1.2s ease';
        el.style.width = targetW;
      });
    });
  });
};

// ---- CLOSE MODAL ----
window.closeModal = function () {
  modalOverlay.classList.remove('open');
};

// ---- ESC TO CLOSE ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- AUTO-SCROLL PROJECT IMAGES ----
setInterval(() => {
  const galleries = document.querySelectorAll('.scrollable-imgs');
  galleries.forEach(gallery => {
    const scrollAmount = gallery.clientWidth;
    const maxScroll = gallery.scrollWidth - scrollAmount;
    
    // If we've reached the end (with a 5px margin for rounding errors), loop back to the start
    if (gallery.scrollLeft >= maxScroll - 5) {
      gallery.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
}, 4000);
