import '../css/main.css';
import { initHeader } from './components/header.js';
import { initGallery } from './components/gallery.js';
import { initForm } from './components/form.js';
import { initProject } from './components/project.js';

// Immediate initialization for UI layout
initHeader();

// Defer non-critical logic to let the browser paint the LCP first
window.addEventListener('load', () => {
  // Use requestIdleCallback for even smoother background init if supported
  const deferInit = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  deferInit(() => {
    initGallery();
    initForm();
    initProject();
  });
});
