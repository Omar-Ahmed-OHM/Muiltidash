'use client'
import { Bell, User2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '../../../../public/asset/images/حورلوجو-1.png'

export default function Topbar() {
  return (
    <div
      dir="rtl"
      className="h-16 bg-gradient-to-l from-[#F8F1FC] to-[#ebdbff] shadow-sm flex items-center justify-between px-6 fixed top-0 right-64 left-0 z-30 backdrop-blur-md border-b border-purple-100"
    >
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="لوجو"
          width={36}
          height={36}
          className="rounded-full shadow-md"
        />
        <h1 className="text-lg font-bold text-[#6B2B7A]">
          أهلاً بك في لوحة التحكم 👋
        </h1>
      </div>

      <div className="flex items-center gap-4 text-[#6B2B7A]">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-[#EEDCFB] transition-colors"
        >
          <Bell size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-[#EEDCFB] transition-colors"
        >
          <User2 size={20} />
        </motion.button>
      </div>
    </div>
  )
}
