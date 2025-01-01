'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';
import Logo from './Logo';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex h-[64px] items-center justify-between px-4">
      <Logo />
      <div className="flex items-center gap-4">
        <Button asChild variant={'link'}>
          <Link href={'/dashboard'} className='text-lg'>
            Dashboard
          </Link>
        </Button>
        <Button
          variant={'secondary'}
          className="flex items-center gap-2 font-bold text-foreground">
          <LogIn className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}