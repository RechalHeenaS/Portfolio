// ========================
// LOADER
// ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animFollower);
}
animFollower();

document.querySelectorAll('a, button, .filter-btn, .cert-nav, .cert-dot').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    follower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    follower.classList.remove('hovered');
  });
});

// ========================
// NAVBAR SCROLL & ACTIVE
// ========================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Navbar shadow
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  // Back to top
  const btn = document.getElementById('back-top');
  btn.classList.toggle('show', window.scrollY > 400);

  // Reveal on scroll
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('in-view');
    }
  });

  // Skill bar animation
  document.querySelectorAll('.bar-fill').forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 40 && !bar.dataset.animated) {
      bar.dataset.animated = '1';
      bar.style.width = bar.dataset.width + '%';
    }
  });
});

// BACK TO TOP
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// HAMBURGER
// ========================
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
hamburger.addEventListener('click', () => {
  navList.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  navList.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(6px,6px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(6px,-6px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});
navList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = ''; spans[1].style.opacity = ''; spans[2].style.transform = '';
  });
});

// ========================
// TYPEWRITER
// ========================
const roles = ['Web Developer', 'UI/UX Designer', 'Python Developer', 'Creative Coder'];
let ri = 0, ci = 0, deleting = false;
const roleEl = document.getElementById('role-type');

function type() {
  const word = roles[ri];
  if (!deleting) {
    roleEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    roleEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// ========================
// PROJECT FILTER
// ========================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.transition = 'opacity 0.4s, transform 0.4s';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      }, 200);
    });
  });
});

// ========================
// CERTIFICATIONS SLIDER
// ========================
const track = document.getElementById('cert-track');
const cards = track.querySelectorAll('.cert-card');
const dotsWrap = document.getElementById('cert-dots');
const VISIBLE = window.innerWidth < 640 ? 1 : window.innerWidth < 900 ? 2 : 3;
let idx = 0;
const maxIdx = cards.length - VISIBLE;

// Build dots
cards.forEach((_, i) => {
  if (i <= maxIdx) {
    const d = document.createElement('div');
    d.className = 'cert-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  }
});

function goTo(i) {
  idx = Math.max(0, Math.min(i, maxIdx));
  const cardW = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${idx * cardW}px)`;
  document.querySelectorAll('.cert-dot').forEach((d, di) => d.classList.toggle('active', di === idx));
}

document.getElementById('cert-next').addEventListener('click', () => goTo(idx + 1));
document.getElementById('cert-prev').addEventListener('click', () => goTo(idx - 1));

// Auto-slide
setInterval(() => goTo(idx >= maxIdx ? 0 : idx + 1), 4000);

// ========================
// REVEAL ON SCROLL INIT
// ========================
function addReveal() {
  document.querySelectorAll('.skill-card, .project-card, .cert-card, .c-link, .info-card, .bar-item, .about-grid, .contact-grid').forEach(el => {
    el.classList.add('reveal');
  });
}
addReveal();

// Trigger on first load
window.dispatchEvent(new Event('scroll'));
