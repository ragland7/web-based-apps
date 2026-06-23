function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  

  const cosmicData = {
    earth: { 
      name: 'Earth', 
      img: 'images/earth.jpg', 
      desc: 'A vibrant world full of diverse life forms, vast oceans, and changing climates. Earth is the only known planet to host life in the universe, balancing atmosphere, water, and warmth from the Sun.'
    },
    mars: { 
      name: 'Mars', 
      img: 'images/mars.jpg', 
      desc: 'A cold desert world, known as the Red Planet. Mars once had flowing water, and scientists are searching for evidence of past microbial life. It’s a prime candidate for future human exploration.'
    },
    jupiter: { 
      name: 'Jupiter', 
      img: 'images/jupiter.jpg', 
      desc: 'The largest planet in our solar system, Jupiter is a gas giant with a swirling atmosphere and the iconic Great Red Spot—a centuries-old storm. Its many moons make it a mini solar system of its own.'
    },
    sirius: {
      name: 'Sirius', 
      img: 'images/sirius.jpg', 
      desc: 'A brilliant white star, Sirius is twice as massive as our Sun. At a mere 8.6 light years away, it’s a close neighbor in cosmic terms, illuminating Earth’s night sky with its dazzling brightness.'
    },
    betelgeuse: {
      name: 'Betelgeuse', 
      img: 'images/betelgeuse.jpg', 
      desc: 'A red supergiant star found in the constellation Orion. Betelgeuse is massive and old, expected to explode as a supernova in the distant future, briefly outshining entire galaxies when it does.'
    },
    andromeda: {
      name: 'Andromeda', 
      img: 'images/andromeda.jpg', 
      desc: 'Our nearest major galactic neighbor, Andromeda is a majestic spiral galaxy containing roughly a trillion stars. In about 4 billion years, it’s predicted to merge with the Milky Way, forming a new galaxy.'
    },
    milkyway: {
      name: 'Milky Way', 
      img: 'images/milkyway.jpg', 
      desc: 'The galaxy we call home. The Milky Way is a barred spiral galaxy with hundreds of billions of stars, including our Sun. Its central bulge and sweeping arms give us a breathtaking view of our cosmic address.'
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const slug = getQueryParam('obj');
    const data = cosmicData[slug];
    if (data) {
      document.getElementById('object-name').textContent = data.name;
      document.getElementById('object-image').src = data.img;
      document.getElementById('object-desc').textContent = data.desc;
    }
  
    document.getElementById('loadFactsBtn').addEventListener('click', () => {
      const script = document.createElement('script');
      script.src = 'facts.js';
      document.body.appendChild(script);
    });
  });
  