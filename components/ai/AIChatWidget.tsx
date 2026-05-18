"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Calendar, Clock } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  slots?: { date: string; time: string; meetLink?: string }[];
  showBookingOptions?: boolean;
}

const DAYS_AR = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

function SlotPicker({ slots, onPick }: { slots: { date: string; time: string; meetLink?: string }[]; onPick: (text: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
      {slots.map((s) => {
        const key = `${s.date}-${s.time}`;
        const day = DAYS_AR[new Date(s.date).getDay()] ?? "";
        const isPicked = picked === key;
        return (
          <button
            key={key}
            disabled={picked !== null}
            onClick={() => {
              setPicked(key);
              onPick(`أختار موعد يوم ${day} ${s.date} الساعة ${s.time}`);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "12px",
              border: isPicked ? "2px solid #C9A84C" : "2px solid #E5E5E0",
              background: isPicked ? "#FEF3C7" : "white",
              cursor: picked ? "default" : "pointer",
              textAlign: "right",
              direction: "rtl",
              transition: "all 0.2s",
              width: "100%",
              fontFamily: "'IBM Plex Arabic', sans-serif",
            }}
          >
            <div style={{ width: "36px", height: "36px", background: isPicked ? "#C9A84C" : "#F3F4F6", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Calendar size={16} color={isPicked ? "#1A2744" : "#6B6B6B"} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A2744" }}>{day} — {s.date}</div>
              <div style={{ fontSize: "12px", color: "#6B6B6B", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <Clock size={11} /> الساعة {s.time}
                <span style={{ background: s.meetLink ? "#DBEAFE" : "#F3F4F6", color: s.meetLink ? "#2563EB" : "#6B6B6B", padding: "1px 6px", borderRadius: "999px", fontSize: "11px" }}>
                  {s.meetLink ? "🎥 مكالمة" : "🏢 حضور"}
                </span>
              </div>
            </div>
            {isPicked && (
              <div style={{ fontSize: "11px", background: "#C9A84C", color: "#1A2744", padding: "2px 8px", borderRadius: "999px", fontWeight: 700, flexShrink: 0 }}>
                تم الاختيار
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const [showBounce, setShowBounce] = useState(false);
  const [collectedName, setCollectedName] = useState<string | null>(null);
  const [collectedPhone, setCollectedPhone] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBounce(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "مرحباً! أنا سالم، موظف الاستقبال في مكتب السعدي للمحاماة. كيف أقدر أساعدك اليوم؟",
      }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText ?? input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Extract name/phone from all user messages so far
      let name = collectedName;
      let phone = collectedPhone;
      for (const m of updatedMessages) {
        if (m.role !== "user") continue;
        if (!name) {
          const nm = m.content.match(/(?:اسمي|أنا|انا)\s+([^\s،,\.،]{2,20})/);
          if (nm) name = nm[1];
        }
        if (!phone) {
          const pm = m.content.match(/(?:\+966|00966|0)(5\d{8})/);
          if (pm) phone = `0${pm[1]}`;
        }
      }
      if (name && name !== collectedName) setCollectedName(name);
      if (phone && phone !== collectedPhone) setCollectedPhone(phone);

      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          sessionId,
          leadData: { name: name ?? undefined, phone: phone ?? undefined },
        }),
      });

      const data = await res.json();
      const reply = data.reply || data.error || "عذراً، لم أتمكن من الرد. حاول مرة أخرى.";
      const showBookingOptions =
        reply.includes("مكالمة فيديو") && reply.includes("نتصل") &&
        !reply.includes("تم تأكيد");
      setMessages(prev => [...prev, {
        role: "assistant",
        content: reply,
        slots: data.availableSlots?.length > 0 ? data.availableSlots : undefined,
        showBookingOptions,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div style={{
          position: "fixed", bottom: "90px", left: "24px",
          width: "min(400px, calc(100vw - 32px))",
          height: "min(580px, calc(100vh - 120px))",
          background: "white", borderRadius: "20px",
          boxShadow: "0 8px 48px rgba(26,39,68,0.25)",
          display: "flex", flexDirection: "column",
          zIndex: 999, overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #1A2744, #0F1B35)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", background: "#C9A84C", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Kufi Arabic', serif", fontWeight: 800, fontSize: "18px", color: "#1A2744" }}>
                س
              </div>
              <div>
                <div style={{ fontFamily: "'Noto Kufi Arabic', serif", fontWeight: 700, fontSize: "16px", color: "white" }}>
                  سالم | موظف الاستقبال
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%" }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>متاح الآن</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", background: "#FAFAF8" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "#1A2744" : "white",
                  color: msg.role === "user" ? "white" : "#1C1C1E",
                  fontSize: "14px", lineHeight: "1.7",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  whiteSpace: "pre-wrap", direction: "rtl",
                }}>
                  {msg.content}
                </div>

                {/* Booking type buttons */}
                {msg.role === "assistant" && msg.showBookingOptions && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px", maxWidth: "90%" }}>
                    <button
                      onClick={() => sendMessage("أريد مكالمة فيديو")}
                      style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "2px solid #2563EB", background: "#EFF6FF", color: "#2563EB", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: "'IBM Plex Arabic', sans-serif" }}
                    >
                      🎥 مكالمة فيديو
                    </button>
                    <button
                      onClick={() => sendMessage("أريد أن تتصلوا عليّ")}
                      style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "2px solid #059669", background: "#F0FDF4", color: "#059669", fontWeight: 700, fontSize: "13px", cursor: "pointer", fontFamily: "'IBM Plex Arabic', sans-serif" }}
                    >
                      📞 اتصال هاتفي
                    </button>
                  </div>
                )}

                {/* Slot picker — shown under assistant messages that have slots */}
                {msg.role === "assistant" && msg.slots && msg.slots.length > 0 && (
                  <div style={{ maxWidth: "90%", width: "100%" }}>
                    <SlotPicker
                      slots={msg.slots}
                      onPick={(text) => sendMessage(text)}
                    />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "white", padding: "12px 16px", borderRadius: "16px 16px 16px 4px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: "8px", height: "8px", background: "#C9A84C", borderRadius: "50%", animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #E5E5E0", background: "white", display: "flex", gap: "8px", alignItems: "flex-end" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="اكتب سؤالك هنا..."
              rows={1}
              style={{ flex: 1, border: "1px solid #E5E5E0", borderRadius: "12px", padding: "10px 14px", fontSize: "14px", fontFamily: "'IBM Plex Arabic', sans-serif", resize: "none", outline: "none", direction: "rtl", background: "#FAFAF8", lineHeight: "1.5", maxHeight: "100px", overflowY: "auto" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{ width: "42px", height: "42px", background: input.trim() && !loading ? "#C9A84C" : "#E5E5E0", border: "none", borderRadius: "12px", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0, color: input.trim() && !loading ? "#1A2744" : "#999" }}
            >
              {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={18} style={{ transform: "scaleX(-1)" }} />}
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position: "fixed", bottom: "24px", left: "24px", width: "56px", height: "56px", background: "#C9A84C", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, boxShadow: "0 4px 24px rgba(201,168,76,0.5)", transition: "all 0.3s", animation: showBounce && !open ? "pulse-ring 2s infinite" : "none" }}
        title="تحدث مع سالم"
      >
        {open ? <X size={22} color="#1A2744" /> : <MessageCircle size={22} color="#1A2744" />}
      </button>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:scale(0.8);opacity:0.5} 40%{transform:scale(1);opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(201,168,76,0.5)} 70%{box-shadow:0 0 0 12px rgba(201,168,76,0)} 100%{box-shadow:0 0 0 0 rgba(201,168,76,0)} }
      `}</style>
    </>
  );
}
