"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AvatarSelector from "../../components/AvatarSelector";
import GlassButton from "../../components/GlassButton";
import { setProfile } from "../../lib/progress";
import { STORY_REFERENCE } from "../../data/storyReference";

export default function RegistrationCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("A1");
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
    <form onSubmit={submit} className="glass p-6 md:p-8 flex flex-col gap-5">
      <div>
        <h3 className="font-display gold-text text-2xl tracking-wide">
          Begin Your Journey
        </h3>
        <p className="text-cocoa/70 text-sm mt-1">
          Choose your avatar, name, and step under the palm tree.
        </p>
      </div>

      <Field
        label="Username"
        value={username}
        onChange={setUsername}
        placeholder="Your name"
      />
      <Field
        label="User Description"
        value={description}
        onChange={setDescription}
        placeholder="A short description"
      />
      <Field
        label="Email Address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@palmtree.app"
      />

      <div className="flex flex-col gap-2">
        <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/70">
          Avatar
        </span>
        <AvatarSelector value={avatar} onChange={setAvatar} />
        <p className="text-[0.72rem] text-cocoa/65 italic mt-1">
          The selected avatar and username will appear throughout the website
          and on the final course completion certificate.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer glass-inset p-4">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 accent-[#8a6529]"
        />
        <span className="text-[0.78rem] text-cocoa/80 leading-relaxed">
          {STORY_REFERENCE.copyrightStatement}
        </span>
      </label>

      {error && (
        <p className="text-[#7a2a17] text-xs tracking-wide">{error}</p>
      )}

      <GlassButton variant="gold" type="submit" className="self-start">
        Start Journey
      </GlassButton>
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
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="px-4 py-3 rounded-2xl bg-[rgba(255,248,230,0.45)] border border-[rgba(138,101,41,0.4)] focus:border-[rgba(138,101,41,0.7)] outline-none text-cocoa placeholder-cocoa/45 font-serif"
      />
    </label>
  );
}
