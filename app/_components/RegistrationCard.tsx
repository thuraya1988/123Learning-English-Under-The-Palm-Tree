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
      className="bg-[var(--cream)] rounded-[24px] p-8 md:p-10 border border-[rgba(184,150,62,0.28)] shadow-[0_24px_60px_rgba(61,43,31,0.12)]"
    >
      <div className="flex items-center justify-between mb-7">
        <p className="font-cormorant text-2xl text-[var(--brown)]">
          Registration
        </p>
        <span className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[var(--brown-mid)]">
          Free
        </span>
      </div>

      <Field
        label="Username"
        value={username}
        onChange={setUsername}
        placeholder="Your name"
      />
      <Field
        label="About You"
        value={description}
        onChange={setDescription}
        placeholder="A brief description of yourself"
      />
      <Field
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="your@email.com"
      />

      <div className="mt-5">
        <span className="font-cinzel text-[10px] tracking-[0.18em] text-[var(--brown-mid)] block mb-3 uppercase">
          Choose Your Avatar
        </span>
        <AvatarSelector value={avatar} onChange={setAvatar} />
        <p className="text-[12px] italic text-[var(--brown-mid)] leading-relaxed mt-3">
          The selected avatar and username will appear throughout the website
          and on the final course completion certificate.
        </p>
      </div>

      <label className="mt-5 flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-[rgba(184,150,62,0.07)] border border-[rgba(184,150,62,0.18)]">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 accent-[var(--burgundy)]"
        />
        <span className="text-[11px] leading-[1.6] text-[var(--brown-mid)] italic">
          This platform and all educational materials, stories, games,
          activities, systems, and concepts are intellectual property owned by{" "}
          <strong>Thuraya Mohammed bin Ali Al Naabi</strong>, English Teacher –
          Sumail Al Qurooshiyah. Copying, recording, redistributing,
          screenshotting, or reproducing any content is strictly prohibited and
          may result in legal action.
        </span>
      </label>

      {error && (
        <p className="text-[#7a2424] text-xs mt-3 italic">{error}</p>
      )}

      <button type="submit" className="btn-burgundy w-full mt-5 !justify-center">
        Start your journey
        <span className="arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
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
      <label className="font-cinzel text-[10px] tracking-[0.18em] text-[var(--brown-mid)] block mb-1.5 uppercase">
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
