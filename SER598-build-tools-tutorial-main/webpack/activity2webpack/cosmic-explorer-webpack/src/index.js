import '../styles/main.css';
import '../styles/gallery.css';
import { initGallery } from './gallery';
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initGallery === 'function') {
      initGallery();
    }
  });
  