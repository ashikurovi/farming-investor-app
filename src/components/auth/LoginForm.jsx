"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const user = useSelector((state) => state.auth?.user);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ email, password }).unwrap();
      const roleFromResult =
        result?.data?.user?.role || result?.user?.role || user?.role || null;

      toast.success("Login successful", {
        description:
          roleFromResult === "admin"
            ? "Welcome back, admin!"
            : "Welcome back to your dashboard.",
      });

      if (roleFromResult === "admin" || roleFromResult === "partner") {
        router.push("/admin");
      } else if (roleFromResult === "investor") {
        router.push("/investor");
      } else {
        router.push("/");
      }
    } catch (err) {
      const message =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message[0] : null) ||
        "Login failed. Please check your credentials and try again.";
      setError(message);
      toast.error("Login failed", { description: message });
    }
  };

  return (
    <>
      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400&display=swap');

        .lf-wrapper {
          font-family: 'DM Sans', sans-serif;
        }

        .lf-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b7280;
        }

        .dark .lf-label {
          color: #a1a1aa;
        }

        .lf-field {
          position: relative;
          display: flex;
          align-items: center;
        }

        .lf-field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          width: 15px;
          height: 15px;
          color: #9ca3af;
          transition: color 0.2s ease;
          z-index: 1;
        }

        .dark .lf-field-icon {
          color: #71717a;
        }

        .lf-input {
          width: 100%;
          height: 48px;
          padding-left: 42px;
          padding-right: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #1a1a1a;
          background: #fafaf9;
          border: 1px solid #e5e5e3;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          -webkit-appearance: none;
        }

        .dark .lf-input {
          color: #e4e4e7;
          background: rgba(24,24,27,0.6);
          border: 1px solid rgba(63,63,70,0.9);
        }

        .lf-input::placeholder {
          color: #c4c4be;
          font-size: 0.82rem;
        }

        .dark .lf-input::placeholder {
          color: #71717a;
        }

        .lf-input:focus {
          background: #ffffff;
          border-color: #4d8c1e;
          box-shadow: 0 0 0 3px rgba(77, 140, 30, 0.14);
        }

        .dark .lf-input:focus {
          background: rgba(9,9,11,0.85);
          border-color: rgba(124,194,46,0.7);
          box-shadow: 0 0 0 3px rgba(124, 194, 46, 0.16);
        }

        .lf-input-pr {
          padding-right: 44px;
        }

        .lf-field:focus-within .lf-field-icon {
          color: #4d8c1e;
        }

        .dark .lf-field:focus-within .lf-field-icon {
          color: #7cc22e;
        }

        .lf-toggle-pw {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
          z-index: 1;
        }

        .dark .lf-toggle-pw {
          color: #a1a1aa;
        }

        .lf-toggle-pw:hover {
          color: #4d8c1e;
        }

        .dark .lf-toggle-pw:hover {
          color: #7cc22e;
        }

        .lf-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e5e5e3, transparent);
          margin: 2px 0;
        }

        .dark .lf-divider {
          background: linear-gradient(to right, transparent, rgba(63,63,70,0.9), transparent);
        }

        .lf-forgot {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #4d8c1e;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .dark .lf-forgot {
          color: #7cc22e;
        }

        .lf-forgot:hover {
          opacity: 0.65;
        }

        .lf-error {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 10px 14px;
          background: #fef5f5;
          border: 1px solid #fcd5d5;
          border-radius: 9px;
          font-size: 0.78rem;
          color: #b91c1c;
          font-family: 'DM Sans', sans-serif;
          line-height: 1.5;
        }

        .dark .lf-error {
          background: rgba(127,29,29,0.18);
          border: 1px solid rgba(239,68,68,0.26);
          color: #fecaca;
        }

        .lf-submit {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #4d8c1e 0%, #7cc22e 100%);
          color: #f0f7f3;
          border: none;
          border-radius: 12px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 24px rgba(77, 140, 30, 0.28), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .lf-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .lf-submit:hover:not(:disabled) {
          box-shadow: 0 8px 34px rgba(77, 140, 30, 0.4), inset 0 1px 0 rgba(255,255,255,0.1);
          transform: translateY(-1px);
        }

        .lf-submit:active:not(:disabled) {
          transform: translateY(0px);
          box-shadow: 0 2px 14px rgba(77, 140, 30, 0.22);
        }

        .lf-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .lf-arrow {
          transition: transform 0.2s ease;
        }

        .lf-submit:hover:not(:disabled) .lf-arrow {
          transform: translateX(3px);
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className="lf-wrapper"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Email field */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label htmlFor="email" className="lf-label">
            Email address
          </label>
          <div className="lf-field">
            <Mail className="lf-field-icon" />
            <input
              id="email"
              className="lf-input"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* Password field */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor="password" className="lf-label">
              Password
            </label>
            <Link href="/forgot-password" className="lf-forgot">
              Forgot password?
            </Link>
          </div>
          <div className="lf-field">
            <Lock className="lf-field-icon" />
            <input
              id="password"
              className="lf-input lf-input-pr"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="lf-toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="lf-error">
            <span style={{ marginTop: "1px", opacity: 0.7 }}>⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Thin divider */}
        <div className="lf-divider" />

        {/* Submit */}
        <button type="submit" className="lf-submit" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign In"}
          <ArrowRight size={16} className="lf-arrow" />
        </button>
      </form>
    </>
  );
}
