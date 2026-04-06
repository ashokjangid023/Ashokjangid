import { IconName } from "@/data/site-content";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {iconMap[name]}
    </svg>
  );
}

const iconMap: Record<IconName, React.ReactNode> = {
  spark: (
    <>
      <path d="m12 3 1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z" />
      <path d="m18.5 15 .8 2.1 2.2.8-2.2.8-.8 2.1-.8-2.1-2.2-.8 2.2-.8.8-2.1Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.2 2.5 8.1 7 10 4.5-1.9 7-5.8 7-10V6l-7-3Z" />
      <path d="m9.4 12 1.8 1.8 3.7-4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 16v-4" />
      <path d="M12 16V8" />
      <path d="M17 16v-7" />
    </>
  ),
  code: (
    <>
      <path d="m9 8-4 4 4 4" />
      <path d="m15 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  seo: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
      <path d="M9 11h4" />
      <path d="M11 9v4" />
    </>
  ),
  automation: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <circle cx="12" cy="16" r="2.5" />
      <path d="m10.2 9.4 1.6 4.2" />
      <path d="m13.8 9.4-1.6 4.2" />
      <path d="M10.5 8h3" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  quote: (
    <>
      <path d="M8 10H5a4 4 0 0 1 4-4" />
      <path d="M8 10v4a3 3 0 0 1-3 3" />
      <path d="M19 10h-3a4 4 0 0 1 4-4" />
      <path d="M19 10v4a3 3 0 0 1-3 3" />
    </>
  ),
  star: (
    <>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </>
  ),
  moon: (
    <>
      <path d="M20 14.2A8 8 0 1 1 9.8 4a6.5 6.5 0 0 0 10.2 10.2Z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  mail: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </>
  ),
  phone: (
    <>
      <path d="M7 4h3l1.5 4-2 1.5a15.2 15.2 0 0 0 5 5L16 13l4 1.5v3c0 1.1-.9 2-2 2C10.8 19.5 4.5 13.2 4.5 6c0-1.1.9-2 2-2Z" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  google: (
    <>
      <path d="M20 12.2c0-.6-.1-1.2-.2-1.8H12v3.4h4.5a4 4 0 0 1-1.7 2.7v2.2h2.8c1.7-1.6 2.4-3.9 2.4-6.5Z" />
      <path d="M12 20c2.3 0 4.2-.7 5.6-2l-2.8-2.2c-.8.5-1.7.9-2.8.9-2.2 0-4.1-1.5-4.8-3.5H4.3v2.3A8.4 8.4 0 0 0 12 20Z" />
      <path d="M7.2 13.2A5 5 0 0 1 7 12c0-.4.1-.9.2-1.2V8.5H4.3A8.4 8.4 0 0 0 3.4 12c0 1.3.3 2.5.9 3.5l2.9-2.3Z" />
      <path d="M12 7.3c1.3 0 2.5.4 3.4 1.3l2.5-2.5A8 8 0 0 0 12 4a8.4 8.4 0 0 0-7.7 4.5l2.9 2.3c.7-2 2.6-3.5 4.8-3.5Z" />
    </>
  ),
  facebook: <path d="M14 8h2V4h-2c-2.2 0-4 1.8-4 4v2H8v4h2v6h4v-6h2.5l.5-4H14V8Z" />,
  linkedin: (
    <>
      <path d="M6 9v9" />
      <path d="M6 6h0" />
      <path d="M10 9v9" />
      <path d="M10 12c0-1.7 1.3-3 3-3s3 1.3 3 3v6" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M17.5 6.5h0" />
    </>
  ),
  x: (
    <>
      <path d="m5 5 14 14" />
      <path d="m19 5-8 9" />
      <path d="m10 14-5 5" />
    </>
  ),
  chat: (
    <>
      <path d="M5 6h14v9H9l-4 4V6Z" />
      <path d="M8 10h8" />
      <path d="M8 13h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </>
  ),
  users: (
    <>
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6 19a3 3 0 0 0-2-2.8" />
      <path d="M18 16.2A3 3 0 0 1 20 19" />
    </>
  ),
  rocket: (
    <>
      <path d="M6 18c1.3 0 2.4-.5 3.1-1.5l7.4-10.5c-4.6.2-8.3 3.9-8.5 8.5L6.5 17c-.2.3-.3.6-.5 1Z" />
      <path d="M13 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M5 19c0-1.1.9-2 2-2" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  send: (
    <>
      <path d="M4 11.5 20 4l-4.8 16-3.5-5-4.5-3.5Z" />
      <path d="M20 4 11.7 15" />
    </>
  ),
};
