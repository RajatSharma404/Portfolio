"use client";

import React from "react";
import { useWorkspace } from "@/context/workspace-context";

export function ContactSection() {
  const {
    contactForm,
    setContactForm,
    contactSubmitting,
    contactFeedback,
    submitContactForm,
    emailCopied,
    copyEmailAddress,
  } = useWorkspace();

  const contactCards = [
    {
      title: "EMAIL",
      value: "rajat.sharma.myid1@gmail.com",
      link: "mailto:rajat.sharma.myid1@gmail.com",
    },
    {
      title: "LINKEDIN",
      value: "linkedin.com/in/rajat-sharma-9a053128b",
      link: "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
    },
    {
      title: "GITHUB",
      value: "github.com/RajatSharma404",
      link: "https://github.com/RajatSharma404",
    },
    {
      title: "LEETCODE",
      value: "leetcode.com/u/RajatSharma404",
      link: "https://leetcode.com/u/RajatSharma404/",
    },
    {
      title: "X / TWITTER",
      value: "x.com/RajatSharma404",
      link: "https://x.com/RajatSharma404",
    },
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <section className="section-card rounded-[28px] p-6">
        <h3 className="display-font text-3xl text-white">Contact</h3>
        <p className="mt-2 text-sm text-(--text-muted)">
          Open for collaboration, internships, and interesting engineering
          problems.
        </p>
      </section>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="section-card rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
            >
              <a href={card.link} target="_blank" rel="noreferrer">
                <p className="text-xs uppercase tracking-[0.2em] text-[#8f8f8f] font-mono">
                  {card.title}
                </p>
                <p className="mt-1 text-sm text-[#e7e7e7] truncate">
                  {card.value}
                </p>
              </a>
              {card.title === "EMAIL" && (
                <button
                  className="mt-2.5 rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-cyan-100 hover:bg-white/10 transition-colors"
                  onClick={copyEmailAddress}
                >
                  {emailCopied ? "✓ Copied to clipboard" : "Copy email"}
                </button>
              )}
            </div>
          ))}
        </div>

        <form
          className="accent-outline rounded-3xl border border-[#569cd6]/28 bg-[#171b22] p-5 code-font text-sm"
          onSubmit={submitContactForm}
        >
          <p className="text-(--comment)">{`// contact.css / submit-message`}</p>
          <p className="mt-2 text-[#d8d8d8]">Send a direct message:</p>

          <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-[#8fa2c7]">
            Name
          </label>
          <input
            value={contactForm.name}
            onChange={(event) =>
              setContactForm((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60 transition-colors"
            placeholder="Your name"
            required
          />

          <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-[#8fa2c7]">
            Email
          </label>
          <input
            type="email"
            value={contactForm.email}
            onChange={(event) =>
              setContactForm((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60 transition-colors"
            placeholder="you@example.com"
            required
          />

          <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-[#8fa2c7]">
            Message
          </label>
          <textarea
            value={contactForm.message}
            onChange={(event) =>
              setContactForm((prev) => ({
                ...prev,
                message: event.target.value,
              }))
            }
            className="mt-1 min-h-28 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/60 transition-colors"
            placeholder="Tell me about your idea or opportunity..."
            maxLength={3000}
            required
          />

          {/* Honeypot anti-spam field */}
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={contactForm.website}
            onChange={(event) =>
              setContactForm((prev) => ({
                ...prev,
                website: event.target.value,
              }))
            }
            className="hidden"
          />

          <button
            type="submit"
            aria-label="Send contact message"
            className="mt-5 rounded-full border border-[#6c63ff]/45 bg-[#6c63ff] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 disabled:opacity-60 shadow-lg shadow-indigo-500/20"
            disabled={contactSubmitting}
          >
            {contactSubmitting ? "Sending..." : "Send Message"}
          </button>
          {contactFeedback && (
            <p
              className="mt-3 text-xs text-cyan-200"
              role="status"
              aria-live="polite"
            >
              {contactFeedback}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
