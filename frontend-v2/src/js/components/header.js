export function initHeader() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  // Scroll shadow with Throttle
  let lastScrollY = 0;
  let ticking = false;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeader();

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Dropdown touch support — hover-only doesn't work on touch devices
  document.querySelectorAll('.header__nav-item').forEach(item => {
    const link = item.querySelector(':scope > a');
    const dropdown = item.querySelector('.header__dropdown');
    if (!link || !dropdown) return;

    link.addEventListener('click', (e) => {
      const isTouchOrKeyboard = !window.matchMedia('(hover: hover)').matches;
      if (isTouchOrKeyboard && window.innerWidth > 1024) {
        e.preventDefault();
        const isOpen = item.classList.toggle('is-dropdown-open');
        dropdown.style.opacity = isOpen ? '1' : '0';
        dropdown.style.visibility = isOpen ? 'visible' : 'hidden';
        dropdown.style.transform = isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__nav-item')) {
      document.querySelectorAll('.header__nav-item.is-dropdown-open').forEach(item => {
        item.classList.remove('is-dropdown-open');
        const dropdown = item.querySelector('.header__dropdown');
        if (dropdown) {
          dropdown.style.opacity = '';
          dropdown.style.visibility = '';
          dropdown.style.transform = '';
        }
      });
    }
  });

  // Active nav link on scroll (Only if sections exist)
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  }
}
