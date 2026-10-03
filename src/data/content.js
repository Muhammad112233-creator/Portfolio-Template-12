/* ==================================================================
   content.js — EVERY piece of copy, link and list on the site lives
   here. Change a value, hit save, and the whole page follows.
   ================================================================== */

export const profile = {
  brand: 'HAMZA',
  firstName: 'Hamza',
  fullName: 'Hamza Raza',
  email: 'hamza.raza.dev@gmail.com',
  location: 'LAHORE, PK',
  release: '[ PORTFOLIO RELEASE v2.0 ]',
  /* The two-line hero headline: line 1 is solid white, line 2 is the
     red gradient. Keep both lines short so the layout stays intact. */
  headlineTop: 'HAMZA',
  headlineAccent: 'DEV.ENGINE',
  tagline: 'TOP 1%',
  role: 'Software Engineer & Systems Architect',
  intro:
    'Designing resilient backend systems, shipping real-time web platforms, and wiring practical AI features into products that people actually use.',
  stats: ['99.9% Uptime', 'TypeScript • Node.js', 'PostgreSQL & AWS'],
  badges: ['FULL-STACK 4K', 'CLOUD CERTIFIED'],
  awards: {
    title: 'Core Stack & Awards',
    text: 'Winner — HEC National Hackathon 2025, AWS Certified Cloud Practitioner, Technical Lead at UET Software Society.',
  },
  rails: [
    'FEATURE FILM // FULL-STACK ENGINEER',
    'ORIGINAL SERIES // CLOUD ARCHITECT',
    'BLOCKBUSTER // API & MICROSERVICES',
    'ACCLAIMED // PERFORMANCE ENGINEER',
  ],
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  socials: [
    { label: 'GitHub //', href: 'https://github.com' },
    { label: 'LinkedIn //', href: 'https://linkedin.com' },
    { label: 'LeetCode //', href: 'https://leetcode.com' },
  ],
}

/* ---------------- Episode 01 — About ---------------- */
export const about = {
  badgeMain: 'EPISODE 01',
  badgeSub: 'ABOUT THE ENGINEER',
  heading: 'EPISODE SYNOPSIS',
  headingAccent: 'ORIGIN & VISION.',
  cardOne: {
    index: '01',
    title: 'Cast & Background',
    leadName: 'Hamza Raza',
    leadText:
      ', a Computer Science graduate from the University of Engineering and Technology, Lahore, currently building backend infrastructure for a fintech product team.',
    body: 'My work sits between clean architecture and measured performance — turning messy product requirements into typed services, predictable database behaviour and interfaces that feel instant.',
    chips: ['Backend Systems', 'Full-Stack Development', 'Cloud Architecture'],
  },
  cardTwo: {
    index: '02',
    title: 'Milestones & Accolades',
    footer: '// SEASON_01 HIGHLIGHTS',
    items: [
      { strong: 'HEC National Hackathon 2025', rest: ' — first place out of 340 teams.' },
      { strong: 'AWS Certified Cloud Practitioner', rest: ' with a focus on serverless workloads.' },
      { strong: 'Technical Lead', rest: ' at the UET Software Society, mentoring 60+ juniors.' },
    ],
  },
  cardThree: {
    title: 'Production Tech Stack',
    text: 'Equipped with industry-grade instruments for robust scaling.',
    chips: ['TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'React', 'Docker', 'AWS'],
  },
}

/* ---------------- Episode 02 — Expertise ---------------- */
export const expertise = {
  badgeMain: 'EPISODE 02',
  badgeSub: 'CORE COMPETENCIES',
  heading: "DIRECTOR'S CUT",
  headingAccent: 'TECHNICAL CAPABILITIES.',
  intro:
    'Blending typed backend architecture, event-driven services and applied AI into platforms that hold up in production.',
  cards: [
    {
      number: '01',
      tag: 'UI / UX & INTERACTION',
      title: 'Frontend Development',
      text: 'Building accessible, fast interfaces with React, TypeScript and Tailwind CSS — finished with GSAP motion that stays out of the way.',
      gradient: 'from-[#1f0a0c] via-[#121212] to-[#0a0a0a]',
    },
    {
      number: '02',
      tag: 'API & ARCHITECTURE',
      title: 'Backend Development',
      text: 'Designing versioned REST and realtime APIs, authentication pipelines and normalised schemas across PostgreSQL and Redis.',
      gradient: 'from-[#1a0809] via-[#111111] to-[#090909]',
    },
    {
      number: '03',
      tag: 'INTELLIGENCE & ML',
      title: 'AI Integration',
      text: 'Shipping LLM-assisted workflows, retrieval pipelines and lightweight ML models behind clean, observable service boundaries.',
      gradient: 'from-[#220a0d] via-[#131313] to-[#0a0a0a]',
    },
    {
      number: '04',
      tag: 'DEVOPS & CLOUD',
      title: 'Cloud & Deployment',
      text: 'Running containerised workloads on AWS with GitHub Actions pipelines, infrastructure as code and alerting that actually pages someone.',
      gradient: 'from-[#1d090b] via-[#101010] to-[#080808]',
    },
  ],
}

/* ---------------- Skills carousel ---------------- */
export const skills = [
  {
    tag: 'UI / INTERACTION',
    title: 'Frontend Engineering',
    desc: 'Building responsive, accessible interfaces with React, TypeScript, Tailwind CSS and purposeful motion design.',
    list: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    tag: 'ARCHITECTURE',
    title: 'Backend & Databases',
    desc: 'Designing typed REST services, authentication flows, background jobs and database schemas that scale with the product.',
    list: ['Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    tag: 'INTELLIGENCE',
    title: 'AI & Machine Learning',
    desc: 'Wiring language models, vector search and classical ML into real workflows instead of demos that never ship.',
    list: ['LLM APIs', 'RAG Pipelines', 'Computer Vision', 'Pandas', 'AWS AI'],
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'Cloud & DevOps',
    desc: 'Shipping containers, automated pipelines and monitored environments with rollbacks you can trust on a Friday.',
    list: ['Docker', 'GitHub Actions', 'CI/CD Pipelines', 'AWS', 'Nginx'],
  },
  {
    tag: 'COMPETITIVE',
    title: 'Algorithmic Problem Solving',
    desc: 'Practising data structures and algorithms daily — 750+ problems solved across rating-tracked judges.',
    list: ['Data Structures', 'Algorithms', 'LeetCode', 'Codeforces', 'GFG'],
  },
  {
    tag: 'PRODUCTIVITY',
    title: 'Tools & Ecosystem',
    desc: 'Working with a tight toolchain for version control, debugging, design hand-off and day-to-day delivery.',
    list: ['Git', 'VS Code', 'Figma', 'Postman', 'Linear'],
  },
]

/* ---------------- Originals — project grid ---------------- */
export const projects = [
  {
    title: 'Ledgerline Payments',
    category: 'Fintech Backend',
    description:
      'Double-entry ledger service handling idempotent payouts, settlement batches and reconciliation reports for a live fintech pilot.',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'Docker'],
    match: '99%',
    episode: 'S01 E01',
  },
  {
    title: 'Realtime Ops Console',
    category: 'Distributed Systems',
    description:
      'Websocket operations console streaming fleet telemetry to dispatchers with sub-second fan-out and offline replay.',
    tags: ['TypeScript', 'Node.js', 'Socket.IO', 'AWS'],
    match: '98%',
    episode: 'S01 E02',
  },
  {
    title: 'Studyhub Campus Portal',
    category: 'Full-Stack Platform',
    description:
      'Unified student portal replacing three legacy tools — timetables, announcements and results in a single searchable feed.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    match: '97%',
    episode: 'S01 E03',
  },
  {
    title: 'TabPilot Extension',
    category: 'Client-Side Engineering',
    description:
      'Chrome extension that groups, parks and restores tab sessions, syncing state across devices with the Chrome APIs.',
    tags: ['JavaScript', 'Chrome APIs', 'Vite', 'HTML5'],
    match: '99%',
    episode: 'S01 E04',
  },
  {
    title: 'DocuSense RAG Engine',
    category: 'Applied AI',
    description:
      'Retrieval pipeline over 40k internal documents with hybrid search, citation tracking and evaluation notebooks.',
    tags: ['Python', 'LLM APIs', 'Vector DB', 'FastAPI'],
    match: '96%',
    episode: 'S01 E05',
  },
  {
    title: 'Algorithm Vault',
    category: 'Competitive Programming',
    description:
      'Personal library of tested templates and notes for graphs, DP and geometry, generated from 750+ solved problems.',
    tags: ['C++', 'Python', 'Algorithms', 'Markdown'],
    match: '99%',
    episode: 'S01 E06',
  },
  {
    title: 'Portfolio Cinematics v2.0',
    category: 'UI/UX & Animation',
    description:
      'This Netflix-inspired interactive portfolio — pinned 3D rails, GSAP physics and a fully hand-tuned motion system.',
    tags: ['React', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    match: '100%',
    episode: 'S01 E07',
  },
  {
    title: 'Deploy Ship Pipeline',
    category: 'DevOps & Infrastructure',
    description:
      'Zero-downtime deployment pipeline with preview environments, smoke tests and one-command rollbacks.',
    tags: ['Docker', 'GitHub Actions', 'AWS', 'Nginx'],
    match: '98%',
    episode: 'S01 E08',
  },
]

/* ---------------- Episode 04 — Contact ---------------- */
export const contact = {
  badge: 'EPISODE 04 // GET IN TOUCH',
  sideNote: "// LET'S BUILD SOMETHING CINEMATIC",
  permission: 'I give permission to contact me at this email address.',
  legal: 'This site is protected by security protocols and industry-standard privacy guidelines.',
  prompt: 'Ready to start a project or collaboration? Send a direct signal.',
  cta: 'Send Message',
}

/* ---------------- Footer ---------------- */
export const footer = {
  brand: 'HAMZA',
  series: '// NETFLIX DEVELOPER SERIES • SEASON 2026',
  copyright: 'Hamza Raza. All Rights Reserved.',
  note: 'STREAMING WORLDWIDE • BUILT WITH REACT & GSAP',
}
