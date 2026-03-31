/**
 * Portfolio — Main JavaScript
 * Premium interactions, animations, and functionality
 */

'use strict';

/* ── Preloader ───────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations
    document.querySelector('.hero-bg img')?.style.setProperty('transform', 'scale(1)');
  }, 1800);
});

document.body.style.overflow = 'hidden';

/* ── Custom Cursor ───────────────────────────────────────── */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing && window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  document.querySelectorAll('a, button, .gallery-item, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorRing.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorRing.classList.remove('hovered');
    });
  });
}

/* ── Progress Bar ────────────────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  if (progressBar) progressBar.style.width = progress + '%';
});

/* ── Navigation ──────────────────────────────────────────── */
const nav = document.getElementById('nav');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.nav-mobile');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  // Scrolled state
  if (currentY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (currentY >= top && currentY < bottom) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + section.id);
      });
    }
  });

  lastScrollY = currentY;
});

// Hamburger toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav?.classList.toggle('open');
  document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Theme Toggle ────────────────────────────────────────── */
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

/* ── Scroll Reveal ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Poem Stanza Animation ───────────────────────────────── */
const poemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stanzas = entry.target.querySelectorAll('.poem-stanza');
      stanzas.forEach((stanza, i) => {
        setTimeout(() => stanza.classList.add('visible'), i * 200);
      });
      poemObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.poem-card').forEach(el => poemObserver.observe(el));

/* ── Lazy Load Images ────────────────────────────────────── */
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.addEventListener('load', () => img.classList.add('loaded'));
      imageObserver.unobserve(img);
    }
  });
}, { rootMargin: '200px' });

lazyImages.forEach(img => imageObserver.observe(img));

/* ── Counter Animation ───────────────────────────────────── */
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const initial = parseInt(el.textContent) || 0;

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(initial + (target - initial) * eased);
    el.textContent = value + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.num');
      if (numEl && numEl.dataset.count) {
        animateCounter(numEl, parseInt(numEl.dataset.count));
        counterObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(el => counterObserver.observe(el));

/* ── Parallax Hero ───────────────────────────────────────── */
const heroBgImg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
  if (!heroBgImg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBgImg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

/* ── Contact Form ────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;

  // Clear errors
  contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

  // Validate
  const fields = {
    name: contactForm.querySelector('#name'),
    email: contactForm.querySelector('#email'),
    message: contactForm.querySelector('#message'),
  };

  if (!fields.name?.value.trim()) {
    showError(fields.name, 'Please enter your name'); valid = false;
  }
  if (!fields.email?.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showError(fields.email, 'Please enter a valid email'); valid = false;
  }
  if (!fields.message?.value.trim() || fields.message.value.trim().length < 10) {
    showError(fields.message, 'Message must be at least 10 characters'); valid = false;
  }

  if (!valid) return;

  // Simulate submission
  // Real Netlify Submission
  const btn = contactForm.querySelector('button[type="submit"]');
  const btnText = btn.querySelector('span');
  btn.disabled = true;
  btnText.textContent = 'Sending...';

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(contactForm)).toString(),
    });

    if (response.ok) {
      contactForm.reset();
      const success = document.querySelector('.form-success');
      success?.classList.add('visible');
      setTimeout(() => success?.classList.remove('visible'), 4000);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    alert("Sorry, there was an issue sending your message.");
  } finally {
    btn.disabled = false;
    btnText.textContent = 'Send Message';
  }
});

function showError(el, msg) {
  const group = el?.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const errorEl = group.querySelector('.error-msg');
  if (errorEl) errorEl.textContent = msg;
  el.classList.add('error');
  el.addEventListener('input', () => {
    el.classList.remove('error');
    group.classList.remove('has-error');
  }, { once: true });
}

/* ── Smooth scroll for anchor links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Skill card entrance stagger ────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.skill-card');
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 80}ms`;
        card.classList.add('visible');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

// Make skill cards reveal-able
document.querySelectorAll('.skill-card').forEach(c => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(30px)';
  c.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Override .visible for skill-cards specifically
const skillStyle = document.createElement('style');
skillStyle.textContent = `.skill-card.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(skillStyle);

console.log('%c Portfolio loaded ✦', 'color: #c9a96e; font-size: 14px; font-family: serif;');