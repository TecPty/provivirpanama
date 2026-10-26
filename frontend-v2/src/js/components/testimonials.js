// Video testimonial: shows a lightweight thumbnail and only loads the
// YouTube player when the visitor clicks play (keeps the page fast).
export function initTestimonials() {
  const video = document.getElementById('testimonialVideo');
  if (!video) return;

  video.addEventListener('click', (e) => {
    if (video.classList.contains('is-playing')) return;
    e.preventDefault();

    const id = video.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = 'Testimonio Provivir Panamá';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    video.querySelectorAll('.testimonial-video__shade, .testimonial-video__play, .testimonial-video__caption')
      .forEach((el) => el.remove());
    video.appendChild(iframe);
    video.classList.add('is-playing');
    video.removeAttribute('href');
    video.removeAttribute('aria-label');
  });
}
