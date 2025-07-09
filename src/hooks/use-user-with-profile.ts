"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role?: string
  created_at?: string
}

export function useUserWithProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          setError(authError.message)
          return
        }

        setUser(user)

        if (user) {
          // Try to fetch from profiles table first
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          if (profile && !profileError) {
            setUserProfile({
              id: profile.id,
              name: profile.full_name || profile.name || user.email?.split("@")[0] || "User",
              email: user.email || "",
              avatar: profile.avatar_url || user.user_metadata?.avatar_url || "/avatars/default.jpg",
              role: profile.role,
              created_at: profile.created_at,
            })
          } else {
            // Fallback to auth metadata
            const fallbackProfile: UserProfile = {
              id: user.id,
              name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
              email: user.email || "",
              avatar: user.user_metadata?.avatar_url || "/avatars/default.jpg",
            }
            setUserProfile(fallbackProfile)
          }
        }
      } catch (err) {
        setError("Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user)
        // Refetch profile data
        getUser()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, userProfile, loading, error }
}
