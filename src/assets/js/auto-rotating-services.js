const serviceData = [
  {
    icon: 'bi bi-shield-check',
    title: 'Anti-Corrosive Coatings',
    desc: 'Protects metal surfaces against rust and harsh environmental conditions.',
    link: '/anti-corrosive-coatings/',
  },
  {
    icon: 'bi bi-building',
    title: 'Industrial Flooring',
    desc: 'Durable flooring designed for heavy-duty industrial environments.',
    link: '/industrial-flooring/',
  },
  {
    icon: 'bi bi-droplet-half',
    title: 'Hygienic Food Grade Coating',
    desc: 'Safe, seamless coatings for clean and sterile food processing areas.',
    link: '/hygienic-food-grade-coating/',
  },
  {
    icon: 'bi bi-fire',
    title: 'Heat Resistant Coating',
    desc: 'Provides superior resistance to extreme heat and thermal exposure.',
    link: '/heat-resistant-coating/',
  },
  {
    icon: 'bi bi-bricks',
    title: 'Blasting',
    desc: 'Surface preparation service ensuring maximum coating adhesion.',
    link: '/blasting/',
  },
  {
    icon: 'bi bi-lightning-charge',
    title: 'Aluminum Spray Application',
    desc: 'High-performance metallic coatings for superior corrosion protection.',
    link: '/aluminum-spray-application/',
  },
  {
    icon: 'bi bi-grid-3x3-gap',
    title: 'Tile Grouting',
    desc: 'Durable and clean finish for tiled surfaces with protective seal.',
    link: '/tile-grouting/',
  },
  {
    icon: 'bi bi-droplet',
    title: 'Bituminous Coating',
    desc: 'Flexible, waterproof coatings for pipelines and tanks.',
    link: '/bituminous-coating/',
  },
  {
    icon: 'bi bi-flower2',
    title: 'Fertilizer Plants Coating',
    desc: 'Specialized coatings to resist chemical corrosion and abrasion.',
    link: '/fertilizer-plants-coating/',
  },
  {
    icon: 'bi bi-water',
    title: 'Rust Sealer Coatings',
    desc: 'Stops rust progression and provides a protective top layer.',
    link: '/rust-sealer-coatings/',
  },
];

const cards = document.querySelectorAll('.service-card');
let dataIndex = 0;
let cardIndex = 0;

function fadeUpdate(card, data) {
  const icon = card.querySelector('.icon i');
  const title = card.querySelector('h3');
  const desc = card.querySelector('p');
  const link = card.querySelector('a');

  // fade out
  card.style.pointerEvents = 'none';
  icon.style.opacity = title.style.opacity = desc.style.opacity = '0';

  setTimeout(() => {
    icon.className = data.icon;
    title.textContent = data.title;
    desc.textContent = data.desc;
    link.href = data.link;

    // fade in
    icon.style.opacity = title.style.opacity = desc.style.opacity = '1';
    card.style.pointerEvents = '';
  }, 800);
}

function updateNextCard() {
  const card = cards[cardIndex];
  const data = serviceData[dataIndex];
  fadeUpdate(card, data);

  cardIndex = (cardIndex + 1) % cards.length;
  dataIndex = (dataIndex + 1) % serviceData.length;
}

document.addEventListener('DOMContentLoaded', () => {
  cards.forEach((card, i) => {
    const data = serviceData[i % serviceData.length];
    card.querySelector('.icon i').className = data.icon;
    card.querySelector('h3').textContent = data.title;
    card.querySelector('p').textContent = data.desc;
    card.querySelector('a').href = data.link;
  });

  setInterval(updateNextCard, 2400); // smooth rotation
});
