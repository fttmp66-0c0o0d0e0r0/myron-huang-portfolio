// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Filter Experience Cards
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.experience-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button styling for baby blue theme
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-sky-500', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-sky-500', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Poster Lightbox Modal Handler
  const modal = document.getElementById('poster-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.poster-lightbox-trigger');

  if (modal && modalImg && modalClose) {
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const src = trig.getAttribute('data-img');
        const title = trig.getAttribute('data-title') || '金門五日遊海報';
        modalImg.src = src;
        if (modalTitle) modalTitle.innerText = title;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modalImg.src = '';
      document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});
