/**
 * MarineAI Smart Maintenance Package — Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollSpy();
  initPhoneApp();
  initChecklist();
  initForms();
  initHealthScoreAnimation();
});

/* ---- Main Navigation ---- */
function initNavigation() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
      : 'none';
  });
}

/* ---- Scroll Spy for Active Nav Link ---- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---- Mobile App Screen Switcher ---- */
function initPhoneApp() {
  const navButtons = document.querySelectorAll('.phone-nav-btn');
  const screens = document.querySelectorAll('.phone-screen-content');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      screens.forEach(screen => {
        screen.classList.toggle('active', screen.dataset.screen === target);
      });
    });
  });
}

/* ---- Maintenance Checklist Progress ---- */
function initChecklist() {
  const checklist = document.getElementById('checklist');
  if (!checklist) return;

  const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
  const progressText = document.getElementById('checklistProgress');
  const progressBar = document.getElementById('checklistBar');
  const total = checkboxes.length;

  function updateProgress() {
    const checked = checklist.querySelectorAll('input[type="checkbox"]:checked').length;
    const percent = Math.round((checked / total) * 100);

    progressText.textContent = `${checked} of ${total} completed`;
    progressBar.style.width = `${percent}%`;

    if (percent === 100) {
      progressBar.style.background = 'var(--color-success)';
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
}

/* ---- Form Handlers (Demo & Feedback) ---- */
function initForms() {
  const demoForm = document.getElementById('demoForm');
  const formSuccess = document.getElementById('formSuccess');

  if (demoForm) {
    demoForm.addEventListener('submit', e => {
      e.preventDefault();
      demoForm.querySelector('button[type="submit"]').disabled = true;
      formSuccess.hidden = false;
      demoForm.reset();

      setTimeout(() => {
        formSuccess.hidden = true;
        demoForm.querySelector('button[type="submit"]').disabled = false;
      }, 5000);
    });
  }

  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackSuccess = document.getElementById('feedbackSuccess');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();
      feedbackForm.hidden = true;
      feedbackSuccess.hidden = false;

      setTimeout(() => {
        feedbackForm.hidden = false;
        feedbackSuccess.hidden = true;
        feedbackForm.reset();
      }, 4000);
    });
  }
}

/* ---- Animate Health Score on Scroll ---- */
function initHealthScoreAnimation() {
  const healthNumber = document.getElementById('healthScore');
  if (!healthNumber) return;

  const target = 68;
  let animated = false;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateValue(healthNumber, 0, target, 1200);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(healthNumber.closest('.dashboard'));
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
