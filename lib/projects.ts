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
  /** Plain-English problem → solution → how it solves it → benefits, then a technical paragraph */
  about: {
    problem: string
    solution: string
    approach: string
    benefits: string
    technical: string
  }
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
    about: {
      problem:
        "Embroidery digitizing studios get most of their work from apparel shops, print shops and brands. Keeping in touch with hundreds of these customers by hand takes hours every week. When emails are sent in bulk, many bounce or land in spam, which slowly damages the studio’s email reputation, and replies get lost in a crowded inbox.",
      solution:
        "A studio needs a way to send a personal email to every customer without writing each one, follow up at the right time, never email an address that will bounce, and see every reply in one place.",
      approach:
        "Krest writes a personal email for each customer using AI and sends follow-ups on a schedule, so the studio doesn’t have to. Before anything goes out, it checks every address and skips the risky ones, so emails don’t bounce. When someone replies, the automatic emails stop and the reply lands in one shared inbox for the team. Krest also answers WhatsApp messages with an AI assistant that hands over to a person when needed.",
      benefits:
        "Studios reach far more customers in a fraction of the time, win back customers who went quiet, and protect their email reputation. Nobody gets an awkward automated follow-up after they’ve already replied, every conversation is in one place, and clear numbers show which emails actually bring in work.",
      technical:
        "Krest is a Next.js web application built around a send pipeline: an audience builder with live deliverability counts, per-recipient LLM generation with guardrails and quality scoring (failed or low-scoring drafts are routed to a human review queue instead of sending), and a suppression firewall that filters unsubscribed, hard-bounced, blacklisted and malformed addresses, with optional live verification and MX lookups. Delivery rotates across Gmail accounts connected over OAuth and SMTP senders within daily caps and send windows. Open and click tracking, reply detection that halts sequences, and automatic bounce suppression feed the analytics. The WhatsApp workspace runs on the WhatsApp Business API with a knowledge-base-grounded AI agent and human escalation, alongside scoped user permissions and a dev/prod sandbox switch.",
    },
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
    about: {
      problem:
        "Online stores get most of their customer questions on WhatsApp: “Is this in stock?”, “Where is my order?”, “Does it have a warranty?”. Replying quickly to every message means having staff on their phones all day and night, and a late reply often means a lost sale. Complaints and warranty requests get buried in hundreds of chats.",
      solution:
        "A store needs a helper that replies instantly at any hour, knows the store’s products and policies, and passes the tricky conversations to a real person.",
      approach:
        "Krispin connects to the store’s WhatsApp number and answers customers instantly, using the store’s own FAQs, documents and product list. When a customer is upset or needs a human, Krispin flags the chat and the team takes over in the same conversation. It also collects warranty claims with photos, keeps a waitlist for out-of-stock products, and lets the store run referral contests and send offers to many customers at once.",
      benefits:
        "Customers get answers in seconds instead of hours, so fewer sales slip away. The team spends its time only on the conversations that need a person, warranty claims and restock requests are organized instead of lost in chats, and the store can see what customers are asking about and how much they spend.",
      technical:
        "Krispin is a Next.js dashboard on top of the WhatsApp Business API. An LLM agent answers from retrieved store knowledge (FAQs, uploaded files and the product catalog) in the brand’s voice, with escalation rules that flag chats and hand them to a human in the same thread. The unified inbox shows live AI and human replies alongside customer tags, order value and history. Approved message templates power bulk broadcasts, referral campaigns track prizes and leaderboards, the warranty flow captures media and order details for approve/reject review, and the waitlist records demand per product for restock notifications. Analytics cover message volume, escalation trends, B2B/D2C split and customer spend.",
    },
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
    about: {
      problem:
        "Small startups usually track their team in spreadsheets, group chats and people’s memory. It’s hard to tell who showed up today, who is working on what, and how a project is going. Working out monthly salaries and attendance takes manual effort every month.",
      solution:
        "A small team needs one simple place for its people, attendance and tasks, which also tells people when something changes so nobody has to chase updates.",
      approach:
        "Etcher keeps the full team list, daily attendance, tasks and projects in one clean dashboard. When a task is assigned or changed, the right person automatically gets a message on Discord, where the team already talks. Every employee also gets a simple profile page that can be shared with a link.",
      benefits:
        "Managers spend less time on admin and more time on the work. Everyone knows what they own, updates aren’t missed, and payroll totals, attendance rates and team performance are visible at a glance instead of being rebuilt in a spreadsheet each month.",
      technical:
        "Etcher is a Next.js web application. Task assignment, status and priority changes trigger Discord webhook notifications with rich embeds, plus manual progress and reminder pings. Performance ratings are computed automatically from attendance and task activity. Public employee profiles are served on their own routes without authentication and exclude salary data. The analytics layer aggregates monthly payroll obligations, average presence rate and per-department performance from live data, and the roster supports drag-to-reorder, grid and table views, inline attendance marking and dark/light themes.",
    },
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
    about: {
      problem:
        "Teachers who run many batches of classes juggle timings across calendars and WhatsApp groups. Classes get postponed, it’s easy to lose track of how far each batch has got in the course, and students keep asking when the next class is.",
      solution:
        "A teacher needs one timetable that tracks every class across all batches, remembers what was taught and what was postponed, and lets students check their own schedule.",
      approach:
        "Classman shows every class for the week on one screen. The teacher marks each class as done or postponed, and Classman keeps count of progress for each batch. Students get a code to look up their own schedule without signing up, can read the full course outline, and can see when the teacher is busy.",
      benefits:
        "No missed or clashing classes, far fewer “when is the next class?” messages, and a clear picture of where every batch stands. The teacher can also see how often classes get postponed and which batches are falling behind.",
      technical:
        "Classman is a Next.js progressive web app. Batch rules (days, timings, duration) generate session schedules shown in weekly and monthly views. Each session records completion, postponement, timing and notes, which feed analytics on execution rate, postponement frequency and delay trends per batch. Public, read-only routes expose batch directories, code-based schedule lookup, curriculum timelines modelled as modules, topics and subtopics with estimated days, and an availability view that reveals only occupied time blocks, never class details.",
    },
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
    about: {
      problem:
        "Freelancers juggle many clients at once, each with their own deadlines, change requests and payments. All of this ends up in spreadsheets, notes and memory, so deadlines slip, it’s hard to know what to work on today, and it’s unclear which clients are actually worth the effort.",
      solution:
        "A freelancer needs one place for all client work that also plans their days for them and shows where their time and money really go.",
      approach:
        "In Vance you add each project once, with its tasks, deadlines, price and links. Vance then builds a day-by-day plan based on how long each task takes and when it’s due, and warns you about work that’s at risk of running late. It also keeps your clients and contacts in one place and tracks the money you’ve earned and are still owed.",
      benefits:
        "You always know exactly what to do today and what’s about to slip, so deadlines are met. You can see how much you’ve earned and what’s pending, and which clients ask for the most changes, which helps you price better and choose better work.",
      technical:
        "Vance is a Next.js web application. Its scheduler sorts tasks by deadline urgency and priority and packs them into working days within a configurable daily hour budget, flagging at-risk and overdue work, with week, day and list views. Projects hold tasks, change requests, financials and links; a lightweight CRM links contacts to projects with relationship status. Analytics aggregate earned versus pending revenue, time per project, field and source breakdowns and change-request frequency, all in a teal-and-amber design system with dark and light themes.",
    },
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
    about: {
      problem:
        "University students waste hours hunting for notes and past papers scattered across WhatsApp groups, Google Drive links and seniors’ phones. Good material gets lost every semester, and students at smaller universities often have no shared resources at all.",
      solution:
        "Students need one free, organized place where they can find and share study material by university and subject.",
      approach:
        "Parhle collects notes, past papers, books and recommended YouTube channels, sorted by university and subject. Any student can upload material, every upload is checked before it goes public, and students can request something that’s missing so others can help.",
      benefits:
        "It’s completely free, study prep takes far less time, and good material survives from one batch to the next instead of disappearing. Students who contribute help their classmates and build a reputation along the way.",
      technical:
        "Parhle is a Next.js progressive web app with user accounts and profiles. Submissions go through a verification step before publishing, and resources are indexed by university and subject with search and filters across notes, past papers, books and channels. A request system lets students ask for missing material, and published content, cookie and copyright policies back a takedown process for flagged content.",
    },
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
    about: {
      problem:
        "Small business owners need automations, like reacting to payments, sending notifications or moving data between tools, but hiring developers is expensive and generic no-code tools quickly hit their limits.",
      solution:
        "A business owner needs a way to build automations from ready-made building blocks, and get new blocks made on request, without writing code.",
      approach:
        "Brenks gives you ready-made modules, such as a database, screens to edit your data, and pipelines, which you connect on a visual canvas by dragging and linking them. If the block you need doesn’t exist, you describe it in plain words and Brenks’ AI builds it for you. It also plugs into tools businesses already use, like Stripe, Shopify and Twilio.",
      benefits:
        "Businesses can automate repetitive work without a development team, launch in days instead of months, and keep adding to their automations as they grow, at a fraction of the cost of custom software.",
      technical:
        "Brenks is a Next.js platform built on a module system: relational data-layer modules, auto-generated CRUD interfaces and pipeline modules composed in a spatial flow editor that maps data between schemas automatically, removing glue code. An LLM co-pilot generates new Python or Node.js modules inside the dashboard from a plain-language description. Integration modules dock services such as Stripe, Twilio, OpenAI, Shopify and SendGrid, and the data layer is designed around encryption at rest.",
    },
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
