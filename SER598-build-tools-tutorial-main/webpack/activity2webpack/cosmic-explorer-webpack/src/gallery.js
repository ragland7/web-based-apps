import earth from '../images/earth.jpg';
import mars from '../images/mars.jpg';
import jupiter from '../images/jupiter.jpg';
import sirius from '../images/sirius.jpg';
import betelgeuse from '../images/betelgeuse.jpg';
import andromeda from '../images/andromeda.jpg';
import milkyway from '../images/milkyway.jpg';

const cosmicObjects = [
    { type: 'planet', name: 'Earth', img: earth, desc: 'The blue planet, teeming with life.', slug: 'earth' },
    { type: 'planet', name: 'Mars', img: mars, desc: 'The red planet, with hints of past water.', slug: 'mars' },
    { type: 'planet', name: 'Jupiter', img: jupiter, desc: 'A gas giant with a famous Great Red Spot.', slug: 'jupiter' },
    { type: 'star', name: 'Sirius', img: sirius, desc: 'The brightest star in Earth’s night sky.', slug: 'sirius' },
    { type: 'star', name: 'Betelgeuse', img: betelgeuse, desc: 'A red supergiant star nearing the end of its life.', slug: 'betelgeuse' },
    { type: 'galaxy', name: 'Andromeda', img: andromeda, desc: 'A spiral galaxy on a collision course with the Milky Way.', slug: 'andromeda' },
    { type: 'galaxy', name: 'Milky Way', img: milkyway, desc: 'Our home galaxy, containing billions of stars.', slug: 'milkyway' },
  ];
  
  export function initGallery() {
    const galleryDiv = document.getElementById('gallery');
    galleryDiv.innerHTML = '';
    
    cosmicObjects.forEach(obj => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'gallery-item';
      itemDiv.innerHTML = `
        <img src="${obj.img}" alt="${obj.name}">
        <h2>${obj.name}</h2>
        <p>${obj.desc}</p>
        <a href="planet.html?obj=${obj.slug}">View Details</a>
      `;
      galleryDiv.appendChild(itemDiv);
    });
  }
  