const categoryChips = document.querySelectorAll('.category-chip');
const productCards = document.querySelectorAll('.product-card');
const productGrid = document.getElementById('productGrid');
const skeletonGrid = document.getElementById('skeletonGrid');

setTimeout(() => {
  if (skeletonGrid) {
    skeletonGrid.style.display = 'none';
  }
  if (productGrid) {
    productGrid.classList.add('ready');
  }
}, 650);

categoryChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;

    categoryChips.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

    chip.classList.add('active');
    chip.setAttribute('aria-selected', 'true');

    productCards.forEach((card) => {
      const category = card.dataset.category;
      card.style.display = filter === 'all' || category === filter ? '' : 'none';
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.product-card, .review-card, .cta-card, .about-box, .trust-row').forEach((el) => {
  revealObserver.observe(el);
});
