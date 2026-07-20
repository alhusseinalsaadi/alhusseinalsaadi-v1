"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Edit2, Eye, EyeOff } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  createdAt: string;
}

export default function UsersClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", name: "", password: "", role: "editor" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin-users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      setError("خطأ في جلب المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (editingId) {
      const res = await fetch(`/api/admin-users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("تم تحديث المستخدم بنجاح");
        fetchUsers();
        resetForm();
      } else {
        const data = await res.json();
        setError(data.error || "خطأ في التحديث");
      }
    } else {
      const res = await fetch("/api/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("تم إنشاء المستخدم بنجاح");
        fetchUsers();
        resetForm();
      } else {
        const data = await res.json();
        setError(data.error || "خطأ في الإنشاء");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المستخدم؟")) return;
    const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setSuccess("تم حذف المستخدم");
      fetchUsers();
    } else {
      setError("خطأ في الحذف");
    }
  };

  const handleEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setForm({ email: user.email, name: user.name, password: "", role: user.role });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ email: "", name: "", password: "", role: "editor" });
    setEditingId(null);
    setShowForm(false);
  };

  const roleLabel = (role: string) => {
    const map: Record<string, string> = {
      admin: "مسؤول",
      editor: "محرر",
      viewer: "عارض",
    };
    return map[role] || role;
  };

  if (loading) {
    return <div style={{ padding: "24px", textAlign: "center", color: "#6B6B6B" }}>جاري التحميل...</div>;
  }

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto", direction: "rtl", fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#1A2744", marginBottom: "6px" }}>
            إدارة المستخدمين
          </h1>
          <p style={{ color: "#6B6B6B", fontSize: "15px" }}>إدارة حسابات فريق العمل</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#1A2744",
            color: "white",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={16} />
          مستخدم جديد
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "8px", padding: "12px 16px", color: "#DC2626", marginBottom: "20px", fontSize: "14px" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: "8px", padding: "12px 16px", color: "#16A34A", marginBottom: "20px", fontSize: "14px" }}>
          {success}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", marginBottom: "24px", border: "1px solid #E5E5E0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!!editingId}
              required
              style={{ padding: "10px", border: "1px solid #E5E5E0", borderRadius: "8px", fontSize: "14px" }}
            />
            <input
              type="text"
              placeholder="الاسم"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{ padding: "10px", border: "1px solid #E5E5E0", borderRadius: "8px", fontSize: "14px" }}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={editingId ? "اترك فارغاً للاحتفاظ بكلمة المرور الحالية" : "كلمة المرور"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editingId}
                style={{ padding: "10px 40px 10px 10px", border: "1px solid #E5E5E0", borderRadius: "8px", fontSize: "14px", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={{ padding: "10px", border: "1px solid #E5E5E0", borderRadius: "8px", fontSize: "14px" }}
            >
              <option value="viewer">عارض</option>
              <option value="editor">محرر</option>
              <option value="admin">مسؤول</option>
            </select>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  background: "#1A2744",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {editingId ? "تحديث" : "إنشاء"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: "#E5E5E0",
                  color: "#6B6B6B",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E5E0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        {users.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center", color: "#6B6B6B" }}>
            لا توجد مستخدمين. انقر على "مستخدم جديد" لإضافة واحد.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E5E0" }}>
              <tr>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#1A2744", fontSize: "14px" }}>الاسم</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#1A2744", fontSize: "14px" }}>البريد</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#1A2744", fontSize: "14px" }}>الدور</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 600, color: "#1A2744", fontSize: "14px" }}>الحالة</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 600, color: "#1A2744", fontSize: "14px" }}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: AdminUser) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#1A2744", fontWeight: 500 }}>{user.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#6B6B6B", direction: "ltr", textAlign: "left" }}>{user.email}</td>
                  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#6B6B6B" }}>{roleLabel(user.role)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: user.active ? "#D1FAE5" : "#FEE2E2",
                        color: user.active ? "#059669" : "#DC2626",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {user.active ? "نشط" : "معطل"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => handleEdit(user)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#C9A84C", marginRight: "8px" }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
