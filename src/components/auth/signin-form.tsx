
"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { login } from "@/actions/auth"
import Logo from "../Logo"

export function SigninForm() {
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await login(formData)
        if (result.success) {
          toast.success(result.message)
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        // Handle redirect case (successful login)
        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
          toast.success("Login successful!")
        } else {
          toast.error("An unexpected error occurred")
        }
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Logo />
      <Card className="w-96 shadow-lg border-primary/20 mt-5">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-xl font-bold">Get Started</CardTitle>
          <p className="text-sm text-muted-foreground">Create your new account.</p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isPending}
                className="focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  required
                  disabled={isPending}
                  className="focus:ring-primary focus:border-primary pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isPending}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Button type="submit" disabled={isPending} className="w-full bg-primary text-white hover:bg-primary/90">
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Sign In
              </Button>
              <div className="text-center">
                <Link href="/sign-up" className="text-sm text-primary hover:text-primary/80 underline">
                  Need an account? Sign Up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
