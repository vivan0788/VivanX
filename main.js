/* =========================================
   AVINASH SAHANI PORTFOLIO - MAIN JS
   ========================================= */

// ---- Loading Screen ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }
  }, 2400);
});

// ---- Custom Cursor ----
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  if (cursorFollower) {
    cursorFollower.style.left = (followerX - 20) + 'px';
    cursorFollower.style.top = (followerY - 20) + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .btn, .project-card, .why-card, .faq-question, .filter-btn, .back-to-top').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor && cursor.classList.add('hover');
    cursorFollower && cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor && cursor.classList.remove('hover');
    cursorFollower && cursorFollower.classList.remove('hover');
  });
});

// ---- Navbar Scroll ----
const navbar = document.querySelector('.navbar');
const scrollProgress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrolled / total) * 100;

  if (navbar) navbar.classList.toggle('scrolled', scrolled > 50);
  if (scrollProgress) scrollProgress.style.width = pct + '%';
  if (backToTop) backToTop.classList.toggle('visible', scrolled > 600);
});

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- Hamburger Menu ----
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    navLinks && navLinks.classList.remove('open');
  });
});

// ---- Typed Text Animation ----
const texts = [
  'B.Tech CSE Student',
  'Full Stack Developer',
  'App Developer',
  'Tech Innovator',
  'Future Software Engineer',
  'UI/UX Enthusiast'
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeText() {
  if (!typedEl) return;
  const current = texts[textIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 300;
  }
  setTimeout(typeText, speed);
}
typeText();

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  revealObserver.observe(el);
});

// ---- Animated Counters ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-grid').forEach(el => counterObserver.observe(el));

// ---- Skill Bars ----
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid, .skill-category').forEach(el => skillObserver.observe(el));

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(fi => {
      fi.classList.remove('open');
      fi.querySelector('.faq-answer').classList.remove('open');
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  });
});

// ---- Project Filters ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = show ? '1' : '0.3';
      card.style.transform = show ? '' : 'scale(0.95)';
      card.style.pointerEvents = show ? 'auto' : 'none';
    });
  });
});

// ---- Active nav link by page ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active-page');
  }
});

// ---- Form submit ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formWrap = contactForm.parentElement;
    const successDiv = document.querySelector('.form-success');
    contactForm.style.display = 'none';
    if (successDiv) successDiv.style.display = 'block';
  });
}

// ---- Newsletter form ----
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input) {
      input.value = '';
      input.placeholder = '✓ Subscribed successfully!';
    }
  });
}

// ---- Staggered reveal for grids ----
document.querySelectorAll('.why-grid .why-card, .projects-grid .project-card, .certs-grid .cert-card, .blog-grid .blog-card, .achievements-grid .achievement-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 80) + 'ms';
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
