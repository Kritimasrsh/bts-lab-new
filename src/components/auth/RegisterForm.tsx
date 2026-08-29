"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Eye, EyeOff, Check, X } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";
import { useToast } from "@/components/Toast";

export default function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const { success, error: toastError } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  // Real-time password match state
  const confirmTouched = form.confirmPassword.length > 0;
  const passwordsMatch = form.password === form.confirmPassword;
  const showMismatch = confirmTouched && !passwordsMatch;
  const showMatch = confirmTouched && passwordsMatch && form.password.length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toastError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      toastError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");

      success("Account created — welcome to BTS Lab!");

      // auto sign-in after successful registration
      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (signInRes?.error) {
        // account created but auto-login failed — send to login
        toastError("Account created, but sign-in failed. Please log in.");
        router.push("/login");
        return;
      }
      // land on the account page by default; honor an explicit callbackUrl.
      router.push(callbackUrl && callbackUrl !== "/" ? callbackUrl : "/account");
      router.refresh();
    } catch (err) {
      toastError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const inputCls =
    "focus-ring w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-[#ff6b1a] focus:outline-none";
  const confirmCls = `focus-ring w-full rounded-xl border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none ${
    showMismatch
      ? "border-red-400 focus:border-red-500"
      : showMatch
      ? "border-emerald-400 focus:border-emerald-500"
      : "border-ink/15 focus:border-[#ff6b1a]"
  }`;

  return (
    <div>
      <GoogleButton callbackUrl={callbackUrl} />

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft">
          or register with email
        </span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Full name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Ram Bahadur"
            className={inputCls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-ink">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder="+977-98XXXXXXXX"
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              required
              value={form.password}
              onChange={update("password")}
              placeholder="At least 8 characters"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-ink">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            required
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            placeholder="Re-enter your password"
            className={confirmCls}
            aria-invalid={showMismatch}
          />
          {showMismatch && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <X className="h-3.5 w-3.5" strokeWidth={3} /> Passwords don&apos;t match
            </p>
          )}
          {showMatch && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <Check className="h-3.5 w-3.5" strokeWidth={3} /> Passwords match
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b1a] px-6 py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition hover:bg-[#e85d04] disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link
          href={`/login${callbackUrl !== "/" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          className="font-semibold text-[#e85d04] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
