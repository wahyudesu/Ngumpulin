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
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },

]

export default function Navbar() {
  return (
    <nav className="bg-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-centerspace-x-4 gap-4">
            <Logo/>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Button variant="ghost">
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 px-0 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            {/* <Button variant="outline">Login</Button> */}
            <Button>
              <Link href={'/assignment'}>
              Get started for free
              </Link>
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