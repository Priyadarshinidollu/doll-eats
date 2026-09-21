import { auth } from "@/lib/auth/server";

export async function requireAdminSession() {
  const { data: session } = await auth.getSession();

  if (!session?.user || session.user.role !== "admin") {
    return null;
  }

  return session;
}
