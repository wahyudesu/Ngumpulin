
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  name: string
  email: string
  avatar: string
}

export function useUser() {
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
          error,
        } = await supabase.auth.getUser()

        if (error) {
          setError(error.message)
          return
        }

        setUser(user)

        if (user) {
          // Create user profile from auth data
          const profile: UserProfile = {
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
            email: user.email || "",
            avatar: user.user_metadata?.avatar_url || `/avatars/default.jpg`,
          }
          setUserProfile(profile)
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
        const profile: UserProfile = {
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          avatar: session.user.user_metadata?.avatar_url || `/avatars/default.jpg`,
        }
        setUserProfile(profile)
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
