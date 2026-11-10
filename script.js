// script.js - Portfolio Interaction, Navigation Focus & Trilingual Switcher (EN / 繁中 / 简中)

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
        b.classList.remove('active');
      });
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const categories = category.split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
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

  // 3. Image Lightbox Modal Handler (Posters & Research Scans)
  const modal = document.getElementById('poster-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.poster-lightbox-trigger');

  if (modal && modalImg && modalClose) {
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const src = trig.getAttribute('data-img');
        const title = trig.getAttribute('data-title') || 'Image Preview';
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
      aboutSection.classList.add('ring-4', 'ring-[#708090]', 'ring-offset-4', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        aboutSection.classList.remove('ring-4', 'ring-[#708090]', 'ring-offset-4');
      }, 1600);
      history.pushState(null, '', '#about');
    });
  }

  // 5. Smooth scroll & Focus on Experience Timeline
  const navExpBtn = document.getElementById('nav-experience-btn');
  const expSection = document.getElementById('experience');
  if (navExpBtn && expSection) {
    navExpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      expSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Focus outline on entire container
      expSection.classList.add('ring-4', 'ring-[#162840]', 'ring-offset-6', 'rounded-3xl', 'transition-all', 'duration-500');
      
      const expTitle = expSection.querySelector('h2');
      if (expTitle) {
        expTitle.classList.add('text-[#162840]', 'scale-[1.02]', 'transition-all', 'duration-300');
        setTimeout(() => {
          expTitle.classList.remove('text-[#162840]', 'scale-[1.02]');
        }, 1800);
      }

      setTimeout(() => {
        expSection.classList.remove('ring-4', 'ring-[#162840]', 'ring-offset-6');
      }, 1800);
      history.pushState(null, '', '#experience');
    });
  }

  // 6. Smooth scroll on Research
  const navResearchBtn = document.getElementById('nav-research-btn');
  const researchSection = document.getElementById('research-spotlight') || document.getElementById('research');
  if (navResearchBtn && researchSection) {
    navResearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      researchSection.classList.add('ring-4', 'ring-[#708090]', 'ring-offset-4', 'rounded-3xl', 'transition-all', 'duration-500');
      setTimeout(() => {
        researchSection.classList.remove('ring-4', 'ring-[#708090]', 'ring-offset-4');
      }, 1600);
      history.pushState(null, '', '#research-spotlight');
    });
  }

  // 7. Trilingual Dictionary (EN / zh-TW / zh-CN)
  const i18nDictionary = {
    'en': {
      'lang-btn-text': '繁體中文',
      'nav-about': 'About',
      'nav-experience': 'Experience',
      'nav-research': 'Research',
      'kinmen-recruit-btn': 'Kinmen Bowknot Cycling Challenge: Challengers Wanted NEW →',
      
      // What's New in AI
      'ai-badge': 'Daily AI Pulse',
      'ai-sync': '08:00 TST Sync',
      'ai-title': "What's New in AI",
      'ai-sub': 'Global Daily AI Headlines & Breakthroughs',
      'ai-desc': 'Daily 8:00 AM TST automated curation of AI breakthroughs, security defenses, frontier developments & Silicon Valley insider gossip.',
      'ai-top-badge': 'Daily Featured Breakthrough',
      'ai-item1-tag': 'Multimodal AI & Robotics',
      'ai-item1-title': 'Next-Gen Multimodal Foundation Models Accelerate Real-Time Surgical AI & Precision Clinical Robotics',
      'ai-item1-desc': 'Global medical multimodal foundation models combine real-time computer vision and robotic systems for millisecond anatomical segmentation and margin prediction in clinical surgery navigation.',
      'ai-read-btn': 'Read Article',
      'ai-highlights-title': 'Global AI Highlights',
      'ai-item2-tag': 'AI Security',
      'ai-item2-title': 'Anthropic & MIT Unveil Next-Gen LLM Jailbreak Defense Framework to Prevent Prompt Injections',
      'ai-item3-tag': 'AI Architecture · MoE',
      'ai-item3-title': 'DeepSeek & Open Community Release Next-Gen MoE Reasoning Models Nearing Top Proprietary Frontiers',
      'ai-item4-tag': 'Silicon Valley Gossip',
      'ai-item4-title': "【SV Insider】Ilya's SSI Valuation Surpasses Multi-Billions; Musk's xAI Battles OpenAI for Top AI Talent",
      'ai-item5-tag': 'Clinical Standards',
      'ai-item5-title': 'FDA Updates Adaptive AI/ML SaMD Guidance, Strengthening Clinical Explainability & Real-Time Monitoring',
      
      // About Me & Certifications
      'about-title': 'About Me',
      'about-name-label': 'Name:',
      'about-program-label': 'Program:',
      'about-student-label': 'Student ID:',
      'cert-tag': 'Official Certifications',
      'cert-title': 'Verified Technical Certifications',
      
      // Experience Timeline & Filters
      'exp-title': 'Experience Timeline',
      'filter-all': 'All Roles',
      'filter-software': 'Clinical Software',
      'filter-business': 'Commercial Sales',
      'filter-hardware': 'Drivers & Validation',
      'filter-instructor': 'AI Instructor',
      'filter-ai': 'AI / Research',
      
      // Research Spotlight Section
      'research-spotlight-tag': 'Spotlight Medical AI Research',
      'research-spotlight-title': 'Clinical Computer Vision & Surgical Intelligence',
      'research-spotlight-desc': 'Key translational research projects conducted at Chang Gung University Brain Ma Lab, bridging advanced 3D deep learning and real-time intraoperative surgical assistance.',
      'res1-badge': '3D CT Lymph Node Detection',
      'res1-title': 'Abdominal CT Lymph Node Automated Detection System',
      'res1-sub': '3D nnDetection Deep Learning on Volumetric Abdominal Scans',
      'res1-p1': '<strong>High-Precision Localization:</strong> Implemented 3D deep learning detection on volumetric CT scans (e.g. <code>ABD_LYMPH_026 | z=13</code>), achieving tight ground-truth reference vs predicted bounding box alignment.',
      'res1-p2': '<strong>Oncological Confidence:</strong> Reached high prediction confidence (score = 0.98, IoU = 0.79), distinguishing subtle lymph nodes from adjacent vessels to assist metastatic staging.',
      'res2-badge': 'Intraoperative Surgical AI',
      'res2-title': 'Real-Time Vessel Prediction in Laparoscopic Colorectal Resection',
      'res2-sub': 'Minimally Invasive Computer Vision & Educational Cartoon Guidance',
      'res2-p1': '<strong>Real-Time Video Segmentation:</strong> Deployed deep learning segmentation on endoscopic video streams to track critical mesenteric vascular branches during laparoscopic resection.',
      'res2-p2': '<strong>Intraoperative Safety & Anatomy Teaching:</strong> Created interactive cartoon anatomy navigation ("Teach me?") to prevent accidental vessel laceration and improve surgical clarity.',
      
      // Instructor Experience Card (English Priority)
      'inst-tag': 'Medical AI Lecturer & Mentor',
      'inst-period': '2026 – Present',
      'inst-org': 'KMU & Hungkuang University',
      'inst-role': 'AI Healthcare Instructor & Project Mentor · Taichung & Kaohsiung',
      'inst-p1': '<strong>KMU Smart Healthcare Summer Camp:</strong> Guided undergraduate/graduate students and elderly care professionals across 7-day intensive camps to develop innovative elderly AI smart living prototypes and conceptual AI video demonstrations. Mentored two cohorts that achieved 2nd Place and the Best Presentation Award.',
      'inst-p2': '<strong>Hungkuang University Nursing Department:</strong> Introduced foundational medical AI imaging principles, instructing students through hands-on practice to identify real-world recognition errors and artifacts to watch out for, and exploring innovative AI image recognition in daily healthcare.',
      
      // Contact
      'contact-title': "Let's Connect & Discuss New Possibilities",

      // Kinmen Tour Page 2 Keys
      'km-back-portfolio': '← Back to Portfolio',
      'km-page-badge': 'Page 2 · Kinmen Cycling Adventure',
      'km-recruit-tag': '🔥 CHALLENGERS WANTED · Kinmen Bowknot Cycling Challenge',
      'km-hero-title': 'Kinmen 5D4N Bowknot Cycling Challenge',
      'km-hero-desc': 'Ride 120km across Greater and Lesser Kinmen drawing a massive GPS Bowknot. Experience historic battlefields, Minnan heritage, ocean bridges, and authentic walk-in B&Bs!',
      'km-bonus-badge': 'Completion Cash Bonus',
      'km-bonus-amount': 'NT$ 5,000 Bonus Reward',
      'km-bonus-terms': 'Complete all 4 checklist mission criteria below with GPS tracks & photo verification to claim the extra reward!',
      'km-check-missions': 'View Missions & Rules',
      'km-stat-route': 'Total Route',
      'km-stat-route-sub': 'Dual Figure-8 Loops',
      'km-stat-days': 'Duration',
      'km-stat-days-sub': 'Greater & Lesser Kinmen',
      'km-stat-cost': 'Estimated Budget',
      'km-stat-cost-sub': 'All Flights & Lodging',
      'km-stat-bonus': 'Challenge Bonus',
      'km-stat-bonus-sub': 'Checklist Reward',
      'km-posters-title': 'Official Challenge Posters',
      'km-posters-sub': 'High-resolution visual itinerary, GPS art layout, and all-inclusive budget breakdown',
      'km-poster1-tag': 'Route & GPS Art Poster',
      'km-poster2-tag': 'Budget Breakdown Poster',
      'km-zoom': 'Click to Zoom',
      'km-view-full': 'View Full Poster',
      'km-poster1-caption': 'Centered on Qionglin village to cycle a giant figure-eight bowknot across Kinmen.',
      'km-poster2-caption': 'Flights, 4 nights lodging, local meals, bike rentals, and emergency reserve fund.',
      'km-missions-header': '4 Core Missions & NT$5,000 Bonus Claim Rules',
      'km-missions-desc': 'Participants who complete the 5-day bike journey, fulfill all 4 checklist mission requirements with GPS recording and landmark checkpoint photos, will receive an additional NT$5,000 completion cash reward!',
      'km-m1-title': 'Mission 1: Cross Kinmen Bridge (金門大橋跨海騎行)',
      'km-m1-desc': '5.4km ocean bridge crossing from Greater Kinmen to Lieyu (Lesser Kinmen). Photo required at bridge entry & exit.',
      'km-m2-title': 'Mission 2: 120km Bowknot Art (120km 蝴蝶結 GPS 軌跡)',
      'km-m2-desc': 'Complete dual loops centered at Qionglin. Record complete GPS track on Strava/Garmin without vehicular shortcuts.',
      'km-m3-title': 'Mission 3: Wind Lion God Hunt (風獅爺打卡尋訪)',
      'km-m3-desc': 'Spot and photograph at least 8 distinctive guardian Wind Lion God statues across Jinhu, Jinsha, and Jinning townships.',
      'km-m4-title': 'Mission 4: Mt. Taiwu Summit (登頂太武山毋忘在莒)',
      'km-m4-desc': 'Hike/bike to Kinmen\'s highest peak (253m) and photograph the iconic "Wu Wang Zai Ju" rock inscription with panoramic view.',
      'km-claim-title': '📋 Bonus Claim & Verification:',
      'km-claim-step1': '1. Export your 120km GPX/FIT track file showing continuous timestamps across all 5 days.',
      'km-claim-step2': '2. Upload photo proofs for all 4 missions to the portfolio contact channel (fttmp66@gmail.com).',
      'km-claim-step3': '3. Once verified by Myron, the NT$5,000 cash reward will be wired directly or presented in person.',
      'km-itinerary-header': '5-Day Route Itinerary',
      'km-itinerary-sub': 'Recommended day-by-day distances, attractions, and local culinary stops',
      'km-d1-title': 'D1 · SW Coast & Houpu (15km)',
      'km-d1-detail': 'Arrive at KNH airport, pick up rental bike, ride to Deyue Tower, Zhaishan Tunnel, and Houpu old streets for Cantonese congee.',
      'km-d2-title': 'D2 · Lieyu / Lesser Kinmen (40km)',
      'km-d2-detail': "Ride across 5.4km Kinmen Bridge, circle Lieyu coastal loop, visit Cat's Eye Stone, Shatou defense trenches, and eat taro shaved ice.",
      'km-d3-title': 'D3 · NW Coast & Guningtou (30km)',
      'km-d3-detail': 'Explore Guningtou Battle Museum, bullet-riddled Beishan Old Mansion, Cihu sunset estuary, and taste authentic oyster noodles.',
      'km-d4-title': 'D4 · Mt. Taiwu & NE Coast (25km)',
      'km-d4-detail': 'Ascend Mt. Taiwu summit, witness Shishan Artillery howitzer drill, visit Shanhou Folk Culture Village, and eat Mashan meat buns.',
      'km-d5-title': 'D5 · Jinhu & Flight Home (10km)',
      'km-d5-detail': 'Complete the bowknot center at Qionglin Tunnel, take pictures at Taihu 3D crosswalk, return bikes, and take afternoon flight home.'
    },

    'zh-TW': {
      'lang-btn-text': '简体中文',
      'nav-about': '關於我',
      'nav-experience': '經歷歷程',
      'nav-research': '學術研究',
      'kinmen-recruit-btn': '金門單車蝴蝶之旅挑戰者招募中 NEW →',
      
      // What's New in AI
      'ai-badge': '每日 AI 脈動',
      'ai-sync': '每日 08:00 TST 更新',
      'ai-title': "What's New in AI",
      'ai-sub': '全球每日 AI 科技頭條與前沿快訊',
      'ai-desc': '每日上午 8:00 自動精選全球 AI 前沿技術突破、AI 資安對抗防禦、領域最新動態與產業名人八卦內幕。',
      'ai-top-badge': '每日精選突破',
      'ai-item1-tag': '多模態 AI 與手術機器人',
      'ai-item1-title': '次世代醫學多模態基礎模型加速即時手術 AI 與精準臨床機器人系統',
      'ai-item1-desc': '全球最新醫學多模態基礎模型結合即時電腦視覺與手術機器人系統，達成毫秒級解剖結構分割與邊界預測，為次世代智慧臨床手術導航帶來重大技術飛躍。',
      'ai-read-btn': '閱讀全文',
      'ai-highlights-title': '全球 AI 焦點時報',
      'ai-item2-tag': 'AI 資安 · Security',
      'ai-item2-title': 'Anthropic 與 MIT 揭露次世代 LLM 越獄防禦架構，防範惡意提示注入與隱私外洩風險',
      'ai-item3-tag': 'AI 架構 · MoE',
      'ai-item3-title': 'DeepSeek 與開源社群釋出新一代開源 MoE 推理模型，數學推理與代碼生成逼近頂級閉源',
      'ai-item4-tag': '矽谷八卦 · Gossip',
      'ai-item4-title': '【矽谷名人八卦】Ilya 創辦 SSI 估值飆破數十億美元；馬斯克 xAI 槓上 OpenAI 掀頂尖科學家挖角大戰',
      'ai-item5-tag': '醫療規範 · Standards',
      'ai-item5-title': 'FDA 更新自適應 AI/ML 醫療設備監管指南，強化臨床演算法可解釋性與即時安全監控',
      
      // About Me & Certifications
      'about-title': '關於我 (About Me)',
      'about-name-label': '姓名：',
      'about-program-label': '就讀學程：',
      'about-student-label': '碩士學號：',
      'cert-tag': '官方技術認證',
      'cert-title': '已驗證之專業技術證照',
      
      // Experience Timeline & Filters
      'exp-title': '個人經歷時間軸 (Experience Timeline)',
      'filter-all': '全部職歷',
      'filter-software': '臨床醫療軟體',
      'filter-business': '商務銷售管理',
      'filter-hardware': '驅動與系統驗證',
      'filter-instructor': '醫療 AI 講師與導師',
      'filter-ai': 'AI 與學術研究',
      
      // Research Spotlight Section
      'research-spotlight-tag': '重點醫療 AI 前沿研究',
      'research-spotlight-title': '臨床電腦視覺與手術智慧系統',
      'research-spotlight-desc': '於長庚大學 Brain Ma Lab 開展之核心醫療 AI 專案，結合 3D 深度學習影像偵測與術中即時影像輔助。',
      'res1-badge': '3D 腹部 CT 淋巴結偵測',
      'res1-title': '腹部 CT 淋巴結智慧偵測系統',
      'res1-sub': '基於 3D nnDetection 深度學習之腹部電腦斷層容積分析',
      'res1-p1': '<strong>高精準度病灶定位：</strong>在腹部 CT 斷層（如 <code>ABD_LYMPH_026 | z=13</code>）成功實現 3D 物件偵測，精準比對 Ground Truth 標註基準框與模型預測邊界框。',
      'res1-p2': '<strong>腫瘤臨床輔助分期：</strong>在微小且周遭血管干擾嚴重的淋巴結上達到高置信度（score = 0.98，IoU = 0.79），有效輔助臨床轉移性淋巴病變篩檢。',
      'res2-badge': '術中即時手術導航 AI',
      'res2-title': '腹腔鏡直腸結腸切除術之即時血管預測系統',
      'res2-sub': '微創內視鏡即時影像辨識與教學卡通可視化輔助',
      'res2-p1': '<strong>手術影像即時分割：</strong>將深度學習即時推理整合於微創腹腔鏡影像流，在煙霧與手術反光干擾下精準追蹤腸系膜下動靜脈及分支出血高危區。',
      'res2-p2': '<strong>術中防誤傷解剖導航：</strong>結合生動之解剖引導卡通角色（"Teach me?"），清楚指引手術夾與血管相對位置，避免誤傷大血管，提升微創手術安全。',
      
      // Instructor Experience Card
      'inst-tag': '醫療 AI 講師與導師',
      'inst-period': '2026 – 迄今',
      'inst-org': '高雄醫學大學 & 弘光科技大學護理系',
      'inst-role': '智慧醫療講師與專案輔導導師 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 高齡智慧醫療夏令營：</strong>指導大學生、碩士生與高齡照護業界人士在七天營隊中製作高齡 AI 智慧生活創新主題原型（Prototype）與 AI 影片展示構想，帶領兩梯次組別分別榮獲第二名與最佳簡報獎。',
      'inst-p2': '<strong>弘光科技大學護理系：</strong>介紹 AI 影像基礎概念，指導學生透過實際操作深入了解 AI 影像辨識需要注意的各類誤差與限制，並學習將 AI 影像辨識應用於日常健康照護中創新。',
      
      // Contact
      'contact-title': '與我聯繫 · 探索未來合作契機',

      // Kinmen Tour Page 2 Keys
      'km-back-portfolio': '← 返回個人主頁',
      'km-page-badge': '第 2 頁 · 金門單車壯遊特企',
      'km-recruit-tag': '🔥 挑戰者熱烈招募中 · 金門單車蝴蝶之旅',
      'km-hero-title': '金門五天四夜單車蝴蝶之旅挑戰',
      'km-hero-desc': '騎行 120km 貫穿大金門與烈嶼小金門，繪製巨大的 GPS 蝴蝶結軌跡！體驗戰地風光、閩南聚落古厝、跨海大橋與背包客自由行民宿。',
      'km-bonus-badge': '挑戰完賽專屬加碼',
      'km-bonus-amount': '加碼現金獎金 NT$ 5,000',
      'km-bonus-terms': '完成傳單下方 4 大挑戰任務 Checkbox Lists 並附上 GPS 軌跡與照片認證，即可獲得額外加碼獎金！',
      'km-check-missions': '查看任務與領取規則',
      'km-stat-route': '總騎行里程',
      'km-stat-route-sub': '雙環蝴蝶結軌跡',
      'km-stat-days': '壯遊天數',
      'km-stat-days-sub': '大小金門雙島環遊',
      'km-stat-cost': '預估總花費',
      'km-stat-cost-sub': '含機票、住宿與餐飲',
      'km-stat-bonus': '挑戰加碼獎金',
      'km-stat-bonus-sub': '完成清單立領',
      'km-posters-title': '挑戰特企官方宣傳海報',
      'km-posters-sub': '高清行程時程、GPS 軌跡藝術規劃與全包式預算費用明細',
      'km-poster1-tag': '行程路線與 GPS 藝術海報',
      'km-poster2-tag': '五天四夜費用估算表海報',
      'km-zoom': '點擊放大',
      'km-view-full': '查看高清大圖',
      'km-poster1-caption': '以瓊林聚落為核心樞紐，騎乘出 120km 雙環蝴蝶結軌跡。',
      'km-poster2-caption': '含往返機票、4晚住宿、道地美食三餐、裝備與緊急應急金。',
      'km-missions-header': '四大核心任務清單與 NT$5,000 獎金領取辦法',
      'km-missions-desc': '挑戰者於五天旅程中達成傳單上的四大核心任務 Checkbox Lists，並上傳完整 GPS 軌跡檔與打卡佐證照片，即可額外領取挑戰獎金新台幣 5,000 元整！',
      'km-m1-title': '任務一：金門大橋跨海騎行',
      'km-m1-desc': '騎行 5.4km 跨海大橋由大金門前往烈嶼（小金門），需於橋頭標誌拍照打卡。',
      'km-m2-title': '任務二：120km 蝴蝶結 GPS 軌跡',
      'km-m2-desc': '以瓊林為中心完成東西雙環閉合軌跡，使用 Strava/Garmin 記錄全程，無機動載具代步。',
      'km-m3-title': '任務三：風獅爺打卡尋訪',
      'km-m3-desc': '尋訪並拍攝至少 8 尊分布於金湖、金沙與金寧聚落的代表性守護風獅爺。',
      'km-m4-title': '任務四：登頂太武山毋忘在莒',
      'km-m4-desc': '登上海拔 253m 之金門最高峰，與指標性「毋忘在莒」勒石合影並俯瞰全島景觀。',
      'km-claim-title': '📋 獎金審核與領取流程：',
      'km-claim-step1': '1. 匯出涵蓋 5 天完整時間戳記的 120km GPX 或 FIT 運動軌跡檔。',
      'km-claim-step2': '2. 將 4 大任務的照片佐證發送至個人主頁信箱（fttmp66@gmail.com）。',
      'km-claim-step3': '3. 經 Myron 審核無誤後，獎金新台幣 5,000 元將以匯款或現場親授方式頒發！',
      'km-itinerary-header': '五天精華時程',
      'km-itinerary-sub': '每日推薦騎乘距離、景點與道地美食巡禮',
      'km-d1-title': 'D1 · 西南海岸與後浦老街 (15km)',
      'km-d1-detail': '抵達金門尚義機場，取車後前往得月樓、翟山坑道、建功嶼夕陽與後浦老街永春廣東粥。',
      'km-d2-title': 'D2 · 烈嶼小金門跨海長征 (40km)',
      'km-d2-detail': '騎上 5.4km 金門大橋跨海抵達烈嶼，環騎車轍道、貓公石海岸、沙溪堡與黃厝芋頭冰。',
      'km-d3-title': 'D3 · 西北戰地與古寧頭 (30km)',
      'km-d3-detail': '探訪古寧頭戰史館、彈痕累累的北山古洋樓、慈湖落日夕陽與品嚐道地金門石蚵麵線。',
      'km-d4-title': 'D4 · 太武山與東北聚落 (25km)',
      'km-d4-detail': '徒步登頂太武山、參訪獅山砲陣地榴彈砲操演、漫步山后民俗文化村與品嚐高粱牛肉麵。',
      'km-d5-title': 'D5 · 瓊林樞紐與滿載賦歸 (10km)',
      'km-d5-detail': '閉合金門蝴蝶結中心點於瓊林戰鬥村，打卡太湖 3D 斑馬線，歸還單車後搭機返程。'
    },

    'zh-CN': {
      'lang-btn-text': 'English',
      'nav-about': '关于我',
      'nav-experience': '经历历程',
      'nav-research': '学术研究',
      'kinmen-recruit-btn': '金门单车蝴蝶之旅挑战者招募中 NEW →',
      
      // What's New in AI
      'ai-badge': '每日 AI 脉动',
      'ai-sync': '每日 08:00 TST 更新',
      'ai-title': "What's New in AI",
      'ai-sub': '全球每日 AI 科技头条与前沿快讯',
      'ai-desc': '每日上午 8:00 自动精选全球 AI 前沿技术突破、AI 网络安全防御、领域最新动态与产业名人八卦内幕。',
      'ai-top-badge': '每日精选突破',
      'ai-item1-tag': '多模态 AI 与手术机器人',
      'ai-item1-title': '次世代医学多模态基础模型加速实时手术 AI 与精准临床机器人系统',
      'ai-item1-desc': '全球最新医学多模态基础模型结合实时计算机视觉与手术机器人系统，达成毫秒级解剖结构分割与边界预测，为次世代智能临床手术导航带来重大技术飞跃。',
      'ai-read-btn': '阅读全文',
      'ai-highlights-title': '全球 AI 焦点时报',
      'ai-item2-tag': 'AI 安全 · Security',
      'ai-item2-title': 'Anthropic 与 MIT 揭露次世代 LLM 越狱防御架构，防范恶意提示注入与隐私外泄风险',
      'ai-item3-tag': 'AI 架构 · MoE',
      'ai-item3-title': 'DeepSeek 与开源社区释出新一代开源 MoE 推理模型，数学推理与代码生成逼近顶级闭源',
      'ai-item4-tag': '硅谷八卦 · Gossip',
      'ai-item4-title': '【硅谷名人八卦】Ilya 创办 SSI 估值飙破数十亿美元；马斯克 xAI 杠上 OpenAI 掀顶尖科学家挖角大战',
      'ai-item5-tag': '医疗规范 · Standards',
      'ai-item5-title': 'FDA 更新自适应 AI/ML 医疗设备监管指南，强化临床算法可解释性与实时安全监控',
      
      // About Me & Certifications
      'about-title': '关于我 (About Me)',
      'about-name-label': '姓名：',
      'about-program-label': '就读学程：',
      'about-student-label': '硕士学号：',
      'cert-tag': '官方技术认证',
      'cert-title': '已验证之专业技术资质',
      
      // Experience Timeline & Filters
      'exp-title': '个人经历时间轴 (Experience Timeline)',
      'filter-all': '全部职历',
      'filter-software': '临床医疗软件',
      'filter-business': '商务销售管理',
      'filter-hardware': '驱动与系统验证',
      'filter-instructor': '医疗 AI 讲师与导师',
      'filter-ai': 'AI 与学术研究',
      
      // Research Spotlight Section
      'research-spotlight-tag': '重点医疗 AI 前沿研究',
      'research-spotlight-title': '临床计算机视觉与手术智能系统',
      'research-spotlight-desc': '于长庚大学 Brain Ma Lab 开展之核心医疗 AI 项目，结合 3D 深度学习影像检测与术中实时影像辅助。',
      'res1-badge': '3D 腹部 CT 淋巴结检测',
      'res1-title': '腹部 CT 淋巴结智能检测系统',
      'res1-sub': '基于 3D nnDetection 深度学习之腹部计算机断层容积分析',
      'res1-p1': '<strong>高精确度病灶定位：</strong>在腹部 CT 断层（如 <code>ABD_LYMPH_026 | z=13</code>）成功实现 3D 目标检测，精准比对 Ground Truth 标注基准框与模型预测边界框。',
      'res1-p2': '<strong>肿瘤临床辅助分期：</strong>在微小且周围血管干扰严重的淋巴结上达到高置信度（score = 0.98，IoU = 0.79），有效辅助临床转移性淋巴病变筛查。',
      'res2-badge': '术中实时手术导航 AI',
      'res2-title': '腹腔镜直肠结肠切除术之实时血管预测系统',
      'res2-sub': '微创内窥镜实时图像识别与教学卡通可视化辅助',
      'res2-p1': '<strong>手术影像实时分割：</strong>将深度学习实时推理整合于微创腹腔镜视频流，在烟雾与手术反光干扰下精准追踪肠系膜下动静脉及分支出血高危区。',
      'res2-p2': '<strong>术中防误伤解剖导航：</strong>结合生动之解剖引导卡通角色（"Teach me?"），清楚指引手术夹与血管相对位置，避免误伤大血管，提升微创手术安全。',
      
      // Instructor Experience Card
      'inst-tag': '医疗 AI 讲师与导师',
      'inst-period': '2026 – 至今',
      'inst-org': '高雄医学大学 & 弘光科技大学护理系',
      'inst-role': '智慧医疗讲师与项目辅导导师 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 高龄智慧医疗夏令营：</strong>指导大学生、硕士生与高龄照护业界人士在七天营队中制作高龄 AI 智慧生活创新主题原型（Prototype）与 AI 视频展示构想，带领两梯次组别分别荣获第二名与最佳简报奖。',
      'inst-p2': '<strong>弘光科技大学护理系：</strong>介绍 AI 图像基础概念，指导学生通过实际操作深入了解 AI 图像识别需要注意的各类误差与限制，并学习将 AI 图像识别应用于日常健康照护中创新。',
      
      // Contact
      'contact-title': '与我联系 · 探索未来合作契机',

      // Kinmen Tour Page 2 Keys
      'km-back-portfolio': '← 返回个人主页',
      'km-page-badge': '第 2 页 · 金门单车壮游特企',
      'km-recruit-tag': '🔥 挑战者热烈招募中 · 金门单车蝴蝶之旅',
      'km-hero-title': '金门五天四夜单车蝴蝶之旅挑战',
      'km-hero-desc': '骑行 120km 贯穿大金门与烈屿小金门，绘制巨大的 GPS 蝴蝶结轨迹！体验战地风光、闽南聚落古厝、跨海大桥与背包客自由行民宿。',
      'km-bonus-badge': '挑战完赛专属加码',
      'km-bonus-amount': '加码现金奖金 NT$ 5,000',
      'km-bonus-terms': '完成传单下方 4 大挑战任务 Checkbox Lists 并附上 GPS 轨迹与照片认证，即可获得额外加码奖金！',
      'km-check-missions': '查看任务与领取规则',
      'km-stat-route': '总骑行里程',
      'km-stat-route-sub': '双环蝴蝶结轨迹',
      'km-stat-days': '壮游天数',
      'km-stat-days-sub': '大小金门双岛环游',
      'km-stat-cost': '预估总花费',
      'km-stat-cost-sub': '含机票、住宿与餐饮',
      'km-stat-bonus': '挑战加码奖金',
      'km-stat-bonus-sub': '完成清单立领',
      'km-posters-title': '挑战特企官方宣传海报',
      'km-posters-sub': '高清行程时程、GPS 轨迹艺术规划与全包式预算费用明细',
      'km-poster1-tag': '行程路线与 GPS 艺术海报',
      'km-poster2-tag': '五天四夜费用估算表海报',
      'km-zoom': '点击放大',
      'km-view-full': '查看高清大图',
      'km-poster1-caption': '以琼林聚落为核心枢纽，骑行出 120km 双环蝴蝶结轨迹。',
      'km-poster2-caption': '含往返机票、4晚住宿、地道美食三餐、装备与紧急应急金。',
      'km-missions-header': '四大核心任务清单与 NT$5,000 奖金领取办法',
      'km-missions-desc': '挑战者于五天旅程中达成传单上的四大核心任务 Checkbox Lists，并上传完整 GPS 轨迹档与打卡佐证照片，即可额外领取挑战奖金新台币 5,000 元整！',
      'km-m1-title': '任务一：金门大桥跨海骑行',
      'km-m1-desc': '骑行 5.4km 跨海大桥由大金门前往烈屿（小金门），需于桥头标志拍照打卡。',
      'km-m2-title': '任务二：120km 蝴蝶结 GPS 轨迹',
      'km-m2-desc': '以琼林为中心完成东西双环闭合轨迹，使用 Strava/Garmin 记录全程，无机动载具代步。',
      'km-m3-title': '任务三：风狮爷打卡寻访',
      'km-m3-desc': '寻访并拍摄至少 8 尊分布于金湖、金沙与金宁聚落的代表性守护风狮爷。',
      'km-m4-title': '任务四：登顶太武山毋忘在莒',
      'km-m4-desc': '登上海拔 253m 之金门最高峰，与指标性“毋忘在莒”勒石合影并俯瞰全岛景观。',
      'km-claim-title': '📋 奖金审核与领取流程：',
      'km-claim-step1': '1. 导出涵盖 5 天完整时间戳记的 120km GPX 或 FIT 运动轨迹档。',
      'km-claim-step2': '2. 将 4 大任务的照片佐证发送至个人主页邮箱（fttmp66@gmail.com）。',
      'km-claim-step3': '3. 经 Myron 审核无误后，奖金新台币 5,000 元将以汇款或现场亲授方式颁发！',
      'km-itinerary-header': '五天精华时程',
      'km-itinerary-sub': '每日推荐骑乘距离、景点与地道美食巡礼',
      'km-d1-title': 'D1 · 西南海岸与后浦老街 (15km)',
      'km-d1-detail': '抵达金门尚义机场，取车后前往得月楼、翟山坑道、建功屿夕阳与后浦老街永春广东粥。',
      'km-d2-title': 'D2 · 烈屿小金门跨海长征 (40km)',
      'km-d2-detail': '骑上 5.4km 金门大桥跨海抵达烈屿，环骑车辙道、猫公石海岸、沙溪堡与黄厝芋头冰。',
      'km-d3-title': 'D3 · 西北战地与古宁头 (30km)',
      'km-d3-detail': '探访古宁头战史馆、弹痕累累的北山古洋楼、慈湖落日夕阳与品尝地道金门石蚵面线。',
      'km-d4-title': 'D4 · 太武山与东北聚落 (25km)',
      'km-d4-detail': '徒步登顶太武山、参访狮山炮阵地榴弹炮操演、漫步山后民俗文化村与品尝高粱牛肉面。',
      'km-d5-title': 'D5 · 琼林枢纽与满载赋归 (10km)',
      'km-d5-detail': '闭合金门蝴蝶结中心点于琼林战斗村，打卡太湖 3D 斑马线，归还单车后搭机返程。'
    }
  };

  // Trilingual Cycle Sequence: en -> zh-TW -> zh-CN -> en
  const langOrder = ['en', 'zh-TW', 'zh-CN'];
  let currentLang = localStorage.getItem('myron_portfolio_lang_v4') || 'en';

  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('myron_portfolio_lang_v4', lang);
    const dict = i18nDictionary[lang] || i18nDictionary['en'];

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update toggle button text to show the next available language to toggle into
    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      if (lang === 'en') {
        langBtnText.innerText = '繁體中文';
      } else if (lang === 'zh-TW') {
        langBtnText.innerText = '简体中文';
      } else {
        langBtnText.innerText = 'English';
      }
    }

    // Refresh icons inside dynamically updated text if any
    initIcons();
  };

  // Bind Language Toggle Button
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextIndex = (langOrder.indexOf(currentLang) + 1) % langOrder.length;
      applyLanguage(langOrder[nextIndex]);
    });
  }

  // Initial language application
  applyLanguage(currentLang);
});
