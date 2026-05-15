export default function PalmIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="palm-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5dfa3" />
          <stop offset="0.55" stopColor="#d6ad58" />
          <stop offset="1" stopColor="#8a6529" />
        </linearGradient>
      </defs>
      <g stroke="url(#palm-grad)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M32 56 V30" />
        <path d="M32 30 C20 26, 14 22, 10 14" />
        <path d="M32 30 C44 26, 50 22, 54 14" />
        <path d="M32 30 C24 22, 18 18, 12 18" />
        <path d="M32 30 C40 22, 46 18, 52 18" />
        <path d="M32 30 C30 22, 28 16, 26 10" />
        <path d="M32 30 C34 22, 36 16, 38 10" />
        <circle cx="32" cy="28" r="2.2" fill="url(#palm-grad)" stroke="none" />
      </g>
      <path
        d="M22 56 Q32 50 42 56"
        stroke="url(#palm-grad)"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}
