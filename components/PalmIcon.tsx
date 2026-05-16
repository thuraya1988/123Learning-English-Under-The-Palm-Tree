export default function PalmIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 44"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line
        x1="20"
        y1="10"
        x2="20"
        y2="44"
        stroke="#b8963e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 14 C14 8 8 10 6 16 C10 14 16 16 20 20"
        fill="#b8963e"
        opacity="0.9"
      />
      <path
        d="M20 14 C26 8 32 10 34 16 C30 14 24 16 20 20"
        fill="#b8963e"
        opacity="0.9"
      />
      <path
        d="M20 10 C16 4 10 4 8 8 C12 7 16 10 20 14"
        fill="#b8963e"
        opacity="0.8"
      />
      <path
        d="M20 10 C24 4 30 4 32 8 C28 7 24 10 20 14"
        fill="#b8963e"
        opacity="0.8"
      />
      <path
        d="M20 8 C18 2 14 0 12 3 C15 3 18 6 20 10"
        fill="#b8963e"
        opacity="0.7"
      />
      <path
        d="M20 8 C22 2 26 0 28 3 C25 3 22 6 20 10"
        fill="#b8963e"
        opacity="0.7"
      />
      <ellipse cx="20" cy="44" rx="4" ry="1" fill="#b8963e" opacity="0.3" />
    </svg>
  );
}
