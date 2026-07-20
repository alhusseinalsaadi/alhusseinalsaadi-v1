"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, CheckCircle2, Bell, AlertCircle, Calendar, MessageSquare } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  email: string;
  link: string | null;
  createdAt: string;
}

const ICON_MAP: Record<string, any> = {
  lead: AlertCircle,
  appointment: Calendar,
  message: MessageSquare,
  system: Bell,
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  lead: { bg: "#FEF3C7", text: "#D97706", border: "#FCD34D" },
  appointment: { bg: "#DBEAFE", text: "#0284C7", border: "#7DD3FC" },
  message: { bg: "#E0E7FF", text: "#4F46E5", border: "#C7D2FE" },
  system: { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0" },
};

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch {
      console.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    fetchNotifications();
  };

  const deleteNotification = async (id: string) => {
    await fetch("/api/notifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchNotifications();
  };

  const filtered =
    filter === "unread"
      ? notifications.filter((n: Notification) => !n.read)
      : notifications;

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#6B6B6B",
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "32px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        direction: "rtl",
        fontFamily: "'Noto Kufi Arabic', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#1A2744", marginBottom: "6px" }}>
          الإخطارات
        </h1>
        <p style={{ color: "#6B6B6B", fontSize: "15px" }}>
          {unreadCount > 0 ? `لديك ${unreadCount} إخطار جديد` : "جميع الإخطارات قد تمت قراءتها"}
        </p>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            background: filter === "all" ? "#1A2744" : "#E5E5E0",
            color: filter === "all" ? "white" : "#6B6B6B",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          الكل
        </button>
        <button
          onClick={() => setFilter("unread")}
          style={{
            background: filter === "unread" ? "#1A2744" : "#E5E5E0",
            color: filter === "unread" ? "white" : "#6B6B6B",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          غير مقروء ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #E5E5E0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              color: "#6B6B6B",
            }}
          >
            {filter === "unread"
              ? "لا توجد إخطارات جديدة"
              : "لا توجد إخطارات"}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filtered.map((notif: Notification) => {
              const Icon = ICON_MAP[notif.type] || Bell;
              const colors = COLOR_MAP[notif.type] || COLOR_MAP.system;

              return (
                <div
                  key={notif.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "16px 20px",
                    borderBottom: "1px solid #F3F4F6",
                    background: notif.read ? "#FAFAF8" : "white",
                    cursor: notif.link ? "pointer" : "default",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (notif.link) {
                      (
                        e.currentTarget as HTMLDivElement
                      ).style.background = "#F5F5F3";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLDivElement
                    ).style.background = notif.read ? "#FAFAF8" : "white";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: colors.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} color={colors.text} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1A2744", margin: 0 }}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#C9A84C",
                          }}
                        />
                      )}
                    </div>
                    <p style={{ fontSize: "14px", color: "#6B6B6B", margin: "0 0 8px 0", lineHeight: "1.5" }}>
                      {notif.message}
                    </p>
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      {new Date(notif.createdAt).toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {notif.link && (
                      <Link
                        href={notif.link}
                        style={{
                          padding: "6px 12px",
                          background: "#1A2744",
                          color: "white",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        عرض
                      </Link>
                    )}
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#C9A84C",
                          padding: "4px",
                        }}
                        title="تحديد كمقروء"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#DC2626",
                        padding: "4px",
                      }}
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
