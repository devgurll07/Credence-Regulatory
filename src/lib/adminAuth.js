import { supabase } from "./supabase";

export async function requireAdmin(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return null;

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;

  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return allowed.includes((data.user.email || "").toLowerCase()) ? data.user : null;
}