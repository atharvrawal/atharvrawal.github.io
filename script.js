document.querySelectorAll('.section, .hero').forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('in'));
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
