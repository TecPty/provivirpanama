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
