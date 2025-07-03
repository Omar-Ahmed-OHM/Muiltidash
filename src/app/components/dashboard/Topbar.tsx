'use client'
import { Bell, User2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '../../../../public/asset/images/حورلوجو-1.png'

export default function Topbar() {
  return (
    <div
      dir="rtl"
      className="
        fixed top-0 left-0 right-0 z-30 h-16
        bg-gradient-to-l from-[#F8F1FC] to-[#ebdbff]
        shadow-sm
        flex items-center justify-between
        px-4 sm:px-6 lg:px-6
        backdrop-blur-md border-b border-purple-100
        lg:right-64
      "
    >
      {/* جهة الشمال: شعار وترحيب */}
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="لوجو"
          width={36}
          height={36}
          className="rounded-full shadow-md"
          unoptimized
        />
        <h1 className="text-sm sm:text-base font-bold text-[#6B2B7A] truncate max-w-xs sm:max-w-md">
          أهلاً بك في لوحة التحكم 👋
        </h1>
      </div>

      {/* جهة اليمين: أيقونات */}
      <div className="flex items-center gap-3 text-[#6B2B7A]">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-[#EEDCFB] transition-colors"
          aria-label="الإشعارات"
        >
          <Bell size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-[#EEDCFB] transition-colors"
          aria-label="حساب المستخدم"
        >
          <User2 size={20} />
        </motion.button>
      </div>
    </div>
  )
}


