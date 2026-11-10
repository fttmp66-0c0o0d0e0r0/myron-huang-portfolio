// script.js - Editorial Portfolio Interaction, Focus Without Clipping, GIF-like Kinmen Flash & Trilingual Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
  initIcons();

  // 2. GIF-like Flash Interval for Kinmen Recruitment Badge (Top Right)
  const kinmenNewPill = document.getElementById('kinmen-new-pill');
  if (kinmenNewPill) {
    setInterval(() => {
      kinmenNewPill.classList.toggle('flash-alt');
    }, 450);
  }

  // 3. Experience Timeline Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.experience-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
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
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Image Lightbox Modal Handler (Research & Posters)
  const modal = document.getElementById('poster-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.poster-lightbox-trigger');

  if (modal && modalImg && modalClose) {
    triggers.forEach(trig => {
      trig.addEventListener('click', () => {
        const src = trig.getAttribute('data-img');
        const title = trig.getAttribute('data-title') || 'Preview';
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

  // 5. Clean Smooth Scroll & Non-Clipping Focus Highlight Helper
  const bindSectionFocus = (btnId, sectionId) => {
    const btn = document.getElementById(btnId);
    const section = document.getElementById(sectionId);
    if (!btn || !section) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Compute offset scroll so sticky navbar (approx 72px) never covers section focus frame
      const yOffset = -84;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Apply spacious box-shadow focus class (.section-focus-active) so text is NEVER cut
      section.classList.add('section-focus-active');
      setTimeout(() => {
        section.classList.remove('section-focus-active');
      }, 1700);
      history.pushState(null, '', '#' + sectionId);
    });
  };

  bindSectionFocus('nav-about-btn', 'about');
  bindSectionFocus('nav-experience-btn', 'experience');
  bindSectionFocus('nav-research-btn', 'research-spotlight');

  // 6. Comprehensive Trilingual Dictionary (EN / zh-TW / zh-CN)
  const i18nDictionary = {
    'en': {
      'lang-btn-text': '繁體中文',
      'nav-about': 'About Myron TY Huang',
      'nav-experience': 'Experience Timeline',
      'nav-research': 'Research',
      'kinmen-recruit-btn': 'Kinmen Bowknot Cycling Challenge: Challengers Wanted →',

      // Left Sidebar: 5 Categorized AI Intelligence Pillars
      'ai-badge': 'AI BRIEFING',
      'ai-sync': '08:00 TST',
      'ai-title': 'Daily & Weekly AI News',
      'ai-desc': 'Daily AI tech & news curated alongside weekly global milestones, AI security, and insider rumors.',
      'ai-cat1-tag': 'Weekly AI Milestones',
      'ai-freq-weekly': 'Weekly · Global',
      'ai-cat1-title': 'Multimodal Surgical Foundation Models Set New Global Clinical Robotics Benchmark',
      'ai-cat2-tag': 'Weekly AI Security',
      'ai-freq-sec': 'Weekly · Defense',
      'ai-cat2-title': 'Anthropic & MIT Unveil Next-Gen LLM Jailbreak & Prompt Injection Defense Architecture',
      'ai-cat3-tag': 'Daily AI New Tech',
      'ai-freq-daily': 'Daily · Models',
      'ai-cat3-title': 'Open MoE Reasoning Algorithms Reach Frontier Math & Code Inference Parity',
      'ai-cat4-tag': 'Daily AI News',
      'ai-freq-news': 'Daily · Policy',
      'ai-cat4-title': 'FDA Updates Adaptive Clinical AI/ML Monitoring Guidance for Medical Imaging Systems',
      'ai-cat5-tag': 'Weekly AI Gossip',
      'ai-freq-gossip': 'Weekly · Insider',
      'ai-cat5-title': 'Silicon Valley Talent War Intensifies Across Frontier Labs Amid Multi-Billion Valuations',
      'ai-read-short': 'Read',

      // About Me & Certifications
      'about-title': 'About Me',
      'about-name-label': 'Name:',
      'about-program-label': 'Program:',
      'about-student-label': 'Student ID:',
      'cert-tag': 'Verified Credentials',
      'cert-title': 'Technical Certifications',

      // Experience Timeline & Filters (AI Research before AI Instructor)
      'exp-title': 'Experience Timeline',
      'filter-all': 'All Roles',
      'filter-software': 'Clinical Software',
      'filter-business': 'Commercial Sales',
      'filter-hardware': 'Drivers & Validation',
      'filter-ai': 'AI Research',
      'filter-instructor': 'AI Instructor',

      'exp1-cat': 'Clinical Software',
      'exp1-date': 'Dec 2013 – Jan 2016',
      'exp1-org': 'Clinico Hearing Aid Co., Ltd.',
      'exp1-role': 'Assistant Software Engineer · New Taipei City',
      'exp1-b1': 'Maintained ENT surgical software & clinical diagnostic applications.',
      'exp1-b2': 'Operated web server infrastructure and hospital network diagnostics.',

      'exp2-cat': 'Commercial Sales',
      'exp2-date': 'Jul 2016 – Aug 2017',
      'exp2-org': 'Yung-Ching Realty',
      'exp2-role': 'Manager of Sales · Taipei City',
      'exp2-b1': 'Achieved $415,666 USD debut property sellout within 5 hours.',
      'exp2-b2': 'Led high-net-worth client negotiations and contract legal compliance.',

      'exp3-cat': 'Drivers & Validation',
      'exp3-date': 'Dec 2019 – Feb 2023',
      'exp3-org': 'Quanta Computer Inc.',
      'exp3-role': 'Consumer Laptop Driver Engineer · Taoyuan',
      'exp3-b1': 'Managed official device driver releases across global laptop product lines.',
      'exp3-b2': 'Debugged hardware defects jointly with Intel, AMD, and NVIDIA teams.',

      'exp4-cat': 'Drivers & Validation',
      'exp4-date': '2023 – 2025',
      'exp4-org': 'HP / Intel Security Validation Laboratory',
      'exp4-role': 'Security Validation Engineer · Taipei',
      'exp4-b1': 'Conducted system-level security validation at the joint HP/Intel lab.',
      'exp4-b2': 'Verified Secure Boot, TPM encryption, and enterprise firmware integrity.',

      'exp5-cat': 'AI Research',
      'exp5-date': 'Feb 2026 – Present',
      'exp5-org': 'Chang Gung University · Brain Ma Lab',
      'exp5-role': 'M.S. Student in AI · Taoyuan',
      'exp5-b1': 'Researching 3D nnDetection for abdominal CT lymph node detection.',
      'exp5-b2': 'Developing real-time endoscopic surgical segmentation for colorectal surgery.',

      'inst-cat': 'AI Instructor',
      'inst-period': '2026 – Present',
      'inst-org': 'KMU & Hungkuang University',
      'inst-role': 'AI Healthcare Instructor & Mentor · Taichung & Kaohsiung',
      'inst-p1': '<strong>KMU 7-Day Camp:</strong> Mentored students & care pros on elderly AI prototypes; won 2nd Place & Best Presentation.',
      'inst-p2': '<strong>Hungkuang Nursing:</strong> Taught AI imaging fundamentals, practical recognition errors, and daily care innovation.',

      // Simplified Ongoing Research (2-column, Title First + Image Below)
      'research-spotlight-title': 'Ongoing Research',
      'res1-title': 'nnDetection for Automated CT Lymph Node Detection',
      'res2-title': 'Real-time endoscopic surgery of vessel prediction',
      'res-unpublished': 'Ongoing Research · Unpublished',
      'km-zoom': 'Zoom',

      // Contact & Kinmen Page 2
      'contact-tag': 'Zero Hallucinations · Real Code',
      'contact-title': 'Input: Your Idea &rarr; Output: Real AI',
      'contact-sub': "Follow my builds or ping my inbox — let's turn bold prompts into shipped systems.",
      'km-back-portfolio': 'Back to Portfolio',
      'km-page-badge': 'Page 2 · Kinmen Cycling Challenge',
      'km-recruit-tag': 'CHALLENGERS WANTED · 120km Bowknot Route',
      'km-hero-title': 'Kinmen 5D4N Bowknot Cycling Challenge',
      'km-hero-desc': 'Ride 120km across Greater & Lesser Kinmen drawing a massive GPS Bowknot, with historic battlefields, bridges & walk-in B&Bs.',
      'km-bonus-amount': 'NT$ 5,000 Completion Cash Bonus',
      'km-bonus-terms': 'Complete all 4 checklist missions below with GPS tracks & photos to claim the extra NT$5,000 reward!',
      'km-check-missions': 'View Missions',
      'km-stat-route': 'Total Route',
      'km-stat-days': 'Duration',
      'km-stat-cost': 'Est. Budget',
      'km-stat-bonus': 'Extra Bonus',
      'km-posters-title': 'Challenge Posters',
      'km-poster1-tag': 'Route & GPS Art Poster',
      'km-poster2-tag': 'Budget Breakdown Poster (NT$14,200)',
      'km-missions-header': '4 Core Missions & NT$5,000 Bonus Checklist',
      'km-missions-desc': 'Complete all 4 checklist missions with GPX track logs and landmark photos to claim the extra NT$5,000 reward!',
      'km-m1-title': 'Mission 1: Cross Kinmen Bridge (5.4km)',
      'km-m1-desc': 'Ride across Kinmen Bridge to Lieyu with entry/exit photos.',
      'km-m2-title': 'Mission 2: 120km Bowknot GPS Track',
      'km-m2-desc': 'Complete dual loops centered at Qionglin via Strava/Garmin.',
      'km-m3-title': 'Mission 3: Wind Lion God Hunt',
      'km-m3-desc': 'Photograph at least 8 village guardian Wind Lion God statues.',
      'km-m4-title': 'Mission 4: Mt. Taiwu Summit',
      'km-m4-desc': 'Reach 253m peak & photograph "Wu Wang Zai Ju" monument.',
      'km-claim-summary': 'Submit your continuous 5-day GPX file & 4 mission photos to <strong>fttmp66@gmail.com</strong> for NT$5,000 verification.',
      'km-itinerary-header': '5-Day Itinerary',
      'km-d1-title': 'SW Coast & Houpu',
      'km-d1-detail': 'Deyue Tower, Zhaishan Tunnel & Houpu congee.',
      'km-d2-title': 'Lesser Kinmen',
      'km-d2-detail': 'Kinmen Bridge, Lieyu coast & taro ice.',
      'km-d3-title': 'NW Coast & Guningtou',
      'km-d3-detail': 'Beishan Old Mansion & Cihu sunset.',
      'km-d4-title': 'Mt. Taiwu & NE Coast',
      'km-d4-detail': 'Summit climb, Shishan Artillery & Shanhou.',
      'km-d5-title': 'Jinhu & Return',
      'km-d5-detail': 'Qionglin Tunnel loop & flight home.'
    },

    'zh-TW': {
      'lang-btn-text': '简体中文',
      'nav-about': '關於 Myron TY Huang',
      'nav-experience': '經歷時間軸',
      'nav-research': '研究領域',
      'kinmen-recruit-btn': '金門單車蝴蝶之旅挑戰者招募中 →',

      // Left Sidebar: 5 Categorized AI Intelligence Pillars
      'ai-badge': 'AI 情報站',
      'ai-sync': '08:00 TST',
      'ai-title': '每日 / 每週 AI 新聞精選',
      'ai-desc': '涵蓋每週全球重大 AI 影響力事件、每週 AI 資安、每日 AI 新技術、每日 AI News 與每週八卦。',
      'ai-cat1-tag': '每週 AI 大事 · 全球影響',
      'ai-freq-weekly': '每週精選 · 全球',
      'ai-cat1-title': '次世代多模態基礎模型樹立全球臨床手術機器人新里程碑',
      'ai-cat2-tag': '每週 AI 資安 · 防禦應用',
      'ai-freq-sec': '每週追蹤 · 資安',
      'ai-cat2-title': 'Anthropic 與 MIT 發表新型 LLM 越獄與提示注入防禦技術架構',
      'ai-cat3-tag': '每日 AI 新技術 · 模型演算法',
      'ai-freq-daily': '每日更新 · 技術',
      'ai-cat3-title': '開源 MoE 推理演算法突破，數學與程式生成效能追平頂尖閉源模型',
      'ai-cat4-tag': '每日 AI News · 綜合要聞',
      'ai-freq-news': '每日追蹤 · 快訊',
      'ai-cat4-title': 'FDA 更新適應性醫療影像 AI/ML 即時安全監控與監管指南',
      'ai-cat5-tag': '每週 AI 八卦 · 產業內幕',
      'ai-freq-gossip': '每週熱議 · 八卦',
      'ai-cat5-title': '矽谷頂尖 AI 實驗室爆高薪挖角戰，新創估值飆破數十億美元',
      'ai-read-short': '閱讀',

      // About Me & Certifications
      'about-title': '關於我 (About Me)',
      'about-name-label': '姓名：',
      'about-program-label': '就讀學程：',
      'about-student-label': '碩士學號：',
      'cert-tag': '官方專業認證',
      'cert-title': '專業技術證照',

      // Experience Timeline & Filters
      'exp-title': '經歷時間軸 (Experience Timeline)',
      'filter-all': '全部經歷',
      'filter-software': '臨床醫療軟體',
      'filter-business': '商務銷售管理',
      'filter-hardware': '驅動與系統驗證',
      'filter-ai': 'AI Research',
      'filter-instructor': 'AI 醫療講師',

      'exp1-cat': '臨床醫療軟體',
      'exp1-date': 'Dec 2013 – Jan 2016',
      'exp1-org': '科林助聽器 (Clinico)',
      'exp1-role': '助理軟體工程師 · 新北市',
      'exp1-b1': '維護耳鼻喉科臨床診斷工具與手術相關醫療軟體系統。',
      'exp1-b2': '負責醫院端網頁伺服器運作維護與網路環境異常診斷。',

      'exp2-cat': '商務銷售管理',
      'exp2-date': 'Jul 2016 – Aug 2017',
      'exp2-org': '永慶房屋 (Yung-Ching Realty)',
      'exp2-role': '業務襄理 · 台北市',
      'exp2-b1': '創下首案接手後 5 小時內以 41.5 萬美元成交紀錄。',
      'exp2-b2': '主導高資產客戶談判、合約法規檢核與資產規劃管理。',

      'exp3-cat': '驅動與系統驗證',
      'exp3-date': 'Dec 2019 – Feb 2023',
      'exp3-org': '廣達電腦 (Quanta Computer)',
      'exp3-role': '消費型筆電驅動工程師 · 桃園',
      'exp3-b1': '統籌全球各系列消費性筆記型電腦之官方驅動程式發布流程。',
      'exp3-b2': '與 Intel、AMD、NVIDIA 技術團隊協作解決硬體與相容性異常。',

      'exp4-cat': '驅動與系統驗證',
      'exp4-date': '2023 – 2025',
      'exp4-org': 'HP / Intel 資安驗證實驗室',
      'exp4-role': '資安系統驗證工程師 · 台北',
      'exp4-b1': '於 HP 與 Intel 聯合實驗室執行商用筆電系統級資安驗證。',
      'exp4-b2': '負責 Secure Boot、TPM 加密機制與韌體完整性弱點檢測。',

      'exp5-cat': 'AI Research',
      'exp5-date': 'Feb 2026 – Present',
      'exp5-org': '長庚大學 · Brain Ma Lab',
      'exp5-role': '人工智慧碩士班研究生 · 桃園',
      'exp5-b1': '進行 3D nnDetection 應用於腹部 CT 淋巴結自動偵測研究。',
      'exp5-b2': '開發直腸外科微創腹腔鏡手術之即時內視鏡影像分割技術。',

      'inst-cat': 'AI 醫療講師',
      'inst-period': '2026 – Present',
      'inst-org': '高雄醫學大學 & 弘光科技大學護理系',
      'inst-role': '智慧醫療 AI 講師與輔導導師 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 七日夏令營：</strong>指導大學、碩士生與高齡照護業界人士開發 AI 原型與展示影片，帶領兩梯次分獲第二名與最佳簡報獎。',
      'inst-p2': '<strong>弘光科大護理系：</strong>教授 AI 影像基礎，引導學生透過實作辨別模型誤差與限制，將影像辨識創新應用於生活照護。',

      // Simplified Ongoing Research
      'research-spotlight-title': '目前進行中研究 (Ongoing Research)',
      'res1-title': 'nnDetection 應用於腹部 CT 淋巴結自動偵測',
      'res2-title': '即時內視鏡手術血管預測 (Real-time endoscopic surgery of vessel prediction)',
      'res-unpublished': '目前進行中研究 · 尚未發表',
      'km-zoom': '放大檢視',

      // Contact & Kinmen Page 2
      'contact-tag': '無幻覺 · 純粹實作落地',
      'contact-title': '輸入：你的點子 &rarr; 輸出：真實 AI',
      'contact-sub': '歡迎追蹤我的 GitHub 與 LinkedIn，或隨時來信把大膽構想寫成系統！',
      'km-back-portfolio': '返回個人主頁',
      'km-page-badge': '第 2 頁 · 金門單車蝴蝶之旅',
      'km-recruit-tag': '挑戰者招募中 · 120km 蝴蝶結路線',
      'km-hero-title': '金門五天四夜單車蝴蝶之旅挑戰',
      'km-hero-desc': '騎乘 120km 貫穿大小金門繪製 GPS 蝴蝶結，探索戰地古蹟、跨海大橋與背包客古厝民宿。',
      'km-bonus-amount': '完成任務加碼獎金新台幣 NT$5,000 元',
      'km-bonus-terms': '成功完成傳單上的所有 Checkbox Lists 挑戰任務並附上軌跡與照片認證，即可額外獲得獎金新台幣 5,000 元！',
      'km-check-missions': '查看挑戰清單',
      'km-stat-route': '總騎行里程',
      'km-stat-days': '天數規劃',
      'km-stat-cost': '預估總花費',
      'km-stat-bonus': '完成加碼獎金',
      'km-posters-title': '挑戰活動官方海報',
      'km-poster1-tag': '路線規劃與 GPS 藝術海報',
      'km-poster2-tag': '費用明細估算海報 (NT$14,200)',
      'km-missions-header': '四大核心任務與 NT$5,000 獎金檢查清單',
      'km-missions-desc': '完成下方所有任務並附上完整 GPX 軌跡與拍照佐證，即可領取新台幣 5,000 元挑戰獎金！',
      'km-m1-title': '任務一：騎行跨越金門大橋 (5.4km)',
      'km-m1-desc': '騎車跨越金門大橋往返烈嶼（小金門），需於橋頭拍照紀錄。',
      'km-m2-title': '任務二：120km 蝴蝶結 GPS 軌跡閉合',
      'km-m2-desc': '以瓊林為中心完成東西雙環騎行並使用 Strava/Garmin 記錄。',
      'km-m3-title': '任務三：聚落風獅爺打卡尋訪',
      'km-m3-desc': '於金門各聚落尋找並拍攝至少 8 尊守護風獅爺合照。',
      'km-m4-title': '任務四：登頂太武山毋忘在莒',
      'km-m4-desc': '登頂太武山 253m 制高點並與「毋忘在莒」勒石合影。',
      'km-claim-summary': '完賽後請將連續 5 日 GPX 軌跡與 4 項任務照片寄至 <strong>fttmp66@gmail.com</strong> 審核領獎！',
      'km-itinerary-header': '五日精選行程',
      'km-d1-title': '西南海岸與後浦老街',
      'km-d1-detail': '得月樓、翟山坑道、建功嶼夕陽與廣東粥。',
      'km-d2-title': '烈嶼小金門跨海長征',
      'km-d2-detail': '跨越金門大橋、貓公石海岸與芋頭冰。',
      'km-d3-title': '西北戰地與古寧頭',
      'km-d3-detail': '北山古洋樓彈孔、慈湖夕陽與石蚵麵線。',
      'km-d4-title': '太武山與東北聚落',
      'km-d4-detail': '登太武山、獅山砲陣地與山后民俗村。',
      'km-d5-title': '瓊林樞紐與搭機返程',
      'km-d5-detail': '瓊林戰鬥村閉合蝴蝶軌跡並搭機賦歸。'
    },

    'zh-CN': {
      'lang-btn-text': 'English',
      'nav-about': '关于 Myron TY Huang',
      'nav-experience': '经历时间轴',
      'nav-research': '研究领域',
      'kinmen-recruit-btn': '金门单车蝴蝶之旅挑战者招募中 →',

      // Left Sidebar: 5 Categorized AI Intelligence Pillars
      'ai-badge': 'AI 情报站',
      'ai-sync': '08:00 TST',
      'ai-title': '每日 / 每周 AI 新闻精选',
      'ai-desc': '涵盖每周全球重大 AI 影响力事件、每周 AI 安全、每日 AI 新技术、每日 AI News 与每周八卦。',
      'ai-cat1-tag': '每周 AI 大事 · 全球影响',
      'ai-freq-weekly': '每周精选 · 全球',
      'ai-cat1-title': '次世代多模态基础模型树立全球临床手术机器人新里程碑',
      'ai-cat2-tag': '每周 AI 安全 · 防御应用',
      'ai-freq-sec': '每周追踪 · 安全',
      'ai-cat2-title': 'Anthropic 与 MIT 发表新型 LLM 越狱与提示注入防御技术架构',
      'ai-cat3-tag': '每日 AI 新技术 · 模型算法',
      'ai-freq-daily': '每日更新 · 技术',
      'ai-cat3-title': '开源 MoE 推理算法突破，数学与代码生成效能追平顶尖闭源模型',
      'ai-cat4-tag': '每日 AI News · 综合要闻',
      'ai-freq-news': '每日追踪 · 快讯',
      'ai-cat4-title': 'FDA 更新自适应医疗影像 AI/ML 实时安全监控与监管指南',
      'ai-cat5-tag': '每周 AI 八卦 · 产业内幕',
      'ai-freq-gossip': '每周热议 · 八卦',
      'ai-cat5-title': '硅谷顶尖 AI 实验室爆高薪挖角战，新创估值飙破数十亿美元',
      'ai-read-short': '阅读',

      // About Me & Certifications
      'about-title': '关于我 (About Me)',
      'about-name-label': '姓名：',
      'about-program-label': '就读学程：',
      'about-student-label': '硕士学号：',
      'cert-tag': '官方专业认证',
      'cert-title': '专业技术资质',

      // Experience Timeline & Filters
      'exp-title': '经历时间轴 (Experience Timeline)',
      'filter-all': '全部经历',
      'filter-software': '临床医疗软件',
      'filter-business': '商务销售管理',
      'filter-hardware': '驱动与系统验证',
      'filter-ai': 'AI Research',
      'filter-instructor': 'AI 医疗讲师',

      'exp1-cat': '临床医疗软件',
      'exp1-date': 'Dec 2013 – Jan 2016',
      'exp1-org': '科林助听器 (Clinico)',
      'exp1-role': '助理软件工程师 · 新北市',
      'exp1-b1': '维护耳鼻喉科临床诊断工具与手术相关医疗软件系统。',
      'exp1-b2': '负责医院端网页服务器运作维护与网络环境异常诊断。',

      'exp2-cat': '商务销售管理',
      'exp2-date': 'Jul 2016 – Aug 2017',
      'exp2-org': '永庆房屋 (Yung-Ching Realty)',
      'exp2-role': '业务襄理 · 台北市',
      'exp2-b1': '创下首案接手后 5 小时内以 41.5 万美元成交纪录。',
      'exp2-b2': '主导高资产客户谈判、合约法规检核与资产规划管理。',

      'exp3-cat': '驱动与系统验证',
      'exp3-date': 'Dec 2019 – Feb 2023',
      'exp3-org': '广达电脑 (Quanta Computer)',
      'exp3-role': '消费型笔电驱动工程师 · 桃园',
      'exp3-b1': '统筹全球各系列消费性笔记本电脑之官方驱动程序发布流程。',
      'exp3-b2': '与 Intel、AMD、NVIDIA 技术团队协作解决硬件与兼容性异常。',

      'exp4-cat': '驱动与系统验证',
      'exp4-date': '2023 – 2025',
      'exp4-org': 'HP / Intel 安全验证实验室',
      'exp4-role': '安全系统验证工程师 · 台北',
      'exp4-b1': '于 HP 与 Intel 联合实验室执行商用笔电系统级安全验证。',
      'exp4-b2': '负责 Secure Boot、TPM 加密机制与固件完整性漏洞检测。',

      'exp5-cat': 'AI Research',
      'exp5-date': 'Feb 2026 – Present',
      'exp5-org': '长庚大学 · Brain Ma Lab',
      'exp5-role': '人工智能硕士班研究生 · 桃园',
      'exp5-b1': '进行 3D nnDetection 应用于腹部 CT 淋巴结自动检测研究。',
      'exp5-b2': '开发直肠外科微创腹腔镜手术之实时内窥镜影像分割技术。',

      'inst-cat': 'AI 医疗讲师',
      'inst-period': '2026 – Present',
      'inst-org': '高雄医学大学 & 弘光科技大学护理系',
      'inst-role': '智慧医疗 AI 讲师与辅导导师 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 七日夏令营：</strong>指导大学、硕士生与高龄照护业界人士开发 AI 原型与展示视频，带领两梯次分获第二名与最佳简报奖。',
      'inst-p2': '<strong>弘光科大护理系：</strong>教授 AI 图像基础，引导学生通过实操辨别模型误差与限制，将图像识别创新应用于生活照护。',

      // Simplified Ongoing Research
      'research-spotlight-title': '目前进行中研究 (Ongoing Research)',
      'res1-title': 'nnDetection 应用于腹部 CT 淋巴结自动检测',
      'res2-title': '实时内窥镜手术血管预测 (Real-time endoscopic surgery of vessel prediction)',
      'res-unpublished': '目前进行中研究 · 尚未发表',
      'km-zoom': '放大查看',

      // Contact & Kinmen Page 2
      'contact-tag': '无幻觉 · 纯粹实作落地',
      'contact-title': '输入：你的点子 &rarr; 输出：真实 AI',
      'contact-sub': '欢迎关注我的 GitHub 与 LinkedIn，或随时来信把大胆构想写成系统！',
      'km-back-portfolio': '返回个人主页',
      'km-page-badge': '第 2 页 · 金门单车蝴蝶之旅',
      'km-recruit-tag': '挑战者招募中 · 120km 蝴蝶结路线',
      'km-hero-title': '金门五天四夜单车蝴蝶之旅挑战',
      'km-hero-desc': '骑行 120km 贯穿大小金门绘制 GPS 蝴蝶结，探索战地古迹、跨海大桥与背包客古厝民宿。',
      'km-bonus-amount': '完成任务加码奖金新台币 NT$5,000 元',
      'km-bonus-terms': '成功完成传单上的所有 Checkbox Lists 挑战任务并附上轨迹与照片认证，即可额外获得奖金新台币 5,000 元！',
      'km-check-missions': '查看挑战清单',
      'km-stat-route': '总骑行里程',
      'km-stat-days': '天数规划',
      'km-stat-cost': '预估总花费',
      'km-stat-bonus': '完成加码奖金',
      'km-posters-title': '挑战活动官方海报',
      'km-poster1-tag': '路线规划与 GPS 艺术海报',
      'km-poster2-tag': '费用明细估算海报 (NT$14,200)',
      'km-missions-header': '四大核心任务与 NT$5,000 奖金检查清单',
      'km-missions-desc': '完成下方所有任务并附上完整 GPX 轨迹与拍照佐证，即可领取新台币 5,000 元挑战奖金！',
      'km-m1-title': '任务一：骑行跨越金门大桥 (5.4km)',
      'km-m1-desc': '骑车跨越金门大桥往返烈屿（小金门），需于桥头拍照记录。',
      'km-m2-title': '任务二：120km 蝴蝶结 GPS 轨迹闭合',
      'km-m2-desc': '以琼林为中心完成东西双环骑行并使用 Strava/Garmin 记录。',
      'km-m3-title': '任务三：聚落风狮爷打卡寻访',
      'km-m3-desc': '于金门各聚落寻找并拍摄至少 8 尊守护风狮爷合照。',
      'km-m4-title': '任务四：登顶太武山毋忘在莒',
      'km-m4-desc': '登顶太武山 253m 制高点并与“毋忘在莒”勒石合影。',
      'km-claim-summary': '完赛后请将连续 5 日 GPX 轨迹与 4 项任务照片寄至 <strong>fttmp66@gmail.com</strong> 审核领奖！',
      'km-itinerary-header': '五日精选行程',
      'km-d1-title': '西南海岸与后浦老街',
      'km-d1-detail': '得月楼、翟山坑道、建功屿夕阳与广东粥。',
      'km-d2-title': '烈屿小金门跨海长征',
      'km-d2-detail': '跨越金门大桥、猫公石海岸与芋头冰。',
      'km-d3-title': '西北战地与古宁头',
      'km-d3-detail': '北山古洋楼弹孔、慈湖夕阳与石蚵面线。',
      'km-d4-title': '太武山与东北聚落',
      'km-d4-detail': '登太武山、狮山炮阵地与山后民俗村。',
      'km-d5-title': '琼林枢纽与搭机返程',
      'km-d5-detail': '琼林战斗村闭合蝴蝶轨迹并搭机赋归。'
    }
  };

  // Trilingual Cycle: en -> zh-TW -> zh-CN -> en
  const langOrder = ['en', 'zh-TW', 'zh-CN'];
  let currentLang = localStorage.getItem('myron_portfolio_lang_v4') || 'en';

  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('myron_portfolio_lang_v4', lang);
    const dict = i18nDictionary[lang] || i18nDictionary['en'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

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

    initIcons();
  };

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextIndex = (langOrder.indexOf(currentLang) + 1) % langOrder.length;
      applyLanguage(langOrder[nextIndex]);
    });
  }

  applyLanguage(currentLang);
});
