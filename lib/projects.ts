// Single source of truth for every project shown on the portfolio.
// Images live in /public/projects/<id>/ (01.webp is the cover, cover.jpg is used for OG images).

export type Company = {
  name: string
  domain: string
  href: string
  note: string
  /** Local logo in /public; falls back to an initials badge */
  logo?: string
}

export type Feature = {
  title: string
  body: string
}

export type Project = {
  id: string
  name: string
  tagline: string
  /** ~150 chars, used for meta description and cards */
  summary: string
  description: string[]
  category: string
  applicationCategory: string
  audience: string
  role: string
  stack: string[]
  integrations: string[]
  features: Feature[]
  highlights: string[]
  liveUrl: string
  demoUrl?: string
  usedBy: Company[]
  images: { src: string; alt: string }[]
  keywords: string[]
  /** Tailwind gradient shown on hover, same style as the "me" site */
  color: string
}

const img = (id: string, alts: string[]) =>
  alts.map((alt, i) => ({ src: `/projects/${id}/${String(i + 1).padStart(2, '0')}.webp`, alt }))

export const projects: Project[] = [
  {
    id: 'krest',
    name: 'Krest',
    tagline: 'AI email & messaging platform for embroidery digitizing studios',
    summary:
      'Krest is an AI outreach engine for embroidery digitizing studios: per-recipient AI emails, multi-step sequences, a no-bounce firewall, a unified inbox and a WhatsApp AI agent.',
    description: [
      'Krest is the outreach engine built for embroidery digitizing and vectorizing businesses. Instead of a generic blast tool, every email, sequence and reply is tuned to win new shops and keep existing customers coming back.',
      'An AI copywriter writes a unique, structured email for every contact — greeting, a couple of tight paragraphs, a clear ask and a sign-off — personalized to their name, company and country, and guard-railed so it never invents a price or an address. If the AI cannot produce a clean draft, it holds the email for human review instead of guessing.',
      'Right before anything is sent, every address passes a suppression firewall: unsubscribed, hard-bounced, blacklisted, suppressed or malformed addresses are dropped, so nothing that could bounce ever leaves. Replies land in a Gmail-style inbox and automatically stop the sequence, so a real conversation is never interrupted by a robot.',
      'Alongside email, Krest runs a full WhatsApp workspace with Olivia, an AI agent that answers from the knowledge base, sends approved broadcast templates and escalates to a human the moment someone needs one.',
    ],
    category: 'AI Email Outreach',
    applicationCategory: 'BusinessApplication',
    audience: 'Embroidery digitizing & vectorizing studios',
    role: 'Product design, full-stack engineering, AI pipeline & infrastructure',
    stack: ['Next.js', 'React', 'AI / LLMs', 'Gmail OAuth', 'SMTP', 'WhatsApp Business API'],
    integrations: ['Gmail', 'SMTP senders', 'WhatsApp', 'Email verification & MX checks'],
    features: [
      { title: 'AI copywriter', body: 'A unique email written for each recipient, with the AI model selectable per step, or fixed copy with merge fields when exact wording matters.' },
      { title: 'Multi-step sequences', body: 'Journeys each contact walks on their own clock — welcome, follow-up, win-back — with per-step waits and a live preview.' },
      { title: 'No-bounce firewall', body: 'Every send passes suppression checks, with optional live verification and MX lookups. Your sender reputation stays protected.' },
      { title: 'Unified reply inbox', body: 'Replies land in one Gmail-style inbox and halt the sequence automatically. Bounces auto-suppress.' },
      { title: 'WhatsApp + Olivia', body: 'A WhatsApp workspace with an AI agent that answers from your knowledge base and hands off to a human when needed.' },
      { title: 'Live analytics', body: 'Opens, clicks, replies, bounces and forecasts, split by audience, channel, sender and sequence.' },
      { title: 'Quality review queue', body: 'Low-scoring or failed drafts never send — they wait for a human to approve, edit or regenerate.' },
      { title: 'Contacts & dedup', body: 'A unified contact book with lifecycle stages, organizations, duplicate detection and a six-month dormancy model.' },
    ],
    highlights: [
      'Sender rotation, daily caps and send windows',
      'One-click Gmail connect over OAuth',
      'One-click unsubscribe, honored instantly',
      'Scoped users, permissions and support tickets',
      'Dev / prod sandbox switch',
    ],
    liveUrl: 'https://krest.mueed.xyz',
    demoUrl: 'https://demo.krest.mueed.xyz',
    usedBy: [
      { name: 'DigitEMB', domain: 'digitemb.com', href: 'https://digitemb.com', logo: '/clients/digitemb.png', note: 'Runs its customer outreach, sequences and WhatsApp support on Krest.' },
    ],
    images: img('krest', [
      'Krest landing page — warm, personal outreach at scale without the bounces',
      'Krest overview dashboard with live sending status and system checks',
      'Krest multi-step email sequences',
      'Krest email analytics: opens, replies and bounce rates',
      'Krest unified reply inbox',
      'Krest one-time email campaigns',
      'Krest feature overview for digitizing studios',
    ]),
    keywords: ['AI email outreach', 'email sequences', 'cold email software', 'embroidery digitizing CRM', 'no-bounce email', 'WhatsApp AI agent'],
    color: 'from-slate-800 to-black',
  },
  {
    id: 'krispin',
    name: 'Krispin',
    tagline: 'AI WhatsApp agent for online stores',
    summary:
      'Krispin answers store customers on WhatsApp around the clock, hands tricky chats to your team, and runs referral campaigns, broadcasts and warranty claims from one dashboard.',
    description: [
      'Krispin is a tireless WhatsApp agent for e-commerce stores. Customers message the store’s WhatsApp number and get an instant answer, day or night — trained on the store’s FAQs, files and product catalog, and written in the brand’s voice.',
      'When a customer needs a person, the chat is escalated and the team takes over in the same thread. Every conversation lives in one searchable inbox with escalations flagged at the top and each customer’s tags, orders and spend beside the chat.',
      'Beyond support, Krispin is a growth engine: referral campaigns with prizes and leaderboards, approved WhatsApp template broadcasts to hundreds of customers at once, restock waitlists, and warranty claims raised straight from the chat with photos and order details attached.',
    ],
    category: 'AI Customer Support',
    applicationCategory: 'BusinessApplication',
    audience: 'Online stores & D2C brands',
    role: 'Product design, full-stack engineering, AI agent & infrastructure',
    stack: ['Next.js', 'React', 'AI / LLMs', 'WhatsApp Business API'],
    integrations: ['WhatsApp', 'Product catalog', 'Knowledge base & FAQs'],
    features: [
      { title: '24/7 AI replies', body: 'Instant answers around the clock from your FAQs, documents and catalog, including order and stock questions.' },
      { title: 'Human handoff', body: 'Escalated chats are flagged and your team takes over in the same thread, with alerts so nothing slips.' },
      { title: 'Unified inbox', body: 'Every WhatsApp conversation in one list with customer tags, order value, quick messages and chat export.' },
      { title: 'Referral campaigns', body: 'Run referral contests with prizes and leaderboards, all inside WhatsApp.' },
      { title: 'Template broadcasts', body: 'Send approved WhatsApp templates to hundreds of customers in one broadcast.' },
      { title: 'Warranty claims', body: 'Customers report faulty products in the chat; Krispin collects details and photos and logs a claim for review.' },
      { title: 'Product waitlist', body: 'Out-of-stock items get a waitlist with demand counts, so you can message everyone the moment stock is back.' },
      { title: 'Live analytics', body: 'Message volume, escalation trends, B2B / D2C split and spend per customer.' },
    ],
    highlights: [
      'Customers never install an app or fill a form',
      'Trained on your own FAQs, files and catalog',
      'Approve, reject and annotate warranty claims',
      'Demand counts per out-of-stock product',
    ],
    liveUrl: 'https://krispin.mueed.xyz',
    demoUrl: 'https://demo.krispin.mueed.xyz',
    usedBy: [
      { name: 'Boost Lifestyle', domain: 'boost-lifestyle.co', href: 'https://boost-lifestyle.co', logo: '/clients/boost-lifestyle.png', note: 'Handles WhatsApp customer support, campaigns and warranty claims with Krispin.' },
    ],
    images: img('krispin', [
      'Krispin landing page — the tireless WhatsApp agent for online stores',
      'Krispin unified WhatsApp inbox with AI and human replies',
      'Krispin store dashboard',
      'Krispin analytics: message activity and escalation trends',
      'Krispin referral campaigns',
      'Krispin product inventory',
      'Krispin restock waitlist with demand per product',
    ]),
    keywords: ['WhatsApp AI agent', 'WhatsApp customer support', 'ecommerce chatbot', 'WhatsApp broadcast', 'referral campaigns', 'warranty claims'],
    color: 'from-emerald-950 to-black',
  },
  {
    id: 'etcher',
    name: 'Etcher',
    tagline: 'Simple & efficient HR & project management for small startups',
    summary:
      'Etcher is a no-nonsense HR and project console for small teams: employee roster, attendance, tasks, project boards, Discord notifications and live payroll analytics.',
    description: [
      'Etcher is the no-nonsense console for managing a team. Every employee, every task and every project in one place — complete visibility, zero clutter.',
      'The roster is the home of your workforce: search, filter and drag-to-reorder the whole team, mark attendance inline and let performance ratings update automatically from real activity. Every employee also gets a clean public profile page, shareable by link, with salary data kept private.',
      'Tasks and project boards keep work moving, and Discord sync means the right person hears about every assignment, status change and priority bump instantly. A built-in analytics layer tracks monthly payroll obligations, presence rates and department-level performance straight from your data.',
    ],
    category: 'HR & Project Management',
    applicationCategory: 'BusinessApplication',
    audience: 'Small startups & agencies',
    role: 'Product design, full-stack engineering & deployment',
    stack: ['Next.js', 'React', 'Discord Webhooks'],
    integrations: ['Discord'],
    features: [
      { title: 'Employee roster', body: 'Roles, departments, contact details, ratings and attendance in one searchable, reorderable grid.' },
      { title: 'Attendance tracking', body: 'Mark daily attendance inline and filter the full attendance history.' },
      { title: 'Tasks & projects', body: 'Assign, prioritize and track tasks across the team on clean project boards.' },
      { title: 'Discord notifications', body: 'Auto-pings on assignment, status and priority changes, plus manual reminders with rich embeds.' },
      { title: 'Public profiles', body: 'A shareable profile per employee — no login needed, sensitive salary data kept private.' },
      { title: 'Live analytics', body: 'Monthly payroll totals, average presence rate and per-department performance.' },
    ],
    highlights: [
      'Auto-computed performance ratings',
      'Grid and table views',
      'Dark & light mode',
      'Real-time updates',
    ],
    liveUrl: 'https://etcher.mueed.xyz',
    demoUrl: 'https://demo.etcher.mueed.xyz',
    usedBy: [
      { name: 'ExtensorLabs', domain: 'extensorlabs.com', href: 'https://extensorlabs.com', note: 'Manages its team roster, attendance and project work on Etcher.' },
    ],
    images: img('etcher', [
      'Etcher landing page — the no-nonsense console for managing your team',
      'Etcher platform modules: employees, tasks and analytics',
      'Etcher shareable profiles and Discord sync',
      'Etcher data-driven analytics',
      'Etcher call to action — take control of your team',
    ]),
    keywords: ['HR software for startups', 'employee management', 'attendance tracking', 'project management', 'Discord task notifications'],
    color: 'from-slate-900 to-black',
  },
  {
    id: 'classman',
    name: 'Classman',
    tagline: 'Class & batch scheduling for educators',
    summary:
      'Classman is all-in-one scheduling software for educators: plan batches, run a weekly scheduler, track curriculum and postponements, and share read-only timetables with students.',
    description: [
      'Classman is a ruthless scheduler for high-volume educators — zero confusion and complete visibility across every batch, every session, every day.',
      'The weekly command center shows all classes across every batch in a single view. Mark sessions as completed, track timing and postponements, and switch to a monthly forecast to see what’s coming. Each batch gets its own schedule, duration and color code.',
      'Classman is built for students too. A public directory lists every active and completed batch, students can look up their own schedule with a code — no login required — and each course curriculum is published as a clean module-by-module timeline. A live availability view shows only busy blocks, never class details.',
    ],
    category: 'Education & Scheduling',
    applicationCategory: 'EducationalApplication',
    audience: 'Teachers, tutors & coaching academies',
    role: 'Product design, full-stack engineering & deployment',
    stack: ['Next.js', 'React', 'PWA'],
    integrations: ['Classroom & group links'],
    features: [
      { title: 'Weekly scheduler', body: 'Every session across every batch in one unified week view, with completion tracking and per-session notes.' },
      { title: 'Batch management', body: 'Organize students into batches with custom schedules, durations and color codes.' },
      { title: 'Postponement matrix', body: 'Track postponements and delay trends so nothing quietly slips.' },
      { title: 'Completion analytics', body: 'Execution rates, postponement frequency and per-batch diagnostics.' },
      { title: 'Public schedule lookup', body: 'Students enter a code from their instructor to see their calendar, timings and resources.' },
      { title: 'Public curriculum', body: 'Modules, topics and subtopics visualized as a vertical timeline with estimated days per topic.' },
    ],
    highlights: [
      'Weekly & monthly views',
      'Read-only public timetables',
      'Live availability without class details',
      'Dark & light mode',
    ],
    liveUrl: 'https://classman.mueed.xyz',
    demoUrl: 'https://demo.classman.mueed.xyz',
    usedBy: [
      { name: 'Abdul Mueed', domain: 'mueed.xyz', href: 'https://mueed.xyz', logo: '/icon.png', note: 'Built for and used daily to run my own teaching batches.' },
    ],
    images: img('classman', [
      'Classman landing page — the ruthless scheduler for high-volume educators',
      'Classman weekly scheduler across batches',
      'Classman monthly schedule forecast',
      'Classman analytics center with execution rate and postponement matrix',
      'Classman scheduler display options',
    ]),
    keywords: ['class scheduling software', 'batch scheduler', 'teacher timetable', 'curriculum tracking', 'online class schedule'],
    color: 'from-zinc-900 to-black',
  },
  {
    id: 'vance',
    name: 'Vance',
    tagline: 'Project & task management platform for freelancers',
    summary:
      'Vance is a freelance command center: client projects, an auto-scheduler that plans your days, a lightweight CRM and analytics on where your time and revenue go.',
    description: [
      'Vance is the operating system for a freelance practice. It replaces the tangle of spreadsheets, sticky notes and calendar guesswork that comes with running client work solo.',
      'Log every project once — scope, client, money, links, tasks and revision requests — and Vance turns it into a live day-by-day plan. Give each task an estimate, a priority and a deadline, and the auto-scheduler packs your working days, flagging at-risk and overdue work before it slips.',
      'Contacts keep clients, leads and collaborators in one place, and analytics show revenue earned vs pending, hours per project, your busiest fields and how often each client asks for changes — the numbers that tell you which work is actually worth it.',
    ],
    category: 'Freelance Management',
    applicationCategory: 'BusinessApplication',
    audience: 'Freelancers & solo studios',
    role: 'Product design, full-stack engineering & deployment',
    stack: ['Next.js', 'React'],
    integrations: [],
    features: [
      { title: 'Projects', body: 'Every engagement in one place — tasks, changes, money, links and status. Zero spreadsheets.' },
      { title: 'Auto scheduler', body: 'Estimates and deadlines in, a packed day-by-day plan out, with a configurable daily hour budget.' },
      { title: 'Contacts CRM', body: 'Clients, leads and collaborators with relationship status and linked projects.' },
      { title: 'Analytics', body: 'Earned vs pending revenue, time per project, field and source breakdowns, change-request frequency.' },
      { title: 'Today’s focus', body: 'A dashboard that opens on active projects, pending tasks, revenue on the line and today’s plan.' },
    ],
    highlights: [
      'At-risk & overdue flagging',
      'Week, day and list views',
      'Teal-and-amber design in dark & light',
    ],
    liveUrl: 'https://vance.mueed.xyz',
    demoUrl: 'https://demo.vance.mueed.xyz',
    usedBy: [],
    images: img('vance', [
      'Vance landing page — the freelance command center',
      'Vance dashboard in light mode',
      'Vance auto-scheduler week view',
      'Vance revenue and workload analytics',
      'Vance dashboard in dark mode',
    ]),
    keywords: ['freelance project management', 'freelancer CRM', 'auto scheduler', 'task planner for freelancers', 'freelance revenue tracking'],
    color: 'from-neutral-900 to-black',
  },
  {
    id: 'parhle',
    name: 'Parhle',
    tagline: 'Notes & resources sharing platform for university students',
    summary:
      'Parhle is a free, student-run platform for sharing study notes, past papers, books and YouTube channels, curated by subject and university.',
    description: [
      'Parhle (from “Parhle Fail Hojayega”) is a free, student-run platform where knowledge shared is power multiplied. Students find curated notes, past papers, books and recommended YouTube channels, organized by university and subject.',
      'Anyone can contribute: upload notes and summaries through a simple interface, and every submission goes through verification before it goes public. If something is missing, students can request it and help each other fill the gaps.',
      'Parhle started as a small notes site and grew into a full platform serving students across multiple universities, with accounts, profiles, contribution tracking and clear content and copyright policies.',
    ],
    category: 'Education',
    applicationCategory: 'EducationalApplication',
    audience: 'University students',
    role: 'Founder, design & full-stack engineering',
    stack: ['Next.js', 'React', 'PWA'],
    integrations: [],
    features: [
      { title: 'Curated notes', body: 'Peer-reviewed study material organized by university and subject.' },
      { title: 'Books', body: 'A searchable library of textbooks with direct links.' },
      { title: 'Channels', body: 'Recommended YouTube channels for each subject, curated by students.' },
      { title: 'Resources', body: 'Past papers, notes and playlists with filters by subject.' },
      { title: 'Requests', body: 'Ask for what you need and let classmates fill the gap.' },
      { title: 'Verified content', body: 'Every upload is reviewed before it goes public.' },
    ],
    highlights: ['100+ active users', '500+ study materials', '30+ subjects', '3+ universities'],
    liveUrl: 'https://parhle.mueed.xyz',
    usedBy: [],
    images: img('parhle', [
      'Parhle landing page — knowledge shared is power multiplied',
      'Parhle books library',
      'Parhle study resources',
      'Parhle recommended YouTube channels',
      'Why Parhle stands out',
    ]),
    keywords: ['free study notes', 'past papers', 'university notes', 'UBIT notes', 'student resources Pakistan'],
    color: 'from-gray-900 to-black',
  },
  {
    id: 'brenks',
    name: 'Brenks',
    tagline: 'AI-assisted workflow orchestration & dashboard generation for SMEs',
    summary:
      'Brenks is an AI-SaaS automation platform for SME owners: compose backend automations from hand-picked modules, route them visually, and let an AI co-pilot generate new ones.',
    description: [
      'Brenks is an AI-SaaS platform that lets SME owners build robust backend automations from hand-picked modules — database layers, auto-generated CRUD interfaces and pipelines — without touching boilerplate.',
      'Can’t find the right module? Describe it. The built-in co-pilot generates secure Python or Node.js modules natively inside the dashboard. Modules are wired together in a visual flow editor that formats data between schemas automatically, so no glue code is needed.',
      'Existing platforms like Stripe, Twilio, OpenAI, Shopify and SendGrid dock straight into the engine, and the whole system is designed around encryption at rest and automatic scaling.',
    ],
    category: 'Workflow Automation',
    applicationCategory: 'DeveloperApplication',
    audience: 'SME owners & operators',
    role: 'Product design, full-stack engineering & AI integration',
    stack: ['Next.js', 'React', 'AI / LLMs', 'Node.js', 'Python'],
    integrations: ['Stripe', 'Twilio', 'OpenAI', 'Shopify', 'AWS', 'GCP', 'Vercel', 'SendGrid'],
    features: [
      { title: 'Module catalog', body: 'DB layers, CRUD UIs, pipelines and 99+ more modules to compose automations.' },
      { title: 'AI co-pilot', body: 'Describe a module and Brenks generates it in Python or Node.js inside your dashboard.' },
      { title: 'Visual routing', body: 'Drag, drop and link modules in a spatial flow editor with automatic schema mapping.' },
      { title: 'Plug & play integrations', body: 'Dock existing platforms directly into the engine.' },
      { title: 'Secure by default', body: 'AES-256 encryption at rest and a zero-trust approach on every module.' },
      { title: 'Dynamic dashboards', body: 'Auto-generated interfaces for working with your data.' },
    ],
    highlights: ['AI-generated modules', 'Visual flow editor', 'Guest demo login on the live site'],
    liveUrl: 'https://brenks.mueed.xyz',
    usedBy: [],
    images: img('brenks', [
      'Brenks landing page — business, engineered',
      'Brenks visual automation flow editor',
      'Brenks modules and AI co-pilot',
      'Brenks security: encryption at rest',
      'Brenks zero-ops scaling',
    ]),
    keywords: ['SME automation', 'AI workflow automation', 'no-code backend', 'workflow orchestration', 'AI dashboard generator'],
    color: 'from-stone-900 to-black',
  },
]

export const getProject = (id: string) => projects.find((p) => p.id === id)

export const clients = projects.flatMap((p) =>
  p.usedBy.filter((c) => c.domain !== 'mueed.xyz').map((c) => ({ ...c, project: p })),
)
