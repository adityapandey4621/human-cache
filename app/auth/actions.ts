"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Define a type for the action state for better type safety
type AuthState = {
  success: boolean
  message: string
}

// Helper function to get the correct base URL for redirects
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/" // Default for local development
  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`
  return url
}

export async function signIn(prevState: AuthState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    console.error("signIn: Received invalid formData object (not FormData instance):", formData)
    return { success: false, message: "Invalid form submission. Please try again." }
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("signIn error:", error.message)
    // Provide a more specific message for email not confirmed
    if (error.message === "Email not confirmed") {
      return {
        success: false,
        message: "Please confirm your email address to sign in. Check your inbox for a verification link.",
      }
    }
    return { success: false, message: error.message }
  }

  console.log("signIn successful, session:", data.session) // Log session data
  revalidatePath("/", "layout")
  redirect("/dashboard") // Redirect to dashboard after successful login
}

export async function signUp(prevState: AuthState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    console.error("signUp: Received invalid formData object (not FormData instance):", formData)
    return { success: false, message: "Invalid form submission. Please try again." }
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getURL()}auth/callback`, // Use the dynamic URL helper
    },
  })

  if (error) {
    console.error("signUp error:", error.message)
    return { success: false, message: error.message }
  }

  console.log("signUp successful, session:", data.session) // Log session data
  revalidatePath("/", "layout")
  // Do NOT redirect immediately after sign-up.
  // Instead, return a success message instructing the user to confirm their email.
  return { success: true, message: "Account created successfully! Please check your email to confirm your account." }
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  console.log("signOut successful") // Log sign out
  revalidatePath("/", "layout")
  redirect("/")
}
