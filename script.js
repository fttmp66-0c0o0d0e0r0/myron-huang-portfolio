// script.js - Portfolio Interaction, Navigation Focus & Bilingual Switcher

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
  initIcons();

  // 2. Filter Experience Cards
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.experience-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
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

  // 3. Poster Lightbox Modal Handler
  const modal = document.getElementById('poster-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.poster-lightbox-trigger');

  if (modal && modalImg && modalClose) {
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const src = trig.getAttribute('data-img');
        const title = trig.getAttribute('data-title') || 'Poster View';
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

  // 4. Smooth scroll & Focus on About Me section
  const navAboutBtn = document.getElementById('nav-about-btn');
  const aboutSection = document.getElementById('about');
  if (navAboutBtn && aboutSection) {
    navAboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      aboutSection.classList.add('ring-4', 'ring-sky-400', 'ring-offset-4', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        aboutSection.classList.remove('ring-4', 'ring-sky-400', 'ring-offset-4');
      }, 1600);
      history.pushState(null, '', '#about');
    });
  }

  // 5. Smooth scroll & Focus on Experience Timeline (Yellow Box Requirement)
  const navExpBtn = document.getElementById('nav-experience-btn');
  const expSection = document.getElementById('experience');
  if (navExpBtn && expSection) {
    navExpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      expSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Focus outline on entire container
      expSection.classList.add('ring-4', 'ring-amber-400', 'ring-offset-6', 'rounded-3xl', 'transition-all', 'duration-500');
      
      // Specifically focus on the main title (Experience Timeline)
      const expTitle = expSection.querySelector('h2');
      if (expTitle) {
        expTitle.classList.add('text-amber-600', 'scale-[1.03]', 'transition-all', 'duration-300');
        setTimeout(() => {
          expTitle.classList.remove('text-amber-600', 'scale-[1.03]');
        }, 1800);
      }

      setTimeout(() => {
        expSection.classList.remove('ring-4', 'ring-amber-400', 'ring-offset-6');
      }, 1800);
      history.pushState(null, '', '#experience');
    });
  }

  // 6. Smooth scroll on Research
  const navResearchBtn = document.getElementById('nav-research-btn');
  const researchSection = document.getElementById('research');
  if (navResearchBtn && researchSection) {
    navResearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      researchSection.classList.add('ring-4', 'ring-purple-400', 'ring-offset-4', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        researchSection.classList.remove('ring-4', 'ring-purple-400', 'ring-offset-4');
      }, 1600);
      history.pushState(null, '', '#research');
    });
  }

  // 7. Full Traditional Chinese ⇄ Full English Language Switcher (全中文 / 全英文切換)
  const i18nDictionary = {
    zh: {
      'lang-btn-text': 'English',
      'nav-about': '關於我',
      'nav-experience': '經歷歷程',
      'nav-research': '學術研究',
      'about-title': '關於我 (About Me)',
      'cert-tag': '官方技術認證',
      'cert-title': '已驗證之專業技術證照',
      'exp-title': '個人經歷時間軸 (Experience Timeline)',
      'filter-all': '全部職歷',
      'filter-software': '臨床醫療軟體',
      'filter-business': '商務銷售管理',
      'filter-hardware': '驅動與系統驗證',
      'filter-ai': 'AI 與學術研究',
      'research-title': '學術研究與頂會論文 (Research & Publications)',
      'contact-title': '與我聯繫 · 探索未來合作契機',
      'km-badge': '單車壯遊特企',
      'km-title': '金門單車五日遊：蝴蝶結大挑戰',
      'km-desc': '120km 環島 GPS 軌跡藝術，隨興入住閩南古厝民宿。',
      'km-stat-route': '總騎行里程',
      'km-stat-cost': '全包式總花費',
      'km-poster1-tag': '行程路線與 GPS 藝術海報',
      'km-poster2-tag': '五天四夜費用估算表海報',
      'km-zoom': '點擊放大',
      'km-view-full': '查看高清大圖',
      'km-poster1-caption': '以瓊林聚落為核心樞紐，騎乘出 120km 雙環蝴蝶結軌跡。',
      'km-poster2-caption': '含往返機票、4晚住宿、道地美食三餐、裝備與緊急應急金。',
      'km-missions-title': '挑戰四大核心任務',
      'km-m1': '<strong>征服金門大橋：</strong>5.4km 跨海自行車道直奔烈嶼。',
      'km-m2': '<strong>120km 蝴蝶結路線：</strong>東西雙翼完成軌跡閉合。',
      'km-m3': '<strong>尋訪聚落風獅爺：</strong>集齊各鄉村特色避風守護神。',
      'km-m4': '<strong>登上金門之巔：</strong>太武山頂峰毋忘在莒俯瞰全島。',
      'km-itinerary-title': '五天精華時程',
      'km-d1-title': 'D1 · 西南海岸與後浦老街 (15km)',
      'km-d1-sub': '得月樓、翟山坑道、建功嶼夕陽、永春廣東粥',
      'km-d2-title': 'D2 · 烈嶼小金門跨海長征 (40km)',
      'km-d2-sub': '金門大橋、貓公石海岸、特產黃厝芋頭冰',
      'km-d3-title': 'D3 · 西北戰地與古寧頭 (30km)',
      'km-d3-sub': '北山古洋樓彈孔、慈湖夕陽、閩式燒餅',
      'km-d4-title': 'D4 · 太武山與東北聚落 (25km)',
      'km-d4-sub': '獅山砲陣地、山后民俗村、高粱牛肉麵',
      'km-d5-title': 'D5 · 瓊林樞紐與滿載賦歸 (10km)',
      'km-d5-sub': '瓊林戰鬥村、太湖水獺出沒地、搭機返程'
    },
    en: {
      'lang-btn-text': '繁體中文',
      'nav-about': 'About',
      'nav-experience': 'Experience',
      'nav-research': 'Research',
      'about-title': 'About Me',
      'cert-tag': 'Official Certifications',
      'cert-title': 'Verified Technical Certifications',
      'exp-title': 'Experience Timeline',
      'filter-all': 'All Roles',
      'filter-software': 'Clinical Software',
      'filter-business': 'Commercial Sales',
      'filter-hardware': 'Drivers & Validation',
      'filter-ai': 'AI / Research',
      'research-title': 'Research & Publications',
      'contact-title': "Let's Connect & Discuss New Possibilities",
      'km-badge': 'Adventure Feature',
      'km-title': 'Kinmen by Bike: Bowknot Challenge',
      'km-desc': '120km GPS art route across Greater & Lesser Kinmen. Solo budget travel with walk-in B&Bs.',
      'km-stat-route': 'Total Route',
      'km-stat-cost': 'All-Inclusive',
      'km-poster1-tag': 'Route & GPS Art Poster',
      'km-poster2-tag': 'Budget Breakdown Poster',
      'km-zoom': 'Click to Zoom',
      'km-view-full': 'View Full Poster',
      'km-poster1-caption': 'Centered on Qionglin village to cycle a giant figure-eight bowknot across Kinmen.',
      'km-poster2-caption': 'Flights, 4 nights lodging, local meals, bike rentals, and emergency reserve fund.',
      'km-missions-title': '4 Core Missions',
      'km-m1': '<strong>Cross Kinmen Bridge:</strong> 5.4km ride to Lieyu.',
      'km-m2': '<strong>120km Bowknot Art:</strong> Complete dual loops.',
      'km-m3': '<strong>Wind Lion God Hunt:</strong> Spot guardian statues.',
      'km-m4': '<strong>Mt. Taiwu Summit:</strong> Highest peak panoramic view.',
      'km-itinerary-title': '5-Day Highlights',
      'km-d1-title': 'D1 · SW Coast & Houpu (15km)',
      'km-d1-sub': 'Deyue Tower, Zhaishan Tunnel, Congee',
      'km-d2-title': 'D2 · Lieyu / Lesser Kinmen (40km)',
      'km-d2-sub': 'Kinmen Bridge, Cat\'s Eye Stone, Taro Ice',
      'km-d3-title': 'D3 · NW Coast & Guningtou (30km)',
      'km-d3-sub': 'Beishan Old Mansion, Cihu Sunset, Pastry',
      'km-d4-title': 'D4 · Mt. Taiwu & NE Coast (25km)',
      'km-d4-sub': 'Shishan Artillery, Shanhou Folk Village',
      'km-d5-title': 'D5 · Jinhu & Flight Home (10km)',
      'km-d5-sub': 'Qionglin Tunnel, Taihu Lake, Return Flight'
    }
  };

  // Default language is English ('en')
  let currentLang = localStorage.getItem('myron_portfolio_lang_v3') || 'en';

  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('myron_portfolio_lang_v3', lang);
    const dict = i18nDictionary[lang] || i18nDictionary.en;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update toggle button text
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.innerText = dict['lang-btn-text'];
    }

    initIcons();
  };

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'en' ? 'zh' : 'en';
      applyLanguage(nextLang);
    });
  }

  // Apply default English language initially
  applyLanguage(currentLang);
});
