import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();
const normalizedSupabaseUrl = supabaseUrl
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/+$/, "");

if (!normalizedSupabaseUrl || !supabaseAnonKey) {
    console.warn("VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set");
}

export const supabase = createClient(normalizedSupabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});