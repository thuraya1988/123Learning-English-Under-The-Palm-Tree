"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarSelector from "../../components/AvatarSelector";
import { setProfile } from "../../lib/progress";

export default function RegistrationCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("🌴");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !agree) {
      setError("Please complete username, email and agree to the policy.");
      return;
    }
    setProfile({
      username,
      description,
      email,
      avatar,
      createdAt: new Date().toISOString(),
    });
    router.push("/about");
  };

  return (
    <form
      onSubmit={submit}
      className="float-anim p-10 rounded-3xl"
      style={{
        background: "rgba(255,248,235,0.35)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(184,150,62,0.4)",
        boxShadow:
          "0 40px 80px rgba(61,43,31,0.15), 0 8px 24px rgba(61,43,31,0.08), inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -2px 0 rgba(184,150,62,0.15), inset 2px 0 0 rgba(255,255,255,0.5), inset -2px 0 0 rgba(184,150,62,0.1)",
      }}
    >
      <p className="font-cinzel text-[14px] tracking-[0.2em] text-[var(--gold)] text-center mb-7 flex items-center justify-center gap-2.5 uppercase">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(184,150,62,0.5)]" />
        Create Your Profile
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(184,150,62,0.5)]" />
      </p>

      <Field
        label="USERNAME"
        value={username}
        onChange={setUsername}
        placeholder="Enter your name…"
      />
      <Field
        label="ABOUT YOU"
        value={description}
        onChange={setDescription}
        placeholder="A brief description of yourself…"
      />
      <Field
        label="EMAIL ADDRESS"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="your@email.com"
      />

      <div className="mt-5">
        <span className="font-cinzel text-[10px] tracking-[0.15em] text-[var(--brown-mid)] block mb-2.5 uppercase">
          Choose Your Avatar
        </span>
        <AvatarSelector value={avatar} onChange={setAvatar} />
        <p className="text-[11px] italic text-[var(--brown-mid)] leading-relaxed text-center opacity-80 mt-2.5">
          Your avatar and username will appear throughout the website and on
          your final course completion certificate.
        </p>
      </div>

      <div
        className="mt-4 p-3.5 rounded-[10px]"
        style={{
          background: "rgba(184,150,62,0.06)",
          border: "1px solid rgba(184,150,62,0.2)",
        }}
      >
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5"
            style={{ accentColor: "var(--gold)" }}
          />
          <span className="text-[11px] leading-[1.6] text-[var(--brown-mid)] italic">
            This platform and all educational materials, stories, games,
            activities, systems, and concepts are intellectual property owned by{" "}
            <strong>Thuraya Mohammed bin Ali Al Naabi</strong>, English Teacher
            – Sumail Al Qurooshiyah. Copying, recording, redistributing,
            screenshotting, or reproducing any content is strictly prohibited
            and may result in legal action.
          </span>
        </label>
      </div>

      {error && (
        <p className="text-[#7a2a17] text-xs mt-3 italic">{error}</p>
      )}

      <button type="submit" className="btn-gold w-full mt-4">
        Start Your Journey
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="font-cinzel text-[10px] tracking-[0.15em] text-[var(--brown-mid)] block mb-1.5 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  );
}
