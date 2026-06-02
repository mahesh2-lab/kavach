// Scroll reveal
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // Stagger reveal children
  document.querySelectorAll('.services-grid, .products-grid, .team-grid').forEach(grid => {
    grid.querySelectorAll('.reveal, .reveal-zoom').forEach((el, i) => {
      el.style.transitionDelay = (i * 100) + 'ms';
    });
  });

  // Form submit
  function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    if (!fname || !email || !service) {
      alert('Please fill in your name, email, and service required.');
      return;
    }
    document.getElementById('formSuccess').style.display = 'block';
    document.querySelector('.form-submit').textContent = 'Submitted ✓';
    document.querySelector('.form-submit').style.background = '#166534';
    document.querySelector('.form-submit').disabled = true;
  }

  // Active nav highlight based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const linkPath = a.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      a.style.color = 'var(--red)';
      a.style.fontWeight = '700';
    }
  });

  // Nav background on scroll
  const navEl = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    navEl.style.background = window.scrollY > 40 ? 'rgba(255,255,255,0.99)' : 'rgba(255,255,255,0.97)';
    navEl.style.boxShadow = window.scrollY > 40 ? '0 2px 10px rgba(0,0,0,0.05)' : 'none';
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }