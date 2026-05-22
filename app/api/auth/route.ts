import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { rateLimiters, getIP, tooManyRequests, AuthSchema } from "@/lib/security";

// Hash stored in env — generate with: node -e "require('bcryptjs').hash('yourpw',12).then(console.log)"
// Falls back to plain comparison ONLY in dev when ADMIN_PASSWORD_HASH is not set
async function verifyPassword(plain: string): Promise<boolean> {
  const hash    = process.env.ADMIN_PASSWORD_HASH;
  const rawPass = process.env.ADMIN_PASSWORD;

  if (hash) {
    return bcrypt.compare(plain, hash);
  }
  // Dev-only fallback — never reached in prod if ADMIN_PASSWORD_HASH is set
  if (process.env.NODE_ENV !== "production" && rawPass) {
    return plain === rawPass;
  }
  return false;
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const rl = rateLimiters.auth(ip);
  if (!rl.allowed) return tooManyRequests();

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 }); }

  const parsed = AuthSchema.safeParse(body);
  if (!parsed.success) {
    // Generic message — don't reveal which field failed
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("ADMIN_EMAIL env var not set");
    return NextResponse.json({ error: "خطأ في الإعداد" }, { status: 500 });
  }

  const emailMatch    = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatch = await verifyPassword(password);

  console.log("[auth] email:", email, "adminEmail:", adminEmail, "emailMatch:", emailMatch, "passwordMatch:", passwordMatch);

  // Always run both checks (no short-circuit) to prevent timing attacks
  if (!emailMatch || !passwordMatch) {
    // Delay response slightly to slow brute-force even if rate limiter is bypassed
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin-session", "authenticated", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:   60 * 60,   // 60 minutes session timeout
    path:     "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  return NextResponse.json({ success: true });
}
