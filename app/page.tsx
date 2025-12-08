import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si l'utilisateur est connecté, rediriger vers /todos
  if (user) {
    redirect("/todos");
  }

  // Sinon, rediriger vers /auth/login
  redirect("/auth/login");
}
