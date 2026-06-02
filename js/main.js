const initializeReveals = () => {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  
  reveals.forEach((el) => observer.observe(el));

  document.querySelectorAll('.services-grid, .products-grid, .team-grid').forEach((grid) => {
    grid.querySelectorAll('.reveal, .reveal-zoom').forEach((el, index) => {
      el.style.transitionDelay = `${index * 100}ms`;
    });
  });
};

const submitForm = () => {
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.querySelector('.form-submit');
  
  const fname = document.getElementById('fname')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const service = document.getElementById('service')?.value;
  
  if (!fname || !email || !service) {
    alert('Please fill in your name, email, and service required.');
    return;
  }
  
  if (formSuccess && submitBtn) {
    formSuccess.style.display = 'block';
    submitBtn.textContent = 'Submitted ✓';
    submitBtn.style.background = '#166534';
    submitBtn.disabled = true;
  }
};

const initializeNavigation = () => {
  const navEl = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navEl) {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 40;
      navEl.style.background = isScrolled ? 'rgba(255,255,255,0.99)' : 'rgba(255,255,255,0.97)';
      navEl.style.boxShadow = isScrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none';
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeReveals();
  initializeNavigation();
});