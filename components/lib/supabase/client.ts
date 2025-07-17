import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | undefined // Declare a variable to hold the client instance

export function createClientSupabaseClient() {
  // If the client instance doesn't exist, create it
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  // Return the existing instance
  return supabaseClient
}
