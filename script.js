// ==================== LOADER ====================
window.addEventListener('load', function() {
  let progress = 0;
  const loaderProgress = document.getElementById('loader-progress');
  const loaderPercent = document.getElementById('loader-percent');
  const loader = document.getElementById('loader');

  // Simulate loading progress
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;

    loaderProgress.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('opacity-0', 'pointer-events-none');
        loader.style.transition = 'opacity 0.8s ease-out';
      }, 500);
    }
  }, 200);
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
}

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ==================== NAV SCROLL EFFECT ====================
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('glass-nav-active');
  } else {
    nav.classList.remove('glass-nav-active');
  }
});

// ==================== HERO CANVAS ====================
const heroCanvas = document.getElementById('hero-canvas');
const ctx = heroCanvas.getContext('2d');

function resizeCanvas() {
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animated particles/stars
const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * heroCanvas.width,
    y: Math.random() * heroCanvas.height,
    radius: Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2,
  });
}

function animateHeroCanvas() {
  ctx.fillStyle = 'rgba(5, 7, 15, 0.1)';
  ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = heroCanvas.width;
    if (p.x > heroCanvas.width) p.x = 0;
    if (p.y < 0) p.y = heroCanvas.height;
    if (p.y > heroCanvas.height) p.y = 0;

    ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateHeroCanvas);
}
animateHeroCanvas();

// ==================== SKILLS / CAPABILITIES ====================
const skills = [
  'Google Apps Script',
  'Gemini API',
  'GPT-4o',
  'OpenAI',
  'Automation',
  'Cloud Functions',
  'Workflows',
  'AI Agents',
  'Cybersecurity',
  'Data Analytics',
  'System Design',
  'Infrastructure',
  'Node.js',
  'Python',
  'TypeScript',
  'API Design',
  'LLM Integration',
  'Prompt Engineering',
];

const skillsGrid = document.querySelector('#skills .grid');
skills.forEach(skill => {
  const badge = document.createElement('div');
  badge.className = 'glass p-3 rounded-2xl border border-white/10 text-xs font-mono text-center text-white/70 hover:border-[#d4af37]/30 hover:text-[#d4af37] transition-all cursor-pointer';
  badge.textContent = skill;
  skillsGrid.appendChild(badge);
});

// ==================== PROJECTS ====================
const projects = [
  {
    icon: '🤖',
    title: 'AI Command Center',
    tagline: 'AUTONOMOUS OPERATIONS',
    mission: 'Enterprise-grade AI orchestration platform for multi-agent workflows, real-time monitoring, and autonomous decision-making across distributed systems.',
    tech: ['Gemini API', 'Node.js', 'WebSockets', 'PostgreSQL'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    icon: '⚙️',
    title: 'Workflow Automation Suite',
    tagline: 'GOOGLE ECOSYSTEM',
    mission: 'Integrated Google Workspace automation covering Sheets, Docs, Drive, and Calendar with intelligent routing and compliance tracking.',
    tech: ['Google Apps Script', 'Google API', 'Sheets', 'Cloud Scheduler'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    icon: '🔐',
    title: 'Secure RAG Pipeline',
    tagline: 'RETRIEVAL-AUGMENTED GENERATION',
    mission: 'Zero-trust vector database and retrieval system for sensitive enterprise data with encryption, audit logs, and access controls.',
    tech: ['Python', 'Vector DB', 'LLM', 'TLS/Encryption'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    icon: '📊',
    title: 'Predictive Analytics Engine',
    tagline: 'BUSINESS INTELLIGENCE',
    mission: 'Real-time demand forecasting and trend analysis for logistics, staffing optimization, and resource allocation.',
    tech: ['Python', 'Pandas', 'TensorFlow', 'BigQuery'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    icon: '🎯',
    title: 'Digital Inspection System',
    tagline: 'QUALITY ASSURANCE',
    mission: 'QR-based mobile inspection workflows with photo verification, AI-powered compliance checking, and real-time reporting.',
    tech: ['React Native', 'Firebase', 'Vision API', 'Node.js'],
    status: 'ACTIVE',
    link: '#',
  },
  {
    icon: '🌐',
    title: 'Client Intelligence Dashboard',
    tagline: 'TRANSPARENT OPERATIONS',
    mission: 'Real-time SLA monitoring, performance metrics, and operational transparency dashboards for enterprise clients.',
    tech: ['React', 'D3.js', 'WebSockets', 'Node.js'],
    status: 'ACTIVE',
    link: '#',
  },
];

const projectsGrid = document.getElementById('projects-grid');
projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'glass p-6 rounded-3xl border border-white/10 hover:border-[#d4af37]/30 cursor-pointer transition-all group';
  card.innerHTML = `
    <div class="text-4xl mb-3">${project.icon}</div>
    <h4 class="text-xl font-semibold mb-1">${project.title}</h4>
    <div class="text-[#d4af37] font-mono text-xs tracking-widest mb-4">${project.tagline}</div>
    <p class="text-sm text-white/60 group-hover:text-white/80 transition-colors">${project.mission.substring(0, 100)}...</p>
  `;
  card.addEventListener('click', () => openProjectModal(project));
  projectsGrid.appendChild(card);
});

function openProjectModal(project) {
  document.getElementById('modal-icon').textContent = project.icon;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-tagline').textContent = project.tagline;
  document.getElementById('modal-mission').textContent = project.mission;
  document.getElementById('modal-status').textContent = project.status;
  document.getElementById('modal-link').href = project.link;

  const techDiv = document.getElementById('modal-tech');
  techDiv.innerHTML = '';
  project.tech.forEach(tech => {
    const badge = document.createElement('div');
    badge.className = 'px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-[#d4af37]';
    badge.textContent = tech;
    techDiv.appendChild(badge);
  });

  document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.add('hidden');
}

// ==================== PRODUCTS ====================
const products = [
  {
    title: 'AI Automation Playbook',
    description: 'Complete guide to building AI-native business systems. 50+ templates, workflows, and deployment strategies.',
    price: '$29',
  },
  {
    title: 'Google Apps Script Cookbook',
    description: 'Production-ready snippets and patterns for enterprise Google Workspace automation.',
    price: '$19',
  },
  {
    title: 'Prompt Engineering Mastery',
    description: 'Advanced techniques for LLM integration, jailbreak prevention, and adversarial prompt hardening.',
    price: '$39',
  },
  {
    title: 'System Architecture Guide',
    description: 'Design patterns for scalable, secure, and maintainable AI infrastructure.',
    price: '$49',
  },
  {
    title: 'Cybersecurity Essentials',
    description: 'Zero-trust principles, API security, and threat modeling for autonomous systems.',
    price: '$34',
  },
  {
    title: 'RAG Pipeline Blueprint',
    description: 'Build secure, efficient retrieval-augmented generation systems from scratch.',
    price: '$44',
  },
];

const productsGrid = document.getElementById('products-grid');
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'glass p-5 rounded-2xl border border-white/10 hover:border-[#d4af37]/30 cursor-pointer transition-all text-center';
  card.innerHTML = `
    <div class="text-2xl mb-2">📚</div>
    <h4 class="text-sm font-semibold mb-2">${product.title}</h4>
    <p class="text-xs text-white/50 mb-3">${product.description.substring(0, 50)}...</p>
    <div class="text-[#d4af37] font-bold">${product.price}</div>
  `;
  card.addEventListener('click', () => openProductModal(product));
  productsGrid.appendChild(card);
});

function openProductModal(product) {
  const contentDiv = document.getElementById('product-modal-content');
  contentDiv.innerHTML = `
    <div class="text-3xl mb-3">📚</div>
    <h3 class="text-3xl font-semibold mb-2">${product.title}</h3>
    <p class="text-white/70 mb-6">${product.description}</p>
    <div class="text-4xl font-bold text-[#d4af37] mb-3">${product.price}</div>
  `;
  document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.add('hidden');
}

function simulateDownload() {
  alert('Secure link sent to your email. Check your inbox!');
  closeProductModal();
}

// ==================== NEURAL NETWORK CANVAS ====================
const neuralCanvas = document.getElementById('neural-canvas');
if (neuralCanvas) {
  const nCtx = neuralCanvas.getContext('2d');
  
  const nodes = [];
  for (let i = 0; i < 20; i++) {
    nodes.push({
      x: Math.random() * neuralCanvas.width,
      y: Math.random() * neuralCanvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: 3,
    });
  }

  function animateNeural() {
    nCtx.fillStyle = 'rgba(10, 15, 31, 0.2)';
    nCtx.fillRect(0, 0, neuralCanvas.width, neuralCanvas.height);

    // Draw connections
    nCtx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
    nCtx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          nCtx.beginPath();
          nCtx.moveTo(nodes[i].x, nodes[i].y);
          nCtx.lineTo(nodes[j].x, nodes[j].y);
          nCtx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1;

      nCtx.fillStyle = 'rgba(0, 229, 255, 0.8)';
      nCtx.beginPath();
      nCtx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      nCtx.fill();
    });

    requestAnimationFrame(animateNeural);
  }
  animateNeural();
}

// ==================== TERMINAL EFFECT ====================
const terminalDiv = document.getElementById('terminal');
if (terminalDiv) {
  const terminalLines = [
    '> INITIALIZING SECURE TERMINAL...',
    '> Loading neural architecture...',
    '> Syncing threat intelligence database...',
    '> Authenticating user credentials...',
    '> ✓ All systems operational',
    '> AI AGENT NETWORK ONLINE',
    '> Ready for autonomous execution',
  ];

  let lineIndex = 0;
  function typeTerminal() {
    if (lineIndex < terminalLines.length) {
      terminalDiv.textContent += terminalLines[lineIndex] + '\n';
      lineIndex++;
      setTimeout(typeTerminal, 300);
    }
  }
  typeTerminal();
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    const sendBtn = document.getElementById('send-btn');
    sendBtn.textContent = 'TRANSMITTED ✓';
    sendBtn.disabled = true;

    setTimeout(() => {
      alert('Message received! I will respond within 24 hours.');
      contactForm.reset();
      sendBtn.textContent = 'TRANSMIT MESSAGE';
      sendBtn.disabled = false;
    }, 1500);
  });
}

// ==================== ANIMATE COUNTERS ====================
function animateCounter(elementId, finalValue) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let currentValue = 0;
  const increment = Math.ceil(finalValue / 50);

  const counter = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      currentValue = finalValue;
      clearInterval(counter);
    }
    element.textContent = currentValue.toLocaleString();
  }, 30);
}

// Trigger when section is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter('stat-agents', 47);
      animateCounter('stat-autos', 1842);
      animateCounter('stat-threats', 1482);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.getElementById('ai-lab');
if (statsSection) observer.observe(statsSection);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
