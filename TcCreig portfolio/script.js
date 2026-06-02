// ============================================
// Tc Creig — Futuristic Portfolio
// High-end interactive JavaScript
// ============================================

// Tailwind script configuration (runtime)
function initTailwind() {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            'mono': ['JetBrains Mono', 'monospace']
          }
        }
      }
    };
  }
}

// ============================================
// LOADING SCREEN
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('loader-progress');
  const percentEl = document.getElementById('loader-percent');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14 + 7;
    if (progress > 100) progress = 100;

    progressBar.style.width = `${progress}%`;
    percentEl.textContent = `${Math.floor(progress)}%`.padStart(3, '0');

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 650);
      }, 420);
    }
  }, 95);
}

// ============================================
// NAVBAR BEHAVIOR
// ============================================
function initNavbar() {
  const nav = document.getElementById('nav');
  let lastScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    if (current > 80) {
      nav.classList.add('!bg-[#020408]/95');
      nav.style.backdropFilter = 'blur(26px)';
    } else {
      nav.classList.remove('!bg-[#020408]/95');
    }

    lastScroll = current;
  }, { passive: true });

  // Mobile menu
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn?.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
      menu.classList.add('flex', 'flex-col');
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>`;
    } else {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking nav links
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  menu.classList.remove('flex');
  menu.classList.add('hidden');
  if (btn) btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>`;
}

// ============================================
// HERO CANVAS — STARS + SUBTLE GALAXY + GRID
// ============================================
let heroCanvas, ctx;
let stars = [];
let particles = [];
let gridOffset = 0;

function initHeroCanvas() {
  heroCanvas = document.getElementById('hero-canvas');
  if (!heroCanvas) return;
  ctx = heroCanvas.getContext('2d', { alpha: true });

  function resize() {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight * 1.05;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Create stars
  stars = Array.from({ length: 210 }, () => ({
    x: Math.random() * heroCanvas.width,
    y: Math.random() * heroCanvas.height * 0.95,
    size: Math.random() * 1.35 + 0.4,
    alpha: Math.random() * 0.65 + 0.3,
    speed: Math.random() * 0.018 + 0.006
  }));

  // Create drifting particles (holo dust)
  particles = Array.from({ length: 38 }, () => ({
    x: Math.random() * heroCanvas.width,
    y: Math.random() * heroCanvas.height,
    size: Math.random() * 2.1 + 0.5,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.14,
    alpha: Math.random() * 0.5 + 0.2
  }));

  animateHeroCanvas();
}

function animateHeroCanvas() {
  if (!ctx || !heroCanvas) return;

  ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  // Subtle deep space gradient
  const grad = ctx.createRadialGradient(
    heroCanvas.width * 0.5, heroCanvas.height * 0.38, 120,
    heroCanvas.width * 0.52, heroCanvas.height * 0.64, Math.max(heroCanvas.width, heroCanvas.height) * 0.82
  );
  grad.addColorStop(0, 'rgba(12, 18, 36, 0.0)');
  grad.addColorStop(0.6, 'rgba(5, 7, 15, 0.55)');
  grad.addColorStop(1, 'rgba(2, 4, 8, 0.95)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);

  // Very slow moving grid lines (holographic)
  ctx.strokeStyle = 'rgba(212,175,55,0.065)';
  ctx.lineWidth = 1;
  gridOffset = (gridOffset + 0.16) % 58;

  for (let x = -80; x < heroCanvas.width + 80; x += 58) {
    ctx.beginPath();
    ctx.moveTo(x + gridOffset * 0.3, 0);
    ctx.lineTo(x + gridOffset * 0.3 + heroCanvas.height * 0.18, heroCanvas.height);
    ctx.stroke();
  }
  for (let y = 40; y < heroCanvas.height; y += 58) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(heroCanvas.width, y);
    ctx.stroke();
  }

  // Stars
  ctx.fillStyle = '#ffffff';
  for (let star of stars) {
    ctx.globalAlpha = star.alpha;
    ctx.fillRect(star.x, star.y, star.size, star.size);

    // Gentle drift
    star.y += star.speed;
    if (star.y > heroCanvas.height) {
      star.y = -4;
      star.x = Math.random() * heroCanvas.width;
    }
  }

  // Drifting holographic particles
  ctx.fillStyle = '#00e5ff';
  for (let p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    // Soft wrap
    if (p.x < 0) p.x = heroCanvas.width;
    if (p.x > heroCanvas.width) p.x = 0;
    if (p.y < 0) p.y = heroCanvas.height * 0.9;
    if (p.y > heroCanvas.height) p.y = 10;
  }
  ctx.globalAlpha = 1;

  // Shooting stars (cinematic)
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.35;
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.len * 0.6, s.y + s.len * 0.32);
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed * 0.3;
    s.alpha -= 0.028;

    if (s.alpha <= 0.05) shootingStars.splice(i, 1);
  }
  ctx.globalAlpha = 1;

  // Occasional shooting star
  if (Math.random() < 0.012) {
    createShootingStar();
  }

  requestAnimationFrame(animateHeroCanvas);
}

let shootingStars = [];
function createShootingStar() {
  if (!ctx || shootingStars.length > 2) return;
  shootingStars.push({
    x: Math.random() * heroCanvas.width * 0.72,
    y: Math.random() * (heroCanvas.height * 0.62),
    len: Math.random() * 92 + 68,
    speed: Math.random() * 7.8 + 9.2,
    alpha: 0.85 + Math.random() * 0.15
  });
}

// ============================================
// SKILLS DATA & RENDER
// ============================================
const skills = [
  { name: "Google Apps Script", icon: "⚙️" },
  { name: "AI Automation", icon: "🧠" },
  { name: "Gemini API", icon: "✦" },
  { name: "OpenAI API", icon: "◈" },
  { name: "Google Sheets Systems", icon: "📊" },
  { name: "Google Forms Automation", icon: "📝" },
  { name: "Gmail Automation", icon: "✉︎" },
  { name: "AI Proposal Builders", icon: "📑" },
  { name: "Command Center Design", icon: "◉" },
  { name: "Cybersecurity Fundamentals", icon: "🛡️" },
  { name: "Lead Generation Systems", icon: "🚀" },
  { name: "Workflow Engineering", icon: "🔄" },
  { name: "Prompt Engineering", icon: "✍︎" },
  { name: "Vercel Deployment", icon: "▲" },
  { name: "GitHub", icon: "⎔" },
  { name: "VS Code", icon: "⌨︎" },
  { name: "Firebase", icon: "🔥" },
  { name: "Netlify", icon: "🌐" },
  { name: "Digital Infrastructure", icon: "🏗" },
  { name: "Business Intelligence Systems", icon: "📈" }
];

function renderSkills() {
  const container = document.querySelector('#skills .grid');
  if (!container) return;

  container.innerHTML = '';

  skills.forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = `skill-card ${i % 3 === 0 ? 'holo-border' : ''}`;
    card.innerHTML = `
      <span class="icon">${skill.icon}</span>
      <span class="flex-1">${skill.name}</span>
    `;

    // Random subtle pulse on some cards
    if (i % 4 === 0) {
      card.style.animation = `pulse-glow 4.5s ease-in-out ${i * 70}ms infinite`;
    }

    // Click interaction — momentary stronger glow
    card.addEventListener('click', () => {
      card.style.borderColor = 'rgba(212,175,55,0.9)';
      card.style.boxShadow = '0 0 0 1px rgba(212,175,55,0.6), 0 0 28px rgba(212,175,55,0.3)';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow = '';
      }, 720);
    });

    container.appendChild(card);
  });
}

// ============================================
// PROJECTS DATA + RENDER + MODAL
// ============================================
const projects = [
  {
    id: "ghostmode",
    icon: "◉",
    title: "GhostMode AI",
    tagline: "PRIVACY-FIRST AUTONOMOUS AGENT",
    mission: "A zero-knowledge AI agent that enables secure, ephemeral decision-making and private communications for executives and high-stakes teams.",
    tech: ["Gemini 2.5", "Private RAG", "Zero-Trust", "Apps Script", "Firebase"],
    status: "PRODUCTION • 2025",
    link: "#"
  },
  {
    id: "aedshield",
    icon: "🛡",
    title: "AEDShieldAI",
    tagline: "PREDICTIVE PUBLIC SAFETY SYSTEM",
    mission: "Real-time monitoring, predictive maintenance, and automated dispatch intelligence for Automated External Defibrillators across municipal and corporate campuses.",
    tech: ["OpenAI", "IoT Pipelines", "Google Sheets", "Alert Engine", "Vercel"],
    status: "DEPLOYED • 2024",
    link: "#"
  },
  {
    id: "proposal",
    icon: "📄",
    title: "AI Proposal Builder",
    tagline: "ENTERPRISE PROPOSAL AUTOMATION",
    mission: "End-to-end intelligent proposal generation system that produces compliant, branded, and data-rich proposals in minutes instead of days.",
    tech: ["Gemini API", "Google Docs API", "Sheets", "Gmail", "Vercel"],
    status: "PRODUCTION • 2024",
    link: "#"
  },
  {
    id: "careerpath",
    icon: "🧭",
    title: "Career Path AI",
    tagline: "INTELLIGENT CAREER NAVIGATION",
    mission: "Personalized, data-driven career trajectory planning platform that combines labor market signals, skills graphs, and real-time opportunity matching.",
    tech: ["OpenAI", "Gemini", "Graph DB", "Next.js", "Firebase"],
    status: "BETA • 2025",
    link: "#"
  },
  {
    id: "flexipay",
    icon: "💳",
    title: "FLEXIPAY",
    tagline: "INTELLIGENT CASHFLOW AUTOMATION",
    mission: "Autonomous recurring billing, cash flow forecasting, and smart payment recovery engine for service businesses and SaaS operators.",
    tech: ["Stripe", "Apps Script", "Gemini", "BigQuery", "Netlify"],
    status: "LIVE • 2023",
    link: "#"
  },
  {
    id: "ahan",
    icon: "🏠",
    title: "American Home Access Network",
    tagline: "RESIDENTIAL INFRASTRUCTURE PLATFORM",
    mission: "A unified operations layer for home service providers — scheduling, technician dispatch, compliance, and client experience automation.",
    tech: ["Apps Script", "Gemini", "Google Maps API", "Sheets", "Vercel"],
    status: "PRODUCTION • 2024",
    link: "#"
  },
  {
    id: "cryptomentions",
    icon: "◈",
    title: "CryptoMentions",
    tagline: "REAL-TIME NARRATIVE INTELLIGENCE",
    mission: "High-signal crypto and macro narrative tracking engine that surfaces emerging themes, sentiment shifts, and influencer velocity across platforms.",
    tech: ["LLMs", "Twitter/X API", "Sentiment Models", "Supabase", "Vercel"],
    status: "LIVE • 2023",
    link: "#"
  },
  {
    id: "speedtolead",
    icon: "⚡",
    title: "Speed-to-Lead AI",
    tagline: "INSTANT RESPONSE AUTOMATION",
    mission: "Sub-60-second AI qualification and routing system that dramatically increases conversion rates for high-velocity sales and service businesses.",
    tech: ["OpenAI", "Twilio", "Sheets", "Gmail", "Zapier + Custom"],
    status: "PRODUCTION • 2024",
    link: "#"
  },
  {
    id: "commandcenter",
    icon: "◉",
    title: "AI Command Center",
    tagline: "INTERNAL OPERATIONS OS",
    mission: "A living headquarters dashboard that unifies agents, workflows, KPIs, and alerts into a single cinematic interface for leadership teams.",
    tech: ["Next.js", "Three.js", "Gemini", "Firebase", "Tailwind"],
    status: "INTERNAL • 2025",
    link: "#"
  },
  {
    id: "janitorialai",
    icon: "🧼",
    title: "Janitorial AI Systems",
    tagline: "OPERATIONS INTELLIGENCE FOR SERVICE",
    mission: "Full-stack AI operating system for commercial cleaning companies — scheduling, quality control, client reporting, and profitability analytics.",
    tech: ["Apps Script", "Gemini", "Google Forms", "Looker Studio", "Sheets"],
    status: "PRODUCTION • 2022",
    link: "#"
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card group cursor-pointer holo-border';
    
    const techHTML = project.tech.map(t => 
      `<span class="tech-badge">${t}</span>`
    ).join('');

    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="text-5xl opacity-90 group-hover:scale-105 transition-transform duration-300">${project.icon}</div>
        <div class="text-right">
          <div class="text-[10px] font-mono px-3 py-px rounded-full border border-white/15 text-white/60">${project.status.split('•')[0].trim()}</div>
        </div>
      </div>

      <div class="mt-auto pt-9">
        <div class="font-semibold text-[22px] tracking-[-1.1px] leading-none mb-1">${project.title}</div>
        <div class="text-xs text-[#d4af37] font-medium tracking-[1.5px] mb-3">${project.tagline}</div>
        
        <div class="text-sm text-white/70 line-clamp-3 leading-snug mb-6 pr-1">${project.mission}</div>
        
        <div class="flex flex-wrap gap-1.5 mb-6">
          ${techHTML}
        </div>

        <div class="flex items-center justify-between">
          <button onclick="event.stopImmediatePropagation(); showProjectModal('${project.id}')" 
                  class="text-xs font-bold tracking-[1.5px] px-5 py-[9px] border border-[#d4af37]/60 hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] rounded-full transition-all">
            VIEW PROJECT
          </button>
          <div class="text-[10px] font-mono text-white/35 tracking-widest">CASE ${String(projects.indexOf(project) + 1).padStart(2, '0')}</div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => showProjectModal(project.id));
    grid.appendChild(card);
  });
}

let currentProjectId = null;

function showProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const project = projects.find(p => p.id === projectId);
  if (!project || !modal) return;

  currentProjectId = projectId;

  document.getElementById('modal-icon').innerHTML = project.icon;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-tagline').textContent = project.tagline;
  document.getElementById('modal-mission').textContent = project.mission;
  document.getElementById('modal-status').textContent = project.status;

  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = project.tech.map(t => 
    `<span class="inline-block px-4 py-1 text-xs rounded-2xl border border-white/15 bg-white/[0.025]">${t}</span>`
  ).join('');

  const link = document.getElementById('modal-link');
  link.href = project.link || '#';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ============================================
// DIGITAL PRODUCTS
// ============================================
const products = [
  { id: "crypto-25", title: "Crypto Intelligence Playbook 2025", type: "MARKET INTEL", cover: "linear-gradient(135deg,#1a2338,#0a0f1f)", accent: "#d4af37" },
  { id: "ai-auto", title: "The AI Automation OS", type: "SYSTEMS GUIDE", cover: "linear-gradient(135deg,#112233,#0a0f1f)", accent: "#00e5ff" },
  { id: "janitorial-os", title: "Janitorial Business Operating System", type: "OPERATIONS MANUAL", cover: "linear-gradient(135deg,#1f2a1f,#0a0f1f)", accent: "#00ff9d" },
  { id: "founder-edges", title: "The Founder’s Edge: AI-First Operations", type: "ENTREPRENEURSHIP", cover: "linear-gradient(135deg,#2a2114,#0a0f1f)", accent: "#d4af37" },
  { id: "social-trends", title: "2026 Social & Narrative Trend Report", type: "INTELLIGENCE BRIEF", cover: "linear-gradient(135deg,#1f1a2e,#0a0f1f)", accent: "#c084fc" },
  { id: "secure-ai", title: "Secure AI Infrastructure Playbook", type: "CYBER + AI", cover: "linear-gradient(135deg,#1a202e,#05070f)", accent: "#00e5ff" }
];

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = '';

  products.forEach((prod, i) => {
    const card = document.createElement('div');
    card.className = 'product-card cursor-pointer group';
    
    card.innerHTML = `
      <div class="product-cover" style="background: ${prod.cover};">
        <div class="relative z-10 text-center px-6">
          <div class="text-[10px] tracking-[3px] font-mono mb-1" style="color: ${prod.accent}80">${prod.type}</div>
          <div class="text-xl font-semibold tracking-[-0.7px] leading-tight text-white">${prod.title}</div>
        </div>
        <div class="absolute bottom-3 right-3 px-2.5 py-px rounded text-[10px] font-mono border" style="border-color: ${prod.accent}40; color: ${prod.accent}99">PDF</div>
      </div>
      <div class="p-5 flex-1 flex items-center justify-between bg-[#05070f]">
        <div class="text-xs uppercase tracking-[1.5px] text-white/40">DIGITAL RELEASE</div>
        <button onclick="event.stopImmediatePropagation(); showProductModal('${prod.id}')" 
                class="text-xs px-4 py-1 rounded-full border border-white/20 hover:border-white/60 transition">VIEW</button>
      </div>
    `;

    card.addEventListener('click', () => showProductModal(prod.id));
    grid.appendChild(card);
  });
}

function showProductModal(productId) {
  const modal = document.getElementById('product-modal');
  const prod = products.find(p => p.id === productId);
  if (!prod || !modal) return;

  const content = document.getElementById('product-modal-content');
  content.innerHTML = `
    <div>
      <div class="uppercase tracking-[3px] text-xs mb-1" style="color: ${prod.accent}">${prod.type}</div>
      <div class="text-3xl font-semibold tracking-[-1.2px] pr-4">${prod.title}</div>
      
      <div class="mt-6 text-white/70 text-[15px] leading-relaxed">
        This premium digital asset contains battle-tested frameworks, automation templates, and strategic playbooks used across Creignificent operations and client deployments.
      </div>

      <div class="mt-7 grid grid-cols-3 gap-3 text-center">
        <div class="border border-white/10 rounded-2xl py-3">
          <div class="text-xs text-white/50">PAGES</div>
          <div class="font-mono text-2xl text-[#d4af37]">64</div>
        </div>
        <div class="border border-white/10 rounded-2xl py-3">
          <div class="text-xs text-white/50">TEMPLATES</div>
          <div class="font-mono text-2xl text-[#d4af37]">19</div>
        </div>
        <div class="border border-white/10 rounded-2xl py-3">
          <div class="text-xs text-white/50">UPDATES</div>
          <div class="font-mono text-2xl text-[#d4af37]">LIFETIME</div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function simulateDownload() {
  const btns = document.querySelectorAll('#product-modal button');
  const originalTexts = [];
  
  btns.forEach((b, i) => {
    originalTexts[i] = b.textContent;
    b.disabled = true;
    b.innerHTML = 'PREPARING SECURE TRANSMISSION...';
  });

  setTimeout(() => {
    btns.forEach((b, i) => {
      b.innerHTML = '✓ CHECK YOUR EMAIL';
      b.style.background = '#00ff9d';
      b.style.color = '#05070f';
    });
    
    setTimeout(() => {
      closeProductModal();
      // Reset buttons for next time
      btns.forEach((b, i) => {
        b.disabled = false;
        b.style.background = '';
        b.style.color = '';
        b.innerHTML = originalTexts[i];
      });
    }, 1750);
  }, 1400);
}

// ============================================
// AI LAB — TERMINAL + NEURAL NET
// ============================================
const terminalLines = [
  ">> INITIALIZING AGENT SWARM v4.7.2...",
  ">> LOADED 47 AUTONOMOUS WORKFLOWS",
  ">> CONNECTED TO GEMINI 2.5 PRO — SECURE",
  ">> THREAT SURFACE SCAN COMPLETE — 0 CRITICAL",
  ">> DEPLOYING SPEED-TO-LEAD ROUTER TO 3 CLIENTS",
  ">> RAG INDEX REFRESHED (14,872 DOCUMENTS)",
  ">> CREIGNIFICENT OPS SYNC — 99.98% UPTIME",
  ">> RUNNING ADVERSARIAL PROMPT TEST SUITE",
  ">> NEW PROPOSAL TEMPLATE GENERATED FOR AHAN",
  ">> ALL SYSTEMS NOMINAL. STANDBY."
];

let termIndex = 0;
let termInterval = null;

function initTerminal() {
  const term = document.getElementById('terminal');
  if (!term) return;

  term.textContent = '';

  function typeLine(line, callback) {
    let i = 0;
    term.textContent += '\n';
    const interval = setInterval(() => {
      term.textContent += line[i];
      term.scrollTop = term.scrollHeight;
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        setTimeout(callback, 460);
      }
    }, 22);
  }

  function runNext() {
    if (termIndex >= terminalLines.length) termIndex = 0;
    typeLine(terminalLines[termIndex], () => {
      termIndex++;
      setTimeout(runNext, 680);
    });
  }

  // Boot sequence
  setTimeout(() => {
    term.textContent = ">> SECURE SESSION ESTABLISHED";
    setTimeout(runNext, 650);
  }, 1200);
}

function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const c = canvas.getContext('2d');
  let w = canvas.width, h = canvas.height;
  
  let nodes = [];
  let connections = [];

  function createNetwork() {
    nodes = [];
    connections = [];
    
    // Create node layers
    const layers = [5, 7, 7, 4];
    let xPos = 38;
    
    layers.forEach((count, li) => {
      const spacing = (h - 50) / (count + 1);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: xPos,
          y: 26 + spacing * (i + 1),
          layer: li,
          activation: Math.random() * 0.6 + 0.4,
          pulse: Math.random() * Math.PI * 2
        });
      }
      xPos += (w - 78) / (layers.length - 1);
    });

    // Connect adjacent layers
    let nodeIdx = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentCount = layers[l];
      const nextCount = layers[l + 1];
      for (let a = 0; a < currentCount; a++) {
        for (let b = 0; b < nextCount; b++) {
          if (Math.random() > 0.3) {
            connections.push({
              from: nodeIdx + a,
              to: nodeIdx + currentCount + b,
              strength: Math.random() * 0.7 + 0.3
            });
          }
        }
      }
      nodeIdx += currentCount;
    }
  }

  function draw() {
    c.clearRect(0, 0, w, h);

    // Background faint grid
    c.strokeStyle = 'rgba(255,255,255,0.035)';
    c.lineWidth = 1;
    for (let x = 20; x < w; x += 26) {
      c.beginPath();
      c.moveTo(x, 0);
      c.lineTo(x, h);
      c.stroke();
    }

    // Connections
    c.strokeStyle = '#00e5ff';
    connections.forEach(conn => {
      const from = nodes[conn.from];
      const to = nodes[conn.to];
      const alpha = 0.18 + Math.sin(Date.now() / 380 + conn.from) * 0.12 * conn.strength;
      
      c.globalAlpha = Math.max(0.06, alpha);
      c.lineWidth = 1.1;
      c.beginPath();
      c.moveTo(from.x, from.y);
      c.lineTo(to.x, to.y);
      c.stroke();
    });
    c.globalAlpha = 1;

    // Nodes
    nodes.forEach((node, i) => {
      node.pulse += 0.038;
      const pulse = Math.sin(node.pulse) * 0.5 + 0.5;
      
      // Glow
      c.fillStyle = i % 3 === 0 ? '#d4af37' : '#00e5ff';
      c.globalAlpha = 0.2 + pulse * 0.35;
      c.beginPath();
      c.arc(node.x, node.y, 6.5 + pulse * 2.5, 0, Math.PI * 2);
      c.fill();

      // Core
      c.fillStyle = '#ffffff';
      c.globalAlpha = 0.9;
      c.beginPath();
      c.arc(node.x, node.y, 2.3, 0, Math.PI * 2);
      c.fill();
    });
    c.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 1.8;
    canvas.height = rect.height * 1.8;
    w = canvas.width;
    h = canvas.height;
    c.scale(1.8, 1.8);
    createNetwork();
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  }, { passive: true });

  resizeCanvas();
  draw();

  // Occasional random activation burst
  setInterval(() => {
    if (nodes.length) {
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      n.pulse = Math.PI * 1.5;
    }
  }, 1250);
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('send-btn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.style.pointerEvents = 'none';
    btn.innerHTML = `
      <span class="relative z-10 flex items-center gap-x-2">
        TRANSMITTING<span class="animate-pulse">...</span>
      </span>
    `;

    // Simulate secure transmission
    await new Promise(r => setTimeout(r, 1250));

    btn.style.background = 'linear-gradient(to right, #00ff9d, #67f6ff)';
    btn.innerHTML = 'TRANSMISSION RECEIVED ✓';

    // Show success message
    setTimeout(() => {
      const success = document.createElement('div');
      success.className = 'mt-6 p-5 rounded-2xl border border-[#00ff9d]/40 bg-[#00ff9d]/5 text-sm';
      success.innerHTML = `
        <div class="font-medium text-[#00ff9d]">Message delivered to command center.</div>
        <div class="text-xs mt-1 text-white/60">Tc Creig will respond within 24 hours. Reference ID: <span class="font-mono">TC-${Date.now().toString().slice(-7)}</span></div>
      `;
      form.appendChild(success);

      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.style.pointerEvents = '';
        btn.style.background = '';
        btn.innerHTML = originalText;
        success.style.transition = 'all 0.6s ease';
        success.style.opacity = '0';
        setTimeout(() => success.remove(), 300);
      }, 4500);
    }, 850);
  });
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT + ACTIVE NAV
// ============================================
function initSmoothInteractions() {
  // Add slight parallax tilt to hero content on mouse move (desktop)
  const hero = document.getElementById('hero');
  if (hero && window.innerWidth > 1024) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const panels = hero.querySelectorAll('.glass');
      panels.forEach((p, idx) => {
        const intensity = idx === 0 ? 8 : 4;
        p.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      hero.querySelectorAll('.glass').forEach(p => p.style.transform = '');
    });
  }

  // Intersection observer for subtle section reveals
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((section, i) => {
    if (i > 0) {
      section.style.opacity = '0.96';
      observer.observe(section);
    }
  });
}

// ============================================
// KEYBOARD SHORTCUTS (POWER USER FEEL)
// ============================================
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === '?' && document.activeElement.tagName === 'BODY') {
      e.preventDefault();
      const lab = document.getElementById('ai-lab');
      if (lab) lab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (e.metaKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Easter egg: press "c" on hero to highlight command center button
  let cCount = 0;
  document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'c') {
      cCount++;
      if (cCount >= 3) {
        const btn = document.querySelector('#hero button');
        if (btn) {
          btn.style.boxShadow = '0 0 0 3px rgba(0,229,255,0.5)';
          setTimeout(() => btn.style.boxShadow = '', 900);
        }
        cCount = 0;
      }
    }
  });
}

// ============================================
// ANIMATED STAT COUNTERS
// ============================================
function animateCounter(el, target, duration = 1600, isFloat = false) {
  if (!el) return;
  const start = parseFloat(el.textContent.replace(/[^\d.]/g, '')) || 0;
  const diff = target - start;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = start + diff * eased;

    if (isFloat) {
      el.innerHTML = val.toFixed(2) + '<span class="text-xl align-super">%</span>';
    } else {
      el.textContent = Math.floor(val).toLocaleString();
    }

    if (progress < 1) requestAnimationFrame(step);
    else {
      if (isFloat) el.innerHTML = target.toFixed(2) + '<span class="text-xl align-super">%</span>';
      else el.textContent = target.toLocaleString();
    }
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const agents = document.getElementById('stat-agents');
  const autos = document.getElementById('stat-autos');
  const threats = document.getElementById('stat-threats');
  const uptime = document.getElementById('stat-uptime');

  // Trigger only when the section is visible
  const lab = document.getElementById('ai-lab');
  if (!lab) return;

  let triggered = false;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      setTimeout(() => {
        animateCounter(agents, 64);
        animateCounter(autos, 2147);
        animateCounter(threats, 1891);
        animateCounter(uptime, 99.98, 1850, true);
      }, 260);
      obs.disconnect();
    }
  }, { threshold: 0.35 });

  obs.observe(lab);
}

// ============================================
// INITIALIZATION
// ============================================
function initializePortfolio() {
  initTailwind();
  initLoader();
  initNavbar();
  initHeroCanvas();
  
  // Slight delay for dramatic effect after load
  setTimeout(() => {
    renderSkills();
    renderProjects();
    renderProducts();
    
    initTerminal();
    initNeuralCanvas();
    initContactForm();
    initSmoothInteractions();
    initKeyboardShortcuts();
    initCounters();
    
    console.log('%c[Tc Creig Portfolio] Futuristic command center initialized.', 'color:#d4af37');
  }, 680);

  // Optional: remove loader instantly on fast connections
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('fade-out')) {
      // already handling via progress
    }
  });
}

// Boot everything
initializePortfolio();

// Expose a few functions for console power users
window.TC = {
  launchLab: () => document.getElementById('ai-lab')?.scrollIntoView({ behavior: 'smooth' }),
  showProject: (id) => { 
    const p = projects.find(x => x.id === id); 
    if (p) showProjectModal(id); 
  },
  closeModals: () => {
    document.getElementById('project-modal').classList.add('hidden');
    document.getElementById('product-modal').classList.add('hidden');
  }
};