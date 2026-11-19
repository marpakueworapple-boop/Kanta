"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/kanta/icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
  Stage 1 sign-in: email link.
  Phone number + SMS code is added once we choose an SMS provider that delivers well in Ghana.
*/
export function LoginForm({ next = "/account" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        data: name.trim() ? { full_name: name.trim() } : undefined,
      },
    });
    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-white p-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-sand text-forest">
          <Icon name="mail" size={26} />
        </span>
        <h2 className="t-h2 text-ink">Check your email</h2>
        <p className="t-body text-muted">
          We sent a sign-in link to <strong className="text-ink">{email}</strong>. Open it on this phone to
          continue.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="t-label text-forest underline">
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="t-cap-m text-ink">Your name (new accounts)</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ama Mensah"
          className="t-body h-[52px] rounded-lg border border-line bg-white px-4 text-ink outline-none placeholder:text-muted focus:border-forest"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="t-cap-m text-ink">Email address</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="t-body h-[52px] rounded-lg border border-line bg-white px-4 text-ink outline-none placeholder:text-muted focus:border-forest"
        />
      </label>
      {status === "error" && (
        <p role="alert" className="t-cap rounded-md bg-clay/10 px-3 py-2 text-clay">
          {message || "Something went wrong. Please try again."}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="t-body-m h-[52px] rounded-full bg-forest text-on-brand transition active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending" ? "Sending link…" : "Send me a sign-in link"}
      </button>
      <p className="t-cap text-center text-muted">Phone number sign-in is coming soon.</p>
    </form>
  );
}
