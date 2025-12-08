// Header avec logout

"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <header className="navbar bg-base-200 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">📝 Todo List</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="text-xl">
                {user.email?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="menu-title">
              <span>{user.email}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="text-error">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
