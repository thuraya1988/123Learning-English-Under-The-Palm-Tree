"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setProfile } from "../../lib/progress";

export default function RegistrationCard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email) {
      setError("Please complete username and email.");
      return;
    }
    setProfile({
      username,
      description,
      email,
      avatar: "🌴",
      createdAt: new Date().toISOString(),
    });
    router.push("/characters");
  };

  return (
    <form onSubmit={submit} className="reg-card">
      <p className="reg-sub">Tell us your name — and the journey begins.</p>

      <Field
        label="USERNAME"
        value={username}
        onChange={setUsername}
        placeholder="Enter your name…"
      />
      <Field
        label="EMAIL"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="your@email.com"
      />
      <Field
        label="A LITTLE ABOUT YOU"
        value={description}
        onChange={setDescription}
        placeholder="A young dreamer from…"
      />

      <button
        type="submit"
        className="btn-burgundy"
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 14,
        }}
      >
        Begin your journey<span className="arrow">→</span>
      </button>

      {error && (
        <p
          style={{
            color: "var(--burgundy)",
            fontSize: 12,
            marginTop: 10,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      <p
        style={{
          fontSize: 11,
          color: "var(--brown-mid)",
          fontStyle: "italic",
          textAlign: "center",
          marginTop: 18,
          lineHeight: 1.6,
        }}
      >
        All content is the intellectual property of{" "}
        <strong>Thuraya Mohammed Ali Al-Naabia</strong>.
      </p>
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
    <div className="form-field">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
