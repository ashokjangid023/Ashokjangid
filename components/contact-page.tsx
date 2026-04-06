"use client";

import { FormEvent, useState } from "react";

import { contactCards, socialLinks } from "@/data/site-content";

import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { useSiteContext } from "./site-context";

export function ContactPage() {
  const { openAuthModal, showToast } = useSiteContext();
  const [form, setForm] = useState({
    email: "",
    message: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (form.message.trim().length < 20) {
      nextErrors.message = "Tell us a bit more so we can respond helpfully.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast({
        title: "Contact form needs a quick review",
        description: "A few fields still need to be completed before sending.",
        tone: "info",
      });
      return;
    }

    setForm({ email: "", message: "", name: "" });
    setErrors({});
    showToast({
      title: "Message sent",
      description: "Zezo Web will follow up with next steps and a suggested timeline.",
      tone: "success",
    });
  };

  return (
    <div className="overflow-x-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
              Contact
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-[var(--text-primary)] sm:text-6xl">
              Let&apos;s turn your next website into a better business asset.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Reach out for a redesign, launch sprint, SEO upgrade, or a polished new business site. The contact form is fully interactive and validated, and the live chat mock is ready in the corner whenever you want it.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="button-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white"
              >
                Start a Project
              </button>
              <a
                href="#map"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-6 text-sm font-semibold text-[var(--text-primary)]"
              >
                View Location
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                    <Icon name={card.icon} className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    {card.title}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {card.caption}
                  </p>
                </div>
              ))}
              <div className="rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.12)] sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Socials
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      Follow Zezo Web across social platforms or use the live chat mock for a quick starting point.
                    </p>
                  </div>
                  <Icon name="users" className="h-8 w-8 text-[var(--brand-secondary)]" />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-white/20"
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-7 shadow-[0_20px_80px_rgba(15,23,42,0.14)]">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
              Send a message
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-[var(--text-primary)]">
              Contact form with front-end validation
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Field
                label="Name"
                value={form.name}
                placeholder="Jordan Lee"
                onChange={(value) => setForm((current) => ({ ...current, name: value }))}
                error={errors.name}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                placeholder="jordan@company.com"
                onChange={(value) => setForm((current) => ({ ...current, email: value }))}
                error={errors.email}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  placeholder="Tell us about the website, timeline, and goals."
                  className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]"
                />
                {errors.message ? (
                  <p className="text-sm text-rose-400">{errors.message}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="button-primary inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid gap-6">
            <div
              id="map"
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-3 shadow-[0_20px_80px_rgba(15,23,42,0.14)]"
            >
              <iframe
                title="Zezo Web map"
                src="https://www.google.com/maps?q=Indiranagar%20Bengaluru&z=13&output=embed"
                className="h-[360px] w-full rounded-[1.6rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-7 shadow-[0_20px_80px_rgba(15,23,42,0.14)]">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
                Office rhythm
              </p>
              <div className="mt-6 space-y-4">
                {[
                  { icon: "clock" as const, title: "Business hours", copy: "Mon-Fri - 9:00 AM to 6:00 PM IST" },
                  { icon: "chat" as const, title: "Live chat", copy: "Use the floating chat button for a quick UI demo." },
                  { icon: "rocket" as const, title: "Typical kickoff", copy: "Discovery calls are usually scheduled within 48 hours." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)]">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  error,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]"
      />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}
