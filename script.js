/* mouse-reactive dot grid, single accent color */
(function initGrid() {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let mouse = { x: -9999, y: -9999 };

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const gridSize = 56;
  const influence = 140;

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y <= height; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();

    const startX = Math.floor((mouse.x - influence) / gridSize) * gridSize;
    const endX = Math.ceil((mouse.x + influence) / gridSize) * gridSize;
    const startY = Math.floor((mouse.y - influence) / gridSize) * gridSize;
    const endY = Math.ceil((mouse.y + influence) / gridSize) * gridSize;

    for (let x = startX; x <= endX; x += gridSize) {
      for (let y = startY; y <= endY; y += gridSize) {
        const dx = x - mouse.x, dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < influence) {
          const alpha = 1 - dist / influence;
          const size = 2.5;
          ctx.strokeStyle = `rgba(200,255,77,${alpha * 0.8})`;
          ctx.beginPath();
          ctx.moveTo(x - size, y); ctx.lineTo(x + size, y);
          ctx.moveTo(x, y - size); ctx.lineTo(x, y + size);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  };
  animate();
})();

/* scroll reveal */
document.querySelectorAll('.section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
});
const revealIo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      revealIo.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.section').forEach(el => revealIo.observe(el));

/* scrollspy nav — picks the last section whose top has passed the marker line,
   falling back to the final section once the page is scrolled to the bottom
   (needed because short trailing sections never fill an IntersectionObserver band) */
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('.section[id]'));
const markerLine = window.innerHeight * 0.35;

function setActive(id) {
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
}

function updateScrollspy() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) {
    setActive(sections[sections.length - 1].id);
    return;
  }
  let current = sections[0].id;
  for (const sec of sections) {
    if (sec.getBoundingClientRect().top <= markerLine) current = sec.id;
  }
  setActive(current);
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateScrollspy(); ticking = false; });
});
updateScrollspy();
