// Navbar toggle
const navToggleBtn = document.getElementById('nav-toggle');
const container = document.querySelector('.container');
if (navToggleBtn && container) {
  navToggleBtn.addEventListener('click', () => {
    const isOpen = container.classList.toggle('nav-open');
    navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// FAQ click toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.faq-item .dropdown');
  toggles.forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-expanded', 'false');

    const toggleHandler = () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    btn.addEventListener('click', toggleHandler);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleHandler();
      }
    });
  });
});

// Logo carousel: wrap direct images into a scrolling track and duplicate sequence
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.company-logos');
  carousels.forEach(container => {
    // skip if already initialized
    if (container.querySelector('.company-logos-track')) return;

    const imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length === 0) return;

    const track = document.createElement('div');
    track.className = 'company-logos-track';

    // Move original images into the track
    imgs.forEach(img => track.appendChild(img));

    // Append the track into the container
    container.appendChild(track);

    // Duplicate the sequence once for a seamless loop
    imgs.forEach(img => {
      const clone = img.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Adjust animation duration proportionally so scroll speed feels consistent
    const updateDuration = () => {
      // width of one sequence (half of total after duplication)
      const seqWidth = track.scrollWidth / 2 || 1;
      const visible = container.clientWidth || seqWidth;
      const baseDuration = 20; // seconds for default sequence
      const duration = Math.max(8, (seqWidth / visible) * baseDuration);
      track.style.animationDuration = duration + 's';
    };

    updateDuration();
    window.addEventListener('resize', updateDuration);
  });
});

// Scroll fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  // Create intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and major content elements
  document.querySelectorAll('section, .card, .member, .feature-text, .feature-image').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
  });
});
