"use client";

import Link from "next/link";
import {
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  faqs,
  features,
  heroMetrics,
  pricingPlans,
  services,
  stats,
  testimonials,
} from "@/data/site-content";
import { formatPrice } from "@/lib/utils";

import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { useSiteContext } from "./site-context";

export function HomePage() {
  const { openAuthModal, showToast } = useSiteContext();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const deferredQuery = useDeferredValue(query.toLowerCase().trim());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const serviceCategories = useMemo(
    () => ["All", ...new Set(services.map((service) => service.category))],
    []
  );

  const visibleServices = useMemo(() => {
    const filtered = services.filter((service) => {
      const matchesCategory = category === "All" || service.category === category;
      const matchesQuery =
        !deferredQuery ||
        `${service.title} ${service.description} ${service.category}`
          .toLowerCase()
          .includes(deferredQuery);

      return matchesCategory && matchesQuery;
    });

    const sorted = [...filtered];

    if (sortBy === "price-low") {
      sorted.sort((left, right) => left.price - right.price);
    } else if (sortBy === "price-high") {
      sorted.sort((left, right) => right.price - left.price);
    } else if (sortBy === "fastest") {
      sorted.sort((left, right) =>
        left.turnaround.localeCompare(right.turnaround)
      );
    }

    return sorted;
  }, [category, deferredQuery, sortBy]);

  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal className="grid gap-4 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl lg:grid-cols-3">
          {heroMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <p className="text-2xl font-semibold text-[var(--text-primary)]">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {metric.label}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything your business site needs to look premium and convert confidently."
          description="Zezo Web combines polished motion, scalable components, and conversion-minded content patterns so the whole experience feels intentional."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 120}>
              <div className="group h-full rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(79,70,229,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                  <Icon name={feature.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Explore services with filters, search, and sorting built right into the experience."
          description="This service explorer adds the richer UI layer you asked for, while keeping the structure reusable and easy to scale."
        />

        <Reveal className="mt-12 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.14)]">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3">
                <Icon name="search" className="h-5 w-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search development, SEO, automation..."
                  className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                />
              </div>
              <select
                value={sortBy}
                onChange={(event) =>
                  startTransition(() => {
                    setSortBy(event.target.value);
                  })
                }
                className="h-12 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-[var(--text-primary)] outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Sort: Price low-high</option>
                <option value="price-high">Sort: Price high-low</option>
                <option value="fastest">Sort: Fastest delivery</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3">
              {serviceCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setCategory(item);
                    })
                  }
                  className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                    category === item
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/5 text-[var(--text-secondary)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {visibleServices.map((service, index) => (
              <Reveal key={service.title} delay={index * 80}>
                <div className="group flex h-full flex-col rounded-[1.8rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                      <Icon name={service.icon} className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {service.description}
                  </p>
                  <div className="mt-6 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Investment
                      </p>
                      <p className="mt-2 font-semibold text-[var(--text-primary)]">
                        {formatPrice(service.price)}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Timeline
                      </p>
                      <p className="mt-2 font-semibold text-[var(--text-primary)]">
                        {service.turnaround}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      showToast({
                        title: `${service.title} selected`,
                        description: "Nice choice. Use Contact Us or Get Started to continue the inquiry.",
                        tone: "success",
                      })
                    }
                    className="button-primary mt-6 inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
                  >
                    Request this service
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Impact"
          title="Animated numbers that bring credibility to the story."
          description="Counters animate when they enter the viewport to create motion without sacrificing performance."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 90}>
              <CounterCard {...item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="A smooth testimonial slider with manual controls and autoplay."
          description="The interface rotates through client proof points automatically, while still staying interactive."
        />
        <Reveal className="mt-12 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.14)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-2 text-amber-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon key={index} name="star" className="h-5 w-5" />
                ))}
              </div>
              <Icon name="quote" className="h-10 w-10 text-[var(--brand-secondary)]" />
              <p className="mt-6 max-w-2xl font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">
                {testimonials[activeTestimonial]?.quote}
              </p>
              <div className="mt-8">
                <p className="font-semibold text-[var(--text-primary)]">
                  {testimonials[activeTestimonial]?.name}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {testimonials[activeTestimonial]?.role} -{" "}
                  {testimonials[activeTestimonial]?.company}
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <div className="grid gap-4">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                      index === activeTestimonial
                        ? "border-white/25 bg-white/10"
                        : "border-white/10 bg-transparent"
                    }`}
                  >
                    <p className="font-medium text-[var(--text-primary)]">
                      {testimonial.company}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                      {testimonial.quote.slice(0, 96)}...
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Flexible plans with a monthly or yearly toggle."
          description="Use the billing switch to preview pricing tiers while keeping the cards fully interactive."
        />
        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[var(--surface-strong)] p-2 shadow-[0_16px_60px_rgba(15,23,42,0.12)]">
            {(["monthly", "yearly"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setBilling(mode)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  billing === mode
                    ? "bg-white text-slate-950"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {mode === "monthly" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 120}>
              <div className={`h-full rounded-[2rem] border p-7 shadow-[0_20px_80px_rgba(15,23,42,0.14)] transition hover:-translate-y-1 ${
                plan.featured
                  ? "border-indigo-400/40 bg-[linear-gradient(180deg,rgba(79,70,229,0.22),rgba(15,23,42,0.92))]"
                  : "border-white/10 bg-[var(--surface-strong)]"
              }`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {plan.name}
                  </h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
                      Pro pick
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {plan.description}
                </p>
                <p className="mt-6 font-display text-5xl font-semibold text-[var(--text-primary)]">
                  {formatPrice(billing === "monthly" ? plan.monthly : plan.yearly)}
                  <span className="ml-2 text-base text-[var(--text-muted)]">
                    / month
                  </span>
                </p>
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[var(--brand-secondary)]">
                        <Icon name="check" className="h-4 w-4" />
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{feature}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className="button-primary mt-8 inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
                >
                  Choose {plan.name}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers that open smoothly and keep the page feeling alive."
          description="The accordion interaction is lightweight, responsive, and ready for real content."
        />
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 80}>
              <button
                type="button"
                onClick={() => setActiveFaq((current) => (current === index ? -1 : index))}
                className="w-full rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 text-left shadow-[0_16px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {faq.question}
                  </h3>
                  <Icon
                    name="chevron"
                    className={`h-5 w-5 text-[var(--text-muted)] transition ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  activeFaq === index ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}>
                  <p className="overflow-hidden text-sm leading-7 text-[var(--text-secondary)]">
                    {faq.answer}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.92),rgba(124,58,237,0.88))] px-8 py-12 text-white shadow-[0_30px_100px_rgba(79,70,229,0.3)] sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                Ready to launch
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Let&apos;s build a website that feels like your next growth milestone.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                Zezo Web is designed to look deployment-ready today, while staying flexible for real business content tomorrow.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950"
              >
                Get Started
              </button>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function HeroSection() {
  const { openAuthModal } = useSiteContext();

  return (
    <section className="relative isolate overflow-hidden pb-16">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="mx-auto grid min-h-[88svh] max-w-7xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <Reveal className="relative z-10">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--brand-secondary)] backdrop-blur-xl">
            Startup-grade digital presence
          </span>
          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] text-[var(--text-primary)] sm:text-6xl xl:text-7xl">
            Premium websites that help ambitious businesses look sharper and grow faster.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Zezo Web blends conversion-focused storytelling, polished motion, and scalable frontend engineering into a business website that feels ready for the next funding round.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="button-primary inline-flex h-[52px] items-center justify-center rounded-full px-7 text-sm font-semibold text-white"
            >
              Get Started
            </button>
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-7 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-xl"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
        <Reveal className="relative z-10" delay={140}>
          <div className="relative rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_28px_90px_rgba(15,23,42,0.2)] backdrop-blur-2xl">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-[rgba(59,130,246,0.22)] blur-3xl" />
            <div className="absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-[rgba(168,85,247,0.22)] blur-3xl" />
            <div className="relative grid gap-5">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      Launch snapshot
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-[var(--text-primary)]">
                      +182%
                    </p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                    <Icon name="chart" className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  Demo conversion lift after refreshing messaging, hero layout, and CTA structure.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Speed score
                  </p>
                  <p className="mt-3 font-display text-4xl font-semibold text-[var(--text-primary)]">
                    98
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Optimized for fast first impressions.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Design system
                  </p>
                  <p className="mt-3 font-display text-4xl font-semibold text-[var(--text-primary)]">
                    32
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Reusable sections ready to scale.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      Growth roadmap
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Messaging, motion, SEO, and conversion layers aligned.
                    </p>
                  </div>
                  <Icon name="rocket" className="h-8 w-8 text-[var(--brand-secondary)]" />
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    { label: "Story clarity", value: "92%" },
                    { label: "Interface polish", value: "88%" },
                    { label: "Launch readiness", value: "96%" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[var(--text-secondary)]">{item.label}</span>
                        <span className="font-semibold text-[var(--text-primary)]">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#3b82f6,#8b5cf6)]"
                          style={{ width: item.value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeading({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
        {description}
      </p>
    </Reveal>
  );
}

function CounterCard({
  label,
  suffix,
  value,
}: {
  label: string;
  suffix: string;
  value: number;
}) {
  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.12)]">
      <p className="font-display text-5xl font-semibold text-[var(--text-primary)]">
        <AnimatedCounter value={value} />
        {suffix}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let animationFrame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        const startedAt = performance.now();

        const update = (now: number) => {
          const progress = Math.min((now - startedAt) / 1300, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(value * eased));

          if (progress < 1) {
            animationFrame = window.requestAnimationFrame(update);
          }
        };

        animationFrame = window.requestAnimationFrame(update);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}
