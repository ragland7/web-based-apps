
const factsByObject = {
    earth: [
      'Earth’s magnetic field protects us from solar radiation.',
      'Earth is the only known planet with life as we know it.',
      'About 70% of Earth’s surface is covered by oceans.'
    ],
    mars: [
      'Mars has the largest volcano in the solar system: Olympus Mons.',
      'Mars experiences planet-wide dust storms that can last for months.',
      'Mars’s atmosphere is mostly carbon dioxide.'
    ],
    jupiter: [
      'Jupiter’s Great Red Spot is a storm that has raged for centuries.',
      'Jupiter has over 75 moons, including the volcanic Io and icy Europa.',
      'Jupiter is more than twice as massive as all other planets combined.'
    ],
    sirius: [
      'Sirius is often called the “Dog Star” because it’s part of the Canis Major constellation.',
      'Sirius is twice as massive as the Sun.',
      'At 8.6 light years away, Sirius is among the closest stars visible to the naked eye.'
    ],
    betelgeuse: [
      'Betelgeuse is a red supergiant star nearing its end of life.',
      'If placed at the center of our solar system, Betelgeuse would extend past Jupiter’s orbit.',
      'Betelgeuse will eventually explode as a supernova, briefly outshining entire galaxies.'
    ],
    andromeda: [
      'The Andromeda Galaxy contains about one trillion stars.',
      'Andromeda is on a collision course with the Milky Way, set to merge in about 4 billion years.',
      'Andromeda is the nearest major galaxy to our Milky Way.'
    ],
    milkyway: [
      'The Milky Way contains between 100 and 400 billion stars.',
      'Our solar system is located in one of the spiral arms of the Milky Way.',
      'The center of the Milky Way has a supermassive black hole called Sagittarius A*.'
    ]
  };
  

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  export function showFact() {
    const slug = getQueryParam('obj');
    const facts = factsByObject[slug];
    
    let container = document.getElementById('facts-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'facts-container';
      document.body.appendChild(container);
    } else {
      
      container.innerHTML = '';
    }
  
    if (facts && facts.length > 0) {
     
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      const p = document.createElement('p');
      p.textContent = randomFact;
      container.appendChild(p);
    } else {
    
      const p = document.createElement('p');
      p.textContent = 'No specific facts available for this object.';
      container.appendChild(p);
    }
  }
  
  showFact();
  