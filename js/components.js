class KavachHeader extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';
    this.innerHTML = `
      <nav>
        <a href="${base}index.html" class="nav-logo">
          <img src="${base}assets/images/logo.svg" alt="Kavach Fire Safety" style="height: 48px; width: auto;" />
          <div class="nav-logo-text">
            <span>Kavach</span>
            <span>Fire Safety Industrial</span>
          </div>
        </a>
        <ul class="nav-links">
          <li><a href="${base}index.html">Home</a></li>
          <li><a href="${base}pages/about.html">About Us</a></li>
          <li><a href="${base}pages/services.html">Services</a></li>
          <li><a href="${base}pages/projects.html">Projects</a></li>
          <li><a href="${base}blogs/index.html">Blog</a></li>
          <li><a href="${base}pages/contact.html">Contact Us</a></li>
          <li><a href="${base}pages/request-inspection.html" class="nav-cta">Get a Quote</a></li>
        </ul>
        <button class="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    `;

    const currentUrl = (window.location.href.split(/[#?]/)[0].endsWith('/')) 
      ? window.location.href.split(/[#?]/)[0] + 'index.html' 
      : window.location.href.split(/[#?]/)[0];
    
    this.querySelectorAll('.nav-links a').forEach((link) => {
      const linkHref = link.href.split(/[#?]/)[0];
      if (linkHref === currentUrl) link.classList.add('active');
    });
  }
}

class KavachFooter extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || './';
    this.innerHTML = `
      <footer>
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${base}index.html" class="nav-logo" style="text-decoration:none; color:var(--navy); display:inline-flex; align-items:center; gap:12px;">
              <img src="${base}assets/images/logo.svg" alt="Kavach Fire Safety" style="height: 48px; width: auto;" />
              <div class="nav-logo-text">
                <span>Kavach</span>
                <span>Fire Safety Industrial</span>
              </div>
            </a>
            <p>Pune's trusted partner for industrial fire protection, safety compliance, and life safety systems. Certified engineers. Proven systems. Guaranteed compliance.</p>
          </div>
          <div class="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="${base}pages/fire-alarm-systems.html">Fire Detection & Alarms</a></li>
              <li><a href="${base}pages/fire-sprinkler-systems.html">Sprinkler Systems</a></li>
              <li><a href="${base}pages/fire-extinguisher-services.html">Gas Suppression</a></li>
              <li><a href="${base}pages/fire-safety-audit.html">Fire Safety Audits</a></li>
              <li><a href="${base}pages/amc-services.html">AMC Contracts</a></li>
              <li><a href="${base}pages/fire-noc-assistance.html">Fire NOC Support</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="${base}pages/about.html">About Kavach</a></li>
              <li><a href="${base}pages/about.html#story">Our Story</a></li>
              <li><a href="${base}pages/projects.html">Projects</a></li>
              <li><a href="${base}blogs/index.html">Blog</a></li>
              <li><a href="${base}pages/contact.html">Contact Us</a></li>
              <li><a href="${base}pages/careers.html">Careers</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Certifications</h5>
            <div class="footer-cert">
              <div class="cert-badge">ISO 9001:2015 Certified</div>
              <div class="cert-badge">NBC 2016 Compliant</div>
              <div class="cert-badge">NFPA Member Organisation</div>
              <div class="cert-badge">Maharashtra Fire Dept. Approved</div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 Kavach Fire Safety Industrial Services, Pune. All rights reserved.</p>
          <p>Built with <span>♥</span> for industrial safety</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('kavach-header', KavachHeader);
customElements.define('kavach-footer', KavachFooter);
