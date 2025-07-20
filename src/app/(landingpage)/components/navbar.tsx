"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import Logo from "@/components/Logo"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav className="fixed flex w-full z-50">
      <div className="max-w-7xl z-40 w-full mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 gap-4">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Button key={index} variant="ghost" asChild>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild>
              <Link href="/sign-in">Get started for free</Link>
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
              <DrawerContent>
                <DrawerHeader className="text-left p-4">
                  <DrawerTitle>
                    <Link href="/">
                      <Logo />
                    </Link>
                  </DrawerTitle>
                  <div className="flex flex-col gap-1 items-start mt-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 hover:text-indigo-600 py-2 rounded-md text-md font-semibold"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <Link href="/assignment">Login</Link>
                  </Button>
                  <Button className="w-full mt-2" asChild>
                    <Link href="/assignment">Sign Up</Link>
                  </Button>
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
