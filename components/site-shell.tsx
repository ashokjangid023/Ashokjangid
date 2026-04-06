"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FormEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

import { contactCards, navLinks, services, socialLinks } from "@/data/site-content";
import { cn } from "@/lib/utils";

import { Icon } from "./icons";
import { useSiteContext } from "./site-context";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { closeSearch, isAuthOpen, isReady, isSearchOpen } = useSiteContext();

  useEffect(() => {
    closeSearch();
  }, [closeSearch, pathname]);

  return (
    <>
      <LoadingOverlay isReady={isReady} />
      <Navbar />
      <main className="relative flex-1 pt-24">
        <div key={pathname} className="page-transition">
          {children}
        </div>
      </main>
      <Footer />
      {isSearchOpen ? <SearchPanel /> : null}
      {isAuthOpen ? <AuthModal /> : null}
      <ToastViewport />
      <BackToTopButton />
      <LiveChatWidget />
    </>
  );
}

function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openAuthModal, openSearch, theme, toggleTheme } = useSiteContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        isScrolled ? "px-3 pt-3" : "px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 border border-white/10 bg-[var(--surface-strong)] px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 sm:px-6",
          isScrolled ? "rounded-2xl" : "rounded-none border-x-0 border-t-0 sm:rounded-b-3xl"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)]">
            <span className="text-lg font-semibold">ZW</span>
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Zezo Web
            </p>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">
              Premium growth studio
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]",
                pathname === link.href && "text-[var(--text-primary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={openSearch}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-[var(--text-secondary)] transition hover:border-white/20 hover:bg-white/10 hover:text-[var(--text-primary)]"
          >
            <Icon name="search" className="h-4 w-4" />
            Search
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:bg-white/10"
            aria-label="Toggle theme"
          >
            <Icon
              name={theme === "dark" ? "sun" : "moon"}
              className="h-5 w-5"
            />
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => openAuthModal("signup")}
            className="button-primary inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold text-white"
          >
            Get Started
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openSearch}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
            aria-label="Search"
          >
            <Icon name="search" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            <Icon
              name={theme === "dark" ? "sun" : "moon"}
              className="h-4 w-4"
            />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
            aria-expanded={isMobileMenuOpen}
            aria-label="Open menu"
          >
            <Icon
              name={isMobileMenuOpen ? "close" : "menu"}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "mx-3 mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-strong)] shadow-[0_22px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          isMobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-3 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-primary)] transition hover:border-white/10"
            >
              {link.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          ))}
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-[var(--text-primary)]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="button-primary inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const { openAuthModal, showToast } = useSiteContext();

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast({
        title: "Enter a valid email",
        description: "We use the newsletter form to send launch tips and product updates.",
        tone: "info",
      });
      return;
    }

    setEmail("");
    showToast({
      title: "You're subscribed",
      description: "Zezo Web updates will land in your inbox soon.",
      tone: "success",
    });
  };

  return (
    <footer className="border-t border-white/10 bg-[var(--surface-footer)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)]">
              <span className="text-lg font-semibold">ZW</span>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Zezo Web
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Modern business websites that look premium and perform fast.
              </p>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            We help ambitious teams turn their online presence into a confident
            sales asset with sharp messaging, polished design, and production-ready
            development.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)]"
            />
            <button
              type="submit"
              className="button-primary inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
            >
              Join Newsletter
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Quick Links
          </h3>
          <div className="grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="w-fit text-left text-sm text-[var(--brand-secondary)] transition hover:text-[var(--text-primary)]"
            >
              Start a project
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Reach Us
          </h3>
          <div className="space-y-4">
            {contactCards.map((card) => (
              <div key={card.title} className="flex gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08] text-[var(--brand-secondary)]">
                  <Icon name={card.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {card.value}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {card.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-white/20"
                aria-label={item.label}
              >
                <Icon name={item.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>(c) 2026 Zezo Web. Crafted for bold brands and fast-moving teams.</p>
          <p>Performance-minded, SEO-aware, and ready for deployment.</p>
        </div>
      </div>
    </footer>
  );
}

function SearchPanel() {
  const router = useRouter();
  const { closeSearch, isSearchOpen, openAuthModal } = useSiteContext();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const handleClose = useCallback(() => {
    setQuery("");
    closeSearch();
  }, [closeSearch]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, isSearchOpen]);

  const items = useMemo(
    () => [
      ...navLinks.map((item) => ({
        title: item.label,
        description: `Navigate to ${item.label}`,
        action: () => router.push(item.href),
      })),
      ...services.map((service) => ({
        title: service.title,
        description: `${service.category} - ${service.turnaround}`,
        action: () => router.push("/#services"),
      })),
      {
        title: "Open signup modal",
        description: "Create a demo account to explore the premium experience.",
        action: () => openAuthModal("signup"),
      },
    ],
    [openAuthModal, router]
  );

  const filteredItems = items.filter((item) => {
    if (!deferredQuery) {
      return true;
    }

    return `${item.title} ${item.description}`
      .toLowerCase()
      .includes(deferredQuery);
  });

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm transition duration-300",
        isSearchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!isSearchOpen}
    >
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] p-5 shadow-[0_40px_120px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/5 px-5 py-4">
          <Icon name="search" className="h-5 w-5 text-[var(--text-muted)]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, services, or actions"
            className="w-full bg-transparent text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
            aria-label="Close search"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredItems.slice(0, 8).map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => {
                item.action();
                handleClose();
              }}
              className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div>
                <p className="font-medium text-[var(--text-primary)]">{item.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
              <Icon name="arrow" className="h-4 w-4 text-[var(--text-muted)]" />
            </button>
          ))}
          {filteredItems.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-5 py-10 text-center text-sm text-[var(--text-secondary)]">
              No results yet. Try &quot;pricing&quot;, &quot;SEO&quot;, or &quot;signup&quot;.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AuthModal() {
  const {
    authMode,
    closeAuthModal,
    isAuthOpen,
    setAuthMode,
    showToast,
  } = useSiteContext();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fields, setFields] = useState({
    company: "",
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const resetForm = useCallback(() => {
    setShowPassword(false);
    setErrors({});
    setFields({ company: "", email: "", name: "", password: "" });
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    closeAuthModal();
  }, [closeAuthModal, resetForm]);

  useEffect(() => {
    if (!isAuthOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, isAuthOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (authMode === "signup" && fields.name.trim().length < 2) {
      nextErrors.name = "Tell us your name so we can personalize your workspace.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      nextErrors.email = "Enter a valid work email.";
    }

    if (fields.password.length < 8) {
      nextErrors.password = "Use at least 8 characters for a secure password.";
    }

    if (authMode === "signup" && fields.company.trim().length < 2) {
      nextErrors.company = "Add your company or brand name.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast({
        title: "Please review the form",
        description: "A couple of fields still need attention before continuing.",
        tone: "info",
      });
      return;
    }

    showToast({
      title: authMode === "login" ? "Welcome back" : "Account created",
      description:
        authMode === "login"
          ? `You're signed in${rememberMe ? " and we'll remember this device." : "."}`
          : "Your demo workspace is ready to explore.",
      tone: "success",
    });

    handleClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm transition duration-300",
        isAuthOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!isAuthOpen}
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] shadow-[0_40px_120px_rgba(15,23,42,0.45)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,rgba(79,70,229,0.96),rgba(147,51,234,0.92))] p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_28%)]" />
          <div className="relative z-10 space-y-6">
            <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/80">
              Zezo Web Access
            </span>
            <h2 className="font-display text-4xl font-semibold leading-tight">
              Step into a polished client portal built for momentum.
            </h2>
            <p className="max-w-md text-base leading-7 text-white/78">
              Track launch milestones, request iterations, review strategy, and
              keep your brand moving with clarity.
            </p>
            <div className="space-y-3 rounded-[1.8rem] border border-white/18 bg-white/10 p-5 backdrop-blur-sm">
              {[
                "Project milestones and approvals",
                "Content planning and SEO notes",
                "Performance and analytics snapshots",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
                    <Icon name="check" className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-white/86">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-secondary)]">
                {authMode === "login" ? "Welcome back" : "Create your account"}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-[var(--text-primary)]">
                {authMode === "login" ? "Login to Zezo Web" : "Launch with Zezo Web"}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
              aria-label="Close auth modal"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-full border border-white/10 bg-white/5 p-1">
            {(["login", "signup"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAuthMode(mode)}
                className={cn(
                  "rounded-full px-4 py-3 text-sm font-semibold transition",
                  authMode === mode
                    ? "bg-white text-slate-950 shadow-lg"
                    : "text-[var(--text-secondary)]"
                )}
              >
                {mode === "login" ? "Login" : "Signup"}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() =>
                showToast({
                  title: "Google auth is in demo mode",
                  description: "Connect a real provider when you deploy Zezo Web.",
                  tone: "info",
                })
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-white/20"
            >
              <Icon name="google" className="h-4 w-4" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() =>
                showToast({
                  title: "Facebook auth is in demo mode",
                  description: "The UI is wired and ready for your provider setup.",
                  tone: "info",
                })
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-[var(--text-primary)] transition hover:border-white/20"
            >
              <Icon name="facebook" className="h-4 w-4" />
              Continue with Facebook
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {authMode === "signup" ? (
              <FormField
                label="Full name"
                value={fields.name}
                onChange={(value) => setFields((current) => ({ ...current, name: value }))}
                error={errors.name}
                placeholder="Taylor Johnson"
              />
            ) : null}

            <FormField
              label="Email"
              type="email"
              value={fields.email}
              onChange={(value) => setFields((current) => ({ ...current, email: value }))}
              error={errors.email}
              placeholder="you@company.com"
            />

            {authMode === "signup" ? (
              <FormField
                label="Company"
                value={fields.company}
                onChange={(value) => setFields((current) => ({ ...current, company: value }))}
                error={errors.company}
                placeholder="Northstar Labs"
              />
            ) : null}

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">
                Password
              </label>
              <div className="flex items-center rounded-[1.2rem] border border-white/10 bg-white/5 px-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={fields.password}
                  onChange={(event) =>
                    setFields((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="At least 8 characters"
                  className="h-12 w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-sm font-semibold text-[var(--brand-secondary)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? (
                <p className="text-sm text-rose-400">{errors.password}</p>
              ) : null}
            </div>

            <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--brand-primary)]"
              />
              Remember me on this device
            </label>

            <button
              type="submit"
              className="button-primary inline-flex h-12 w-full items-center justify-center rounded-full px-5 text-sm font-semibold text-white"
            >
              {authMode === "login" ? "Login to dashboard" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormField({
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

function ToastViewport() {
  const { removeToast, toasts } = useSiteContext();

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(24rem,calc(100%-2rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto rounded-[1.6rem] border px-4 py-4 shadow-[0_20px_70px_rgba(15,23,42,0.28)] backdrop-blur-xl",
            toast.tone === "success"
              ? "border-emerald-400/25 bg-emerald-500/12"
              : "border-white/10 bg-[var(--surface-strong)]"
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--text-primary)]">{toast.title}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                {toast.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
              aria-label="Dismiss notification"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 left-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[var(--surface-strong)] text-[var(--text-primary)] shadow-[0_20px_70px_rgba(15,23,42,0.28)] backdrop-blur-xl transition duration-300",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
      aria-label="Back to top"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.12em]">Top</span>
    </button>
  );
}

function LiveChatWidget() {
  const [draft, setDraft] = useState("");
  const { isChatOpen, setChatOpen, showToast } = useSiteContext();

  const messages = [
    {
      role: "Zezo Web",
      copy: "Hi there. Want a fast website audit, pricing guidance, or launch roadmap?",
    },
    {
      role: "Visitor",
      copy: "I'm exploring a redesign for our SaaS site this quarter.",
    },
    {
      role: "Zezo Web",
      copy: "Perfect. We usually start with messaging clarity, then layer design and conversion improvements.",
    },
  ];

  const handleSend = () => {
    if (!draft.trim()) {
      showToast({
        title: "Type a quick message",
        description: "The chat widget is a UI mock, but it still validates like a real input.",
        tone: "info",
      });
      return;
    }

    setDraft("");
    showToast({
      title: "Message queued",
      description: "The live chat UI mock is ready for a real provider integration.",
      tone: "success",
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(!isChatOpen)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-[var(--surface-strong)] px-5 text-sm font-semibold text-[var(--text-primary)] shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5"
      >
        <Icon name="chat" className="h-5 w-5 text-[var(--brand-secondary)]" />
        Live Chat
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-40 w-[min(24rem,calc(100vw-2.5rem))] rounded-[1.8rem] border border-white/10 bg-[var(--surface-strong)] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.38)] backdrop-blur-xl transition duration-300",
          isChatOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="font-medium text-[var(--text-primary)]">Zezo Web Chat</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Usually replies in a couple of hours
            </p>
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
            aria-label="Close chat"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {messages.map((message) => (
            <div
              key={`${message.role}-${message.copy}`}
              className={cn(
                "max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-6",
                message.role === "Zezo Web"
                  ? "bg-[linear-gradient(135deg,rgba(79,70,229,0.18),rgba(168,85,247,0.18))] text-[var(--text-primary)]"
                  : "ml-auto bg-white/[0.06] text-[var(--text-secondary)]"
              )}
            >
              <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {message.role}
              </p>
              <p>{message.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about pricing, timing, or scope"
            className="h-10 w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <button
            type="button"
            onClick={handleSend}
            className="button-primary inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
            aria-label="Send message"
          >
            <Icon name="send" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function LoadingOverlay({ isReady }: { isReady: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.45),transparent_28%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.32),transparent_28%),#070b17] transition duration-700",
        isReady ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-white/[0.06] px-10 py-9 backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] text-2xl font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.38)]">
          ZW
        </div>
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-white">
            Loading Zezo Web
          </p>
          <p className="mt-2 text-sm text-white/70">
            Preparing the premium startup experience.
          </p>
        </div>
        <div className="h-2 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="loading-bar h-full rounded-full" />
        </div>
      </div>
    </div>
  );
}















// ashokjangid