const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');
const progressBar = document.getElementById('progress');
const cursor = document.querySelector('.cursor');
const brand = document.querySelector('.brand');

let currentIndex = 0;
let isAnimating = false;
const totalSections = sections.length;

const roles = [
  "BACKEND SYSTEMS",
  "ASYNC RUNTIMES",
  "NETWORK PROTOCOLS",
  "CLOUD INFRA",
  "LINUX INTERNALS"
];

const el = document.getElementById("scramble-text");
const chars = "!<>-_\\/[]{}—=+*^?#________";
let roleIndex = 0;

const scrambleText = (newText) => {
  const oldText = el.innerText;
  const length = Math.max(oldText.length, newText.length);
  return new Promise((resolve) => {
    let frame = 0;
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(window.scrambleId);
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span style="color:#555">${char}</span>`;
        } else {
          output += from;
        }
      }
      el.innerHTML = output;
      if (complete === queue.length) {
        resolve();
      } else {
        window.scrambleId = requestAnimationFrame(update);
        frame++;
      }
    };
    update();
  });
};

const cycleRoles = async () => {
  while (true) {
    await scrambleText(roles[roleIndex]);
    await new Promise(r => setTimeout(r, 2500));
    roleIndex = (roleIndex + 1) % roles.length;
  }
};
cycleRoles();

const initGrid = () => {
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

  const gridSize = 60;
  const influence = 150;

  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
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
          const size = 3;
          ctx.strokeStyle = `rgba(235,255,0,${alpha})`;
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
};
initGrid();

function updateView(index) {
  if (index < 0 || index >= totalSections) return;
  if (isAnimating) return;
  isAnimating = true;

  brand.classList.toggle('hidden', index === 0);

  sections.forEach(sec => { sec.classList.remove('active'); sec.classList.remove('previous'); });
  navItems.forEach(item => item.classList.remove('active'));

  sections[index].classList.add('active');
  for (let i = 0; i < index; i++) sections[i].classList.add('previous');
  if (navItems[index]) navItems[index].classList.add('active');

  currentIndex = index;
  progressBar.style.width = `${((index + 1) / totalSections) * 100}%`;
  setTimeout(() => { isAnimating = false; }, 1200);
}

window.addEventListener('wheel', (e) => {
  if (window.innerWidth > 768) {
    if (isAnimating) return;
    e.deltaY > 0 ? updateView(currentIndex + 1) : updateView(currentIndex - 1);
  }
});

window.addEventListener('keydown', (e) => {
  if (window.innerWidth > 768) {
    if (e.key === 'ArrowDown') updateView(currentIndex + 1);
    if (e.key === 'ArrowUp') updateView(currentIndex - 1);
  }
});

const scrollBtn = document.getElementById('scroll-down-btn');
if (scrollBtn) scrollBtn.addEventListener('click', () => updateView(1));

navItems.forEach(item => {
  item.addEventListener('click', () => {
    const index = parseInt(item.getAttribute('data-index'));
    if (!isNaN(index) && index !== currentIndex) updateView(index);
  });
});

const workItems = document.querySelectorAll('.work-item[data-img]');
const workImages = document.querySelectorAll('.work-preview img');
const overlayTitle = document.getElementById('overlay-title');
const overlayDesc = document.getElementById('overlay-desc');
const workPreview = document.querySelector('.work-preview');
if (workPreview) workPreview.classList.add('has-active');

workItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const targetId = item.getAttribute('data-img');
    if (!targetId) return;
    workItems.forEach(i => i.classList.remove('active-project'));
    workImages.forEach(img => img.classList.remove('active'));
    item.classList.add('active-project');
    const targetImg = document.getElementById(`img-${targetId}`);
    if (targetImg) targetImg.classList.add('active');
    overlayTitle.innerText = item.getAttribute('data-title');
    overlayDesc.innerText = item.getAttribute('data-desc');
  });
});

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('.hover-target').forEach(elx => {
  elx.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  elx.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

updateView(0);
