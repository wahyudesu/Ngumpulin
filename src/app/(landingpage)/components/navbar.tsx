"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import Logo from "@/components/Logo"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Features", href: "#features" },
  { name: "FAQ", href: "#faq" },
]

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      // You can adjust this threshold as needed (e.g., 10px, 50px, etc.)
      if (scrollPosition > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    // Add event listener when component mounts
    window.addEventListener("scroll", handleScroll)

    // Initial check in case page loads with scroll already
    handleScroll()

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Smooth scroll function
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Get the target element
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Scroll to the element smoothly
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      // Update URL without causing a page reload
      window.history.pushState(null, "", href)
    }
  }

  return (
    <nav className="fixed flex w-full z-50">
      <div className="max-w-7xl z-40 w-full mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-centerspace-x-4 gap-4">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Button key={index} variant="ghost">
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="text-gray-700 hover:text-indigo-600 px-0 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </a>
              </Button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button>
              <Link href={"/sign-in"}>Get started for free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="">
                <DrawerHeader className="text-left p-4">
                  <DrawerTitle>
                    <Logo />
                  </DrawerTitle>
                  <div className="flex flex-col gap-1 items-start mt-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleScrollToSection(e, item.href)}
                        className="text-gray-700 hover:text-indigo-600 py-2 rounded-md text-md font-semibold"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <Link href={"/assignment"}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href={"/assignment"}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute z-30 bottom-0 border-b border-primary left-0 w-full h-full bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hasScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </nav>
  )
}
