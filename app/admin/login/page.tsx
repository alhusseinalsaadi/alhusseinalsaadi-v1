"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "فشل تسجيل الدخول");
      }
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", border: "1.5px solid #E5E5E0", borderRadius: "10px",
    padding: "12px 44px 12px 16px", fontSize: "15px",
    fontFamily: "'IBM Plex Arabic', sans-serif",
    outline: "none", direction: "rtl", transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0F1B35 0%, #1A2744 60%, #0F1B35 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Background pattern */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 40%)", pointerEvents: "none" }} />

      <div
        style={{
          background: "white", borderRadius: "24px",
          padding: "48px 40px", width: "100%", maxWidth: "420px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "96px", height: "96px",
              background: "#1A2744",
              borderRadius: "20px",
              marginBottom: "16px",
              boxShadow: "0 8px 32px rgba(26,39,68,0.3)",
            }}
          >
            <img
              src="/h_logo.png"
              alt="مكتب الحسين بن أحمد بن حسين السعدي للمحاماة"
              style={{
                height: "72px", width: "72px",
                objectFit: "contain",
                filter: "brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(5deg)",
              }}
            />
          </div>
          <h2 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "16px", fontWeight: 700, color: "#1A2744", marginBottom: "2px" }}>
            مكتب الحسين بن أحمد بن حسين السعدي
          </h2>
          <p style={{ fontSize: "12px", color: "#6B6B6B" }}>لوحة إدارة المكتب</p>
        </div>

        <h1 style={{ fontFamily: "'Noto Kufi Arabic', serif", fontSize: "22px", fontWeight: 700, color: "#1A2744", marginBottom: "24px", textAlign: "center" }}>
          تسجيل الدخول
        </h1>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", color: "#DC2626", fontSize: "14px", marginBottom: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>
              البريد الإلكتروني
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={17} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#1A2744", marginBottom: "6px" }}>
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={17} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
              <input
                type={showPass ? "text" : "password"}
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ ...inputStyle, padding: "12px 44px" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 0 }}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#A8882E" : "#C9A84C",
              color: "#1A2744", fontWeight: 700,
              padding: "14px", borderRadius: "12px",
              border: "none", fontSize: "16px",
              cursor: loading ? "default" : "pointer",
              fontFamily: "'IBM Plex Arabic', sans-serif",
              marginTop: "8px",
              transition: "background 0.2s",
              boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
            }}
          >
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
