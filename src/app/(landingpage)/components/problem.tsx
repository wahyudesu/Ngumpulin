'use client'

import React from 'react'
import { motion } from 'framer-motion'

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
]

// Komponen kecil untuk menampilkan ikon panah
const ArrowIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
)

export default function Problem() {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8">
      {/* <h1 className="text-4xl font-bold text-white text-center">
        Simplify Your Workflow
      </h1>
      <h2 className="text-2xl text-zinc-400 text-center">
        Stop wasting time on repetitive tasks
      </h2> */}
    <br>
    </br>
      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 text-zinc-400 text-lg bg-red-900 p-8 rounded-lg shadow-xl"
      >
        <h1 className="sr-only">Daftar Tugas dan Waktu</h1>
        
        {/* Daftar tugas */}
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="grid grid-cols-[auto_1fr] gap-x-3 items-center"
            >
              <span className="text-rose-500 text-right whitespace-nowrap">{task.time}</span>
              <span className="text-white">{task.description}</span>
            </motion.li>
          ))}
        </ul>

        {/* Total waktu */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 items-center">
            <span className="text-rose-500 text-right font-bold">= 22+ hours</span>
            <span className="text-white">of headaches 🌧️</span>
          </div>
        </div>

        {/* Pesan penutup */}
        <motion.div 
          className="pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-zinc-300 flex items-center justify-center gap-2">
            <ArrowIcon />
            <span>There&apos;s an easier way</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}