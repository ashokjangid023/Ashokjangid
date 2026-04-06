"use client";

import Image from "next/image";

import { skills, teamMembers, timeline } from "@/data/site-content";

import { Icon } from "./icons";
import { Reveal } from "./reveal";

export function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
              About Zezo Web
            </p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-[var(--text-primary)] sm:text-6xl">
              A modern studio helping businesses show up with more clarity, polish, and momentum.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Zezo Web was built for founders and business teams who need more than a pretty homepage. We create digital experiences that explain value faster, build trust instantly, and move people toward action.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_22px_90px_rgba(15,23,42,0.16)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Industries served", value: "SaaS, fintech, commerce" },
                  { label: "Delivery model", value: "Remote-first, globally aligned" },
                  { label: "Core promise", value: "Beautiful interfaces that perform" },
                  { label: "Best fit", value: "Teams ready to scale perception" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        {[
          {
            icon: "rocket" as const,
            title: "Mission",
            body: "To help ambitious brands launch websites that look premium, explain their value clearly, and create business momentum from the first click.",
          },
          {
            icon: "spark" as const,
            title: "Vision",
            body: "To become the go-to digital partner for modern teams that want their online presence to feel as strong as the product or service behind it.",
          },
        ].map((item, index) => (
          <Reveal key={item.title} delay={index * 120}>
            <div className="h-full rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-7 shadow-[0_18px_70px_rgba(15,23,42,0.13)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.18))] text-[var(--brand-secondary)]">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold text-[var(--text-primary)]">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
            Team
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
            A compact team designed to move from idea to launch without the usual drag.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 90}>
              <div className="group h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] shadow-[0_18px_70px_rgba(15,23,42,0.13)] transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-secondary)]">
                    {member.role}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--text-primary)]">
                    {member.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {member.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.expertise.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
                Journey
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
                A timeline that shows how Zezo Web evolved into a full experience partner.
              </h2>
            </Reveal>
            <div className="relative mt-12 space-y-6 border-l border-white/10 pl-8">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={index * 110}>
                  <div className="relative rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-6 shadow-[0_16px_60px_rgba(15,23,42,0.12)]">
                    <span className="absolute -left-[2.55rem] top-8 h-4 w-4 rounded-full border-4 border-[var(--brand-primary)] bg-[var(--surface-panel)]" />
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-secondary)]">
                      {item.year}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--brand-secondary)]">
                Skills
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
                Progress bars that show the strengths behind every launch.
              </h2>
            </Reveal>
            <div className="mt-12 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-7 shadow-[0_18px_70px_rgba(15,23,42,0.13)]">
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <Reveal key={skill.label} delay={index * 100}>
                    <div>
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="font-medium text-[var(--text-primary)]">
                          {skill.label}
                        </span>
                        <span className="text-[var(--text-secondary)]">{skill.value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#8b5cf6)] shadow-[0_8px_24px_rgba(79,70,229,0.35)]"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
