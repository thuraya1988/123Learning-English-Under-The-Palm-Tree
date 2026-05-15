export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(233,201,124,0.55),transparent_70%)] blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,161,74,0.45),transparent_70%)] blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(138,101,41,0.35),transparent_70%)] blur-3xl" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence baseFrequency="0.9" numOctaves="3" />
          <feColorMatrix values="0 0 0 0 0.22 0 0 0 0 0.16 0 0 0 0 0.09 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
