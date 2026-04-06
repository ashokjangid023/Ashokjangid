"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Theme = "light" | "dark";
type AuthMode = "login" | "signup";
type ToastTone = "success" | "info";

type Toast = {
  id: number;
  title: string;
  description: string;
  tone: ToastTone;
};

type ToastInput = Omit<Toast, "id">;

type SiteContextValue = {
  authMode: AuthMode;
  isAuthOpen: boolean;
  isChatOpen: boolean;
  isReady: boolean;
  isSearchOpen: boolean;
  theme: Theme;
  closeAuthModal: () => void;
  closeSearch: () => void;
  openAuthModal: (mode?: AuthMode) => void;
  openSearch: () => void;
  removeToast: (id: number) => void;
  setAuthMode: (mode: AuthMode) => void;
  setChatOpen: (isOpen: boolean) => void;
  showToast: (toast: ToastInput) => void;
  toggleTheme: () => void;
  toasts: Toast[];
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("zezo-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isReady, setIsReady] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 900);

    return () => {
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("zezo-theme", theme);
  }, [theme]);

  useEffect(() => {
    const shouldLockPage = isAuthOpen || isSearchOpen;
    document.body.style.overflow = shouldLockPage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthOpen, isSearchOpen]);

  useEffect(() => {
    const timeouts = timeoutsRef.current;

    return () => {
      timeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
    };
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const setChatOpen = useCallback((isOpen: boolean) => {
    setIsChatOpen(isOpen);
  }, []);

  const updateAuthMode = useCallback((mode: AuthMode) => {
    setAuthMode(mode);
  }, []);

  const openAuthModal = useCallback((mode: AuthMode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  }, []);

  const removeToast = useCallback((id: number) => {
    const timeout = timeoutsRef.current.get(id);

    if (timeout) {
      window.clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ title, description, tone }: ToastInput) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setToasts((current) => [...current, { id, title, description, tone }]);

    const timeout = window.setTimeout(() => {
      removeToast(id);
    }, 3800);

    timeoutsRef.current.set(id, timeout);
  }, [removeToast]);

  const value = useMemo<SiteContextValue>(
    () => ({
      authMode,
      isAuthOpen,
      isChatOpen,
      isReady,
      isSearchOpen,
      theme,
      closeAuthModal,
      closeSearch,
      openAuthModal,
      openSearch,
      removeToast,
      setAuthMode: updateAuthMode,
      setChatOpen,
      showToast,
      toggleTheme: () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
      },
      toasts,
    }),
    [
      authMode,
      closeAuthModal,
      closeSearch,
      isAuthOpen,
      isChatOpen,
      isReady,
      isSearchOpen,
      openAuthModal,
      openSearch,
      removeToast,
      setChatOpen,
      showToast,
      theme,
      toasts,
      updateAuthMode,
    ]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteContext() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSiteContext must be used within SiteProvider");
  }

  return context;
}
