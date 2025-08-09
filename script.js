// Theme toggle (persist with localStorage)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.body;

function applyTheme(theme) {
  if (theme === 'dark') {
    root.classList.add('dark');
    themeIcon.className = 'fas fa-sun';
  } else {
    root.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
  }
}
const saved = localStorage.getItem('site-theme') || 'light';
applyTheme(saved);

themeToggle.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
  applyTheme(isDark ? 'dark' : 'light');
});

// Simple reveal-on-scroll using IntersectionObserver
const animated = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
animated.forEach(el => io.observe(el));

// Contact form: open user's mail client with prefilled content (mailto fallback)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const resetBtn = document.getElementById('resetBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    formStatus.textContent = 'Preparing message...';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Please fill all fields.';
      return;
    }

    const mailto = `mailto:<YOUR_EMAIL>?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    // open default mail client
    window.location.href = mailto;
    formStatus.textContent = 'Opened your email client. If it did not open, please check your mail app.';
  });

  resetBtn.addEventListener('click', () => {
    contactForm.reset();
    formStatus.textContent = '';
  });
}

// Download resume as PDF using html2pdf
const downloadBtn = document.getElementById('downloadPdfBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const element = document.getElementById('page');
    const opt = {
      margin: 0.3,
      filename: 'Jahid_Hussain_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    element.classList.add('printing');
    html2pdf().set(opt).from(element).save().then(()=> element.classList.remove('printing'))
      .catch(err => { element.classList.remove('printing'); alert('PDF generation failed. Use browser Print -> Save as PDF.'); console.error(err); });
  });
}

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
