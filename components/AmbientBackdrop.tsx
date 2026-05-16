export default function AmbientBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(212,176,106,0.2) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(184,150,62,0.12) 0%, transparent 50%), linear-gradient(165deg, #f7f2eb 0%, #f0e8dc 40%, #ede0cc 100%)",
        }}
      />
    </div>
  );
}
