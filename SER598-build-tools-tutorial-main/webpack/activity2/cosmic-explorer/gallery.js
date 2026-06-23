const cosmicObjects = [
    { type: 'planet', name: 'Earth', img: 'images/earth.jpg', desc: 'The blue planet, teeming with life.', slug: 'earth' },
    { type: 'planet', name: 'Mars', img: 'images/mars.jpg', desc: 'The red planet, with hints of past water.', slug: 'mars' },
    { type: 'planet', name: 'Jupiter', img: 'images/jupiter.jpg', desc: 'A gas giant with a famous Great Red Spot.', slug: 'jupiter' },
    { type: 'star', name: 'Sirius', img: 'images/sirius.jpg', desc: 'The brightest star in Earth’s night sky.', slug: 'sirius' },
    { type: 'star', name: 'Betelgeuse', img: 'images/betelgeuse.jpg', desc: 'A red supergiant star nearing the end of its life.', slug: 'betelgeuse' },
    { type: 'galaxy', name: 'Andromeda', img: 'images/andromeda.jpg', desc: 'A spiral galaxy on a collision course with the Milky Way.', slug: 'andromeda' },
    { type: 'galaxy', name: 'Milky Way', img: 'images/milkyway.jpg', desc: 'Our home galaxy, containing billions of stars.', slug: 'milkyway' },
  ];
  
  function initGallery() {
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
  