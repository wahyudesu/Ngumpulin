import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 pt-1.5">
      <img
        src="/logo-ngumpulin.svg"
        alt="Ngumpulin Logo"
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold">
        Ngumpul
        <span className="ml-1 rounded-md bg-gradient-to-br from-violet-400 to-cyan-500 p-1 text-background">
          In
        </span>
      </span>
    </Link>
  );
}