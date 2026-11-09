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
      'res1-p1': '<strong>High-Precision Localization:</strong> Implemented 3D deep learning detection on volumetric CT scans (e.g. <code>ABD_LYMPH_026 | z=13</code>), achieving tight ground-truth (green) vs predicted (red) alignment.',
      'res1-p2': '<strong>Oncological Confidence:</strong> Reached high prediction confidence (score = 0.98, IoU = 0.79), distinguishing subtle lymph nodes from adjacent vessels to assist metastatic staging.',
      'res2-badge': 'Intraoperative Surgical AI',
      'res2-title': 'Real-Time Vessel Prediction in Laparoscopic Colorectal Resection',
      'res2-sub': 'Minimally Invasive Computer Vision & Educational Cartoon Guidance',
      'res2-p1': '<strong>Real-Time Video Segmentation:</strong> Deployed deep learning segmentation on endoscopic video streams to track critical mesenteric vascular branches during laparoscopic resection.',
      'res2-p2': '<strong>Intraoperative Safety & Anatomy Teaching:</strong> Created interactive cartoon anatomy navigation ("Teach me?") to prevent accidental vessel laceration and improve surgical clarity.',
      
      // Instructor Experience Card
      'inst-tag': 'Medical AI Lecturer & Mentor',
      'inst-period': '2025 – Present',
      'inst-org': 'KMU & Hungkuang University',
      'inst-role': 'AI Healthcare Instructor & Project Mentor · Taichung & Kaohsiung',
      'inst-p1': '<strong>KMU Smart Healthcare Summer Camp:</strong> Mentored high school and undergraduate students in hands-on medical AI project incubation, problem discovery, and national hackathons.',
      'inst-p2': '<strong>Hungkuang University Nursing Department:</strong> Lectured on medical AI imaging fundamentals (CT and chest X-ray diagnosis), guiding students to produce competition-winning posters.',
      
      // Contact & Kinmen Tour
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
      'km-d2-sub': "Kinmen Bridge, Cat's Eye Stone, Taro Ice",
      'km-d3-title': 'D3 · NW Coast & Guningtou (30km)',
      'km-d3-sub': 'Beishan Old Mansion, Cihu Sunset, Pastry',
      'km-d4-title': 'D4 · Mt. Taiwu & NE Coast (25km)',
      'km-d4-sub': 'Shishan Artillery, Shanhou Folk Village',
      'km-d5-title': 'D5 · Jinhu & Flight Home (10km)',
      'km-d5-sub': 'Qionglin Tunnel, Taihu Lake, Return Flight'
    },

    'zh-TW': {
      'lang-btn-text': '简体中文',
      'nav-about': '關於我',
      'nav-experience': '經歷歷程',
      'nav-research': '學術研究',
      
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
      'res1-p1': '<strong>高精準度病灶定位：</strong>在腹部 CT 斷層（如 <code>ABD_LYMPH_026 | z=13</code>）成功實現 3D 物件偵測，精準比對 Ground Truth（綠框）與模型預測（紅框）。',
      'res1-p2': '<strong>腫瘤臨床輔助分期：</strong>在微小且周遭血管干擾嚴重的淋巴結上達到高置信度（score = 0.98，IoU = 0.79），有效輔助臨床轉移性淋巴病變篩檢。',
      'res2-badge': '術中即時手術導航 AI',
      'res2-title': '腹腔鏡直腸結腸切除術之即時血管預測系統',
      'res2-sub': '微創內視鏡即時影像辨識與教學卡通可視化輔助',
      'res2-p1': '<strong>手術影像即時分割：</strong>將深度學習即時推理整合於微創腹腔鏡影像流，在煙霧與手術反光干擾下精準追蹤腸系膜下動靜脈及分支出血高危區。',
      'res2-p2': '<strong>術中防誤傷解剖導航：</strong>結合生動之解剖引導卡通角色（"Teach me?"），清楚指引手術夾與血管相對位置，避免誤傷大血管，提升微創手術安全。',
      
      // Instructor Experience Card
      'inst-tag': '醫療 AI 講師與導師',
      'inst-period': '2025 – 迄今',
      'inst-org': '高雄醫學大學 & 弘光科技大學護理系',
      'inst-role': '智慧醫療講師與專案輔導導師 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 高齡智慧醫療夏令營：</strong>帶領高中生與大專學生參與醫療 AI 專案實作、臨床痛點挖掘與創新競賽提案。',
      'inst-p2': '<strong>弘光科技大學護理系：</strong>受邀擔任 AI 醫療影像專題講師，講授 CT 斷層與 X 光 AI 辨識基礎知識，指導學生製作科研海報（Poster）並參賽獲獎。',
      
      // Contact & Kinmen Tour
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

    'zh-CN': {
      'lang-btn-text': 'English',
      'nav-about': '关于我',
      'nav-experience': '经历历程',
      'nav-research': '学术研究',
      
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
      'res1-p1': '<strong>高精确度病灶定位：</strong>在腹部 CT 断层（如 <code>ABD_LYMPH_026 | z=13</code>）成功实现 3D 目标检测，精准比对 Ground Truth（绿框）与模型预测（红框）。',
      'res1-p2': '<strong>肿瘤临床辅助分期：</strong>在微小且周围血管干扰严重的淋巴结上达到高置信度（score = 0.98，IoU = 0.79），有效辅助临床转移性淋巴病变筛查。',
      'res2-badge': '术中实时手术导航 AI',
      'res2-title': '腹腔镜直肠结肠切除术之实时血管预测系统',
      'res2-sub': '微创内窥镜实时图像识别与教学卡通可视化辅助',
      'res2-p1': '<strong>手术影像实时分割：</strong>将深度学习实时推理整合于微创腹腔镜视频流，在烟雾与手术反光干扰下精准追踪肠系膜下动静脉及分支出血高危区。',
      'res2-p2': '<strong>术中防误伤解剖导航：</strong>结合生动之解剖引导卡通角色（"Teach me?"），清楚指引手术夹与血管相对位置，避免误伤大血管，提升微创手术安全。',
      
      // Instructor Experience Card
      'inst-tag': '医疗 AI 讲师与导师',
      'inst-period': '2025 – 至今',
      'inst-org': '高雄医学大学 & 弘光科技大学护理系',
      'inst-role': '智慧医疗讲师与项目辅导导师 · 台中 & 高雄',
      'inst-p1': '<strong>KMU 高龄智慧医疗夏令营：</strong>带领高中生与大专学生参与医疗 AI 项目实操、临床痛点挖掘与创新竞赛提案。',
      'inst-p2': '<strong>弘光科技大学护理系：</strong>受邀担任 AI 医疗影像专题讲师，讲授 CT 断层与 X 光 AI 识别基础知识，指导学生制作科研海报（Poster）并参赛获奖。',
      
      // Contact & Kinmen Tour
      'contact-title': '与我联系 · 探索未来合作契机',
      'km-badge': '单车壮游特企',
      'km-title': '金门单车五日游：蝴蝶结大挑战',
      'km-desc': '120km 环岛 GPS 轨迹艺术，随兴入住闽南古厝民宿。',
      'km-stat-route': '总骑行里程',
      'km-stat-cost': '全包式总花费',
      'km-poster1-tag': '行程路线与 GPS 艺术海报',
      'km-poster2-tag': '五天四夜费用估算表海报',
      'km-zoom': '点击放大',
      'km-view-full': '查看高清大图',
      'km-poster1-caption': '以琼林聚落为核心枢纽，骑行出 120km 双环蝴蝶结轨迹。',
      'km-poster2-caption': '含往返机票、4晚住宿、地道美食三餐、装备与紧急应急金。',
      'km-missions-title': '挑战四大核心任务',
      'km-m1': '<strong>征服金门大桥：</strong>5.4km 跨海自行车道直奔烈屿。',
      'km-m2': '<strong>120km 蝴蝶结路线：</strong>东西双翼完成轨迹闭合。',
      'km-m3': '<strong>寻访聚落风狮爷：</strong>集齐各乡村特色避风守护神。',
      'km-m4': '<strong>登上金门之巅：</strong>太武山顶峰毋忘在莒俯瞰全岛。',
      'km-itinerary-title': '五天精华时程',
      'km-d1-title': 'D1 · 西南海岸与后浦老街 (15km)',
      'km-d1-sub': '得月楼、翟山坑道、建功屿夕阳、永春广东粥',
      'km-d2-title': 'D2 · 烈屿小金门跨海长征 (40km)',
      'km-d2-sub': '金门大桥、猫公石海岸、特产黄厝芋头冰',
      'km-d3-title': 'D3 · 西北战地与古宁头 (30km)',
      'km-d3-sub': '北山古洋楼弹孔、慈湖夕阳、闽式烧饼',
      'km-d4-title': 'D4 · 太武山与东北聚落 (25km)',
      'km-d4-sub': '狮山炮阵地、山后民俗村、高粱牛肉面',
      'km-d5-title': 'D5 · 琼林枢纽与满载赋归 (10km)',
      'km-d5-sub': '琼林战斗村、太湖水獭出没地、搭机返程'
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
      langBtnText.innerText = dict['lang-btn-text'];
    }

    initIcons();
  };

  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const currentIndex = langOrder.indexOf(currentLang);
      const nextIndex = (currentIndex + 1) % langOrder.length;
      const nextLang = langOrder[nextIndex];
      applyLanguage(nextLang);
    });
  }

  // Apply default language initially (en)
  applyLanguage(currentLang);
});
