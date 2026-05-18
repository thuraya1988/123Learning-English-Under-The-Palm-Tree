import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--green-deep)",
        color: "var(--cream-light)",
        padding: "80px 60px 30px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 50,
          maxWidth: 1280,
          margin: "0 auto 50px",
        }}
        className="foot-inner"
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <img
              src="/Website-icons-logo/realistic-palm-icon.png"
              alt="Palm"
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                filter: "brightness(1.4) sepia(0.2)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--caps)",
                fontSize: 11,
                letterSpacing: "0.28em",
                color: "var(--cream-light)",
              }}
            >
              LEARN UNDER
              <br />
              THE PALM TREE
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(244,237,224,0.65)",
              lineHeight: 1.7,
              maxWidth: 280,
            }}
          >
            An immersive English learning experience rooted in Al-Qurawashiyah
            village, Samail.
          </p>
        </div>

        <FooterCol
          title="EXPLORE"
          items={[
            { href: "/#about", label: "About" },
            { href: "/characters", label: "Characters" },
            { href: "/#stories", label: "Story chapters" },
            { href: "/#songs", label: "Songs" },
          ]}
        />
        <FooterCol
          title="LEARN"
          items={[
            { href: "/#skills", label: "Skills" },
            { href: "/#games", label: "Games" },
            { href: "/#ar", label: "AR trip" },
            { href: "/gallery", label: "Gallery" },
          ]}
        />
        <FooterCol
          title="CONNECT"
          items={[
            { href: "/profile", label: "Profile" },
            { href: "/certificate", label: "Certificate" },
            { href: "#", label: "Contact" },
          ]}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          paddingTop: 30,
          borderTop: "1px solid rgba(184,150,62,0.18)",
          fontSize: 11,
          color: "rgba(244,237,224,0.4)",
          fontStyle: "italic",
          lineHeight: 1.7,
          letterSpacing: "0.04em",
        }}
      >
        All content © {year} <strong style={{ color: "var(--gold-light)", fontWeight: 500 }}>Thuraya Mohammed bin Ali Al Naabi</strong> — English Teacher, Samail Al-Qurawashiyah · All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4
        style={{
          fontFamily: "var(--caps)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: "var(--gold-light)",
          marginBottom: 18,
        }}
      >
        {title}
      </h4>
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((n) => (
          <Link
            key={n.href + n.label}
            href={n.href}
            style={{
              fontFamily: "var(--body)",
              fontSize: 13,
              color: "rgba(244,237,224,0.7)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
