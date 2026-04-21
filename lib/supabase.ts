import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseBrowserClient() {
  return createClientComponentClient();
}

export function getSupabaseAdminClient() {
  if (!supabaseUrl || (!supabaseAnonKey && !supabaseServiceRoleKey)) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient(
      supabaseUrl,
      supabaseServiceRoleKey ?? supabaseAnonKey!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
  }

  return adminClient;
}
