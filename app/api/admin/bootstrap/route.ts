import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// One-time tool to promote the very first admin. Neon Auth's own admin API
// requires the caller to already be an admin (correctly - there's no
// self-promotion backdoor), which makes it useless for creating the first
// one. Its user data lives directly in our Postgres under the neon_auth
// schema though, so we update the role there instead.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const secret = body?.secret;
  const email = body?.email;

  if (!process.env.ADMIN_BOOTSTRAP_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_BOOTSTRAP_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (secret !== process.env.ADMIN_BOOTSTRAP_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (typeof email !== "string") {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const result = await query<{ id: string; email: string; role: string }>(
    `UPDATE neon_auth."user" SET role = 'admin' WHERE email = $1
     RETURNING id, email, role`,
    [email],
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "No user found with that email" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, user: result.rows[0] });
}
