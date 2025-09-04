"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const BRAND = {
  primary: "#45b4e8",
  neonPink: "#ff3df7",
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; id?: string }
  | { state: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Zachowaj referencję do formularza PRZED pierwszym await
    const form = e.currentTarget;
    setStatus({ state: "loading" });

    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.success) {
        setStatus({
          state: "error",
          message:
            json?.error ||
            "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
        });
        return;
      }

      setStatus({ state: "success", id: json.id });
      form.reset(); // <- już bezpiecznie
    } catch {
      setStatus({
        state: "error",
        message: "Błąd sieci lub serwer nie odpowiedział.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      {/* honeypot (anty-spam) */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        type="text"
        required
        className="px-4 py-3 rounded-2xl bg-transparent border border-white/15 focus:outline-none"
        placeholder="Fullt nafn"
      />
      <input
        name="email"
        type="email"
        required
        className="px-4 py-3 rounded-2xl bg-transparent border border-white/15 focus:outline-none"
        placeholder="Netfang"
      />
      <select
        name="recipient"
        required
        defaultValue="both"
        className="sm:col-span-2 px-4 py-3 rounded-2xl bg-transparent border border-white/15 focus:outline-none"
      >
        <option value="both">Aðalgeir &amp; Dominik</option>
        <option value="adalgeir">Aðalgeir</option>
        <option value="dominik">Dominik</option>
      </select>
      <textarea
        name="message"
        rows={5}
        required
        className="sm:col-span-2 px-4 py-3 rounded-2xl bg-transparent border border-white/15 focus:outline-none"
        placeholder="Skilaboðin þín"
      />

      <div className="sm:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={status.state === "loading"}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold disabled:opacity-60"
          style={{
            backgroundImage: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.neonPink})`,
            color: "#0b0f14",
            boxShadow: `0 0 24px ${BRAND.primary}66, 0 0 40px ${BRAND.neonPink}33`,
          }}
        >
          <Sparkles size={18} />
          {status.state === "loading"
            ? "Senda…"
            : status.state === "success"
            ? "Sent!"
            : "Senda"}
        </button>

        {status.state === "success" && (
          <span className="text-sm text-emerald-400">
            Takk! Skilaboðin voru send.
          </span>
        )}
        {status.state === "error" && (
          <span className="text-sm text-rose-400">
            Villa: {status.message}
          </span>
        )}
      </div>
    </form>
  );
}
