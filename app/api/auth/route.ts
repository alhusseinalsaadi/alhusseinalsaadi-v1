import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual, pbkdf2Sync } from "crypto";
import { rateLimiters, getIP, tooManyRequests, AuthSchema } from "@/lib/security";

// Hash format: "pbkdf2:sha512:100000:<hex-salt>:<hex-hash>"
// Generate with: node -e "
//   const {pbkdf2Sync,randomBytes}=require('crypto');
//   const s=randomBytes(32).toString('hex');
//   const h=pbkdf2Sync('YOUR_PASSWORD',s,100000,64,'sha512').toString('hex');
//   console.log('pbkdf2:sha512:100000:'+s+':'+h);
// "
function verifyPbkdf2(plain: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 5 || parts[0] !== "pbkdf2") return false;
  const [, digest, iterStr, salt, expectedHex] = parts;
  const iterations = parseInt(iterStr, 10);
  const derived = pbkdf2Sync(plain, salt, iterations, 64, digest).toString("hex");
  const a = Buffer.from(derived, "hex");
  const b = Buffer.from(expectedHex, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// Legacy bcrypt-style hash: "$2b$..." — verified via SHA-256 of the expected hash
// This path is only used if ADMIN_PASSWORD_HASH starts with "$2b$"
// To migrate: set ADMIN_PASSWORD_HASH to a pbkdf2:... value (see above)
async function verifyPassword(plain: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD_HASH || "";
  const rawPass = process.env.ADMIN_PASSWORD;

  if (stored && stored.length > 0) {
    if (stored.startsWith("pbkdf2:")) {
      return verifyPbkdf2(plain, stored);
    }
    // Fallback: bcryptjs (only if not bundled away by Turbopack)
    try {
      const { compare } = await import("bcryptjs");
      return compare(plain, stored);
    } catch {
      return false;
    }
  }

  // Use plain password comparison (works in both dev and production)
  if (rawPass) {
    const a = createHash("sha256").update(plain).digest();
    const b = createHash("sha256").update(rawPass).digest();
    try {
      return timingSafeEqual(a, b);
    } catch {
      return false;
    }
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

  if (!emailMatch || !passwordMatch) {
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin-session", "authenticated", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:   60 * 60,
    path:     "/",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  return NextResponse.json({ success: true });
}
