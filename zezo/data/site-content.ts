export type IconName =
  | "spark"
  | "shield"
  | "layers"
  | "chart"
  | "code"
  | "mobile"
  | "seo"
  | "automation"
  | "check"
  | "quote"
  | "star"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "search"
  | "arrow"
  | "mail"
  | "phone"
  | "map"
  | "google"
  | "facebook"
  | "linkedin"
  | "instagram"
  | "x"
  | "chat"
  | "clock"
  | "users"
  | "rocket"
  | "chevron"
  | "send";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
];

export const heroMetrics = [
  { label: "Projects launched", value: "240+" },
  { label: "Avg. growth delivered", value: "38%" },
  { label: "Response time", value: "< 2 hrs" },
];

export const features = [
  {
    icon: "spark" as const,
    title: "Conversion-first journeys",
    description:
      "High-impact messaging, polished layouts, and persuasive flows built to turn visitors into booked calls.",
  },
  {
    icon: "layers" as const,
    title: "Scalable product systems",
    description:
      "Reusable components, clean architecture, and thoughtful content modeling that make growth easier.",
  },
  {
    icon: "shield" as const,
    title: "Reliable performance",
    description:
      "Fast-loading pages, accessible UI, and SEO-minded structure so your brand performs as well as it looks.",
  },
  {
    icon: "chart" as const,
    title: "Insightful optimization",
    description:
      "Analytics-ready pages, growth experiments, and smart content strategy to keep momentum compounding.",
  },
];

export const services = [
  {
    icon: "code" as const,
    title: "Web Development",
    category: "Development",
    badge: "Most Popular",
    price: 3800,
    turnaround: "3-5 weeks",
    description:
      "Premium websites, landing pages, and web platforms crafted for speed, clarity, and conversion.",
  },
  {
    icon: "mobile" as const,
    title: "App Development",
    category: "Development",
    badge: "New",
    price: 6400,
    turnaround: "6-10 weeks",
    description:
      "Cross-platform mobile experiences with clean UX, scalable code, and launch-ready polish.",
  },
  {
    icon: "seo" as const,
    title: "SEO Growth Systems",
    category: "Marketing",
    badge: "Growth",
    price: 2200,
    turnaround: "2-4 weeks",
    description:
      "Technical SEO, content structure, and search visibility improvements that compound over time.",
  },
  {
    icon: "automation" as const,
    title: "Workflow Automation",
    category: "Operations",
    badge: "Efficiency",
    price: 2900,
    turnaround: "2-3 weeks",
    description:
      "Automate lead capture, follow-ups, and reporting so your team can focus on high-value work.",
  },
  {
    icon: "spark" as const,
    title: "Brand Experience Design",
    category: "Design",
    badge: "Premium",
    price: 3400,
    turnaround: "2-5 weeks",
    description:
      "Visual systems, messaging direction, and immersive interface design that sharpen brand perception.",
  },
  {
    icon: "chart" as const,
    title: "Conversion Optimization",
    category: "Marketing",
    badge: "ROI",
    price: 2600,
    turnaround: "2-4 weeks",
    description:
      "Heatmap-informed refinements, A/B testing plans, and funnel tuning focused on measurable lift.",
  },
];

export const testimonials = [
  {
    name: "Amelia Stone",
    role: "Founder",
    company: "Northstar AI",
    quote:
      "Zezo Web transformed our product story into a site that finally matches the caliber of the platform. The launch page tripled demo requests in the first month.",
  },
  {
    name: "Raj Malhotra",
    role: "Growth Lead",
    company: "ScalePort",
    quote:
      "The team blended design and performance beautifully. It feels premium, loads instantly, and gave our sales team a sharper conversion funnel.",
  },
  {
    name: "Nina Alvarez",
    role: "COO",
    company: "Orbit Commerce",
    quote:
      "From strategy to execution, every detail felt intentional. Zezo Web gave us a polished digital presence we're proud to share with investors and customers.",
  },
];

export const pricingPlans = [
  {
    name: "Basic",
    monthly: 49,
    yearly: 39,
    description: "Ideal for early-stage teams validating a strong digital presence.",
    features: [
      "One conversion-focused landing page",
      "Responsive design system",
      "Basic SEO setup",
      "Email support",
    ],
  },
  {
    name: "Pro",
    monthly: 99,
    yearly: 79,
    description: "Best for startups ready to scale pipeline and brand credibility.",
    features: [
      "Multi-page business website",
      "Interactive UI sections",
      "Analytics and SEO enhancements",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Premium",
    monthly: 179,
    yearly: 149,
    description: "A partnership tier for ambitious brands shipping faster and smarter.",
    features: [
      "Custom web app or advanced integrations",
      "Conversion optimization roadmap",
      "Dedicated strategy sessions",
      "White-glove support",
    ],
  },
];

export const stats = [
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 120, suffix: "+", label: "Brands launched" },
  { value: 42, suffix: "%", label: "Average conversion lift" },
  { value: 14, suffix: "d", label: "Typical MVP sprint" },
];

export const faqs = [
  {
    question: "How quickly can Zezo Web launch a new site?",
    answer:
      "Most business websites launch in 3 to 5 weeks, depending on scope, content readiness, and integrations.",
  },
  {
    question: "Do you only work with startups?",
    answer:
      "Startups are a major focus, but we also partner with service businesses and growing teams that need a sharper digital presence.",
  },
  {
    question: "Can you handle copy, SEO, and design together?",
    answer:
      "Yes. We can lead the strategy, interface design, development, and search-friendly content structure as one streamlined engagement.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer optimization retainers, performance reviews, design updates, and support plans so your site keeps improving after release.",
  },
];

export const teamMembers = [
  {
    name: "Lena Carter",
    role: "Creative Director",
    avatar: "/team-lena.svg",
    bio: "Shapes the visual voice, storytelling systems, and high-trust brand experiences clients remember.",
    expertise: ["Brand Systems", "Art Direction", "UX Copy"],
  },
  {
    name: "Ibrahim Khan",
    role: "Lead Engineer",
    avatar: "/team-ibrahim.svg",
    bio: "Builds fast, resilient experiences with a strong focus on maintainability, accessibility, and speed.",
    expertise: ["Frontend", "Architecture", "Performance"],
  },
  {
    name: "Sophia Nguyen",
    role: "Growth Strategist",
    avatar: "/team-sophia.svg",
    bio: "Connects positioning, funnels, and analytics so every launch is designed to generate momentum.",
    expertise: ["SEO", "CRO", "Messaging"],
  },
  {
    name: "Mateo Silva",
    role: "Product Partner",
    avatar: "/team-mateo.svg",
    bio: "Keeps delivery smooth, priorities sharp, and client collaboration grounded in outcomes.",
    expertise: ["Delivery", "Roadmapping", "Ops"],
  },
];

export const timeline = [
  {
    year: "2020",
    title: "Studio launched",
    description:
      "Zezo Web started as a boutique design and development studio helping founders launch faster.",
  },
  {
    year: "2022",
    title: "Growth partnerships",
    description:
      "Expanded into SEO, CRO, and automation to support the full customer journey after launch.",
  },
  {
    year: "2024",
    title: "Global delivery model",
    description:
      "Built a remote-first team and repeatable systems for startups across SaaS, fintech, and commerce.",
  },
  {
    year: "2026",
    title: "Premium experience engine",
    description:
      "Today we craft immersive websites and product experiences that feel premium and convert with confidence.",
  },
];

export const skills = [
  { label: "Product Design", value: 94 },
  { label: "Frontend Engineering", value: 97 },
  { label: "SEO Strategy", value: 89 },
  { label: "Automation Workflows", value: 86 },
  { label: "Conversion Optimization", value: 92 },
];

export const contactCards = [
  {
    icon: "mail" as const,
    title: "Email us",
    value: "hello@zezoweb.com",
    caption: "Replies within a business day.",
  },
  {
    icon: "phone" as const,
    title: "Call us",
    value: "+91 80 5555 2048",
    caption: "Mon-Fri, 9am to 6pm IST.",
  },
  {
    icon: "map" as const,
    title: "Visit us",
    value: "Indiranagar, Bengaluru",
    caption: "Hybrid team with global delivery.",
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" as const },
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" as const },
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" as const },
  { label: "X", href: "https://www.x.com", icon: "x" as const },
];
