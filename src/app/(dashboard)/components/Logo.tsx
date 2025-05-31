import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link
      href={'/'}
      className="text-xl font-bold pt-1.5">
      <h1>
        Ngumpul
        <span className="ml-1 rounded-md bg-gradient-to-br from-violet-400 to-cyan-500 p-1 text-background">
          In
        </span>
      </h1>
    </Link>
  );
}