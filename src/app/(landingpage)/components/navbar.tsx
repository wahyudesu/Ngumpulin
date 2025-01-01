'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Logo from '@/components/Logo'

const navItems = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">SaaSLogo</span>
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Sign Up Button */}
          <div className="hidden md:flex items-center">
            <Button>Sign Up</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className=''>
                <DrawerHeader className="text-left p-4">
                  <DrawerTitle>
                    <Logo />
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
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button className="w-full">Sign Up</Button>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  )
}