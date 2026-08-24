document.querySelectorAll('.section').forEach(el => el.classList.add('reveal'));

const revealIo = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('in'));
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealIo.observe(el));

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section[id]');

const spyIo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const link = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(sec => spyIo.observe(sec));
