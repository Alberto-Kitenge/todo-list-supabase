// Types TypeScript

import { Database } from "@/lib/supabase/database.types";

// Export des types de la base de données
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type TodoInsert = Database["public"]["Tables"]["todos"]["Insert"];
export type TodoUpdate = Database["public"]["Tables"]["todos"]["Update"];
