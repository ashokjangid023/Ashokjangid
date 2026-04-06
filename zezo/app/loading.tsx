export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-white/10 bg-[var(--surface-strong)] px-10 py-9 shadow-[0_20px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,#4f46e5,#8b5cf6)] text-2xl font-semibold text-white shadow-[0_18px_45px_rgba(99,102,241,0.38)]">
          ZW
        </div>
        <p className="font-display text-2xl font-semibold text-[var(--text-primary)]">
          Loading page
        </p>
        <div className="h-2 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="loading-bar h-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
