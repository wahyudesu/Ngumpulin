import React from 'react';

// Data untuk daftar tugas dan waktu
const tasks = [
  { time: '4 hrs', description: 'to set up emails' },
  { time: '+ 6 hrs', description: 'designing a landing page' },
  { time: '+ 4 hrs', description: 'to handle Stripe webhooks' },
  { time: '+ 2 hrs', description: 'for SEO tags' },
  { time: '+ 1 hr', description: 'applying for Google OAuth' },
  { time: '+ 3 hrs', description: 'for DNS records' },
  { time: '+ 2 hrs', description: 'for protected API routes' },
  { time: '+ ∞ hrs', description: 'overthinking...' },
];

// Komponen kecil untuk menampilkan ikon panah
const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export default function Problem() {
  return (
    <div className="min-h-screen flex items-center justify-center p-16">
      <div className="max-w-md w-full space-y-3 text-zinc-400 text-lg bg-red-900 p-8 rounded-lg">
        {/* Daftar tugas */}
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-white">
          {tasks.map((task, index) => (
            <React.Fragment key={index}>
              <div className="text-rose-500 text-right">{task.time}</div>
              <div>{task.description}</div>
            </React.Fragment>
          ))}
        </div>

        {/* Total waktu */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 text-white">
            <div className="text-rose-500 text-right">= 22+ hours</div>
            <div>of headaches 🌧️</div>
          </div>
        </div>

        {/* Pesan penutup */}
        <div className="pt-8 text-center">
          <p className="text-zinc-300 flex items-center justify-center gap-2">
            <ArrowIcon />
            There&apos;s an easier way
          </p>
        </div>
      </div>
    </div>
  );
}